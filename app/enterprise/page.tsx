"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TheodoreConcierge from "@/components/TheodoreConcierge";
import BookingCalendar from "@/components/BookingCalendar";

const gold = "#ae904c";
const goldBright = "#c9a95e";
const bg = "#08090c";
const ink = "#e8eaf0";
const EASE = [0.22, 1, 0.36, 1] as const;

const STACK = [
  { name: "Pythia", role: "Private AI & distributed compute" },
  { name: "Alpha Protocol", role: "Sovereign data & ZK identity" },
  { name: "Omega · Vibertas", role: "Private hardware & operating system" },
  { name: "ORCHA", role: "Unified operations dashboard" },
  { name: "Spectrum", role: "Resilient mesh + satellite connectivity" },
  { name: "VIBE", role: "Native settlement & economy" },
];

const VALUE = [
  { title: "Private AI, not rented", body: "Run your own models on your own compute. Your prompts, data, and outputs never train someone else's product." },
  { title: "Data sovereignty", body: "Your data stays yours — encrypted, ZK-verified, never sitting in a third party's custody." },
  { title: "No vendor lock-in", body: "Open and portable by design. Own the stack, swap any layer, leave whenever — you never will." },
  { title: "Secure & compliant", body: "Private by default, deployed in your environment, built for the controls your industry demands." },
];

const PROCESS = [
  { num: "01", title: "Assess", body: "We map your current stack, data, and goals — and identify what to bring sovereign first." },
  { num: "02", title: "Architect", body: "We design your deployment: which layers, where they run, and how they integrate with what you have." },
  { num: "03", title: "Deploy", body: "We stand up your sovereign infrastructure and migrate workloads — with zero drama." },
  { num: "04", title: "Operate", body: "We run and support it alongside your team, scaling layers as your needs grow." },
];

const ENTERPRISE_NEEDS = [
  { id: "ai", label: "Private AI" },
  { id: "data", label: "Data sovereignty" },
  { id: "infra", label: "Sovereign infra" },
  { id: "compliance", label: "Compliance" },
  { id: "all", label: "All of it" },
];

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

export default function EnterprisePage() {
  const briefingRef = useRef<HTMLDivElement>(null);
  const scrollToBriefing = () => briefingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openTheodore = () => window.dispatchEvent(new Event("theodore:open"));
  const dim = (o: number) => `rgba(232,234,240,${o})`;

  return (
    <div className="fnl" style={{ backgroundColor: bg, color: ink, minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="aurora" />
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(rgba(174,144,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(174,144,76,0.06) 1px, transparent 1px)`, backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 80% 60% at 40% 0%, #000 30%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 40% 0%, #000 30%, transparent 75%)" }} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow mb-7">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: gold, display: "inline-block", animation: "blob 2s ease-in-out infinite" }} />
              Enterprise · Sovereign Stack onboarding
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-extrabold leading-[0.98] mb-6" style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)" }}>
              Own your stack.
              <br />
              <span className="serif gold-text">Don&rsquo;t rent it from Big Tech.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.18 }}
              className="max-w-xl mb-9 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.18rem)", color: dim(0.6) }}>
              Most enterprises rent everything — cloud, AI, identity, connectivity — and own nothing.
              The Sovereign Stack gives you private AI, sovereign data, and your own infrastructure,
              architected and deployed with you.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={scrollToBriefing} className="btn-gold">Book an enterprise briefing <span className="arrow">→</span></button>
              <button onClick={openTheodore} className="btn-ghost">💬 Chat with Theodore</button>
            </motion.div>
          </div>

          {/* stack tower */}
          <div className="relative" style={{ perspective: "1200px" }}>
            <div style={{ transform: "rotateX(14deg) rotateY(-7deg)", transformStyle: "preserve-3d" }}>
              <p className="eyebrow mb-3 pl-1">One stack · fully yours</p>
              {STACK.map((layer, i) => (
                <motion.div key={layer.name} initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }} className="glass flex items-center gap-4 px-5 py-3.5 mb-2.5"
                  style={{ transform: `translateZ(${i * 4}px)` }}>
                  <span className="mono text-xs shrink-0" style={{ color: dim(0.25) }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm tracking-wide" style={{ color: goldBright }}>{layer.name}</div>
                    <div className="text-xs truncate" style={{ color: dim(0.4) }}>{layer.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── POSITIONING BAND ── */}
      <section className="relative px-6 py-14" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.012)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}>
              Today, your most critical systems run on someone else&rsquo;s servers, under someone
              else&rsquo;s rules. <span className="serif gold-text">We change who&rsquo;s in control.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── VALUE ── */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">What you get</p>
            <h2 className="font-extrabold leading-tight mb-12" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Infrastructure that answers <span className="serif gold-text">to you</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {VALUE.map((v, i) => (
              <FadeIn key={v.title} delay={(i % 2) * 0.1}>
                <div className="glass h-full p-8">
                  <h3 className="text-xl font-bold mb-3" style={{ color: goldBright }}>{v.title}</h3>
                  <p className="leading-relaxed" style={{ color: dim(0.5) }}>{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONBOARDING ── */}
      <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">How onboarding works</p>
            <h2 className="font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>From rented to <span className="serif gold-text">sovereign</span></h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="text-5xl font-extrabold leading-none mb-1" style={{ color: "rgba(174,144,76,0.16)", letterSpacing: "-0.04em" }}>{step.num}</div>
                <div className="h-px w-full mb-5" style={{ background: "linear-gradient(90deg, rgba(174,144,76,0.5), transparent)" }} />
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: dim(0.5) }}>{step.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIEFING (calendar) ── */}
      <section ref={briefingRef} className="relative px-6 py-20" style={{ background: "rgba(174,144,76,0.025)", borderTop: "1px solid rgba(174,144,76,0.12)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="eyebrow justify-center mb-3">Book a private briefing</p>
              <h2 className="font-extrabold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>Map your path to <span className="serif gold-text">sovereignty.</span></h2>
              <p className="text-sm mt-3" style={{ color: dim(0.45) }}>Pick a time and we&rsquo;ll walk your team through exactly what going sovereign looks like — confidentially.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <BookingCalendar slotsUrl="/api/enterprise/slots" bookUrl="/api/enterprise/book" needs={ENTERPRISE_NEEDS} />
          </FadeIn>
          <p className="text-center text-xs mt-6" style={{ color: dim(0.3) }}>
            Have questions first? <button onClick={openTheodore} className="underline" style={{ color: goldBright }}>Chat with Theodore</button>.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="aurora" />
        <div className="relative z-10 max-w-xl mx-auto">
          <FadeIn>
            <h2 className="font-extrabold mb-7" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.05 }}>
              The future is <span className="serif gold-text">sovereign.</span>
            </h2>
            <p className="mb-8 text-sm" style={{ color: dim(0.5) }}>Own your AI, your data, and your infrastructure — before someone else decides the terms.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToBriefing} className="btn-gold">Book an enterprise briefing <span className="arrow">→</span></button>
              <button onClick={openTheodore} className="btn-ghost">💬 Ask Theodore anything</button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <TheodoreConcierge />
    </div>
  );
}
