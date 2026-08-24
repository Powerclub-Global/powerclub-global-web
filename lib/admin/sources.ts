/**
 * Server-side data sources for the admin modules.
 *
 * Centralised so the Leads page and the Overview stat row agree on exactly
 * what they are counting, and so each backend path is written down once.
 *
 * Server-only by construction: everything here funnels into `adminFetch`, which
 * imports `next/headers` — importing this from a client component is a build
 * error, so no extra guard is needed.
 */

import { backendJson, PCG_ORG_ID, type BackendResult } from "./api";
import {
  crmContactToLead,
  founderCallsToLeads,
  sortLeads,
  type FounderCallData,
  type LeadRow,
} from "./leads";
import type {
  BoardEngagementRow,
  ConferenceBoardSummary,
  CrmContact,
  DiscoveryCallBooking,
} from "./types";

/** Cap matches the backend's own `list_all` ceiling for bookings. */
const CONTACT_LIMIT = 500;

export const PATHS = {
  contacts: `/api/crm/contacts?organization_id=${PCG_ORG_ID}&limit=${CONTACT_LIMIT}`,
  discoveryCalls: "/api/discovery-call-bookings",
  conferenceBoards: "/api/conference-boards",
  boardEngagements: (boardId: string) =>
    `/api/conference-boards/${encodeURIComponent(boardId)}/engagements`,
} as const;

export function fetchContacts(): Promise<BackendResult<CrmContact[]>> {
  return backendJson<CrmContact[]>(PATHS.contacts);
}

export function fetchDiscoveryCalls(): Promise<BackendResult<DiscoveryCallBooking[]>> {
  return backendJson<DiscoveryCallBooking[]>(PATHS.discoveryCalls);
}

export function fetchConferenceBoards(): Promise<
  BackendResult<ConferenceBoardSummary[]>
> {
  return backendJson<ConferenceBoardSummary[]>(PATHS.conferenceBoards);
}

export function fetchBoardEngagements(
  boardId: string
): Promise<BackendResult<BoardEngagementRow[]>> {
  return backendJson<BoardEngagementRow[]>(PATHS.boardEngagements(boardId));
}

/**
 * Sovereign Stack founder-call registrations.
 *
 * This endpoint is still `api_key`-gated on the backend rather than
 * session-gated, so the server-side key is attached here. It never reaches the
 * browser. Returns null (rather than an error state) when the key is missing —
 * founder calls are one contributing source to the Leads list, and their
 * absence should degrade that list, not break it.
 */
export async function fetchFounderCalls(): Promise<FounderCallData | null> {
  const apiKey = process.env.FOUNDER_CALL_ADMIN_KEY;
  if (!apiKey) return null;

  const result = await backendJson<FounderCallData>(
    `/api/public/events/sovereign-stack/admin?api_key=${encodeURIComponent(apiKey)}`
  );
  return result.kind === "ok" ? result.data : null;
}

export interface LeadsPayload {
  /** Null when the contacts endpoint could not be read at all. */
  contacts: BackendResult<CrmContact[]>;
  founderCallsAvailable: boolean;
  leads: LeadRow[];
}

/**
 * The unified Leads list: CRM contacts plus founder-call registrations.
 *
 * The two are fetched concurrently — neither depends on the other, and the
 * founder-call hop is the slower of the two.
 */
export async function fetchLeads(): Promise<LeadsPayload> {
  const [contacts, founderCalls] = await Promise.all([
    fetchContacts(),
    fetchFounderCalls(),
  ]);

  const crmLeads =
    contacts.kind === "ok" ? (contacts.data ?? []).map(crmContactToLead) : [];
  const founderLeads = founderCallsToLeads(founderCalls);

  return {
    contacts,
    founderCallsAvailable: founderCalls !== null,
    leads: sortLeads([...crmLeads, ...founderLeads]),
  };
}
