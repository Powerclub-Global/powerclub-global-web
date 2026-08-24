/**
 * Shared types + presentation helpers for the /admin/socials and
 * /admin/content-calendar modules.
 *
 * These mirror the PCG dashboard backend's `social_accounts` / `social_posts`
 * tables. Field names come from:
 *   pcg-cc-mcp/crates/db/src/models/social_account.rs  (SocialAccount)
 *   pcg-cc-mcp/crates/db/src/models/social_post.rs     (SocialPost, PostStatus)
 *
 * This module is imported by both server routes and client components, so it
 * must stay free of any `next/headers` / node-only imports.
 */

/** Powerclub Global's organization id in the dashboard backend. */
export const PCG_ORG_ID = "01010101-0101-0101-0101-010101010101";

/** Row of `social_accounts` as serialised by the backend. */
export interface SocialAccount {
  id: string;
  project_id: string | null;
  organization_id: string | null;
  user_id: string | null;
  platform: string;
  account_type: string;
  platform_account_id: string;
  username: string | null;
  display_name: string | null;
  profile_url: string | null;
  avatar_url: string | null;
  token_expires_at: string | null;
  follower_count: number | null;
  following_count: number | null;
  post_count: number | null;
  metadata: string | null;
  status: string;
  last_sync_at: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
  integration_connection_id?: string | null;
}

/** Row of `social_posts` as serialised by the backend. */
export interface SocialPost {
  id: string;
  project_id: string | null;
  organization_id: string | null;
  user_id: string | null;
  social_account_id: string | null;
  content_type: string;
  caption: string | null;
  /** JSON-encoded string[] */
  media_urls: string | null;
  /** JSON-encoded string[] */
  hashtags: string | null;
  /** JSON-encoded string[] */
  platforms: string;
  status: string;
  scheduled_for: string | null;
  published_at: string | null;
  category: string | null;
  platform_post_id: string | null;
  platform_url: string | null;
  publish_error: string | null;
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  engagement_rate: number;
  publish_attempt: number;
  created_at: string;
  updated_at: string;
}

/** `GET /api/admin/socials` payload. */
export interface SocialsPayload {
  accounts: SocialAccount[];
  /** Which platforms have OAuth credentials configured on the backend. */
  platforms: PlatformStatus[];
  /** Non-fatal problems (e.g. platform status endpoint unreachable). */
  warnings: string[];
}

export interface PlatformStatus {
  platform: string;
  configured: boolean;
}

/** `GET /api/admin/social-posts` payload. */
export interface PostsPayload {
  posts: SocialPost[];
  accounts: SocialAccount[];
}

// ── Platforms ────────────────────────────────────────────────────────────────

/** Platform vocabulary from `SocialPlatform` in social_account.rs. */
export const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
  x: "X / Twitter",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  threads: "Threads",
  bluesky: "Bluesky",
  pinterest: "Pinterest",
};

/** Tailwind class trio (border/bg/text) per platform, for chips and dots. */
export const PLATFORM_CLASSES: Record<string, string> = {
  instagram: "border-[#e1306c]/30 bg-[#e1306c]/10 text-[#f0709a]",
  linkedin: "border-[#0a66c2]/40 bg-[#0a66c2]/15 text-[#6cb0f0]",
  twitter: "border-white/20 bg-white/10 text-white/80",
  x: "border-white/20 bg-white/10 text-white/80",
  tiktok: "border-[#25f4ee]/30 bg-[#25f4ee]/10 text-[#25f4ee]",
  youtube: "border-[#ff0000]/30 bg-[#ff0000]/10 text-[#ff6b6b]",
  facebook: "border-[#1877f2]/35 bg-[#1877f2]/10 text-[#7cb0f7]",
  threads: "border-white/20 bg-white/10 text-white/75",
  bluesky: "border-[#0085ff]/30 bg-[#0085ff]/10 text-[#66b8ff]",
  pinterest: "border-[#e60023]/30 bg-[#e60023]/10 text-[#ff6673]",
};

export function platformLabel(p: string): string {
  return PLATFORM_LABELS[p.toLowerCase()] ?? p;
}

export function platformClass(p: string): string {
  return (
    PLATFORM_CLASSES[p.toLowerCase()] ??
    "border-white/15 bg-white/5 text-white/60"
  );
}

// ── Account status ───────────────────────────────────────────────────────────

/** `AccountStatus` in social_account.rs. */
export const ACCOUNT_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  expired: "Token expired",
  error: "Error",
  pending_auth: "Awaiting auth",
};

export function accountStatusClass(status: string): string {
  switch (status) {
    case "active":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "expired":
    case "error":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    case "pending_auth":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    default:
      return "border-white/15 bg-white/5 text-white/50";
  }
}

