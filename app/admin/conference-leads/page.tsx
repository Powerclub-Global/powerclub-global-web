import type { Metadata } from "next";
import Link from "next/link";

import ConferenceBoard from "./ConferenceBoard";
import {
  AuthExpiredState,
  EmptyState,
  EndpointUnavailableState,
  ErrorState,
} from "../_components/States";
import { fetchBoardEngagements, fetchConferenceBoards } from "@/lib/admin/sources";
import type { BackendResult } from "@/lib/admin/api";
import type { BoardEngagementRow, ConferenceBoardSummary } from "@/lib/admin/types";

export const metadata: Metadata = {
  title: "Conference Leads",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Outreach Kanban over the speakers/sponsors on a conference board.
 *
 * The selected board lives in the URL (`?board=`) so a particular board is
 * linkable and survives a refresh. Both the board list and that board's
 * engagements are fetched server-side; the entire Kanban renders from one
 * engagements payload.
 */
export default async function ConferenceLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board: requestedBoard } = await searchParams;
  const boards = await fetchConferenceBoards();

  const header = (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">Conference Leads</h1>
      <p className="mt-1 text-sm text-white/45">
        Speaker and sponsor outreach, grouped by engagement status.
      </p>
    </div>
  );

  if (boards.kind === "auth") {
    return (
      <>
        {header}
        <AuthExpiredState next="/admin/conference-leads" />
      </>
    );
  }

  if (boards.kind === "unavailable") {
    return (
      <>
        {header}
        <EndpointUnavailableState path={boards.path} what="Conference boards" />
      </>
    );
  }

  if (boards.kind === "error") {
    return (
      <>
        {header}
        <ErrorState message={`Could not load conference boards: ${boards.message}`} />
      </>
    );
  }

  const boardList = boards.data ?? [];

  if (boardList.length === 0) {
    return (
      <>
        {header}
        <EmptyState
          title="No conference boards with entities yet."
          hint="A board appears here once its speakers or sponsors have been ingested."
        />
      </>
    );
  }

  // Fall back to the first board rather than showing nothing when the URL names
  // a board that no longer exists.
  const selected =
    boardList.find((b) => b.board_id === requestedBoard) ?? boardList[0];

  const engagements: BackendResult<BoardEngagementRow[]> =
    await fetchBoardEngagements(selected.board_id);

  return (
    <>
      {header}
      <BoardPicker boards={boardList} selectedId={selected.board_id} />

      {engagements.kind === "auth" && (
        <AuthExpiredState next="/admin/conference-leads" />
      )}

      {engagements.kind === "unavailable" && (
        <EndpointUnavailableState
          path={engagements.path}
          what={`Engagements for ${selected.conference_name}`}
        />
      )}

      {engagements.kind === "error" && (
        <ErrorState
          message={`Could not load leads for ${selected.conference_name}: ${engagements.message}`}
        />
      )}

      {engagements.kind === "ok" && (
        <ConferenceBoard
          rows={engagements.data ?? []}
          boardName={selected.conference_name}
        />
      )}
    </>
  );
}

function BoardPicker({
  boards,
  selectedId,
}: {
  boards: ConferenceBoardSummary[];
  selectedId: string;
}) {
  return (
    <nav aria-label="Conference boards" className="mb-6 flex flex-wrap gap-2">
      {boards.map((b) => {
        const active = b.board_id === selectedId;
        return (
          <Link
            key={b.board_id}
            href={`/admin/conference-leads?board=${encodeURIComponent(b.board_id)}`}
            aria-current={active ? "page" : undefined}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-[#ae904c]/50 bg-[#ae904c]/15 text-[#ae904c]"
                : "border-white/15 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            {b.conference_name}
            <span
              className={active ? "ml-2 text-[#ae904c]/70" : "ml-2 text-white/30"}
            >
              {b.entity_count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
