"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

const inputClass =
  "w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#ae904c] transition-colors";

/** Only same-site paths may be used as a post-login redirect target. */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/admin";
  if (value.startsWith("/admin/login")) return "/admin";
  return value;
}

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
        return;
      }
      const json = await res.json().catch(() => null);
      setError(json?.error || "Sign in failed. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#08090c] text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ae904c]/30 bg-[#ae904c]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#ae904c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ae904c]" />
            Powerclub Global · Internal
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">Admin Sign In</h1>
          <p className="mt-2 text-sm text-white/45">
            Use your PCG dashboard account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
        >
          <label
            htmlFor="admin-username"
            className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50"
          >
            Email or username
          </label>
          <input
            id="admin-username"
            name="username"
            type="text"
            autoComplete="username"
            required
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@powerclubglobal.com"
            className={inputClass}
          />

          <label
            htmlFor="admin-password"
            className="mb-2 mt-5 block text-xs font-medium uppercase tracking-wider text-white/50"
          >
            Password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputClass}
          />

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !username || !password}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ae904c] to-[#c9a96e] px-4 py-3 text-sm font-bold text-[#08090c] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Sign in
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/25">
          Admin access only. Activity is associated with your dashboard account.
        </p>
      </div>
    </main>
  );
}
