"use client";

import { useCallback, useMemo, useState } from "react";

import Avatar from "./Avatar";
import EntityDrawer from "./EntityDrawer";
import { EmptyState } from "../_components/States";
import {
  effectiveStatus,
  STATUS_ACCENTS,
  STATUS_LABELS,
  STATUS_ORDER,
} from "@/lib/admin/engagement";
import type { BoardEngagementRow, EngagementStatus } from "@/lib/admin/types";

/**
 * Kanban of every speaker/sponsor entity on a conference board, grouped by
 * outreach status.
 *
 * Performance note: the board can carry ~200 entities. Everything rendered here
 * comes from the single `/conference-boards/:id/engagements` payload the server
 * already fetched — cards never fetch individually. Only opening the drawer
 * costs a request, and that is one request for one entity.
 */
export default function ConferenceBoard({
  rows,
  boardName,
}: {
  rows: BoardEngagementRow[];
  boardName: string;
}) {
  // Local overlay of status changes, so a PATCH reflects immediately without
  // re-fetching the whole board.
  const [overrides, setOverrides] = useState<Record<string, EngagementStatus>>({});
  const [openEntityId, setOpenEntityId] = useState<string | null>(null);

  const statusOf = useCallback(
    (row: BoardEngagementRow): EngagementStatus =>
      overrides[row.entityId] ?? effectiveStatus(row.status),
    [overrides]
  );

  const columns = useMemo(() => {
    const grouped = new Map<EngagementStatus, BoardEngagementRow[]>(
      STATUS_ORDER.map((s) => [s, []])
    );
    for (const row of rows) {
      grouped.get(statusOf(row))?.push(row);
    }
    for (const list of grouped.values()) {
      list.sort((a, b) => a.entityName.localeCompare(b.entityName));
    }
    return STATUS_ORDER.map((status) => ({
      status,
      rows: grouped.get(status) ?? [],
    }));
  }, [rows, statusOf]);

  const openRow = rows.find((r) => r.entityId === openEntityId) ?? null;

  if (rows.length === 0) {
    return (
      <EmptyState
        title={`No entities on ${boardName}.`}
        hint="Speakers and sponsors appear here once the conference board has been researched and ingested."
      />
    );
  }

  return (
    <>
      <div className="-mx-6 overflow-x-auto px-6 pb-4">
        <div className="flex gap-4">
          {columns.map(({ status, rows: colRows }) => (
            <section
              key={status}
              aria-label={STATUS_LABELS[status]}
              className="flex w-64 shrink-0 flex-col"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${STATUS_ACCENTS[status]}`}
                  />
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-white/65">
                    {STATUS_LABELS[status]}
                  </h2>
                </div>
                <span className="text-xs tabular-nums text-white/30">
                  {colRows.length}
                </span>
              </div>

              <div className="flex-1 space-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2">
                {colRows.length === 0 ? (
                  <p className="px-2 py-6 text-center text-xs text-white/20">Empty</p>
                ) : (
                  colRows.map((row) => (
                    <EntityCard
                      key={row.entityId}
                      row={row}
                      onOpen={() => setOpenEntityId(row.entityId)}
                    />
                  ))
                )}
              </div>
            </section>
          ))}
        </div>
      </div>

      {openRow && (
        <EntityDrawer
          row={openRow}
          status={statusOf(openRow)}
          onClose={() => setOpenEntityId(null)}
          onStatusChange={(next) =>
            setOverrides((prev) => ({ ...prev, [openRow.entityId]: next }))
          }
        />
      )}
    </>
  );
}

function EntityCard({
  row,
  onOpen,
}: {
  row: BoardEngagementRow;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-start gap-2.5 rounded-lg border border-white/10 bg-[#0d0e12] px-2.5 py-2.5 text-left transition-colors hover:border-[#ae904c]/40 hover:bg-white/[0.04]"
    >
      <Avatar url={row.entityPhotoUrl} name={row.entityName} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium leading-tight">
          {row.entityName}
        </div>
        {row.entityTitle && (
          <div className="mt-0.5 truncate text-xs leading-tight text-white/45">
            {row.entityTitle}
          </div>
        )}
        {row.entityCompany && (
          <div className="mt-0.5 truncate text-xs leading-tight text-white/30">
            {row.entityCompany}
          </div>
        )}
      </div>
    </button>
  );
}
