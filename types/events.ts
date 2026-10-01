export interface EventScheduleItem {
  time: string;
  title: string;
  speaker: string;
  location: string;
}

export interface EventDay {
  date: string;
  events: EventScheduleItem[];
}

export interface TicketPrice {
  early: number;
  regular: number;
  vip: number;
}

export interface Speaker {
  name: string;
  title: string;
  image: string;
}

export type EventCategory = "blockchain" | "ai" | "fintech" | "technology" | "policy";

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  blockchain: "Blockchain & Digital Assets",
  ai: "AI",
  fintech: "Fintech & Payments",
  technology: "Technology",
  policy: "Government & Institutional",
};

export interface Event {
  id: string;
  name: string;
  dates: string;
  location: string;
  url: string;
  image: string;
  description: string;
  venue: string;
  ticketPrice?: TicketPrice;
  organizer: string;
  speakers?: Speaker[];
  schedule?: EventDay[];
  sponsors?: string[];
  tags?: string[];
  /** Primary category: drives the filter and the grouping on /conferences. */
  category?: EventCategory;
  /** Other categories this event also belongs to; it shows under these filters too. */
  alsoCategories?: EventCategory[];
  /** How access works. Only set where it is not an ordinary ticketed conference. */
  access?: "open" | "invitation-only" | "government-accredited";
  capacity?: number;
  registrationDeadline?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  eventList?: EventListItem[];
  // PCG media-partner content — sections render only when populated
  articles?: EventArticle[];
  clips?: EventClip[];
  ticketUrl?: string;   // affiliate/partner ticket link (falls back to url)
  promoCode?: string;   // PCG discount code for this event
  postponedTo?: string; // ISO date the event moved to; marks the listed dates as not held
  mediaPartner?: boolean; // true once PCG holds credentials/partnership
}

export interface EventArticle {
  title: string;
  url: string;          // article destination (press page or external)
  image?: string;
  date?: string;        // e.g. "Sep 2026"
  summary?: string;
}

export interface EventClip {
  title: string;
  videoUrl: string;     // mp4 path or external embed URL
  thumbnail?: string;
  speaker?: string;
}

export interface EventListItem {
  name?: string;
  description?: string;
  date?: string;
  time?: string;
  image?: string;
  applyLink?: string;
}

export interface EventsData {
  events: Event[];
}
