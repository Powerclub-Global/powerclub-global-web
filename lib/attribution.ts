/**
 * Marketing attribution capture.
 *
 * Records where a visitor came from and keeps two views of it:
 *
 *  - **first touch** — the very first visit we ever saw from this browser.
 *    Persisted in `localStorage` under `pcg_attribution` for 90 days and never
 *    overwritten while it is still fresh. This is the "who originally found us"
 *    signal the CRM cares about.
 *  - **last touch** — the attribution of the current session. Persisted in
 *    `sessionStorage` under `pcg_attribution_last` and refreshed whenever a new
 *    visit arrives with campaign parameters.
 *
 * Both are attached to every lead / booking POST as an `attribution` object so
 * the PCG dashboard can merge them into the crm_contact's custom_fields.
 *
 * Everything here is defensive: private-mode storage failures, SSR, and
 * malformed stored JSON all degrade to "no attribution" rather than throwing.
 */

const FIRST_TOUCH_KEY = "pcg_attribution";
const LAST_TOUCH_KEY = "pcg_attribution_last";
const FIRST_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

export interface TouchPoint {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  li_fat_id?: string;
  referrer?: string;
  landing_path?: string;
  captured_at: string;
}

export interface AttributionPayload {
  first_touch?: TouchPoint;
  last_touch?: TouchPoint;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const CLICK_ID_KEYS = ["gclid", "fbclid", "li_fat_id"] as const;

function safeGet(store: Storage | undefined, key: string): string | null {
  try {
    return store?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function safeSet(store: Storage | undefined, key: string, value: string): void {
  try {
    store?.setItem(key, value);
  } catch {
    /* private mode / quota — attribution is best-effort */
  }
}

function parseTouch(raw: string | null): TouchPoint | undefined {
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && typeof parsed.captured_at === "string") {
      return parsed as TouchPoint;
    }
  } catch {
    /* malformed — treat as absent */
  }
  return undefined;
}

/** Read the current URL + referrer into a touch point. */
function readCurrentTouch(): TouchPoint {
  const touch: TouchPoint = { captured_at: new Date().toISOString() };

  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, 255);
    }
    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, 255);
    }
    touch.landing_path = window.location.pathname;
  } catch {
    /* malformed URL — keep whatever we got */
  }

  try {
    const ref = document.referrer;
    // Ignore same-origin referrers: those are internal navigation, not a source.
    if (ref && !ref.startsWith(window.location.origin)) {
      touch.referrer = ref.slice(0, 500);
    }
  } catch {
    /* no referrer available */
  }

  return touch;
}

/** True when a touch carries an actual acquisition signal worth recording. */
function isMeaningful(touch: TouchPoint): boolean {
  return Boolean(
    touch.utm_source ||
      touch.utm_medium ||
      touch.utm_campaign ||
      touch.gclid ||
      touch.fbclid ||
      touch.li_fat_id ||
      touch.referrer,
  );
}

/**
 * Capture attribution for the current page view. Safe to call on every route
 * change — first touch is written once, last touch only when a new campaign or
 * external referrer shows up.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const current = readCurrentTouch();

  // First touch: write only if missing or expired.
  const existing = parseTouch(safeGet(window.localStorage, FIRST_TOUCH_KEY));
  const expired =
    !existing ||
    Number.isNaN(Date.parse(existing.captured_at)) ||
    Date.now() - Date.parse(existing.captured_at) > FIRST_TOUCH_TTL_MS;
  if (expired) {
    safeSet(window.localStorage, FIRST_TOUCH_KEY, JSON.stringify(current));
  }

  // Last touch: refresh on any meaningful signal, or seed it if empty.
  const lastExisting = parseTouch(safeGet(window.sessionStorage, LAST_TOUCH_KEY));
  if (isMeaningful(current) || !lastExisting) {
    safeSet(window.sessionStorage, LAST_TOUCH_KEY, JSON.stringify(current));
  }
}

/**
 * The attribution object to attach to a lead / booking submission.
 * Returns `undefined` when nothing was ever captured (SSR, storage blocked).
 */
export function getAttribution(): AttributionPayload | undefined {
  if (typeof window === "undefined") return undefined;

  const first = parseTouch(safeGet(window.localStorage, FIRST_TOUCH_KEY));
  const last =
    parseTouch(safeGet(window.sessionStorage, LAST_TOUCH_KEY)) ?? readCurrentTouch();

  if (!first && !last) return undefined;
  return { first_touch: first ?? last, last_touch: last };
}

/** Flattened attribution for use as analytics event properties. */
export function attributionProperties(): Record<string, string> {
  const attribution = getAttribution();
  const props: Record<string, string> = {};
  if (!attribution) return props;

  const { first_touch: first, last_touch: last } = attribution;
  if (first) {
    for (const [k, v] of Object.entries(first)) {
      if (typeof v === "string") props[`first_${k}`] = v;
    }
  }
  if (last) {
    for (const [k, v] of Object.entries(last)) {
      if (typeof v === "string") props[`last_${k}`] = v;
    }
  }
  return props;
}
