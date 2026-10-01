import type { Metadata } from "next";
import Link from "next/link";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import { eventGuides } from "@/data/event-guides";
import EventGuideBlock from "@/components/EventGuide";
import Navbar from "@/components/Navbar";

// Internal review page: every guide, draft or published, on one scroll so it
// can be read and signed off quickly. Never indexed.
export const metadata: Metadata = {
  title: "Event guides review",
  robots: { index: false, follow: false },
};

export default function GuidesReviewPage() {
  const events = eventsData.events as Event[];
  const byId = new Map(events.map((e) => [e.id, e]));
  const guides = [...eventGuides].sort((a, b) =>
    (byId.get(a.eventId)?.dateRange?.start ?? "").localeCompare(byId.get(b.eventId)?.dateRange?.start ?? ""),
  );
  const drafts = guides.filter((g) => g.status === "draft").length;
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
        <h1 className="text-3xl mb-2">Event guides review</h1>
        <p className="text-white/60 mb-8">
          {guides.length} guides, {drafts} draft. To publish one, set its{" "}
          <code className="text-[#ae904c]">status</code> to{" "}
          <code className="text-[#ae904c]">&quot;published&quot;</code> in{" "}
          <code className="text-[#ae904c]">data/event-guides/&lt;event-id&gt;.ts</code>.
        </p>
        <nav className="mb-12 text-sm text-white/60 flex flex-wrap gap-x-4 gap-y-1">
          {guides.map((g) => (
            <a key={g.eventId} href={`#${g.eventId}`} className="hover:text-[#ae904c]">
              {byId.get(g.eventId)?.name ?? g.eventId}
              {g.status === "draft" ? "" : " ✓"}
            </a>
          ))}
        </nav>
        <div className="space-y-12">
          {guides.map((g) => {
            const ev = byId.get(g.eventId);
            if (!ev) return null;
            return (
              <div key={g.eventId} id={g.eventId}>
                <p className="text-xs text-white/40 mb-2">
                  {g.status.toUpperCase()} · {ev.dates} · {ev.location} ·{" "}
                  <Link href={`/events/${ev.id}`} className="underline hover:text-[#ae904c]">
                    event page
                  </Link>
                </p>
                <EventGuideBlock guide={g} eventName={ev.name} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
