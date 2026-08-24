import type { Metadata } from "next";

import ContentCalendarClient from "./ContentCalendarClient";

export const metadata: Metadata = {
  title: "Content Calendar",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminContentCalendarPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Content Calendar</h1>
        <p className="mt-1 text-sm text-white/45">
          Every scheduled and published social post for Powerclub Global, laid
          out by the day it goes (or went) live.
        </p>
      </div>
      <ContentCalendarClient />
    </>
  );
}
