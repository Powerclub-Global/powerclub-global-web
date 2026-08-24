import type { Metadata } from "next";

import LeadsTable from "./LeadsTable";
import {
  AuthExpiredState,
  EndpointUnavailableState,
  ErrorState,
} from "../_components/States";
import { fetchLeads } from "@/lib/admin/sources";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Every inbound from the marketing site in one list.
 *
 * Two backend systems feed this — `crm_contacts` (contact form, newsletter,
 * discovery call, promoted conference leads) and the Sovereign Stack events
 * tables (founder calls). A failure in the founder-call hop degrades the list
 * rather than breaking it, and is disclosed in the subheading.
 */
export default async function LeadsPage() {
  const { contacts, founderCallsAvailable, leads } = await fetchLeads();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
        <p className="mt-1 text-sm text-white/45">
          Contact-form, newsletter, discovery-call and founder-call inbounds,
          newest first.
        </p>
        {contacts.kind === "ok" && !founderCallsAvailable && (
          <p className="mt-2 text-xs text-amber-300/70">
            Founder-call registrations could not be loaded, so they are missing
            from this list. Everything else is complete.
          </p>
        )}
      </div>

      {contacts.kind === "auth" && <AuthExpiredState next="/admin/leads" />}

      {contacts.kind === "unavailable" && (
        <EndpointUnavailableState path={contacts.path} what="The CRM contacts list" />
      )}

      {contacts.kind === "error" && (
        <ErrorState message={`Could not load leads: ${contacts.message}`} />
      )}

      {contacts.kind === "ok" && <LeadsTable leads={leads} />}
    </>
  );
}
