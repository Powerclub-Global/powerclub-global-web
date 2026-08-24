/**
 * Discovery-call questionnaire presentation.
 *
 * The labels and option values here mirror `app/discovery-call/DiscoveryCallClient.tsx`
 * one-for-one so that an answer reads in admin exactly as the prospect saw it.
 * If the public form gains or renames a question, update both.
 */

import type { DiscoveryCallBooking } from "./types";
import { humanize } from "./format";

type QuestionKey =
  | "conferencesSponsoredPerYear"
  | "hostsOwnEvents"
  | "investingInContentForEvent"
  | "timelineUrgency"
  | "currentCoverageProvider"
  | "relatedConferenceName"
  | "goalsForConference";

interface QuestionDef {
  key: QuestionKey;
  label: string;
  /** Option value -> display label, for the select-backed questions. */
  options?: Record<string, string>;
  /** Long-form answers render as a block rather than inline. */
  longForm?: boolean;
}

export const DISCOVERY_QUESTIONS: QuestionDef[] = [
  {
    key: "conferencesSponsoredPerYear",
    label: "Conferences sponsored / attended per year",
    options: { "1-2": "1–2", "3-5": "3–5", "6-10": "6–10", "10+": "10+" },
  },
  {
    key: "hostsOwnEvents",
    label: "Hosts their own events",
    options: { yes: "Yes", no: "No", planning_to: "Planning to" },
  },
  {
    key: "investingInContentForEvent",
    label: "Currently investing in event content / coverage",
    options: {
      yes_actively: "Yes, actively",
      somewhat: "Somewhat / ad hoc",
      not_yet: "Not yet",
    },
  },
  {
    key: "timelineUrgency",
    label: "Timeline / urgency",
    options: {
      asap: "ASAP — event is imminent",
      "1-3_months": "1–3 months out",
      "3-6_months": "3–6 months out",
      exploring: "Just exploring",
    },
  },
  { key: "currentCoverageProvider", label: "Current coverage / production provider" },
  { key: "relatedConferenceName", label: "Conference or event this is about" },
  { key: "goalsForConference", label: "Goals for this conference", longForm: true },
];

/** Render one questionnaire answer, mapping known option values to their labels. */
export function answerLabel(def: QuestionDef, raw: string | null): string | null {
  if (!raw || !raw.trim()) return null;
  if (def.options) return def.options[raw] ?? humanize(raw);
  return raw;
}

/**
 * Any extra answers the public form posted into the free-form
 * `questionnaireAnswers` JSON blob, beyond the first-class columns.
 */
export function extraAnswers(
  booking: DiscoveryCallBooking
): Array<{ key: string; value: string }> {
  if (!booking.questionnaireAnswers) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(booking.questionnaireAnswers);
  } catch {
    return [];
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return [];

  const known = new Set<string>(DISCOVERY_QUESTIONS.map((q) => q.key));
  return Object.entries(parsed as Record<string, unknown>)
    .filter(([k, v]) => !known.has(k) && v !== null && v !== "" && v !== undefined)
    .map(([key, value]) => ({
      key,
      value: typeof value === "string" ? value : JSON.stringify(value),
    }));
}

/** Colour treatment for a booking's lifecycle status. */
export function bookingStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case "scheduled":
    case "confirmed":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "completed":
      return "border-[#ae904c]/30 bg-[#ae904c]/10 text-[#ae904c]";
    case "cancelled":
    case "canceled":
    case "no_show":
      return "border-red-400/30 bg-red-400/10 text-red-300";
    default:
      return "border-white/15 bg-white/5 text-white/60";
  }
}
