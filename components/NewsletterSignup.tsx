"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getAttribution } from "@/lib/attribution";
import {
  identifyLead,
  trackFormFailed,
  trackFormStart,
  trackFormSubmit,
} from "@/lib/analytics";

// Newsletter capture → dashboard CRM (funnel: "newsletter") via /api/lead.
export default function NewsletterSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [started, setStarted] = useState(false);
  const pathname = usePathname();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          funnel: "newsletter",
          sourcePage: pathname || "/",
          subject: "Newsletter signup",
          attribution: getAttribution(),
        }),
      });
      if (res.ok) {
        identifyLead(email);
        trackFormSubmit("newsletter", { source_page: pathname || "/" });
      } else {
        trackFormFailed("newsletter", `http_${res.status}`, {
          source_page: pathname || "/",
        });
      }
      setStatus(res.ok ? "done" : "error");
    } catch {
      trackFormFailed("newsletter", "network_error", {
        source_page: pathname || "/",
      });
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="text-sm text-[#ae904c]">
        You&apos;re on the list. Watch for the next dispatch.
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      onFocusCapture={() => {
        if (started) return;
        setStarted(true);
        trackFormStart("newsletter", { source_page: pathname || "/" });
      }}
      className={compact ? "flex gap-2" : "flex flex-col sm:flex-row gap-3"}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-[#ae904c]/30 text-white/90
                   placeholder:text-white/30 text-sm focus:outline-none focus:border-[#ae904c]/70"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="px-5 py-2.5 rounded-lg bg-[#ae904c]/15 border border-[#ae904c]/40 text-[#ae904c]
                   text-sm uppercase tracking-wider hover:bg-[#ae904c]/25 transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Joining…" : "Join the List"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 self-center">Something went wrong — try again.</p>
      )}
    </form>
  );
}
