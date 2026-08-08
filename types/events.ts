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