/**
 * Does this account need a human to re-run OAuth?
 *
 * True when the backend marked it expired/error/pending_auth, when it recorded
 * a `last_error`, or when `token_expires_at` is in the past. Token expiry is a
 * known recurring failure mode for this org's connectors.
 */
export function needsReconnect(account: SocialAccount): boolean {
  if (["expired", "error", "pending_auth"].includes(account.status)) return true;
  if (account.last_error) return true;
  if (account.token_expires_at) {
    const exp = Date.parse(account.token_expires_at);
    if (!Number.isNaN(exp) && exp <= Date.now()) return true;
  }
  return false;
}

/** Human explanation of why a reconnect is needed. */
export function reconnectReason(account: SocialAccount): string | null {
  if (!needsReconnect(account)) return null;
  if (account.status === "expired") return "Access token has expired.";
  if (account.status === "pending_auth")
    return "OAuth was started but never completed.";
  if (account.status === "error")
    return account.last_error || "The connector reported an error.";
  if (account.last_error) return account.last_error;
  return "Access token expiry date has passed.";
}

// ── Post status ──────────────────────────────────────────────────────────────

/** `PostStatus` in social_post.rs, snake_cased by serde. */
export const POST_STATUSES = [
  "draft",
  "pending_review",
  "approved",
  "scheduled",
  "publishing",
  "published",
  "failed",
  "cancelled",
] as const;

export type PostStatus = (typeof POST_STATUSES)[number];

export const POST_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  pending_review: "Pending review",
  approved: "Approved",
  scheduled: "Scheduled",
  publishing: "Publishing",
  published: "Published",
  failed: "Failed",
  cancelled: "Cancelled",
};

export function postStatusLabel(s: string): string {
  return POST_STATUS_LABELS[s] ?? s;
}

export function postStatusClass(s: string): string {
  switch (s) {
    case "published":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "scheduled":
      return "border-[#ae904c]/40 bg-[#ae904c]/10 text-[#d3b878]";
    case "publishing":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    case "approved":
      return "border-violet-400/30 bg-violet-400/10 text-violet-300";
    case "pending_review":
      return "border-amber-400/30 bg-amber-400/10 text-amber-300";
    case "failed":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    case "cancelled":
      return "border-white/10 bg-white/5 text-white/35";
    default:
      return "border-white/15 bg-white/5 text-white/55";
  }
}

/**
 * The backend enforces a status FSM in `SocialPost::transition_status`
 * (crates/db/src/models/social_post.rs). Mirroring it here means the UI only
 * ever offers transitions the backend will accept — anything else 400s.
 */
export const STATUS_TRANSITIONS: Record<string, string[]> = {
  draft: ["pending_review", "cancelled"],
  pending_review: ["approved", "draft", "cancelled"],
  approved: ["scheduled", "draft", "cancelled"],
  scheduled: ["approved", "cancelled"],
  failed: ["draft", "scheduled"],
  // publishing / published / cancelled are terminal — the backend allows no
  // transitions out of them.
};

export function allowedTransitions(status: string): string[] {
  return STATUS_TRANSITIONS[status] ?? [];
}

// ── Field decoding ───────────────────────────────────────────────────────────

/** Several post columns hold JSON-encoded arrays as TEXT. Decode defensively. */
export function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];
  if (!trimmed.startsWith("[")) {
    // Some legacy rows store a bare comma-separated list.
    return trimmed
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  try {
    const parsed: unknown = JSON.parse(trimmed);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string")
      : [];
  } catch {
    return [];
  }
}

/** Platforms a post targets, falling back to its account's platform. */
export function postPlatforms(
  post: SocialPost,
  accounts: SocialAccount[]
): string[] {
  const listed = parseJsonArray(post.platforms);
  if (listed.length) return listed;
  const account = accounts.find((a) => a.id === post.social_account_id);
  return account ? [account.platform] : [];
}

/** The moment a post belongs to on a calendar: published time, else schedule. */
export function postTimestamp(post: SocialPost): string | null {
  return post.published_at ?? post.scheduled_for ?? null;
}

// ── Formatting ───────────────────────────────────────────────────────────────

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "never";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "never";
  const diff = Date.now() - t;
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return diff > 0 ? `${mins}m ago` : `in ${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return diff > 0 ? `${hours}h ago` : `in ${hours}h`;
  const days = Math.round(hours / 24);
  if (days < 30) return diff > 0 ? `${days}d ago` : `in ${days}d`;
  const months = Math.round(days / 30);
  return diff > 0 ? `${months}mo ago` : `in ${months}mo`;
}

/** Truncate a caption for a preview line without cutting mid-word if avoidable. */
export function previewText(caption: string | null, max = 90): string {
  if (!caption) return "";
  const flat = caption.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  return `${flat.slice(0, max).trimEnd()}…`;
}
