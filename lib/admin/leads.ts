/**
 * Normalisation for the Leads module.
 *
 * "Every inbound from the site in one list" spans two different backend
 * systems, so both are folded into a single `LeadRow`:
 *
 *  - `crm_contacts` — contact-form, newsletter and discovery-call inbounds, all
 *    written by `routes/public_leads.rs::upsert_lead_contact`, plus entities
 *    promoted off a conference board.
 *  - Sovereign Stack founder-call registrations, which live in the events
 *    tables and are only reachable through the founder-call admin endpoint.
 *
 * Classification is tag-driven because `crm_contacts.source` is constrained by
 * a CHECK to a small vocabulary (`website`, `referral`, …) and is additionally
 * *overwritten* by UTM attribution, so it cannot identify the funnel. The tags
 * written at capture time are the reliable signal:
 *
 *   contact form / newsletter -> `funnel:<pcg|sponsor|stack|capital|newsletter>`,
 *                                `website-lead`, optional `src:<page>`
 *   discovery call            -> `discovery_call`, `website-lead`
 *   promoted conference lead  -> `conference-lead`, `<entity_type>`
 */

import { contactName, humanize } from "./format";
import type { CrmContact } from "./types";

export const LEAD_SOURCES = [
  "contact-form",
  "newsletter",
  "discovery-call",
  "founder-call",
  "conference-lead",
  "other",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  "contact-form": "Contact form",
  newsletter: "Newsletter",
  "discovery-call": "Discovery call",
  "founder-call": "Founder call",
  "conference-lead": "Conference lead",
  other: "Other",
};

export const LEAD_SOURCE_CLASSES: Record<LeadSource, string> = {
  "contact-form": "border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]",
  newsletter: "border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#a78bfa]",
  "discovery-call": "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "founder-call": "border-[#ae904c]/30 bg-[#ae904c]/10 text-[#ae904c]",
  "conference-lead": "border-orange-400/30 bg-orange-400/10 text-orange-300",
  other: "border-white/15 bg-white/5 text-white/60",
};

export interface LeadAttribution {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
  landingPage: string | null;
}

export interface LeadRow {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  source: LeadSource;
  /** The `funnel:` tag, or the founder-call track — finer grain than `source`. */
  funnel: string | null;
  attribution: LeadAttribution | null;
  createdAt: string;
  /** Lifecycle stage for CRM contacts; registration state for founder calls. */
  status: string;
  linkedinUrl: string | null;
  tags: string[];
  origin: "crm" | "founder-call";
}

/** `tags` is a JSON-encoded array in a TEXT column, and may be malformed. */
export function parseTags(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is string => typeof t === "string");
  } catch {
    return [];
  }
}

function parseJsonObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Pull marketing attribution out of `custom_fields.attribution`.
 *
 * The backend records `first_touch` and `last_touch` objects. Last touch is
 * what converted the lead, so it wins; first touch fills any gaps.
 */
export function parseAttribution(customFields: string | null): LeadAttribution | null {
  const root = parseJsonObject(customFields);
  const attribution = root?.["attribution"];
  if (typeof attribution !== "object" || attribution === null) return null;

  const obj = attribution as Record<string, unknown>;
  const last = (obj["last_touch"] ?? {}) as Record<string, unknown>;
  const first = (obj["first_touch"] ?? {}) as Record<string, unknown>;

  const pick = (key: string) => str(last[key]) ?? str(first[key]);

  const result: LeadAttribution = {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    referrer: pick("referrer"),
    landingPage: pick("landing_page") ?? pick("page"),
  };

  return Object.values(result).some((v) => v !== null) ? result : null;
}

function classify(tags: string[]): { source: LeadSource; funnel: string | null } {
  const lower = tags.map((t) => t.toLowerCase());
  const funnelTag = lower.find((t) => t.startsWith("funnel:"));
  const funnel = funnelTag ? funnelTag.slice("funnel:".length) : null;

  if (lower.includes("discovery_call")) return { source: "discovery-call", funnel };
  if (lower.includes("conference-lead")) return { source: "conference-lead", funnel };
  if (funnel === "newsletter") return { source: "newsletter", funnel };
  if (lower.includes("website-lead")) return { source: "contact-form", funnel };
  return { source: "other", funnel };
}

export function crmContactToLead(c: CrmContact): LeadRow {
  const tags = parseTags(c.tags);
  const { source, funnel } = classify(tags);
  return {
    id: c.id,
    name: contactName(c),
    email: c.email,
    company: c.company_name,
    source,
    funnel,
    attribution: parseAttribution(c.custom_fields),
    createdAt: c.created_at,
    status: humanize(c.lifecycle_stage),
    linkedinUrl: c.linkedin_url,
    tags,
    origin: "crm",
  };
}

/* ── Founder-call registrations ──────────────────────────────────────────── */

/** Shape of `GET /api/sovereign-stack/admin`, as consumed by `FounderCalls`. */
export interface FounderCallData {
  event: { title: string; slug: string };
  slots: Array<{
    slot: { id: string; label: string };
    bookings: Array<{
      id: string;
      name: string;
      email: string;
      track: string;
      created_at: string;
      confirmation_sent_at: string | null;
    }>;
  }>;
}

export function founderCallsToLeads(data: FounderCallData | null): LeadRow[] {
  if (!data?.slots) return [];
  return data.slots.flatMap((s) =>
    (s.bookings ?? []).map((b) => ({
      id: `founder-call:${b.id}`,
      name: b.name,
      email: b.email,
      company: null,
      source: "founder-call" as const,
      funnel: b.track || null,
      attribution: null,
      createdAt: b.created_at,
      status: b.confirmation_sent_at ? "Confirmed" : "Pending",
      linkedinUrl: null,
      tags: [s.slot.label].filter(Boolean),
      origin: "founder-call" as const,
    }))
  );
}

/** Newest first, with unparseable dates sorted last rather than throwing. */
export function sortLeads(rows: LeadRow[]): LeadRow[] {
  return [...rows].sort((a, b) => {
    const ta = Date.parse(a.createdAt);
    const tb = Date.parse(b.createdAt);
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;
    return tb - ta;
  });
}
