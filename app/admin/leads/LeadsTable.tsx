"use client";

import { useMemo, useState } from "react";
import { Linkedin, Search } from "lucide-react";

import { EmptyState } from "../_components/States";
import { formatDateUtc } from "@/lib/admin/format";
import {
  LEAD_SOURCE_CLASSES,
  LEAD_SOURCE_LABELS,
  type LeadRow,
  type LeadSource,
} from "@/lib/admin/leads";

/**
 * Every inbound from the marketing site in one table, filterable by source.
 *
 * Filtering is client-side: the whole set is already on the page (the backend
 * list is capped well below a size where paging would matter), so filtering
 * without a round-trip keeps it instant.
 */
export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [source, setSource] = useState<LeadSource | "all">("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const map = new Map<LeadSource, number>();
    for (const l of leads) map.set(l.source, (map.get(l.source) ?? 0) + 1);
    return map;
  }, [leads]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (source !== "all" && l.source !== source) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        (l.email ?? "").toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, source, query]);

  // Only offer filters for sources actually present, so the bar reflects reality.
  const availableSources = useMemo(
    () =>
      ([...counts.keys()] as LeadSource[]).sort(
        (a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0)
      ),
    [counts]
  );

  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads captured yet."
        hint="Contact-form, newsletter, discovery-call and founder-call submissions all land here."
      />
    );
  }

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="All"
            count={leads.length}
            active={source === "all"}
            onClick={() => setSource("all")}
          />
          {availableSources.map((s) => (
            <FilterChip
              key={s}
              label={LEAD_SOURCE_LABELS[s]}
              count={counts.get(s) ?? 0}
              active={source === s}
              onClick={() => setSource(s)}
            />
          ))}
        </div>

        <label className="relative ml-auto">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company…"
            aria-label="Search leads"
            className="w-64 rounded-lg border border-white/15 bg-white/[0.04] py-1.5 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-[#ae904c]/50 focus:outline-none"
          />
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-8 text-center text-sm text-white/35">
          No leads match this filter.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03]">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-[0.65rem] uppercase tracking-wider text-white/35">
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Company</th>
                <th className="px-4 py-3 text-left font-semibold">Source</th>
                <th className="px-4 py-3 text-left font-semibold">Attribution</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr key={l.id} className="border-t border-white/10 align-top">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      {l.name}
                      {l.linkedinUrl && (
                        <a
                          href={l.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${l.name} on LinkedIn`}
                          className="text-white/30 transition-colors hover:text-[#ae904c]"
                        >
                          <Linkedin className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {l.email ? (
                      <a
                        href={`mailto:${l.email}`}
                        className="text-[#ae904c] hover:underline"
                      >
                        {l.email}
                      </a>
                    ) : (
                      <span className="text-white/25">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {l.company ?? <span className="text-white/25">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold ${
                        LEAD_SOURCE_CLASSES[l.source]
                      }`}
                    >
                      {LEAD_SOURCE_LABELS[l.source]}
                    </span>
                    {l.funnel && (
                      <div className="mt-1 text-xs text-white/35">{l.funnel}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {l.attribution ? (
                      <div className="space-y-0.5">
                        {l.attribution.utmSource && (
                          <div className="text-white/70">
                            {l.attribution.utmSource}
                            {l.attribution.utmMedium && (
                              <span className="text-white/35">
                                {" "}
                                / {l.attribution.utmMedium}
                              </span>
                            )}
                          </div>
                        )}
                        {l.attribution.utmCampaign && (
                          <div className="text-white/40">
                            {l.attribution.utmCampaign}
                          </div>
                        )}
                        {l.attribution.referrer && (
                          <div
                            className="max-w-[16rem] truncate text-white/30"
                            title={l.attribution.referrer}
                          >
                            ref: {l.attribution.referrer}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/25">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/70">{l.status}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-white/40">
                    {formatDateUtc(l.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs text-white/30">
        Showing {visible.length} of {leads.length} leads.
      </p>
    </section>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-[#ae904c]/50 bg-[#ae904c]/15 text-[#ae904c]"
          : "border-white/15 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
      }`}
    >
      {label}
      <span className={active ? "ml-1.5 text-[#ae904c]/70" : "ml-1.5 text-white/30"}>
        {count}
      </span>
    </button>
  );
}
