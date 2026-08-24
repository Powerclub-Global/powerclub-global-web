"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

import {
  accountStatusClass,
  platformClass,
  platformLabel,
  postStatusClass,
  postStatusLabel,
  ACCOUNT_STATUS_LABELS,
} from "@/lib/admin/social";

/**
 * Presentational atoms shared by the Socials and Content Calendar modules.
 * Kept in one place so both pages read as the same product.
 */

export function PlatformChip({
  platform,
  className = "",
}: {
  platform: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none ${platformClass(
        platform
      )} ${className}`}
    >
      {platformLabel(platform)}
    </span>
  );
}

export function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none ${postStatusClass(
        status
      )}`}
    >
      {postStatusLabel(status)}
    </span>
  );
}

export function AccountStatusChip({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none ${accountStatusClass(
        status
      )}`}
    >
      {ACCOUNT_STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "warn";
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        tone === "warn"
          ? "border-red-500/25 bg-red-500/[0.06]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <p className="text-[11px] uppercase tracking-wider text-white/40">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-semibold tabular-nums ${
          tone === "warn" ? "text-red-300" : "text-white"
        }`}
      >
        {value}
      </p>
      {hint ? <p className="mt-0.5 text-xs text-white/35">{hint}</p> : null}
    </div>
  );
}

export function LoadingBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-16 text-sm text-white/40">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function ErrorBlock({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function EmptyBlock({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center">
      <p className="text-sm font-medium text-white/70">{title}</p>
      {children ? (
        <div className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/40">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A muted explanatory panel. Used to state plainly what the backend does and
 * does not let this page do, rather than implying a capability that isn't there.
 */
export function NotePanel({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-white/40">
      {children}
    </p>
  );
}
