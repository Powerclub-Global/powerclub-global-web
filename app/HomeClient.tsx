"use client";
import { motion } from "framer-motion";
import VideoSection from "@/components/AboutSection";
import Partners from "@/components/Carousel";
import ContactSection from "@/components/ContactSection";
import DarkGridBackground from "@/components/DarkGridBackground";
import DarkGridBackground2 from "@/components/DarkGridBackground2";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PressReleaseSection from "@/components/PressReleaseSection";
import ServicesSection from "@/components/ServicesSection";
import EventSection from "@/components/EventSection";
import DarkGridBackground3 from "@/components/DarkGridBackground3";
import Link from "next/link";
import InlineCTA from "@/components/InlineCTA";
import ProofStrip, { type ProofCounts } from "@/components/ProofStrip";
import { BOOK_HREF, BOOK_LABEL } from "@/lib/booking";
import { track } from "@/lib/gtag";

export default function Home({ proof }: { proof: ProofCounts }) {
  return (
    <main className="relative">
      <Navbar />
      <DarkGridBackground>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto text-center -mt-10">
            <img
              className="w-24 h-24 md:w-40 md:h-40 rounded-full mx-auto mb-4"
              src="/logo.webp"
              alt="Logo"
              width={160}
              height={160}
              fetchPriority="high"
            />
            {/* Not animated: this is the LCP element, and fading it in
                deferred Largest Contentful Paint until the animation ended. */}
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight px-4">
              <span className="bg-clip-text text-transparent uppercase bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
                Championing the Bold to Achieve the Extraordinary
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xs md:text-base lg:text-lg text-white/60 mb-8 md:mb-12 uppercase tracking-wide max-w-3xl font-light px-4"
            >
              Powerclub Global is a leading international agency specializing in
              branding, marketing, and digital innovation for early to mid-stage
              technology startups.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              {/* A real link (crawlable, opens in a new tab) to the booking
                  page, styled as the primary action. */}
              <Link
                href={BOOK_HREF}
                onClick={() => track("cta_click", { cta: "hero_book", page: "/" })}
                className="px-6 md:px-10 py-3 md:py-4 bg-[#ae904c] text-black rounded-lg
                hover:bg-[#c9a95e] transition-colors duration-300
                uppercase tracking-wider text-xs md:text-sm font-medium"
              >
                {BOOK_LABEL}
              </Link>
              <Link
                href="/events"
                onClick={() => track("cta_click", { cta: "hero_events", page: "/" })}
                className="px-6 md:px-10 py-3 md:py-4 border border-[#ae904c]/40 text-[#ae904c] rounded-lg
                hover:bg-[#ae904c]/10 transition-colors duration-300
                uppercase tracking-wider text-xs md:text-sm font-light"
              >
                See Upcoming Conferences
              </Link>
            </motion.div>
          </div>
        </div>
      </DarkGridBackground>

      <Partners />

      {proof.writeUps > 0 && <ProofStrip {...proof} />}

      <VideoSection />

      <DarkGridBackground3>
        <EventSection />
        <InlineCTA
          heading="Planning your 2027 conference circuit?"
          body="Tell us which events you are considering. We will say where a sponsorship, a speaking slot or a media partnership is worth it, and where it is not."
          context={{ interest: "sponsor" }}
          textContext="sponsoring at conferences"
        />
      </DarkGridBackground3>

      <DarkGridBackground2>
        <ServicesSection />
      </DarkGridBackground2>

      <PressReleaseSection />

      <ContactSection />

      <Footer />
    </main>
  );
}
