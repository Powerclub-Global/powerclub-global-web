import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import {
  fetchBoardEngagements,
  fetchConferenceBoards,
  fetchDiscoveryCalls,
  fetchLeads,
} from "@/lib/admin/sources";
import {
  effectiveStatus,
  STATUS_ACCENTS,
  STATUS_LABELS,
  STATUS_ORDER,
} from "@/lib/admin/engagement";
import type { EngagementStatus } from "@/lib/admin/types";

/**
 * Compact stat row at the top of the Overview.
 *
 * Every tile is derived from a live endpoint. When an endpoint is unreachable
 * the tile says so instead of rendering a zero — a zero here is
 * indistinguishable from "no records", which would quietly mislead.
 *
 * Deliberately no website-analytics tiles: PostHog is not wired up, so there is
 * no honest number to show.
 */
export default async function AdminStats() {
  const [discovery, leads, boards] = await Promise.all([
    fetchDiscoveryCalls(),
    fetchLeads(),
    fetchConferenceBoards(),
  ]);

  // Conference statuses need one engagements call per board. Boards are few
  // (one per conference), and they run concurrently.
  const boardList = boards.kind === "ok" ? (boards.data ?? []) : [];
  const engagementResults = await Promise.all(
    boardList.map((b) => fetchBoardEngagements(b.board_id))
  );

  const statusCounts = new Map<EngagementStatus, number>();
  let conferenceTotal = 0;
  let conferenceReadable = boards.kind === "ok";
  for (const result of engagementResults) {
    if (result.kind !== "ok") {
      conferenceReadable = false;
      continue;
    }
    for (const row of result.data ?? []) {
      const s = effectiveStatus(row.status);
      statusCounts.set(s, (statusCounts.get(s) ?? 0) + 1);
      conferenceTotal += 1;
    }
  }

  const now = Date.now();
  const upcoming =
    discovery.kind === "ok"
      ? (discovery.data ?? []).filter((b) => {
          const t = new Date(b.scheduledAt).getTime();
          return !Number.isNaN(t) && t >= now;
        }).length
      : null;
  const discoveryTotal = discovery.kind === "ok" ? (discovery.data ?? []).length : null;

  const leadTotal = leads.contacts.kind === "ok" ? leads.leads.length : null;

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          href="/admin/discovery-calls"
          label="Discovery calls"
          value={upcoming}
          suffix={
            discoveryTotal !== null ? `upcoming · ${discoveryTotal} total` : undefined
          }
          unavailable={discovery.kind !== "ok"}
          unavailableNote={unavailableNote(discovery.kind)}
        />
        <StatTile
          href="/admin/leads"
          label="Leads captured"
          value={leadTotal}
          suffix={
            leadTotal !== null && !leads.founderCallsAvailable
              ? "excludes founder calls"
              : "all sources"
          }
          unavailable={leads.contacts.kind !== "ok"}
          unavailableNote={unavailableNote(leads.contacts.kind)}
        />
        <StatTile
          href="/admin/conference-leads"
          label="Conference leads"
          value={conferenceReadable ? conferenceTotal : null}
          suffix={
            conferenceReadable
              ? `across ${boardList.length} board${boardList.length === 1 ? "" : "s"}`
              : undefined
          }
          unavailable={!conferenceReadable}
          unavailableNote={unavailableNote(boards.kind)}
        />
      </div>

      {conferenceReadable && conferenceTotal > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5">
          {STATUS_ORDER.filter((s) => (statusCounts.get(s) ?? 0) > 0).map((s) => (
            <span key={s} className="flex items-center gap-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${STATUS_ACCENTS[s]}`} />
              <span className="text-white/50">{STATUS_LABELS[s]}</span>
              <span className="font-semibold tabular-nums text-white/85">
                {statusCounts.get(s)}
              </span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function unavailableNote(kind: string): string {
  if (kind === "auth") return "Session expired";
  if (kind === "unavailable") return "Endpoint not on this backend build";
  return "Backend unavailable";
}

function StatTile({
  href,
  label,
  value,
  suffix,
  unavailable,
  unavailableNote: note,
}: {
  href: string;
  label: string;
  value: number | null;
  suffix?: string;
  unavailable: boolean;
  unavailableNote: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#ae904c]/40"
    >
      <div className="text-[0.65rem] uppercase tracking-wider text-white/35">
        {label}
      </div>
      {unavailable || value === null ? (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-300/80">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {note}
        </div>
      ) : (
        <>
          <div className="mt-1 text-3xl font-bold leading-none tabular-nums">
            {value}
          </div>
          {suffix && <div className="mt-1.5 text-xs text-white/40">{suffix}</div>}
        </>
      )}
    </Link>
  );
}
