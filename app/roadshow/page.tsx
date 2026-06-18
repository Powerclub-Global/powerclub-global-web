"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TheodoreConcierge from "@/components/TheodoreConcierge";
import { submitContactForm } from "@/app/contact/contact";

const gold = "#ae904c";
const goldBright = "#c9a95e";
const bg = "#08090c";
const ink = "#e8eaf0";
const EASE = [0.22, 1, 0.36, 1] as const;
const BOOK_URL = "https://cal.com/powerclub-global";

const PARTNERS = [
  { src: "/partners/bitcoin-conference.svg", alt: "Bitcoin Conference" },
  { src: "/partners/consensus.svg", alt: "Consensus" },
  { src: "/partners/ethdenver.png", alt: "ETHDenver" },
  { src: "/partners/wagmi.webp", alt: "WAGMI" },
  { src: "/partners/dc-blockchain-summit.png", alt: "DC Blockchain Summit" },
];

const SERVICES = [
  { title: "Roadshow Management", img: "/services/roadshow-management-cover.webp", href: "/services/roadshow-management", desc: "End-to-end production for your conference roadshow — strategy, logistics, and flawless on-the-ground execution." },
  { title: "Side Events & Experiences", img: "/services/experiences-cover.webp", href: "/services/experiences", desc: "Dinners, parties, and activations that get your brand the room — and own the after-hours." },
  { title: "Influencer Relations", img: "/services/influencer-relations-cover.webp", href: "/services/influencer-relations", desc: "The right voices talking about you — on the floor and across feeds." },
  { title: "Press & PR", img: "/services/press-relations-cover.webp", href: "/services/press-relations", desc: "Coverage before, during, and after — so the story travels far beyond the venue." },
  { title: "Branding & Booths", img: "/services/branding-cover.webp", href: "/services/branding", desc: "Booths, decks, and on-site presence that make you impossible to miss." },
  { title: "Social & Content", img: "/services/social-media-cover.webp", href: "/services/social-media", desc: "Real-time capture and amplification — your best moments, everywhere, instantly." },
];

const HANDLED = [
  "Venue, logistics & vendor management",
  "Side events, dinners & parties",
  "Speaker & panel placement",
  "Influencer activations on-site",
  "Press outreach & media coverage",
  "Booth design & brand presence",
  "Live photo, video & content capture",
  "Post-event recap & lead reporting",
];

const EVENTS = [
  { c: "Las Vegas", i: "/events/las-vegas.png" },
  { c: "Toronto · Consensus", i: "/events/toronto-consensus.png" },
  { c: "Miami", i: "/events/miami-bfc.png" },
  { c: "Dubai", i: "/events/dubai.png" },
  { c: "Amsterdam", i: "/events/amsterdam.png" },
  { c: "Paris", i: "/events/paris.png" },
  { c: "Seoul", i: "/events/seoul.png" },
  { c: "Hong Kong", i: "/events/hongkong.png" },
  { c: "London", i: "/events/london.png" },
  { c: "New York", i: "/events/ny.png" },
  { c: "Frankfurt", i: "/events/frankfurt.png" },
  { c: "Cannes", i: "/events/cannes.png" },
];

const PROCESS = [
  { num: "01", title: "Plan", body: "We build your roadshow strategy around the conference, your goals, and your budget — venues, side events, targets, and timeline." },
  { num: "02", title: "Produce", body: "Our team runs it on the ground — logistics, activations, influencers, press, and content — so all you have to do is show up." },
  { num: "03", title: "Amplify", body: "We capture and broadcast every moment, then hand you a full recap with the coverage and leads you earned." },
];

