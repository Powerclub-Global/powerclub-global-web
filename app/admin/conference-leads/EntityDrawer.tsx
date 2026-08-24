"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Twitter,
  UserPlus,
  X,
  Youtube,
} from "lucide-react";

import Avatar from "./Avatar";
import { ErrorState } from "../_components/States";
import { ENGAGEMENT_STATUSES } from "@/lib/admin/types";
import { STATUS_LABELS, STATUS_PILLS } from "@/lib/admin/engagement";
import { humanize } from "@/lib/admin/format";
import type {
  BoardEngagementRow,
  EngagementStatus,
  EntityDetail,
} from "@/lib/admin/types";

type Saving = "idle" | "status" | "promote";

/**
 * Detail panel for one conference entity.
 *
 * Opens over the board rather than navigating, so the operator keeps their
 * place in a ~200-card Kanban. The entity detail is fetched on open — one
 * request for one entity, not per card.
 */
export default function EntityDrawer({
  row,
  status,
  onClose,
  onStatusChange,
}: {
  row: BoardEngagementRow;
  status: EngagementStatus;
  onClose: () => void;
  onStatusChange: (next: EngagementStatus) => void;
}) {
  const [entity, setEntity] = useState<EntityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [saving, setSaving] = useState<Saving>("idle");
  const [actionError, setActionError] = useState<string | null>(null);
  const [promoted, setPromoted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadError(null);
    setEntity(null);

    (async () => {
      try {
        const res = await fetch(`/api/admin/entities/${row.entityId}`, {
          signal: controller.signal,
        });
        if (res.status === 401) {
          window.location.href = "/admin/login?next=/admin/conference-leads";
          return;
        }
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          setLoadError(body?.error ?? "Could not load this entity.");
          return;
        }
        setEntity(body.data as EntityDetail);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setLoadError("Network error loading this entity.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [row.entityId]);

  // Escape closes the panel — expected for anything modal-shaped.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function changeStatus(next: EngagementStatus) {
    if (next === status) return;
    setSaving("status");
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/entities/${row.entityId}/engagement`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login?next=/admin/conference-leads";
        return;
      }
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setActionError(body?.error ?? "Could not update the status.");
        return;
      }
      onStatusChange(next);
    } catch {
      setActionError("Network error updating the status.");
    } finally {
      setSaving("idle");
    }
  }

  async function promote() {
    setSaving("promote");
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/entities/${row.entityId}/promote`, {
        method: "POST",
      });
      if (res.status === 401) {
        window.location.href = "/admin/login?next=/admin/conference-leads";
        return;
      }
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setActionError(body?.error ?? "Could not promote this entity.");
        return;
      }
      setPromoted(true);
      // The backend marks the engagement converted as part of promoting.
      onStatusChange("converted");
    } catch {
      setActionError("Network error promoting this entity.");
    } finally {
      setSaving("idle");
    }
  }

  const links = entity?.externalIds;
  const completeness = entity ? Math.round((entity.dataCompleteness ?? 0) * 100) : null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${row.entityName} details`}
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-[#0b0c10] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start gap-3 border-b border-white/10 bg-[#0b0c10]/95 px-5 py-4 backdrop-blur">
          <Avatar url={row.entityPhotoUrl} name={row.entityName} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-bold leading-tight">
              {row.entityName}
            </h2>
            {row.entityTitle && (
              <p className="mt-0.5 truncate text-xs text-white/55">{row.entityTitle}</p>
            )}
            {row.entityCompany && (
              <p className="truncate text-xs text-white/35">{row.entityCompany}</p>
            )}
            <span
              className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold ${STATUS_PILLS[status]}`}
            >
              {STATUS_LABELS[status]}
            </span>
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

        <div className="space-y-6 px-5 py-5">
          {/* Actions first — this panel exists to move a lead forward. */}
          <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <label className="block">
              <span className="text-[0.65rem] uppercase tracking-wider text-white/40">
                Engagement status
              </span>
              <select
                value={status}
                disabled={saving !== "idle"}
                onChange={(e) => changeStatus(e.target.value as EngagementStatus)}
                className="mt-1.5 w-full rounded-lg border border-white/15 bg-[#0d0e12] px-3 py-2 text-sm text-white focus:border-[#ae904c]/50 focus:outline-none disabled:opacity-50"
              >
                {ENGAGEMENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={promote}
              disabled={saving !== "idle" || promoted}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ae904c] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#c4a55c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving === "promote" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : promoted ? (
                <BadgeCheck className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {promoted ? "Promoted to CRM" : "Promote to CRM"}
            </button>

            {saving === "status" && (
              <p className="text-xs text-white/40">Saving status…</p>
            )}
            {actionError && <ErrorState message={actionError} />}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading profile…
            </div>
          )}

          {loadError && <ErrorState message={loadError} />}

          {entity && (
            <>
              <Field label="Appearance">{humanize(row.appearanceType)}</Field>

              {entity.bio && (
                <div>
                  <SectionLabel>Bio</SectionLabel>
                  <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                    {entity.bio}
                  </p>
                </div>
              )}

              {links && (
                <div>
                  <SectionLabel>Links</SectionLabel>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <LinkChip href={links.linkedin} label="LinkedIn">
                      <Linkedin className="h-3.5 w-3.5" />
                    </LinkChip>
                    <LinkChip href={links.twitter} label="X / Twitter">
                      <Twitter className="h-3.5 w-3.5" />
                    </LinkChip>
                    <LinkChip href={links.website} label="Website">
                      <Globe className="h-3.5 w-3.5" />
                    </LinkChip>
                    <LinkChip href={links.youtube} label="YouTube">
                      <Youtube className="h-3.5 w-3.5" />
                    </LinkChip>
                    <LinkChip href={links.github} label="GitHub">
                      <Github className="h-3.5 w-3.5" />
                    </LinkChip>
                  </div>
                </div>
              )}

              {entity.socialProfiles && entity.socialProfiles.length > 0 && (
                <div>
                  <SectionLabel>Social reach</SectionLabel>
                  <ul className="mt-2 space-y-1.5">
                    {entity.socialProfiles.map((p) => (
                      <li
                        key={`${p.platform}-${p.handle}`}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="truncate text-white/70">
                          {humanize(p.platform)}
                          <span className="ml-1.5 text-white/35">@{p.handle}</span>
                        </span>
                        {typeof p.followers === "number" && (
                          <span className="shrink-0 tabular-nums text-white/50">
                            {p.followers.toLocaleString("en-US")}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entity.socialAnalysis?.topTopics?.length ? (
                <div>
                  <SectionLabel>Expertise</SectionLabel>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {entity.socialAnalysis.topTopics.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-xs text-white/65"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {completeness !== null && (
                <div>
                  <SectionLabel>Profile completeness</SectionLabel>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-[#ae904c] to-[#c9a96e] transition-all ${widthClass(
                          completeness
                        )}`}
                      />
                    </div>
                    <span className="shrink-0 text-xs tabular-nums text-white/50">
                      {completeness}%
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

/**
 * Completeness is a coarse signal, so it is bucketed to the nearest 10% and
 * mapped onto a static Tailwind class. This keeps the bar out of an inline
 * style object while still reflecting the value.
 */
function widthClass(pct: number): string {
  const bucket = Math.max(0, Math.min(10, Math.round(pct / 10)));
  return [
    "w-0",
    "w-[10%]",
    "w-[20%]",
    "w-[30%]",
    "w-[40%]",
    "w-[50%]",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
    "w-[90%]",
    "w-full",
  ][bucket];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[0.65rem] uppercase tracking-wider text-white/40">
      {children}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <p className="mt-1 text-sm text-white/80">{children}</p>
    </div>
  );
}

function LinkChip({
  href,
  label,
  children,
}: {
  href: string | null | undefined;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white"
    >
      {children}
      {label}
    </a>
  );
}
