"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gold = "#ae904c";
const goldBright = "#c9a95e";
const bg = "#08090c";
const dim = (o: number) => `rgba(232,234,240,${o})`;

interface Slot {
  slot: { id: string; label: string; start_at: string; capacity: number };
  booking_count: number;
}

const DEFAULT_NEEDS = [
  { id: "customers", label: "More customers" },
  { id: "time", label: "Save time" },
  { id: "build", label: "A website / app" },
  { id: "unsure", label: "Not sure yet" },
];

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Demo availability when the dashboard has no live slots yet: next ~12 weekdays, 3 times each. */
function genFallback(): Slot[] {
  const out: Slot[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const times = [
    { h: 10, m: 0, label: "10:00 AM" },
    { h: 13, m: 0, label: "1:00 PM" },
    { h: 15, m: 30, label: "3:30 PM" },
  ];
  let added = 0;
  for (let d = 1; added < 12 && d < 40; d++) {
    const day = new Date(today);
    day.setDate(today.getDate() + d);
    const dow = day.getDay();
    if (dow === 0 || dow === 6) continue;
    times.forEach((t) => {
      const dt = new Date(day);
      dt.setHours(t.h, t.m, 0, 0);
      out.push({ slot: { id: "", label: t.label, start_at: dt.toISOString(), capacity: 5 }, booking_count: 0 });
    });
    added++;
  }
  return out;
}

export default function BookingCalendar({
  slotsUrl = "/api/agency/slots",
  bookUrl = "/api/agency/book",
  needs: needsOptions = DEFAULT_NEEDS,
}: {
  slotsUrl?: string;
  bookUrl?: string;
  needs?: { id: string; label: string }[];
}) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [viewMonth, setViewMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [needs, setNeeds] = useState(needsOptions[0]?.id ?? "");
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", message: "" });
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    fetch(slotsUrl)
      .then((r) => r.json())
      .then((d) => { if (live) setSlots(d?.slots?.length ? d.slots : genFallback()); })
      .catch(() => { if (live) setSlots(genFallback()); });
    return () => { live = false; };
  }, [slotsUrl]);

  const byDate = useMemo(() => {
    const map: Record<string, Slot[]> = {};
    for (const sw of slots || []) {
      if (!sw.slot.start_at) continue;
      const d = new Date(sw.slot.start_at);
      if (isNaN(d.getTime())) continue;
      (map[ymd(d)] ||= []).push(sw);
    }
    Object.values(map).forEach((arr) => arr.sort((a, b) => +new Date(a.slot.start_at) - +new Date(b.slot.start_at)));
    return map;
  }, [slots]);

  // once availability loads, jump the calendar to the first month that has openings
  useEffect(() => {
    if (!slots) return;
    const keys = Object.keys(byDate).sort();
    if (keys.length) { const d = new Date(keys[0] + "T00:00:00"); setViewMonth(new Date(d.getFullYear(), d.getMonth(), 1)); }
  }, [slots, byDate]);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const canPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);

  function pickDay(day: number) {
    const key = ymd(new Date(year, month, day));
    setSelectedDate(key);
    setSelectedSlot(null);
    setResult(null);
  }
  function pickSlot(s: Slot) {
    if (s.booking_count >= s.slot.capacity) return;
    setSelectedSlot(s);
    setResult(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !form.name || !form.email) return;
    setSubmitting(true);
    try {
      const res = await fetch(bookUrl, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id: selectedSlot.slot.id, name: form.name, email: form.email, phone: form.phone || undefined, business: form.business || undefined, needs: needsOptions.find((n) => n.id === needs)?.label, message: form.message || undefined, sms_consent: smsConsent }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) { setSelectedSlot(null); setSelectedDate(null); }
    } catch {
      setResult({ success: false, message: "Network error — please try again." });
    } finally { setSubmitting(false); }
  }

  const daySlots = selectedDate ? byDate[selectedDate] || [] : [];
  const prettyDate = selectedDate ? new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" }) : "";

  if (result?.success) {
    return (
      <div className="text-center py-12 px-6 rounded-2xl glass-gold">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold mb-2">You&rsquo;re booked.</h3>
        <p className="text-sm" style={{ color: dim(0.5) }}>{result.message || "Check your email for a confirmation and calendar invite."}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* calendar */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => canPrev && setViewMonth(new Date(year, month - 1, 1))} disabled={!canPrev} aria-label="Previous month"
            className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: canPrev ? dim(0.7) : dim(0.2), cursor: canPrev ? "pointer" : "not-allowed" }}>‹</button>
          <div className="font-bold text-sm">{MONTHS[month]} {year}</div>
          <button onClick={() => setViewMonth(new Date(year, month + 1, 1))} aria-label="Next month"
            className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: dim(0.7) }}>›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((w) => <div key={w} className="text-center text-[10px] font-semibold py-1" style={{ color: dim(0.3) }}>{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={i} />;
            const date = new Date(year, month, day);
            const key = ymd(date);
            const isPast = date < today;
            const hasOpen = (byDate[key] || []).some((s) => s.booking_count < s.slot.capacity);
            const selectable = hasOpen && !isPast;
            const isSel = selectedDate === key;
            return (
              <button key={i} disabled={!selectable} onClick={() => pickDay(day)} aria-label={key}
                className="aspect-square rounded-lg text-sm font-medium relative transition-all duration-150 flex items-center justify-center"
                style={{
                  background: isSel ? `linear-gradient(180deg, ${goldBright}, ${gold})` : selectable ? "rgba(174,144,76,0.08)" : "transparent",
                  border: `1px solid ${isSel ? "transparent" : selectable ? "rgba(174,144,76,0.25)" : "transparent"}`,
                  color: isSel ? bg : selectable ? "#e8eaf0" : dim(0.2),
                  cursor: selectable ? "pointer" : "default",
                  fontWeight: isSel ? 700 : 500,
                }}>
                {day}
                {selectable && !isSel && <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: gold }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* time slots + form */}
      <div ref={formRef}>
        {!selectedDate ? (
          <div className="glass h-full flex items-center justify-center text-center p-8" style={{ minHeight: 240 }}>
            <p className="text-sm" style={{ color: dim(0.35) }}>{slots === null ? "Loading availability…" : "← Pick a day with an open dot to see available times."}</p>
          </div>
        ) : (
          <div className="glass p-5 h-full">
            <p className="text-xs font-semibold mb-1" style={{ color: goldBright }}>{prettyDate}</p>
            <p className="text-xs mb-4" style={{ color: dim(0.4) }}>30 minutes · free · pick a time</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {daySlots.map((s) => {
                const isFull = s.booking_count >= s.slot.capacity;
                const isSel = selectedSlot?.slot.start_at === s.slot.start_at;
                return (
                  <button key={s.slot.start_at || s.slot.label} disabled={isFull} onClick={() => pickSlot(s)}
                    className="py-2.5 rounded-lg text-sm font-semibold transition-all duration-150"
                    style={{ background: isSel ? "rgba(174,144,76,0.14)" : "rgba(255,255,255,0.04)", border: `1px solid ${isSel ? "rgba(174,144,76,0.5)" : "rgba(255,255,255,0.08)"}`, color: isFull ? dim(0.25) : isSel ? gold : "#e8eaf0", opacity: isFull ? 0.5 : 1, cursor: isFull ? "not-allowed" : "pointer" }}>
                    {s.slot.label}{isFull ? " · full" : ""}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {selectedSlot && (
                <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} onSubmit={handleSubmit}
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16 }}>
                  {result && !result.success && (
                    <div className="mb-3 px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>{result.message}</div>
                  )}
                  <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                    <Inp value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Name" required />
                    <Inp value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="Email" type="email" required />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    <Inp value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="Phone (optional)" />
                    <Inp value={form.business} onChange={(v) => setForm((f) => ({ ...f, business: v }))} placeholder="Business (optional)" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {needsOptions.map((n) => (
                      <button key={n.id} type="button" onClick={() => setNeeds(n.id)} className="py-1.5 px-2.5 rounded-full text-[11px] font-medium"
                        style={{ background: needs === n.id ? "rgba(174,144,76,0.14)" : "rgba(255,255,255,0.04)", border: `1px solid ${needs === n.id ? "rgba(174,144,76,0.45)" : "rgba(255,255,255,0.08)"}`, color: needs === n.id ? gold : dim(0.5) }}>{n.label}</button>
                    ))}
                  </div>
                  <label className="flex items-start gap-2 mb-4 cursor-pointer">
                    <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded cursor-pointer" style={{ accentColor: gold }} />
                    <span className="text-[11px] leading-relaxed" style={{ color: dim(0.42) }}>
                      I agree to receive SMS messages from PowerClub Global about my booking and related updates.
                      Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. See our{" "}
                      <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: goldBright, textDecoration: "underline" }}>Privacy Policy</a>.{" "}
                      <span style={{ color: dim(0.25) }}>(optional)</span>
                    </span>
                  </label>
                  <button type="submit" disabled={submitting} className="btn-gold w-full justify-center" style={submitting ? { opacity: 0.6, cursor: "not-allowed" } : undefined}>
                    {submitting ? "Booking…" : `Confirm ${selectedSlot.slot.label} →`}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function Inp({ value, onChange, placeholder, type = "text", required }: { value: string; onChange: (v: string) => void; placeholder: string; type?: string; required?: boolean }) {
  return (
    <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded-lg px-3 py-2 text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0", outline: "none" }} />
  );
}
