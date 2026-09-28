export interface Author {
  name: string;
  role: string;
  /** Path under /public, or an absolute URL. */
  image?: string;
  bio: string;
}

export interface Insight {
  slug: string;
  title: string;
  /** 150 chars or so — this is the meta description, not a teaser. */
  description: string;
  /** ISO date. */
  published: string;
  updated?: string;
  author: string;
  /** Draft articles render at their URL but carry noindex and stay out of the sitemap. */
  status: "draft" | "published";
  /** Reading-time hint, in minutes. */
  readMinutes: number;
  tags: string[];
  coverImage?: string;
  /** Event ids from data/events.json that this piece cites — renders as links. */
  relatedEvents?: string[];
  /** Press-release slugs used as worked examples. */
  relatedPress?: string[];
  /** The body, as an ordered list of blocks. */
  body: Block[];
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; text: string }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] };
