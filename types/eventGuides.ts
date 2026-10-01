export interface EventGuide {
  /** Matches an id in data/events.json. */
  eventId: string;
  /** Drafts show only on /events/guides-review; published guides render on the event page. */
  status: "draft" | "published";
  /** ISO date the facts were last checked. */
  updated: string;
  /** Two or three sentences: who this event is worth it for, and who should skip it. */
  verdict: string;
  /** Public ticket prices only. Sponsorship and exhibition pricing is never published; it is discussed privately. */
  costs: {
    ticket?: string;
    note?: string;
  };
  /** Who actually attends, by role and sector. Organiser claims labelled as such. */
  attendees: string;
  /** The side-event scene around the conference, and what it is useful for. */
  sideEvents: string;
  worthItFor: string[];
  skipIf: string[];
  /** Plain statement of what PCG does or would do here. Never claims attendance it cannot back. */
  pcgAngle: string;
  /** Pages the facts above were checked against. */
  sources: { label: string; url: string }[];
}
