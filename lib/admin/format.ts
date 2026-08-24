/**
 * Formatting helpers shared by the admin modules.
 *
 * Timezone policy: the backend stores every timestamp in UTC, while the public
 * discovery-call booker offers slots in Asia/Hong_Kong. Rendering a bare
 * `toLocaleString()` on the server would silently use the container's timezone
 * and produce a hydration mismatch against the browser. So server-rendered
 * times are always formatted with an **explicit** timezone, and the viewer's
 * local time is layered on client-side after mount (see `LocalTime`).
 */

/** The timezone discovery-call slots are published in. */
export const BOOKING_TZ = "Asia/Hong_Kong";

function safeDate(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Full date + time in an explicit timezone, e.g. "Tue, Aug 26, 09:30 HKT". */
export function formatInTz(
  iso: string | null | undefined,
  timeZone: string = BOOKING_TZ,
  label?: string
): string {
  const d = safeDate(iso);
  if (!d) return "—";
  const text = d.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
  return label ? `${text} ${label}` : text;
}

/** Date only, UTC — for created/updated columns where the clock is noise. */
export function formatDateUtc(iso: string | null | undefined): string {
  const d = safeDate(iso);
  if (!d) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Compact relative description, e.g. "in 3 days" / "2 hours ago". */
export function relativeTime(iso: string | null | undefined, now = Date.now()): string {
  const d = safeDate(iso);
  if (!d) return "—";
  const diffMs = d.getTime() - now;
  const abs = Math.abs(diffMs);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 365 * 24 * 3600e3],
    ["month", 30 * 24 * 3600e3],
    ["day", 24 * 3600e3],
    ["hour", 3600e3],
    ["minute", 60e3],
  ];
  const fmt = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  for (const [unit, ms] of units) {
    if (abs >= ms) return fmt.format(Math.round(diffMs / ms), unit);
  }
  return "just now";
}

/** True when the timestamp is in the future. */
export function isUpcoming(iso: string | null | undefined, now = Date.now()): boolean {
  const d = safeDate(iso);
  return d !== null && d.getTime() >= now;
}

/** Turn a snake_case / kebab token into "Title Case" for display. */
export function humanize(value: string | null | undefined): string {
  if (!value) return "—";
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Best available display name for a CRM contact. */
export function contactName(c: {
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}): string {
  const joined = [c.first_name, c.last_name].filter(Boolean).join(" ").trim();
  return c.full_name?.trim() || joined || c.email || "Unnamed contact";
}

/** Initials for a photo-less avatar chip. */
export function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}