const NEEDS = ["Roadshow", "Side events", "Influencers", "Press", "Branding", "Social/content"];

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
      transition={{ duration: 0.65, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export default function RoadshowPage() {
  const inquiryRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", event: "", phone: "", message: "" });
  const [needs, setNeeds] = useState<string[]>([]);
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) => r.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const toggleNeed = (n: string) => setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  const dim = (o: number) => `rgba(232,234,240,${o})`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: `Roadshow inquiry${form.event ? ` — ${form.event}` : ""}`,
        message:
          `Company: ${form.company || "—"}\n` +
          `Target event: ${form.event || "—"}\n` +
          `Needs: ${needs.length ? needs.join(", ") : "—"}\n\n` +
          (form.message || ""),
        sms_consent: smsConsent,
      });
      setStatus({ ok: true, msg: "Got it — we'll be in touch within one business day to plan your roadshow." });
      setForm({ name: "", email: "", company: "", event: "", phone: "", message: "" });
      setNeeds([]);
    } catch {
      setStatus({ ok: false, msg: "Something went wrong sending that. Email us at hello@powerclubglobal.com and we'll jump on it." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fnl" style={{ backgroundColor: bg, color: ink, minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="aurora" />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(rgba(174,144,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(174,144,76,0.06) 1px, transparent 1px)`, backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 80% 60% at 40% 0%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 40% 0%, #000 30%, transparent 75%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-7">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: gold, display: "inline-block", animation: "blob 2s ease-in-out infinite" }} />
              Roadshow & side-event production
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-extrabold leading-[0.98] mb-6" style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}>
              Make your startup the one
              <br />
              <span className="serif gold-text">everyone&rsquo;s talking about.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.18 }}
              className="max-w-xl mb-9 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.18rem)", color: dim(0.6) }}>
              When you take the stage at a major conference, you only get one shot. We run your entire
              roadshow and side events — booths, parties, influencers, press, and content — so you walk
              away with the room, the relationships, and the coverage.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo(inquiryRef)} className="btn-gold">Plan your roadshow <span className="arrow">→</span></button>
              <button onClick={() => scrollTo(workRef)} className="btn-ghost">See where we&rsquo;ve shown up</button>
            </motion.div>
          </div>

          {/* hero image */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} className="relative">
            <div className="glass overflow-hidden" style={{ borderColor: "rgba(174,144,76,0.3)", boxShadow: "0 0 60px -20px rgba(174,144,76,0.4)" }}>
              <img src="/roadshow.png" alt="PowerClub Global roadshow activation" className="w-full h-[340px] object-cover" style={{ opacity: 0.95 }} />
            </div>
            <div className="glass-gold absolute -bottom-5 -left-5 px-5 py-3 rounded-xl" style={{ backdropFilter: "blur(8px)" }}>
              <div className="font-extrabold text-2xl gold-text leading-none">30+</div>
              <div className="text-xs mt-1" style={{ color: dim(0.5) }}>cities worldwide</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONFERENCE PROOF ── */}
      <section className="relative px-6 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="eyebrow justify-center mb-8">Trusted on the floor at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {PARTNERS.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} title={p.alt} className="h-7 md:h-9 w-auto object-contain"
                  style={{ filter: "grayscale(1) brightness(1.6)", opacity: 0.6 }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={workRef} className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">What we run for you</p>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Your whole presence, <span className="serif gold-text">handled</span>
            </h2>
            <p className="text-sm mb-12 max-w-2xl" style={{ color: dim(0.45) }}>From the moment you commit to a conference to the recap after the last after-party — one team, the whole roadshow.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <FadeIn key={svc.title} delay={(i % 3) * 0.08}>
                <a href={svc.href} className="glass group block overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,9,12,0) 30%, rgba(8,9,12,0.85) 100%)" }} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 transition-colors" style={{ color: ink }}>{svc.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: dim(0.5) }}>{svc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold" style={{ color: goldBright }}>Learn more →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVERYTHING HANDLED ── */}
      <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">On the ground & online</p>
            <h2 className="font-extrabold mb-10" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>Everything, <span className="serif gold-text">taken care of</span></h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HANDLED.map((h, i) => (
              <FadeIn key={h} delay={(i % 4) * 0.07}>
                <div className="glass flex items-center gap-3 p-5 h-full">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ background: "rgba(174,144,76,0.15)", color: gold }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <span className="text-sm font-medium">{h}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS MARQUEE ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <FadeIn>
            <p className="eyebrow mb-4">Where we&rsquo;ve delivered</p>
            <h2 className="font-extrabold" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>From Vegas to <span className="serif gold-text">Seoul</span></h2>
          </FadeIn>
        </div>
        <div className="marquee-mask">
          <div className="marquee-track gap-4">
            {[...EVENTS, ...EVENTS].map((ev, i) => (
              <div key={i} className="relative shrink-0 rounded-xl overflow-hidden" style={{ width: 280, height: 180, border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={ev.i} alt={ev.c} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,9,12,0) 40%, rgba(8,9,12,0.85) 100%)" }} />
                <div className="absolute bottom-3 left-4 font-bold text-sm">{ev.c}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative px-6 py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>Plan. Produce. <span className="serif gold-text">Amplify.</span></h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-10">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="text-5xl font-extrabold leading-none mb-1" style={{ color: "rgba(174,144,76,0.16)", letterSpacing: "-0.04em" }}>{step.num}</div>
                <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, rgba(174,144,76,0.5), transparent)" }} />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: dim(0.5) }}>{step.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY ── */}
      <section ref={inquiryRef} className="relative px-6 py-20" style={{ background: "rgba(174,144,76,0.025)", borderTop: "1px solid rgba(174,144,76,0.12)" }}>
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="eyebrow justify-center mb-3">Plan your roadshow</p>
              <h2 className="font-extrabold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Which conference are you <span className="serif gold-text">hitting next?</span></h2>
              <p className="text-sm mt-3" style={{ color: dim(0.45) }}>Tell us the event and what you want to make happen. We&rsquo;ll come back with a plan and a quote.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {status?.ok ? (
              <div className="text-center py-12 px-6 rounded-2xl glass-gold">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2">Request received.</h3>
                <p className="text-sm" style={{ color: dim(0.5) }}>{status.msg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
                {status && !status.ok && (
                  <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" }}>{status.msg}</div>
                )}
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Full name" required />
                  <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@startup.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <Field label="Company" value={form.company} onChange={(v) => setForm((f) => ({ ...f, company: v }))} placeholder="Your startup" />
                  <Field label="Phone" optional value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="mb-4">
                  <Field label="Which event / conference?" value={form.event} onChange={(v) => setForm((f) => ({ ...f, event: v }))} placeholder="e.g. Consensus 2026, Token2049, ETHDenver…" />
                </div>
                <div className="mb-5">
                  <label className="block text-xs font-medium mb-2 uppercase tracking-wide" style={{ color: dim(0.45) }}>What do you need? <span style={{ textTransform: "none", letterSpacing: 0, color: dim(0.25) }}>(pick any)</span></label>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n) => {
                      const on = needs.includes(n);
                      return (
                        <button key={n} type="button" onClick={() => toggleNeed(n)} className="py-2 px-3.5 rounded-full text-xs font-medium transition-all duration-150"
                          style={{ background: on ? "rgba(174,144,76,0.14)" : "rgba(255,255,255,0.04)", border: `1px solid ${on ? "rgba(174,144,76,0.5)" : "rgba(255,255,255,0.08)"}`, color: on ? gold : dim(0.5) }}>
                          {on ? "✓ " : ""}{n}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: dim(0.45) }}>Anything else? <span style={{ textTransform: "none", letterSpacing: 0, color: dim(0.25) }}>(optional)</span></label>
                  <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={3} placeholder="Goals, budget range, dates…"
                    className="w-full rounded-lg px-3.5 py-2.5 text-sm resize-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: ink, outline: "none" }} />
                </div>
                <label className="flex items-start gap-2.5 mb-5 cursor-pointer">
                  <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 rounded cursor-pointer" style={{ accentColor: gold }} />
                  <span className="text-xs leading-relaxed" style={{ color: dim(0.42) }}>
                    I agree to receive SMS messages from PowerClub Global about my roadshow and related communications.
                    Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. See our{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: goldBright, textDecoration: "underline" }}>Privacy Policy</a>.{" "}
                    <span style={{ color: dim(0.25) }}>(optional)</span>
                  </span>
                </label>
                <button type="submit" disabled={submitting} className="btn-gold w-full justify-center" style={submitting ? { opacity: 0.6, cursor: "not-allowed" } : undefined}>
                  {submitting ? "Sending…" : "Send my roadshow request →"}
                </button>
                <p className="text-center text-xs mt-4" style={{ color: dim(0.3) }}>
                  Prefer to talk? <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: goldBright }}>Book a strategy call</a>
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="aurora" />
        <div className="relative z-10 max-w-xl mx-auto">
          <FadeIn>
            <h2 className="font-extrabold mb-7" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.05 }}>
              The next conference is <span className="serif gold-text">coming.</span>
            </h2>
            <p className="mb-8 text-sm" style={{ color: dim(0.5) }}>Let&rsquo;s make sure they remember you were there.</p>
            <button onClick={() => scrollTo(inquiryRef)} className="btn-gold">Plan your roadshow <span className="arrow">→</span></button>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <TheodoreConcierge />
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required, optional }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean; optional?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: "rgba(232,234,240,0.45)" }}>
        {label} {optional && <span style={{ color: "rgba(232,234,240,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>}
      </label>
      <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8eaf0", outline: "none" }} />
    </div>
  );
}
