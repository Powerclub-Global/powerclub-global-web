"use client";

import { useState, useCallback } from "react";

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

const TRACKS: Record<string, { label: string; color: string }> = {
  developer: { label: "Developer", color: "#00d4ff" },
  investor: { label: "Investor", color: "#ae904c" },
  both: { label: "Both", color: "#a78bfa" },
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

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<EventData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedSlot, setExpandedSlot] = useState<string | null>(null);

  const load = useCallback(async (k: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/sovereign-stack/admin?key=${encodeURIComponent(k)}`);
      if (res.status === 401) {
        setError("Invalid key.");
        setAuthed(false);
      } else if (!res.ok) {
        setError("Backend error — is the PCG server running?");
      } else {
        const json = await res.json();
        setData(json);
        setAuthed(true);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    load(key);
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#08090c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}>
        <form onSubmit={handleAuth} style={{
          background: "#0f1117",
          border: "1px solid #1f2230",
          borderRadius: 16,
          padding: "2.5rem",
          width: 360,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e8eaf0", marginBottom: "0.4rem" }}>
            PCG Admin
          </div>
          <div style={{ color: "#6b7280", fontSize: "0.85rem", marginBottom: "1.8rem" }}>
            Sovereign Stack Founder Calls
          </div>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={e => setKey(e.target.value)}
            style={{
              width: "100%",
              background: "#14161e",
              border: "1px solid #1f2230",
              borderRadius: 8,
              padding: "0.7rem 0.9rem",
              color: "#e8eaf0",
              fontSize: "0.95rem",
              outline: "none",
              marginBottom: "1rem",
              boxSizing: "border-box",
            }}
          />
          {error && (
            <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "0.8rem" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading || !key}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ae904c, #c9a96e)",
              border: "none",
              borderRadius: 8,
              padding: "0.75rem",
              color: "#08090c",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading || !key ? "not-allowed" : "pointer",
              opacity: loading || !key ? 0.6 : 1,
            }}
          >
            {loading ? "Loading…" : "Enter"}
          </button>
        </form>
      </div>
    );
  }

  const totalRegistrations = data?.slots.reduce((sum, s) => sum + s.booking_count, 0) ?? 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08090c",
      color: "#e8eaf0",
      fontFamily: "system-ui, sans-serif",
      padding: "2rem 1.5rem",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(174,144,76,0.15)",
            border: "1px solid rgba(174,144,76,0.3)",
            color: "#ae904c",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.3rem 0.7rem",
            borderRadius: 999,
            marginBottom: "0.75rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ae904c", display: "inline-block" }} />
            Powerclub Global · Internal
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>
            {data?.event.title}
          </h1>
          <div style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            {totalRegistrations} total registrations across {data?.slots.length} sessions
          </div>
        </div>

        {/* Slot cards */}
        {data?.slots.map((sw) => {
          const isExpanded = expandedSlot === sw.slot.id;
          const pct = Math.round((sw.booking_count / sw.slot.capacity) * 100);

          return (
            <div key={sw.slot.id} style={{
              background: "#0f1117",
              border: "1px solid #1f2230",
              borderRadius: 12,
              marginBottom: "1rem",
              overflow: "hidden",
            }}>
              {/* Slot header */}
              <div
                onClick={() => setExpandedSlot(isExpanded ? null : sw.slot.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.2rem 1.5rem",
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{sw.slot.label}</div>
                  <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                    {formatTime(sw.slot.start_at)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  {/* Meet link status */}
                  {sw.slot.meet_url ? (
                    <a
                      href={sw.slot.meet_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        color: "#00d4aa",
                        fontSize: "0.8rem",
                        textDecoration: "none",
                        background: "rgba(0,212,170,0.1)",
                        border: "1px solid rgba(0,212,170,0.25)",
                        padding: "0.25rem 0.7rem",
                        borderRadius: 999,
                      }}
                    >
                      ↗ Meet link
                    </a>
                  ) : (
                    <span style={{
                      color: "#6b7280",
                      fontSize: "0.8rem",
                      background: "rgba(107,114,128,0.1)",
                      border: "1px solid rgba(107,114,128,0.2)",
                      padding: "0.25rem 0.7rem",
                      borderRadius: 999,
                    }}>
                      No Meet link
                    </span>
                  )}
                  {/* Count */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "1.4rem", fontWeight: 700, lineHeight: 1 }}>
                      {sw.booking_count}
                    </div>
                    <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>/ {sw.slot.capacity}</div>
                  </div>
                  {/* Expand */}
                  <div style={{
                    color: "#6b7280",
                    fontSize: "1.2rem",
                    transform: isExpanded ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}>
                    ▾
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2, background: "#1f2230", margin: "0 1.5rem" }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #ae904c, #c9a96e)",
                  borderRadius: 2,
                  transition: "width 0.3s",
                }} />
              </div>

              {/* Expanded registrant list */}
              {isExpanded && (
                <div style={{ padding: "1.2rem 1.5rem" }}>
                  {sw.bookings.length === 0 ? (
                    <div style={{ color: "#6b7280", fontSize: "0.85rem", padding: "1rem 0" }}>
                      No registrations yet.
                    </div>
                  ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                      <thead>
                        <tr style={{ color: "#6b7280", textTransform: "uppercase", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>#</th>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>Name</th>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>Email</th>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>Track</th>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>Registered</th>
                          <th style={{ textAlign: "left", padding: "0.4rem 0.6rem", fontWeight: 600 }}>Confirmed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sw.bookings.map((b, i) => {
                          const track = TRACKS[b.track] ?? { label: b.track, color: "#9ca3af" };
                          // Extract phone from message if present
                          const phoneMatch = b.message?.match(/^Phone: (.+?)(?:\n|$)/);
                          const phone = phoneMatch ? phoneMatch[1] : null;

                          return (
                            <tr key={b.id} style={{
                              borderTop: "1px solid #1f2230",
                              transition: "background 0.15s",
                            }}>
                              <td style={{ padding: "0.6rem", color: "#6b7280" }}>{i + 1}</td>
                              <td style={{ padding: "0.6rem", fontWeight: 500 }}>{b.name}</td>
                              <td style={{ padding: "0.6rem" }}>
                                <a href={`mailto:${b.email}`} style={{ color: "#ae904c", textDecoration: "none" }}>
                                  {b.email}
                                </a>
                                {phone && (
                                  <div style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "0.15rem" }}>
                                    {phone}
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: "0.6rem" }}>
                                <span style={{
                                  background: `${track.color}18`,
                                  color: track.color,
                                  border: `1px solid ${track.color}30`,
                                  padding: "0.15rem 0.5rem",
                                  borderRadius: 999,
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}>
                                  {track.label}
                                </span>
                              </td>
                              <td style={{ padding: "0.6rem", color: "#6b7280" }}>
                                {new Date(b.created_at).toLocaleString("en-US", {
                                  month: "short", day: "numeric",
                                  hour: "2-digit", minute: "2-digit",
                                })}
                              </td>
                              <td style={{ padding: "0.6rem" }}>
                                {b.confirmation_sent_at ? (
                                  <span style={{ color: "#00d4aa", fontSize: "0.75rem" }}>✓ Sent</span>
                                ) : (
                                  <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>Pending</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Track breakdown */}
        {data && (
          <div style={{
            marginTop: "1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          }}>
            {(["developer", "investor", "both"] as const).map((t) => {
              const count = data.slots
                .flatMap(s => s.bookings)
                .filter(b => b.track === t).length;
              const track = TRACKS[t];
              return (
                <div key={t} style={{
                  background: "#0f1117",
                  border: "1px solid #1f2230",
                  borderRadius: 10,
                  padding: "1.2rem",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, color: track.color }}>
                    {count}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                    {track.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ color: "#374151", fontSize: "0.75rem", textAlign: "center", marginTop: "2rem" }}>
          powerclubglobal.com · internal view · calls are not logged
        </div>
      </div>
    </div>
  );
}
