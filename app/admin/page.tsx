import type { Metadata } from "next";
import { Suspense } from "react";

import AdminStats from "./AdminStats";
import FounderCalls from "./FounderCalls";
import { LoadingState } from "./_components/States";

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
          Pipeline at a glance, plus Sovereign Stack founder-call registrations.
        </p>
      </div>

      {/*
        The stat row fans out to several backend endpoints, so it is streamed
        rather than blocking the founder-call list — which is the one thing on
        this page that is already known to work.
      */}
      <Suspense fallback={<LoadingState label="Loading pipeline stats…" />}>
        <AdminStats />
      </Suspense>

      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
          Founder calls
        </h2>
      </div>
      <FounderCalls />
    </>
  );
}
