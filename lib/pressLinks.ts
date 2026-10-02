import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import type { PressRelease } from "@/lib/press";

// Ties a press article to the conference it covers, so every article links to
// its conference page, its sibling pieces and the next edition. The match is
// by slug prefix (press slugs start with the conference id), with overrides
// for the few that do not.

const SLUG_TO_EVENT: Record<string, string> = {
  "token2049-dubai-postponed-to-april-2027": "token2049-dubai-2027",
};

/** Where to send a reader once this edition has passed. */
const NEXT_EDITION: Record<string, string> = {
  "bitcoin-2026-las-vegas": "bitcoin-2027",
  "bitcoin-asia-2026": "bitcoin-mena-2026",
  "consensus-miami-2026": "consensus-miami-2027",
  "mining-disrupt-2026": "mining-disrupt-2027",
  "token2049-dubai-2026": "token2049-dubai-2027",
  "token2049-singapore-2026": "token2049-dubai-2027",
};

const events = eventsData.events as Event[];

export function eventForPress(slug: string): Event | undefined {
  const override = SLUG_TO_EVENT[slug];
  if (override) return events.find((e) => e.id === override);
  // Longest id that prefixes the slug wins ("bitcoin-asia-2026" over "bitcoin-2026").
  return events
    .filter((e) => slug.startsWith(`${e.id}-`))
    .sort((a, b) => b.id.length - a.id.length)[0];
}

export function nextEditionFor(event: Event | undefined): Event | undefined {
  if (!event) return undefined;
  const id = NEXT_EDITION[event.id];
  return id ? events.find((e) => e.id === id) : undefined;
}

/** Other published articles about the same conference, oldest first. */
export function siblingPress(
  slug: string,
  event: Event | undefined,
  all: PressRelease[]
): PressRelease[] {
  if (!event || SLUG_TO_EVENT[slug]) return [];
  return all
    .filter((p) => p.slug !== slug && eventForPress(p.slug)?.id === event.id)
    .sort((a, b) => a.date.localeCompare(b.date));
}
