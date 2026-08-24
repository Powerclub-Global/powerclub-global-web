"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  RotateCw,
  X,
} from "lucide-react";

import {
  EmptyBlock,
  ErrorBlock,
  LoadingBlock,
  NotePanel,
  PlatformChip,
  StatTile,
  StatusChip,
} from "@/components/admin/SocialUI";
import {
  allowedTransitions,
  formatDateTime,
  formatTime,
  parseJsonArray,
  postPlatforms,
  postStatusLabel,
  postTimestamp,
  previewText,
  type PostsPayload,
  type SocialAccount,
  type SocialPost,
} from "@/lib/admin/social";
import { useAdminData } from "@/lib/admin/useAdminData";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Local-date key (`YYYY-MM-DD`) for grouping posts into calendar cells. */
function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** The 6x7 grid of days covering `month`, padded out to whole weeks. */
function monthGrid(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

/** ISO instant -> the `YYYY-MM-DDTHH:mm` a datetime-local input expects. */
function toLocalInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate()
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function ContentCalendarClient() {
  const { data, loading, error, reload } =
    useAdminData<PostsPayload>("/api/admin/social-posts");
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const byDay = useMemo(() => {
    const map = new Map<string, SocialPost[]>();
    if (!data) return map;
    for (const post of data.posts) {
      const ts = postTimestamp(post);
      if (!ts) continue;
      const d = new Date(ts);
      if (Number.isNaN(d.getTime())) continue;
      const key = dayKey(d);
      const bucket = map.get(key);
      if (bucket) bucket.push(post);
      else map.set(key, [post]);
    }
    for (const bucket of map.values()) {
      bucket.sort((a, b) => {
        const at = Date.parse(postTimestamp(a) ?? a.created_at);
        const bt = Date.parse(postTimestamp(b) ?? b.created_at);
        return at - bt;
      });
    }
    return map;
  }, [data]);

  const unscheduled = useMemo(
    () => (data ? data.posts.filter((p) => !postTimestamp(p)) : []),
    [data]
  );

  const selected = useMemo(
    () => data?.posts.find((p) => p.id === selectedId) ?? null,
    [data, selectedId]
  );

  const goMonth = useCallback((delta: number) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  }, []);

  if (loading) return <LoadingBlock label="Loading content calendar…" />;

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorBlock message={error} />
        <button
          type="button"
          onClick={reload}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white"
        >
          <RotateCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    );
  }

  if (!data) return null;

  const posts = data.posts;
  const scheduledCount = posts.filter((p) => p.status === "scheduled").length;
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const needsReview = posts.filter(
    (p) => p.status === "pending_review" || p.status === "draft"
  ).length;

  const days = monthGrid(month);
  const todayKey = dayKey(new Date());
  const monthLabel = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const inMonthCount = days.filter(
    (d) => d.getMonth() === month.getMonth() && byDay.has(dayKey(d))
  ).length;

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Total posts" value={posts.length} hint="all time" />
        <StatTile label="Scheduled" value={scheduledCount} hint="queued" />
        <StatTile label="Published" value={publishedCount} hint="live" />
        <StatTile
          label="In progress"
          value={needsReview}
          hint="draft or pending review"
        />
      </section>

      {posts.length === 0 ? (
        <EmptyBlock title="Nothing on the calendar yet.">
          The dashboard&apos;s <code>social_posts</code> table has no rows for
          the Powerclub Global org. Posts drafted or scheduled in the dashboard
          appear here automatically — this page reads the same table.
        </EmptyBlock>
      ) : (
        <>
          <section>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goMonth(-1)}
                  aria-label="Previous month"
                  className="rounded-lg border border-white/10 p-1.5 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goMonth(1)}
                  aria-label="Next month"
                  className="rounded-lg border border-white/10 p-1.5 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <h2 className="ml-2 text-base font-semibold text-white">
                  {monthLabel}
                </h2>
                <span className="ml-2 text-xs text-white/30">
                  {inMonthCount === 0
                    ? "no posts this month"
                    : `${inMonthCount} ${inMonthCount === 1 ? "day" : "days"} with posts`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-white/55 transition-colors hover:border-[#ae904c]/50 hover:text-white"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Today
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-7 border-b border-white/10 bg-white/[0.03]">
                {WEEKDAYS.map((w) => (
                  <div
                    key={w}
                    className="px-2 py-2 text-center text-[11px] uppercase tracking-wider text-white/35"
                  >
                    {w}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {days.map((d) => {
                  const key = dayKey(d);
                  const dayPosts = byDay.get(key) ?? [];
                  const outside = d.getMonth() !== month.getMonth();
                  const isToday = key === todayKey;
                  return (
                    <div
                      key={key}
                      className={`min-h-[104px] border-b border-r border-white/5 p-1.5 last:border-r-0 ${
                        outside ? "bg-black/20" : ""
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between px-0.5">
                        <span
                          className={`text-[11px] tabular-nums ${
                            isToday
                              ? "rounded bg-[#ae904c] px-1.5 py-0.5 font-semibold text-black"
                              : outside
                                ? "text-white/20"
                                : "text-white/45"
                          }`}
                        >
                          {d.getDate()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {dayPosts.slice(0, 3).map((p) => (
                          <CalendarEntry
                            key={p.id}
                            post={p}
                            accounts={data.accounts}
                            onOpen={() => setSelectedId(p.id)}
                          />
                        ))}
                        {dayPosts.length > 3 ? (
                          <button
                            type="button"
                            onClick={() => setSelectedId(dayPosts[3].id)}
                            className="w-full px-1 text-left text-[10px] text-white/35 hover:text-white/70"
                          >
                            +{dayPosts.length - 3} more
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {unscheduled.length > 0 ? (
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/55">
                Not on the calendar ({unscheduled.length})
              </h2>
              <p className="mb-3 text-xs text-white/35">
                These posts have neither a scheduled time nor a publish time, so
                they have no day to sit on.
              </p>
              <ul className="divide-y divide-white/5 rounded-xl border border-white/10">
                {unscheduled.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className="flex w-full flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
                    >
                      <StatusChip status={p.status} />
                      {postPlatforms(p, data.accounts).map((pl) => (
                        <PlatformChip key={pl} platform={pl} />
                      ))}
                      <span className="min-w-0 flex-1 truncate text-sm text-white/65">
                        {previewText(p.caption, 100) || "No caption"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}

      <NotePanel>
        Rescheduling and status changes write straight to the dashboard&apos;s{" "}
        <code>social_posts</code> table, which the publisher loop reads — so a
        change here changes what actually goes out. The backend&apos;s update
        endpoint cannot clear a schedule back to empty, and it enforces a fixed
        status flow, so only the transitions it accepts are offered. Editing
        caption or media is not exposed here; do that in the dashboard.
      </NotePanel>

      {selected ? (
        <PostDetail
          post={selected}
          accounts={data.accounts}
          onClose={() => setSelectedId(null)}
          onSaved={() => {
            setSelectedId(null);
            reload();
          }}
        />
      ) : null}
    </div>
  );
}

function CalendarEntry({
  post,
  accounts,
  onOpen,
}: {
  post: SocialPost;
  accounts: SocialAccount[];
  onOpen: () => void;
}) {
  const platforms = postPlatforms(post, accounts);
  const ts = postTimestamp(post);
  return (
    <button
      type="button"
      onClick={onOpen}
      title={`${postStatusLabel(post.status)} · ${formatDateTime(ts)}`}
      className="block w-full rounded border border-white/10 bg-white/[0.04] px-1.5 py-1 text-left transition-colors hover:border-[#ae904c]/50 hover:bg-white/[0.08]"
    >
      <span className="flex items-center gap-1">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${statusDot(post.status)}`}
        />
        <span className="truncate text-[10px] tabular-nums text-white/45">
          {formatTime(ts)}
        </span>
        {platforms[0] ? (
          <span className="truncate text-[10px] text-white/35">
            {platforms[0]}
          </span>
        ) : null}
      </span>
      <span className="mt-0.5 block truncate text-[11px] leading-tight text-white/70">
        {previewText(post.caption, 40) || "No caption"}
      </span>
    </button>
  );
}

function statusDot(status: string): string {
  switch (status) {
    case "published":
      return "bg-emerald-400";
    case "scheduled":
      return "bg-[#ae904c]";
    case "publishing":
      return "bg-sky-400";
    case "approved":
      return "bg-violet-400";
    case "pending_review":
      return "bg-amber-400";
    case "failed":
      return "bg-red-500";
    case "cancelled":
      return "bg-white/20";
    default:
      return "bg-white/40";
  }
}

function PostDetail({
  post,
  accounts,
  onClose,
  onSaved,
}: {
  post: SocialPost;
  accounts: SocialAccount[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [when, setWhen] = useState(() => toLocalInputValue(post.scheduled_for));
  const [saving, setSaving] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const account = accounts.find((a) => a.id === post.social_account_id);
  const media = parseJsonArray(post.media_urls);
  const hashtags = parseJsonArray(post.hashtags);
  const transitions = allowedTransitions(post.status);
  const originalWhen = toLocalInputValue(post.scheduled_for);
  const terminal = post.status === "published" || post.status === "publishing";

  async function patch(body: Record<string, unknown>, busyLabel: string) {
    setSaving(busyLabel);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/social-posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, current_status: post.status }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login?next=/admin/content-calendar";
        return;
      }
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        const message =
          payload && typeof payload === "object" && "error" in payload
            ? String((payload as { error: unknown }).error)
            : "The change could not be saved.";
        setSaveError(message);
        return;
      }
      onSaved();
    } catch {
      setSaveError("Network error — the change was not saved.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Post detail"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c0d11] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <StatusChip status={post.status} />
            {postPlatforms(post, accounts).map((pl) => (
              <PlatformChip key={pl} platform={pl} />
            ))}
            {account?.username ? (
              <span className="text-xs text-white/35">@{account.username}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-lg p-1 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <div>
            <h3 className="mb-2 text-[11px] uppercase tracking-wider text-white/35">
              Content
            </h3>
            {post.caption ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white/80">
                {post.caption}
              </p>
            ) : (
              <p className="text-sm text-white/30">
                This post has no caption saved.
              </p>
            )}
            {hashtags.length > 0 ? (
              <p className="mt-2 text-xs text-[#ae904c]">
                {hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}
              </p>
            ) : null}
            {media.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {media.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 break-all text-xs text-white/45 transition-colors hover:text-[#ae904c]"
                    >
                      {url}
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-xs sm:grid-cols-3">
            <Field label="Type" value={post.content_type || "—"} />
            <Field label="Category" value={post.category || "—"} />
            <Field
              label="Scheduled"
              value={formatDateTime(post.scheduled_for)}
            />
            <Field label="Published" value={formatDateTime(post.published_at)} />
            <Field label="Created" value={formatDateTime(post.created_at)} />
            <Field
              label="Publish attempts"
              value={String(post.publish_attempt)}
            />
          </dl>

          {post.status === "published" ? (
            <dl className="grid grid-cols-3 gap-x-6 gap-y-2 border-t border-white/10 pt-4 text-xs sm:grid-cols-4">
              <Field
                label="Impressions"
                value={post.impressions.toLocaleString()}
              />
              <Field label="Reach" value={post.reach.toLocaleString()} />
              <Field label="Likes" value={post.likes.toLocaleString()} />
              <Field label="Comments" value={post.comments.toLocaleString()} />
              <Field label="Shares" value={post.shares.toLocaleString()} />
              <Field label="Saves" value={post.saves.toLocaleString()} />
              <Field label="Clicks" value={post.clicks.toLocaleString()} />
              <Field
                label="Engagement"
                value={`${(post.engagement_rate * 100).toFixed(2)}%`}
              />
            </dl>
          ) : null}

          {post.publish_error ? (
            <p className="break-words rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2.5 text-xs leading-relaxed text-red-300">
              {post.publish_error}
            </p>
          ) : null}

          {post.platform_url ? (
            <a
              href={post.platform_url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-[#ae904c]"
            >
              View live post
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>

        <div className="space-y-4 border-t border-white/10 bg-white/[0.02] px-6 py-5">
          <h3 className="text-[11px] uppercase tracking-wider text-white/35">
            Actions
          </h3>

          {terminal ? (
            <p className="text-xs text-white/40">
              A {postStatusLabel(post.status).toLowerCase()} post cannot be
              rescheduled or moved to another status — the backend&apos;s status
              flow has no transitions out of it.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-end gap-3">
                <label className="flex flex-col gap-1 text-xs text-white/45">
                  Scheduled time
                  <input
                    type="datetime-local"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                    className="rounded-lg border border-white/15 bg-black/40 px-2.5 py-1.5 text-sm text-white outline-none transition-colors focus:border-[#ae904c]"
                  />
                </label>
                <button
                  type="button"
                  disabled={
                    !when || when === originalWhen || saving !== null
                  }
                  onClick={() =>
                    patch(
                      { scheduled_for: new Date(when).toISOString() },
                      "schedule"
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#ae904c]/40 bg-[#ae904c]/10 px-3 py-1.5 text-xs font-medium text-[#d3b878] transition-colors hover:border-[#ae904c] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving === "schedule" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : null}
                  Save time
                </button>
              </div>

              {transitions.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-white/45">Move to:</span>
                  {transitions.map((next) => (
                    <button
                      key={next}
                      type="button"
                      disabled={saving !== null}
                      onClick={() => patch({ status: next }, next)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {saving === next ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : null}
                      {postStatusLabel(next)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-white/40">
                  The backend allows no status transitions out of{" "}
                  {postStatusLabel(post.status).toLowerCase()}.
                </p>
              )}
            </>
          )}

          {saveError ? (
            <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {saveError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-white/30">
        {label}
      </dt>
      <dd className="mt-0.5 text-white/70">{value}</dd>
    </div>
  );
}
