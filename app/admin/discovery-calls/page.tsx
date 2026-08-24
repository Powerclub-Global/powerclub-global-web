import type { Metadata } from "next";

import DiscoveryCallsList from "./DiscoveryCallsList";
import {
  AuthExpiredState,
  EndpointUnavailableState,
  ErrorState,
} from "../_components/States";
import { backendJson } from "@/lib/admin/api";
import { BOOKING_TZ } from "@/lib/admin/format";
import type { DiscoveryCallBooking } from "@/lib/admin/types";

export const metadata: Metadata = {
  title: "Discovery Calls",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ENDPOINT = "/api/discovery-call-bookings";

/**
 * Discovery-call bookings taken through the public /discovery-call funnel.
 *
 * Fetched server-side so the backend session token never reaches the browser;
 * the list is handed to a client component purely for the expand interaction.
 */
export default async function DiscoveryCallsPage() {
  const result = await backendJson<DiscoveryCallBooking[]>(ENDPOINT);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Discovery Calls</h1>
        <p className="mt-1 text-sm text-white/45">
          Sales calls booked through the public funnel. Times are shown in{" "}
          {BOOKING_TZ.replace("_", " ")} (the timezone slots are offered in) and in
          your local time.
        </p>
      </div>

      {result.kind === "auth" && <AuthExpiredState next="/admin/discovery-calls" />}

      {result.kind === "unavailable" && (
        <EndpointUnavailableState path={result.path} what="Discovery-call bookings" />
      )}

      {result.kind === "error" && (
        <ErrorState
          message={`Could not load discovery calls: ${result.message}`}
        />
      )}

      {result.kind === "ok" && <DiscoveryCallsList bookings={result.data ?? []} />}
    </>
  );
}
