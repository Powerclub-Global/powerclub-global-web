// One place for the site's contact routes, so every button uses the same
// destination and the same label. The ladder is: text Theodore, book a call,
// send a message. See PCG_CONTENT_CONVERSION_AUDIT_2026-09-28 (A2, A3).

export const BOOK_LABEL = "Book a Call";
export const MESSAGE_LABEL = "Send a Message";
export const BOOK_HREF = "/schedule-call";
export const MESSAGE_HREF = "/contact";

export const THEODORE_NUMBER = "+16452330500";
export const THEODORE_NUMBER_DISPLAY = "+1 (645) 233-0500";

/** What the visitor was looking at when they clicked. */
export interface BookingContext {
  /** Event id, e.g. "token2049-dubai-2027". */
  event?: string;
  /** Display name, e.g. "TOKEN2049 Dubai 2027". */
  name?: string;
  /** sponsor | media | speak | next-edition */
  interest?: string;
  /** Topic label pre-selected on /schedule-call. */
  topic?: string;
}

/** Build a link to a contact route that carries the visitor's context. */
export function withContext(base: string, ctx: BookingContext = {}): string {
  const q = new URLSearchParams();
  if (ctx.event) q.set("event", ctx.event);
  if (ctx.name) q.set("name", ctx.name);
  if (ctx.interest) q.set("interest", ctx.interest);
  if (ctx.topic) q.set("topic", ctx.topic);
  const s = q.toString();
  return s ? `${base}?${s}` : base;
}

/** Topics offered on /schedule-call. */
export const TOPICS = [
  "Conference sponsorship or activation",
  "Media partnership / press coverage",
  "Speaking opportunity",
  "Influencer relations",
  "Sovereign Stack / ORCHA",
  "Something else",
] as const;

const INTEREST_TOPIC: Record<string, string> = {
  sponsor: TOPICS[0],
  "next-edition": TOPICS[0],
  media: TOPICS[1],
  speak: TOPICS[2],
};

/** Resolve the topic to pre-select from ?topic= or ?interest=. */
export function topicFromParams(topic?: string | null, interest?: string | null): string | undefined {
  if (topic && (TOPICS as readonly string[]).includes(topic)) return topic;
  if (interest && INTEREST_TOPIC[interest]) return INTEREST_TOPIC[interest];
  return undefined;
}

/** A sentence describing what the visitor wanted, for pre-filling a message. */
export function intentSentence(name?: string | null, interest?: string | null): string {
  if (!name) return "";
  switch (interest) {
    case "sponsor":
      return `I'm interested in sponsoring ${name}.`;
    case "next-edition":
      return `I'd like to plan for the next edition of ${name}.`;
    case "media":
      return `I'm interested in a media partnership around ${name}.`;
    case "speak":
      return `I'm interested in a speaking slot at ${name}.`;
    default:
      return `I'm interested in ${name}.`;
  }
}

/** sms: link to Theodore with a pre-filled message. */
export function smsHref(context?: string): string {
  const body = context
    ? `Hi Theodore, I'm interested in ${context}. I'm reaching out via the Powerclub Global site.`
    : "Hi Theodore, I'm reaching out via the Powerclub Global site.";
  return `sms:${THEODORE_NUMBER}?&body=${encodeURIComponent(body)}`;
}

/** Where "Book a Call" goes from each service page, with its topic pre-set.
 * Roadshow management has its own, conference-scoped questionnaire. */
export function serviceBookingHref(serviceId: string): string {
  switch (serviceId) {
    case "roadshow-management":
      return "/discovery-call";
    case "press-relations":
      return withContext(BOOK_HREF, { topic: TOPICS[1] });
    case "influencer-relations":
      return withContext(BOOK_HREF, { topic: TOPICS[3] });
    default:
      return withContext(BOOK_HREF, { topic: TOPICS[0] });
  }
}
