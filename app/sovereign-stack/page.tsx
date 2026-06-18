"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LAYERS = [
  { id: "spectrum", label: "SPECTRUM GALACTIC", desc: "Satellite mesh · global unification", tag: "Year 4+", accent: "#ae904c", glow: false, live: false },
  { id: "apn", label: "ALPHA PROTOCOL NETWORK", desc: "P2P mesh · ZK identity · data marketplace", tag: "Protocol", accent: "#ae904c", glow: false, live: false },
  { id: "omega", label: "OMEGA WIRELESS", desc: "Sovereign hardware nodes · Vibertas OS", tag: "Hardware", accent: "#ae904c", glow: false, live: false },
  { id: "vibe", label: "VIBE ECONOMY", desc: "Token · billing · 85/15 marketplace split", tag: "Economic Layer", accent: "#00d4ff", glow: true, live: false },
  { id: "pythia", label: "PYTHIA", desc: "Distributed LLM oracle · compute orchestrator", tag: "Intelligence", accent: "#ae904c", glow: false, live: false },
  { id: "dashboard", label: "DASHBOARD / APPS", desc: "Live now · PCG is first · any app can build here", tag: "● Live", accent: "#ae904c", glow: true, live: true },
  { id: "vibeland", label: "VIBELAND", desc: "Digital twin · virtual world · Year 3–4", tag: "Year 3–4", accent: "#ae904c", glow: false, live: false },
];

const PILLARS = [
  { num: "01", title: "The Architecture", body: "7-layer sovereign AI stack. From satellite mesh to virtual world. No single point of failure. No single point of control." },
  { num: "02", title: "The Capital Thesis", body: "$100M fund. Permanent Class B supervoting. No drag-along. No forced exit. Returns from operating distributions, token appreciation, and LP secondary market." },
  { num: "03", title: "Open Roles", body: "Developers, infrastructure engineers, researchers, and strategic advisors. The network builds itself — but it needs the right hands first." },
];

const TRACKS = [
  { id: "developer", icon: "⚡", label: "Developer" },
  { id: "investor", icon: "🏛", label: "Investor" },
  { id: "both", icon: "🌐", label: "Both" },
];

