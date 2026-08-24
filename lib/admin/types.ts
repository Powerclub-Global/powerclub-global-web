/**
 * TypeScript mirrors of the PCG dashboard backend's JSON payloads.
 *
 * Field casing is NOT uniform across the backend and must be matched exactly:
 *
 *  - `CrmContact` is plain snake_case (no serde rename attribute).
 *  - `DiscoveryCallBooking`, `Entity*` and `EntityEngagement*` are camelCase
 *    (`#[serde(rename_all = "camelCase")]`).
 *  - `ConferenceBoardSummary` is snake_case — it is an ad-hoc struct declared
 *    in the route file with no rename attribute.
 *
 * Source of truth: pcg-cc-mcp `crates/db/src/models/*` and
 * `crates/server/src/routes/{discovery_calls,entity_engagements,crm_contacts}.rs`.
 */

/* ── Discovery calls ─────────────────────────────────────────────────────── */

/**
 * `GET /api/discovery-call-bookings` row.
 *
 * The backend flattens `DiscoveryCallBooking` into the list item, so the
 * booking's own camelCase fields sit at the top level alongside the two
 * resolved display names.
 */
export interface DiscoveryCallBooking {
  id: string;
  requesterName: string;
  requesterEmail: string;
  requesterCompany: string | null;
  requesterLinkedinUrl: string | null;
  requesterPhone: string | null;

  conferencesSponsoredPerYear: string | null;
  hostsOwnEvents: string | null;
  investingInContentForEvent: string | null;
  goalsForConference: string | null;
  currentCoverageProvider: string | null;
  timelineUrgency: string | null;
  relatedConferenceName: string | null;
  /** JSON blob of any extra answers captured by the public form. */
  questionnaireAnswers: string | null;

  /** ISO-8601, stored UTC. Public booking slots are offered in Asia/Hong_Kong. */
  scheduledAt: string;
  googleEventId: string | null;
  googleMeetUrl: string | null;

  matchedEntityId: string | null;
  matchedCrmContactId: string | null;
  relatedConferenceBoardId: string | null;

  status: string;
  createdAt: string;
  updatedAt: string;

  /** Joined from `entities.canonical_name`. */
  matchedEntityName: string | null;
  /** Joined from `crm_contacts`. */
  matchedContactName: string | null;
}

/* ── Conference leads ────────────────────────────────────────────────────── */

/** `GET /api/conference-boards` — snake_case ad-hoc struct. */
export interface ConferenceBoardSummary {
  board_id: string;
  conference_name: string;
  entity_count: number;
}

export const ENGAGEMENT_STATUSES = [
  "not_contacted",
  "needs_follow_up",
  "invited",
  "connected",
  "replied",
  "meeting_scheduled",
  "converted",
  "cold",
  "declined",
] as const;

export type EngagementStatus = (typeof ENGAGEMENT_STATUSES)[number];

/**
 * `GET /api/conference-boards/:board_id/engagements` row.
 *
 * `status` is null when no `entity_engagements` row exists yet — the query
 * LEFT JOINs, and the backend only lazily creates the row on first read or
 * update. Treat null as `not_contacted`.
 */
export interface BoardEngagementRow {
  entityId: string;
  entityName: string;
  entityTitle: string | null;
  entityCompany: string | null;
  entityPhotoUrl: string | null;
  appearanceType: string;
  engagementId: string | null;
  status: EngagementStatus | null;
  assignedTo: string | null;
  nextFollowUpAt: string | null;
}

export interface EntityEngagement {
  id: string;
  entityId: string;
  channel: string | null;
  status: EngagementStatus;
  assignedTo: string | null;
  notes: string | null;
  lastContactAt: string | null;
  nextFollowUpAt: string | null;
  convertedToPersonId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EntityExternalIds {
  linkedin: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  github: string | null;
  crunchbase: string | null;
}

export interface EntitySocialProfile {
  platform: string;
  handle: string;
  url: string | null;
  followers: number | null;
  verified: boolean | null;
}

export interface EntitySocialAnalysis {
  totalFollowers: number;
  engagementRate: number | null;
  postingFrequency: string | null;
  topTopics: string[];
  sentiment: string | null;
  influenceScore: number | null;
  analyzedAt: string;
}

/** `GET /api/entities/:id` — `EntityWithParsedFields`. */
export interface EntityDetail {
  id: string;
  entityType: string;
  canonicalName: string;
  slug: string;
  externalIds: EntityExternalIds | null;
  bio: string | null;
  title: string | null;
  company: string | null;
  photoUrl: string | null;
  socialProfiles: EntitySocialProfile[] | null;
  socialAnalysis: EntitySocialAnalysis | null;
  /** 0..1 */
  dataCompleteness: number;
  lastResearchedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/** `POST /api/entities/:id/promote`. */
export interface PromoteResponse {
  contact: CrmContact;
  engagement: EntityEngagement;
}

/* ── Leads (crm_contacts) ────────────────────────────────────────────────── */

/**
 * `GET /api/crm/contacts?organization_id=…` row (snake_case).
 *
 * Only the fields the Leads module actually renders are typed here; the
 * backend returns considerably more.
 *
 * `tags` and `custom_fields` are **JSON-encoded strings**, not objects — they
 * are stored as TEXT columns and passed through verbatim. Parse with the
 * helpers in `lib/admin/leads.ts`.
 */
export interface CrmContact {
  id: string;
  organization_id: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  job_title: string | null;
  linkedin_url: string | null;
  twitter_handle: string | null;
  website: string | null;
  source: string | null;
  lifecycle_stage: string;
  lead_score: number;
  last_activity_at: string | null;
  /** JSON array as a string, e.g. `["website-lead","pcg"]`. */
  tags: string | null;
  /** JSON object as a string; holds questionnaire + attribution. */
  custom_fields: string | null;
  created_at: string;
  updated_at: string;
}
