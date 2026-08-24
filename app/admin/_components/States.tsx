import Link from "next/link";
import { AlertTriangle, Inbox, Loader2, PlugZap } from "lucide-react";

/**
 * Shared loading / empty / error / auth panels for the admin modules.
 *
 * These are plain (non-client) components with no hooks, so they can be
 * rendered from both server and client components.
 */

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 py-16 text-sm text-white/40">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
      <Inbox className="mx-auto h-6 w-6 text-white/20" />
      <p className="mt-3 text-sm font-medium text-white/60">{title}</p>
      {hint && <p className="mx-auto mt-1 max-w-md text-xs text-white/35">{hint}</p>}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

/**
 * The admin session is gone. Middleware catches this on navigation, but a page
 * that was already open needs an explicit route back to the login screen.
 */
export function AuthExpiredState({ next }: { next: string }) {
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-6 py-8 text-center">
      <p className="text-sm font-medium text-amber-200">Your session expired.</p>
      <p className="mt-1 text-xs text-amber-200/70">
        The PCG dashboard no longer recognises this session.
      </p>
      <Link
        href={`/admin/login?next=${encodeURIComponent(next)}`}
        className="mt-4 inline-flex rounded-lg border border-amber-400/40 px-4 py-2 text-xs font-semibold text-amber-100 transition-colors hover:bg-amber-400/10"
      >
        Sign in again
      </Link>
    </div>
  );
}

/**
 * Honest state for an endpoint that exists in the backend source tree but is
 * not registered on the deployed binary. Rendering zeroes here would be a lie,
 * so the operator is told exactly what is missing and why.
 */
export function EndpointUnavailableState({
  path,
  what,
}: {
  path: string;
  what: string;
}) {
  return (
    <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] px-6 py-8">
      <div className="flex items-start gap-3">
        <PlugZap className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <div>
          <p className="text-sm font-semibold text-amber-100">
            {what} is not available on the connected backend.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-amber-200/70">
            <code className="rounded bg-black/30 px-1.5 py-0.5 font-mono">{path}</code>{" "}
            returned the dashboard&apos;s SPA fallback instead of JSON, which means
            the route is not registered on the running build. The handler exists in
            the backend repo — it needs a rebuild and redeploy of the PCG dashboard
            before this module can show data.
          </p>
          <p className="mt-2 text-xs text-amber-200/50">
            No numbers are shown above rather than showing zeroes, which would be
            indistinguishable from &ldquo;no records yet&rdquo;.
          </p>
        </div>
      </div>
    </div>
  );
}
