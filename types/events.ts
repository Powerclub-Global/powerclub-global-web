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
