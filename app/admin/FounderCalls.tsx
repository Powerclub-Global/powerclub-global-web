"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, Loader2 } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  track: string;
  message: string | null;
  created_at: string;
  confirmation_sent_at: string | null;
}

interface Slot {
  id: string;
  label: string;
  start_at: string;
  end_at: string;
  capacity: number;
  meet_url: string | null;
  cal_event_id: string | null;
}

interface SlotData {
  slot: Slot;
  booking_count: number;
  capacity: number;
  bookings: Booking[];
}

interface EventData {
  event: { title: string; slug: string };
  slots: SlotData[];
}

const TRACKS: Record<string, { label: string; className: string }> = {
  developer: {
    label: "Developer",
    className: "border-[#00d4ff]/30 bg-[#00d4ff]/10 text-[#00d4ff]",
  },
  investor: {
    label: "Investor",
    className: "border-[#ae904c]/30 bg-[#ae904c]/10 text-[#ae904c]",
  },
  both: {
    label: "Both",
    className: "border-[#a78bfa]/30 bg-[#a78bfa]/10 text-[#a78bfa]",
  },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default function FounderCalls() {
  const [data, setData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/sovereign-stack/admin");
        if (cancelled) return;
        if (res.status === 401) {
          // Session expired while the page was open.
          window.location.href = "/admin/login?next=/admin";
          return;
        }
        if (!res.ok) {
          setError("Could not load founder calls — is the PCG backend up?");
          return;
        }
        setData(await res.json());
      } catch {
        if (!cancelled) setError("Network error.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-16 text-sm text-white/40">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading founder calls…
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {error}
      </p>
    );
  }

  if (!data) return null;

  const totalRegistrations = data.slots.reduce(
    (sum, s) => sum + s.booking_count,
    0
  );

  return (
    <section>
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
        <h2 className="text-lg font-bold">{data.event.title}</h2>
        <p className="mt-1 text-sm text-white/45">
          {totalRegistrations} total registrations across {data.slots.length}{" "}
          sessions
        </p>
      </div>

      <div className="space-y-3">
        {data.slots.map((sw) => {
          const isExpanded = expandedSlot === sw.slot.id;
          const pct = sw.slot.capacity
            ? Math.min(100, Math.round((sw.booking_count / sw.slot.capacity) * 100))
            : 0;

          return (
            <div
              key={sw.slot.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setExpandedSlot(isExpanded ? null : sw.slot.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0">
                  <div className="truncate font-semibold">{sw.slot.label}</div>
                  <div className="mt-0.5 text-xs text-white/40">
                    {formatTime(sw.slot.start_at)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  {sw.slot.meet_url ? (
                    <a
                      href={sw.slot.meet_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hidden items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 sm:inline-flex"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Meet link
                    </a>
                  ) : (
                    <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/35 sm:inline-block">
                      No Meet link
                    </span>
                  )}
                  <div className="text-right">
                    <div className="text-xl font-bold leading-none">
                      {sw.booking_count}
                    </div>
                    <div className="text-xs text-white/35">
                      / {sw.slot.capacity}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-white/35 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <div className="mx-6 h-0.5 bg-white/10">
                <div
                  className="h-full rounded bg-gradient-to-r from-[#ae904c] to-[#c9a96e] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {isExpanded && (
                <div className="px-6 py-5">
                  {sw.bookings.length === 0 ? (
                    <p className="py-2 text-sm text-white/35">
                      No registrations yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] text-sm">
                        <thead>
                          <tr className="text-[0.65rem] uppercase tracking-wider text-white/35">
                            <th className="px-2 py-2 text-left font-semibold">#</th>
                            <th className="px-2 py-2 text-left font-semibold">
                              Name
                            </th>
                            <th className="px-2 py-2 text-left font-semibold">
                              Email
                            </th>
                            <th className="px-2 py-2 text-left font-semibold">
                              Track
                            </th>
                            <th className="px-2 py-2 text-left font-semibold">
                              Registered
                            </th>
                            <th className="px-2 py-2 text-left font-semibold">
                              Confirmed
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sw.bookings.map((b, i) => {
                            const track = TRACKS[b.track] ?? {
                              label: b.track,
                              className:
                                "border-white/15 bg-white/5 text-white/60",
                            };
                            const phone =
                              b.message?.match(/^Phone: (.+?)(?:\n|$)/)?.[1] ??
                              null;

                            return (
                              <tr key={b.id} className="border-t border-white/10">
                                <td className="px-2 py-2.5 text-white/35">
                                  {i + 1}
                                </td>
                                <td className="px-2 py-2.5 font-medium">
                                  {b.name}
                                </td>
                                <td className="px-2 py-2.5">
                                  <a
                                    href={`mailto:${b.email}`}
                                    className="text-[#ae904c] hover:underline"
                                  >
                                    {b.email}
                                  </a>
                                  {phone && (
                                    <div className="mt-0.5 text-xs text-white/35">
                                      {phone}
                                    </div>
                                  )}
                                </td>
                                <td className="px-2 py-2.5">
                                  <span
                                    className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${track.className}`}
                                  >
                                    {track.label}
                                  </span>
                                </td>
                                <td className="px-2 py-2.5 text-white/40">
                                  {new Date(b.created_at).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </td>
                                <td className="px-2 py-2.5 text-xs">
                                  {b.confirmation_sent_at ? (
                                    <span className="text-emerald-300">
                                      ✓ Sent
                                    </span>
                                  ) : (
                                    <span className="text-white/35">Pending</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {(["developer", "investor", "both"] as const).map((t) => {
          const count = data.slots
            .flatMap((s) => s.bookings)
            .filter((b) => b.track === t).length;
          return (
            <div
              key={t}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
            >
              <div className="text-2xl font-bold">{count}</div>
              <div className="mt-1 text-xs text-white/40">
                {TRACKS[t].label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
