"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  AlertTriangle,
  ExternalLink,
  Plug,
  RefreshCw,
  RotateCw,
} from "lucide-react";

import {
  AccountStatusChip,
  EmptyBlock,
  ErrorBlock,
  LoadingBlock,
  NotePanel,
  PlatformChip,
  StatTile,
  StatusChip,
} from "@/components/admin/SocialUI";
import {
  formatDateTime,
  formatRelative,
  needsReconnect,
  platformLabel,
  postPlatforms,
  postTimestamp,
  previewText,
  reconnectReason,
  type PostsPayload,
  type SocialAccount,
  type SocialPost,
  type SocialsPayload,
} from "@/lib/admin/social";
import { useAdminData } from "@/lib/admin/useAdminData";

/** How many recent posts the activity table shows. */
const RECENT_POSTS = 20;

export default function SocialsClient() {
  const accountsQuery = useAdminData<SocialsPayload>("/api/admin/socials");
  const postsQuery = useAdminData<PostsPayload>(
    `/api/admin/social-posts?limit=${RECENT_POSTS * 5}`
  );

  if (accountsQuery.loading) {
    return <LoadingBlock label="Loading connected accounts…" />;
  }

  if (accountsQuery.error) {
    return (
      <div className="space-y-4">
        <ErrorBlock message={accountsQuery.error} />
        <button
          type="button"
          onClick={accountsQuery.reload}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white"
        >
          <RotateCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    );
  }

  const data = accountsQuery.data;
  if (!data) return null;

  const accounts = data.accounts;
  const broken = accounts.filter(needsReconnect);
  const connectedPlatforms = new Set(accounts.map((a) => a.platform));
  const connectable = data.platforms.filter(
    (p) => p.configured && !connectedPlatforms.has(p.platform)
  );
  const unconfigured = data.platforms.filter((p) => !p.configured);

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Connected" value={accounts.length} hint="accounts" />
        <StatTile
          label="Need attention"
          value={broken.length}
          hint={broken.length ? "reconnect required" : "all healthy"}
          tone={broken.length ? "warn" : "default"}
        />
        <StatTile
          label="Followers"
          value={accounts
            .reduce((sum, a) => sum + (a.follower_count ?? 0), 0)
            .toLocaleString()}
          hint="across connected accounts"
        />
        <StatTile
          label="Available"
          value={connectable.length}
          hint="platforms ready to connect"
        />
      </section>

      {data.warnings.length > 0 ? (
        <div className="space-y-2">
          {data.warnings.map((w) => (
            <p
              key={w}
              className="flex items-start gap-2 rounded-lg border border-amber-400/25 bg-amber-400/[0.07] px-4 py-2.5 text-xs text-amber-200/80"
            >
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {w}
            </p>
          ))}
        </div>
      ) : null}

      {broken.length > 0 ? <ReconnectBanner accounts={broken} /> : null}

      <section>
        <SectionHeading
          title="Connected accounts"
          action={
            <button
              type="button"
              onClick={accountsQuery.reload}
              className="inline-flex items-center gap-1.5 text-xs text-white/45 transition-colors hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          }
        />
        {accounts.length === 0 ? (
          <EmptyBlock title="No social accounts are connected to this org yet.">
            Connect one below. The dashboard backend stores the connection
            against the Powerclub Global organization, so it is shared with the
            main dashboard.
          </EmptyBlock>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {accounts.map((a) => (
              <AccountCard key={a.id} account={a} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading title="Connect a platform" />
        {connectable.length === 0 && unconfigured.length === 0 ? (
          <EmptyBlock title="Platform availability is unknown.">
            The backend&apos;s platform-status endpoint could not be read, so
            this page cannot say which connectors have OAuth credentials.
          </EmptyBlock>
        ) : (
          <div className="space-y-3">
            {connectable.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {connectable.map((p) => (
                  <ConnectButton key={p.platform} platform={p.platform} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">
                Every platform with OAuth credentials configured is already
                connected.
              </p>
            )}
            {unconfigured.length > 0 ? (
              <NotePanel>
                Not configured on the backend (no client id/secret in its
                environment, so connecting is impossible from here):{" "}
                {unconfigured.map((p) => platformLabel(p.platform)).join(", ")}.
              </NotePanel>
            ) : null}
          </div>
        )}
      </section>

      <section>
        <SectionHeading
          title="Recent posts"
          action={
            <Link
              href="/admin/content-calendar"
              className="text-xs text-white/45 transition-colors hover:text-[#ae904c]"
            >
              Open calendar →
            </Link>
          }
        />
        <RecentPosts
          loading={postsQuery.loading}
          error={postsQuery.error}
          data={postsQuery.data}
        />
      </section>

      <NotePanel>
        This page is read-only apart from starting an OAuth connect. The
        dashboard backend exposes no endpoint for forcing an account metric
        sync, so &ldquo;last sync&rdquo; reflects whatever its own background
        jobs last recorded.
      </NotePanel>
    </div>
  );
}

function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/55">
        {title}
      </h2>
      {action}
    </div>
  );
}

function ConnectButton({
  platform,
  label,
}: {
  platform: string;
  label?: string;
}) {
  return (
    <a
      href={`/api/admin/socials/connect/${platform}`}
      className="inline-flex items-center gap-1.5 rounded-lg border border-[#ae904c]/40 bg-[#ae904c]/10 px-3 py-1.5 text-xs font-medium text-[#d3b878] transition-colors hover:border-[#ae904c] hover:bg-[#ae904c]/20 hover:text-white"
    >
      <Plug className="h-3.5 w-3.5" />
      {label ?? `Connect ${platformLabel(platform)}`}
    </a>
  );
}

function ReconnectBanner({ accounts }: { accounts: SocialAccount[] }) {
  return (
    <section className="rounded-xl border border-red-500/25 bg-red-500/[0.07] p-5">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-red-200">
            {accounts.length === 1
              ? "1 account needs reconnecting"
              : `${accounts.length} accounts need reconnecting`}
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-red-200/60">
            Publishing to these accounts will fail until someone re-runs OAuth.
            The flow finishes on the dashboard&apos;s own confirmation page —
            come back here afterwards and refresh.
          </p>
          <ul className="mt-4 space-y-3">
            {accounts.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-red-500/15 pt-3 first:border-0 first:pt-0"
              >
                <PlatformChip platform={a.platform} />
                <span className="text-sm text-white/80">
                  {a.username ? `@${a.username}` : a.display_name || a.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-xs text-red-200/60">
                  {reconnectReason(a)}
                </span>
                <ConnectButton platform={a.platform} label="Reconnect" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AccountCard({ account }: { account: SocialAccount }) {
  const attention = needsReconnect(account);
  return (
    <article
      className={`rounded-xl border p-4 ${
        attention
          ? "border-red-500/25 bg-red-500/[0.04]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <PlatformChip platform={account.platform} />
        <AccountStatusChip status={account.status} />
        {account.account_type ? (
          <span className="text-[11px] uppercase tracking-wider text-white/25">
            {account.account_type}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <p className="truncate text-base font-semibold text-white">
          {account.display_name || account.username || "Unnamed account"}
        </p>
        {account.username ? (
          <p className="truncate text-xs text-white/40">@{account.username}</p>
        ) : null}
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-xs">
        <Metric label="Followers" value={account.follower_count} />
        <Metric label="Following" value={account.following_count} />
        <Metric label="Posts" value={account.post_count} />
      </dl>

      <dl className="mt-3 space-y-1 text-xs">
        <Row label="Last sync" value={formatRelative(account.last_sync_at)} />
        <Row
          label="Token expires"
          value={
            account.token_expires_at
              ? `${formatDateTime(account.token_expires_at)} (${formatRelative(
                  account.token_expires_at
                )})`
              : "not recorded"
          }
        />
        <Row label="Connected" value={formatDateTime(account.created_at)} />
      </dl>

      {account.last_error ? (
        <p className="mt-3 break-words rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-red-300/85">
          {account.last_error}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {account.profile_url ? (
          <a
            href={account.profile_url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs text-white/45 transition-colors hover:text-[#ae904c]"
          >
            View profile
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
        <ConnectButton
          platform={account.platform}
          label={attention ? "Reconnect" : "Re-authorise"}
        />
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-white/30">
        {label}
      </dt>
      <dd className="tabular-nums text-white/80">
        {value == null ? "—" : value.toLocaleString()}
      </dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="shrink-0 text-white/30">{label}</dt>
      <dd className="truncate text-right text-white/60">{value}</dd>
    </div>
  );
}

function RecentPosts({
  loading,
  error,
  data,
}: {
  loading: boolean;
  error: string | null;
  data: PostsPayload | null;
}) {
  const rows = useMemo(() => {
    if (!data) return [] as SocialPost[];
    return [...data.posts]
      .sort((a, b) => {
        const at = postTimestamp(a) ?? a.created_at;
        const bt = postTimestamp(b) ?? b.created_at;
        return Date.parse(bt) - Date.parse(at);
      })
      .slice(0, RECENT_POSTS);
  }, [data]);

  if (loading) return <LoadingBlock label="Loading recent posts…" />;
  if (error) return <ErrorBlock message={error} />;
  if (!data) return null;

  if (rows.length === 0) {
    return (
      <EmptyBlock title="No posts recorded for this org yet.">
        Nothing has been drafted, scheduled or published against Powerclub
        Global in the dashboard&apos;s <code>social_posts</code> table. Posts
        created in the dashboard will appear here automatically.
      </EmptyBlock>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-wider text-white/35">
          <tr>
            <th className="px-4 py-2.5 font-medium">When</th>
            <th className="px-4 py-2.5 font-medium">Platform</th>
            <th className="px-4 py-2.5 font-medium">Status</th>
            <th className="px-4 py-2.5 font-medium">Content</th>
            <th className="px-4 py-2.5 text-right font-medium">Engagement</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((p) => {
            const when = postTimestamp(p) ?? p.created_at;
            return (
              <tr key={p.id} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 text-xs text-white/50">
                  {formatDateTime(when)}
                  <span className="block text-white/25">
                    {p.published_at ? "published" : "scheduled"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {postPlatforms(p, data.accounts).map((pl) => (
                      <PlatformChip key={pl} platform={pl} />
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusChip status={p.status} />
                </td>
                <td className="max-w-md px-4 py-3">
                  <p className="text-white/75">
                    {previewText(p.caption, 120) || (
                      <span className="text-white/25">No caption</span>
                    )}
                  </p>
                  {p.publish_error ? (
                    <p className="mt-1 text-[11px] text-red-300/80">
                      {p.publish_error}
                    </p>
                  ) : null}
                  {p.platform_url ? (
                    <a
                      href={p.platform_url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/35 transition-colors hover:text-[#ae904c]"
                    >
                      View on platform
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-xs tabular-nums text-white/50">
                  {p.impressions.toLocaleString()} impr.
                  <span className="block text-white/25">
                    {p.likes.toLocaleString()} likes ·{" "}
                    {p.comments.toLocaleString()} comments
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
