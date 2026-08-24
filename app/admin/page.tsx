import type { Metadata } from "next";

import FounderCalls from "./FounderCalls";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminOverviewPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-white/45">
          Sovereign Stack founder-call registrations. Folds into the Leads module
          once that lands.
        </p>
      </div>
      <FounderCalls />
    </>
  );
}