interface Slot {
  slot: { id: string; label: string; start_at: string; capacity: number };
  booking_count: number;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { rootMargin: "-60px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function SovereignStackPage() {
  const bookingRef = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [track, setTrack] = useState("both");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/sovereign-stack/slots")
      .then((r) => r.json())
      .then((d) => { if (d.slots) setSlots(d.slots); })
      .catch(() => {})
      .finally(() => setSlotsLoading(false));
  }, []);

  function scrollToBooking() {
    bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectSlot(slot: Slot) {
    if (slot.booking_count >= slot.slot.capacity) return;
    setSelectedSlot(slot);
    setResult(null);
    setTimeout(() => {
      bookingRef.current?.querySelector("#booking-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot || !form.name || !form.email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/sovereign-stack/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot_id: selectedSlot.slot.id, name: form.name, email: form.email, phone: form.phone || undefined, track, message: form.message || undefined }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) setSelectedSlot(null);
    } catch {
      setResult({ success: false, message: "Network error — please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  const gold = "#ae904c";
  const bg = "#08090c";

  return (
    <div style={{ backgroundColor: bg, color: "#e8eaf0", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(174,144,76,0.07) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(rgba(174,144,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(174,144,76,0.08) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />

        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(174,144,76,0.1)", border: "1px solid rgba(174,144,76,0.3)", color: gold }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: gold, animation: "pulse-dot 2s ease-in-out infinite" }} />
            Founder Calls · Friday June 19, 2026
          </div>

          <h1 className="font-bold leading-none mb-6" style={{ fontSize: "clamp(3.2rem, 9vw, 8rem)", letterSpacing: "-0.03em" }}>
            The{" "}
            <span style={{ background: "linear-gradient(135deg, #c9a95e 0%, #ae904c 40%, #8a6e38 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Sovereign
            </span>
            <br />Stack
          </h1>

          <p className="max-w-xl mb-10 leading-relaxed" style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", color: "rgba(232,234,240,0.55)" }}>
            Infrastructure no government can shut down.
            <br />No corporation can buy.
            <br /><span style={{ color: "rgba(232,234,240,0.8)" }}>One hour with the founder.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button onClick={scrollToBooking} className="group relative px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #c9a95e, #ae904c)", color: bg, letterSpacing: "0.04em" }}>
              Reserve Your Spot →
            </button>
            <button onClick={() => document.getElementById("stack-section")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(232,234,240,0.6)", letterSpacing: "0.04em" }}>
              Learn more ↓
            </button>
          </div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "rgba(174,144,76,0.35)" }}>
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </section>

      {/* ── STACK ── */}
      <section id="stack-section" className="relative px-6 py-16 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: gold }}>Architecture</p>
              <h2 className="font-bold leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.02em" }}>
                Seven layers.<br /><span style={{ color: "rgba(232,234,240,0.35)" }}>One organism.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative mx-auto" style={{ perspective: "1200px", maxWidth: "680px" }}>
            <div style={{ transform: "rotateX(20deg) rotateY(-4deg)", transformStyle: "preserve-3d" }}>
              {LAYERS.map((layer, i) => (
                <motion.div key={layer.id}
                  initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-between px-6 py-4 mb-2 rounded-lg"
                  style={{
                    background: layer.live ? "rgba(174,144,76,0.12)" : layer.id === "vibe" ? "rgba(0,212,255,0.06)" : "rgba(174,144,76,0.05)",
                    border: `1px solid ${layer.live ? "rgba(174,144,76,0.5)" : layer.id === "vibe" ? "rgba(0,212,255,0.3)" : "rgba(174,144,76,0.15)"}`,
                    boxShadow: layer.live ? "0 0 32px rgba(174,144,76,0.18)" : layer.id === "vibe" ? "0 0 20px rgba(0,212,255,0.12)" : "none",
                  }}>
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-xs font-mono shrink-0" style={{ color: "rgba(232,234,240,0.2)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm tracking-wide truncate" style={{ color: layer.accent, letterSpacing: "0.06em" }}>{layer.label}</div>
                      <div className="text-xs mt-0.5 truncate" style={{ color: "rgba(232,234,240,0.38)" }}>{layer.desc}</div>
                    </div>
                  </div>
                  <span className="ml-4 shrink-0 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: layer.live ? "rgba(174,144,76,0.2)" : layer.id === "vibe" ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.05)",
                      color: layer.live ? gold : layer.id === "vibe" ? "#00d4ff" : "rgba(232,234,240,0.3)",
                      border: `1px solid ${layer.live ? "rgba(174,144,76,0.3)" : layer.id === "vibe" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.07)"}`,
                    }}>
                    {layer.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <FadeIn delay={0.3}>
            <p className="text-center mt-8 text-sm" style={{ color: "rgba(232,234,240,0.25)" }}>
              APN = nervous system · Pythia = brain · Vibertas = body · VIBE = bloodstream
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="relative px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <FadeIn><p className="text-xs font-semibold tracking-widest uppercase mb-10 text-center" style={{ color: gold }}>What You'll Hear</p></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.num} delay={i * 0.1}>
                <div className="p-8 rounded-xl h-full" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="text-5xl font-bold mb-5 leading-none" style={{ color: "rgba(174,144,76,0.14)", letterSpacing: "-0.04em" }}>{p.num}</div>
                  <h3 className="font-semibold mb-3 text-lg" style={{ color: gold }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,234,240,0.48)" }}>{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section ref={bookingRef} className="relative px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: gold }}>The Call</p>
              <h2 className="font-bold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                One hour. Live.<br /><span style={{ color: "rgba(232,234,240,0.35)" }}>Pick your time.</span>
              </h2>
              <p className="text-sm mt-3" style={{ color: "rgba(232,234,240,0.38)" }}>
                Hosted by the Office of the Oklahoma Billionaire · Friday, June 19, 2026
              </p>
            </div>
          </FadeIn>

          {/* Slot cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {slotsLoading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
                ))
              : (slots.length > 0 ? slots : [
                  { slot: { id: "", label: "9:00 AM CT", start_at: "", capacity: 20 }, booking_count: 0 },
                  { slot: { id: "", label: "2:00 PM CT", start_at: "", capacity: 20 }, booking_count: 0 },
                  { slot: { id: "", label: "7:00 PM CT", start_at: "", capacity: 20 }, booking_count: 0 },
                ]).map((sw) => {
                const isFull = sw.booking_count >= sw.slot.capacity;
                const isSelected = selectedSlot?.slot.id === sw.slot.id;
                const spots = sw.slot.capacity - sw.booking_count;
                return (
                  <button key={sw.slot.id || sw.slot.label} disabled={isFull} onClick={() => selectSlot(sw)}
                    className="text-left p-5 rounded-xl transition-all duration-200"
                    style={{
                      background: isSelected ? "rgba(174,144,76,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isSelected ? "rgba(174,144,76,0.5)" : isFull ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"}`,
                      opacity: isFull ? 0.45 : 1,
                      cursor: isFull ? "not-allowed" : "pointer",
                      boxShadow: isSelected ? "0 0 20px rgba(174,144,76,0.12)" : "none",
                    }}>
                    <div className="text-xl font-bold mb-1" style={{ letterSpacing: "-0.02em" }}>{sw.slot.label}</div>
                    <div className="text-xs mb-3" style={{ color: "rgba(232,234,240,0.35)" }}>1 hour · Friday June 19</div>
                    <div className="text-xs font-semibold" style={{ color: isFull ? "rgba(239,68,68,0.7)" : isSelected ? gold : "rgba(232,234,240,0.35)" }}>
                      {isFull ? "Full" : isSelected ? "✓ Selected" : `${spots} spots left`}
                    </div>
                  </button>
                );
              })}
          </div>

          <p className="text-center text-xs mb-8" style={{ color: "rgba(232,234,240,0.22)" }}>
            All slots cover the same material — choose whichever time works for you.
          </p>

          {/* Booking form */}
          <AnimatePresence>
            {result?.success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center py-12 px-6 rounded-2xl"
                style={{ background: "rgba(174,144,76,0.06)", border: "1px solid rgba(174,144,76,0.25)" }}>
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">You're in.</h3>
                <p className="text-sm" style={{ color: "rgba(232,234,240,0.5)" }}>{result.message}</p>
              </motion.div>
            ) : selectedSlot ? (
              <motion.div id="booking-form" key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-8"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="font-semibold mb-1">Register for {selectedSlot.slot.label}</h3>
                <p className="text-xs mb-6" style={{ color: "rgba(232,234,240,0.35)" }}>You'll receive a confirmation and calendar invite.</p>

                {result && !result.success && (
                  <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>
                    {result.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>Name</label>
                      <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Full name"
                        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0" }} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>Email</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0" }} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>
                      Phone <span style={{ color: "rgba(232,234,240,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                    </label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0" }} />
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>I'm joining as</label>
                    <div className="grid grid-cols-3 gap-2">
                      {TRACKS.map((t) => (
                        <button key={t.id} type="button" onClick={() => setTrack(t.id)}
                          className="py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                          style={{
                            background: track === t.id ? "rgba(174,144,76,0.12)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${track === t.id ? "rgba(174,144,76,0.45)" : "rgba(255,255,255,0.08)"}`,
                            color: track === t.id ? gold : "rgba(232,234,240,0.5)",
                          }}>
                          <span className="block text-base mb-0.5">{t.icon}</span>
                          <span className="text-xs">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>
                      Message <span style={{ color: "rgba(232,234,240,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                    </label>
                    <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="What brings you to the Sovereign Stack?"
                      rows={3}
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none resize-none transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0" }} />
                  </div>

                  <button type="submit" disabled={submitting}
                    className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200"
                    style={{ background: submitting ? "rgba(174,144,76,0.4)" : "linear-gradient(135deg, #c9a95e, #ae904c)", color: bg, cursor: submitting ? "not-allowed" : "pointer" }}>
                    {submitting ? "Reserving…" : `Reserve My Spot — ${selectedSlot.slot.label} →`}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-6 rounded-xl text-sm"
                style={{ border: "1px dashed rgba(174,144,76,0.2)", color: "rgba(232,234,240,0.3)" }}>
                ← Select a time slot above to register
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── THESIS ── */}
      <section className="relative px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="relative p-10 rounded-2xl overflow-hidden" style={{ background: "rgba(174,144,76,0.04)", border: "1px solid rgba(174,144,76,0.18)" }}>
              <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(174,144,76,0.1) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none" style={{ background: "linear-gradient(315deg, rgba(174,144,76,0.07) 0%, transparent 60%)" }} />
              <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: gold }}>The Thesis</p>
              <blockquote className="text-lg leading-relaxed mb-5" style={{ color: "rgba(232,234,240,0.72)", lineHeight: 1.8 }}>
                "I am giving you capital to invest in myself and this thesis. LPs back the Office — not a committee. No drag-along. No forced exit. No board seats."
              </blockquote>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(232,234,240,0.42)" }}>
                Returns from operating distributions, token appreciation, and secondary LP market. Oklahoma Generational Trust holds permanent Class B supervoting at the apex across all entities.{" "}
                <span className="font-semibold" style={{ color: "rgba(232,234,240,0.68)" }}>We are never selling.</span>
              </p>
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(174,144,76,0.12)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "rgba(174,144,76,0.15)", color: gold, border: "1px solid rgba(174,144,76,0.3)" }}>OKB</div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "rgba(232,234,240,0.65)" }}>Office of the Oklahoma Billionaire</div>
                  <div className="text-xs" style={{ color: "rgba(232,234,240,0.28)" }}>$100M Sovereign Stack Fund LP</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(174,144,76,0.07) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(174,144,76,0.55)" }}>Friday · June 19 · Three Sessions</p>
            <h2 className="font-bold mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Reserve Your<br />
              <span style={{ background: "linear-gradient(135deg, #c9a95e 0%, #ae904c 50%, #8a6e38 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Spot</span>
            </h2>
            <button onClick={scrollToBooking}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-base transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #c9a95e, #ae904c)", color: bg, letterSpacing: "0.02em", boxShadow: "0 0 40px rgba(174,144,76,0.22)" }}>
              Choose Your Session →
            </button>
            <p className="mt-7 text-xs" style={{ color: "rgba(232,234,240,0.22)" }}>
              Questions? Reach Nora at{" "}
              <a href="mailto:nora@powerclubglobal.com" style={{ color: "rgba(174,144,76,0.5)" }}>nora@powerclubglobal.com</a>
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.85)} }
        input:focus, textarea:focus { border-color: rgba(174,144,76,0.5) !important; }
      `}</style>
    </div>
  );
}
