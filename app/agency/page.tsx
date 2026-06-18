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

const HANDLED = [
  { name: "Customer messages", desc: "Answered in minutes, on every channel" },
  { name: "Lead follow-up", desc: "Every enquiry chased to the sale" },
  { name: "Social media", desc: "Posted, managed, and growing" },
  { name: "Content & email", desc: "Written and sent for you" },
  { name: "Reviews & reputation", desc: "More 5-star reviews, handled" },
  { name: "Bookings & scheduling", desc: "Your calendar, filled for you" },
];

const SERVICES = [
  {
    no: "01", name: "Your AI Front Desk", tag: "Start here", blurb: "Never miss a customer again.",
    points: ["Answers customer messages day and night, on every channel", "Follows up with every lead so none slip away", "Books appointments straight into your calendar", "Up and running in about two weeks"],
    featured: true,
  },
  {
    no: "02", name: "Marketing on Autopilot", tag: "Most popular", blurb: "A steady stream of customers, handled for you.",
    points: ["Social media posted and managed for you", "Email and content that brings people back", "Every lead nurtured and chased to the sale", "A monthly report so you see what's working"],
    featured: false,
  },
  {
    no: "03", name: "Custom Builds", tag: "Bespoke", blurb: "Need a website, app, or tool? We build it.",
    points: ["Websites that turn visitors into customers", "Custom apps and internal tools for your team", "Automations that save hours every week", "Built fast, and built to last"],
    featured: false,
  },
];

const PROCESS = [
  { num: "01", title: "We learn your business", body: "A quick call to understand your goals, your customers, and where you're losing time and money." },
  { num: "02", title: "We set everything up", body: "We build and launch it all for you — usually within two weeks. Almost nothing on your end." },
  { num: "03", title: "We run it, you grow", body: "We handle it day to day and send you the results. You get back to running your business." },
];

const EDGE = [
  { title: "We do the work", body: "Not another consultant with a slide deck. We roll up our sleeves and actually run it for you — start to finish." },
  { title: "You stay in control", body: "You approve what matters and we handle the rest, your way. Cancel anytime — no long lock-in contracts." },
  { title: "A team plus smart AI", body: "Real people backed by AI tools we build ourselves. You get more done, faster, for a lot less than hiring." },
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

export default function AgencyPage() {
  const bookingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) => r.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              Now booking free strategy calls
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
              className="font-extrabold leading-[0.98] mb-6" style={{ fontSize: "clamp(2.7rem, 6.5vw, 5.4rem)" }}>
              Own your business.
              <br />
              <span className="serif gold-text">We&rsquo;ll handle the rest.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.18 }}
              className="max-w-xl mb-9 leading-relaxed" style={{ fontSize: "clamp(1rem, 2vw, 1.18rem)", color: dim(0.6) }}>
              You built it — now stay the owner, not the operator. PowerClub Global wins you more
              customers, answers every message, and takes the busywork off your plate. We do the
              growing; you run the business.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo(bookingRef)} className="btn-gold">Book a free strategy call <span className="arrow">→</span></button>
              <button onClick={openTheodore} className="btn-ghost">💬 Chat with Theodore</button>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }} className="mono mt-6 text-xs tracking-wide" style={{ color: dim(0.3) }}>
              No pressure · No jargon · Cancel anytime
            </motion.p>
          </div>

          <div className="relative" style={{ perspective: "1200px" }}>
            <div style={{ transform: "rotateX(13deg) rotateY(-7deg)", transformStyle: "preserve-3d" }}>
              <p className="eyebrow mb-3 pl-1">We handle this · you own it</p>
              {HANDLED.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: -16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }} className="glass flex items-center gap-4 px-5 py-3.5 mb-2.5"
                  style={{ transform: `translateZ(${i * 4}px)` }}>
                  <span className="flex items-center justify-center w-7 h-7 rounded-full shrink-0" style={{ background: "rgba(174,144,76,0.15)", color: gold }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs truncate" style={{ color: dim(0.4) }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={servicesRef} className="relative px-6 py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">How we help</p>
            <h2 className="font-extrabold leading-tight mb-3" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Pick the help your business <span className="serif gold-text">needs</span>
            </h2>
            <p className="text-sm mb-12" style={{ color: dim(0.45) }}>We do the work — you see the results. Tell us where you want to grow and we&rsquo;ll handle it.</p>
          </FadeIn>
          <div className="grid lg:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <FadeIn key={svc.no} delay={i * 0.1}>
                <div className={`flex flex-col h-full p-7 ${svc.featured ? "glass-gold rounded-[1.1rem]" : "glass"}`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="mono text-xs" style={{ color: dim(0.25) }}>{svc.no}</span>
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: svc.featured ? "rgba(174,144,76,0.18)" : "rgba(255,255,255,0.05)", color: svc.featured ? goldBright : dim(0.5) }}>{svc.tag}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{svc.name}</h3>
                  <p className="text-sm mb-5" style={{ color: dim(0.5) }}>{svc.blurb}</p>
                  <ul className="flex-1 space-y-3 mb-7">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-sm" style={{ color: dim(0.55) }}><span style={{ color: gold }}>→</span><span>{pt}</span></li>
                    ))}
                  </ul>
                  <button onClick={() => scrollTo(bookingRef)} className={svc.featured ? "btn-gold justify-center" : "btn-ghost justify-center"}>Book a free call</button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative px-6 py-16" style={{ background: "rgba(255,255,255,0.012)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>Up and running in <span className="serif gold-text">two weeks</span></h2>
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

      {/* ── WHY US ── */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="eyebrow mb-4">Why owners choose us</p>
            <h2 className="font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>Like hiring a team — without the <span className="serif gold-text">headache</span></h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            {EDGE.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="glass h-full p-7">
                  <h3 className="text-lg font-bold mb-3" style={{ color: goldBright }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: dim(0.5) }}>{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section ref={bookingRef} className="relative px-6 py-16" style={{ background: "rgba(174,144,76,0.025)", borderTop: "1px solid rgba(174,144,76,0.12)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="eyebrow justify-center mb-3">Your free strategy call</p>
              <h2 className="font-extrabold mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>30 minutes. No pressure.<br /><span className="serif" style={{ color: dim(0.4) }}>Pick a time that works.</span></h2>
              <p className="text-sm mt-3" style={{ color: dim(0.4) }}>We&rsquo;ll show you exactly how we&rsquo;d help your business grow.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <BookingCalendar slotsUrl="/api/agency/slots" bookUrl="/api/agency/book" />
          </FadeIn>
          <p className="text-center text-xs mt-6" style={{ color: dim(0.3) }}>
            Not ready to book? <button onClick={openTheodore} className="underline" style={{ color: goldBright }}>Chat with Theodore</button> first.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="aurora" />
        <div className="relative z-10 max-w-xl mx-auto">
          <FadeIn>
            <h2 className="font-extrabold mb-7" style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", lineHeight: 1.05 }}>
              Own your business. <span className="serif gold-text">We&rsquo;ll grow it.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollTo(bookingRef)} className="btn-gold">Book a free strategy call <span className="arrow">→</span></button>
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
