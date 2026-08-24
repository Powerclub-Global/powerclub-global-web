/**
 * Engagement-status presentation for the Conference Leads Kanban.
 *
 * Column order runs left-to-right along the outreach funnel, with the two
 * terminal-negative states parked at the end.
 */

import { ENGAGEMENT_STATUSES, type EngagementStatus } from "./types";

export const STATUS_ORDER: EngagementStatus[] = [
  "not_contacted",
  "invited",
  "connected",
  "replied",
  "needs_follow_up",
  "meeting_scheduled",
  "converted",
  "cold",
  "declined",
];

export const STATUS_LABELS: Record<EngagementStatus, string> = {
  not_contacted: "Not contacted",
  invited: "Invited",
  connected: "Connected",
  replied: "Replied",
  needs_follow_up: "Needs follow-up",
  meeting_scheduled: "Meeting scheduled",
  converted: "Converted",
  cold: "Cold",
  declined: "Declined",
};

/** Accent used for the column header rule and the card's status dot. */
export const STATUS_ACCENTS: Record<EngagementStatus, string> = {
  not_contacted: "bg-white/25",
  invited: "bg-[#00d4ff]",
  connected: "bg-[#38bdf8]",
  replied: "bg-[#a78bfa]",
  needs_follow_up: "bg-amber-400",
  meeting_scheduled: "bg-[#ae904c]",
  converted: "bg-emerald-400",
  cold: "bg-white/20",
  declined: "bg-red-400/70",
};

export const STATUS_PILLS: Record<EngagementStatus, string> = {
  not_contacted: "border-white/15 bg-white/5 text-white/55",
  invited: "border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]",
  connected: "border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#7dd3fc]",
  replied: "border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#a78bfa]",
  needs_follow_up: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  meeting_scheduled: "border-[#ae904c]/30 bg-[#ae904c]/10 text-[#ae904c]",
  converted: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  cold: "border-white/15 bg-white/5 text-white/40",
  declined: "border-red-400/30 bg-red-400/10 text-red-300",
};

/**
 * A board row's effective status.
 *
 * The engagements query LEFT JOINs `entity_engagements`, and the backend only
 * creates that row lazily on first read/write — so a null status means the
 * entity has simply never been touched.
 */
export function effectiveStatus(status: EngagementStatus | null): EngagementStatus {
  return status ?? "not_contacted";
}

export function isEngagementStatus(value: string): value is EngagementStatus {
  return (ENGAGEMENT_STATUSES as readonly string[]).includes(value);
}
