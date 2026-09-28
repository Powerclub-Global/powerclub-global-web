import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import NewsletterSignup from "./NewsletterSignup";

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-amber-500/10 to-amber-300/10 blur-[128px] animate-blob" />
        <div className="absolute -top-[10%] right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-amber-400/10 to-amber-200/10 blur-[96px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-amber-500/10 to-amber-300/10 blur-[128px] animate-blob animation-delay-4000" />
      </div>

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Newsletter */}
          <div className="mb-12 max-w-xl">
            <p className="text-[#ae904c] text-sm uppercase tracking-widest mb-2">
              The Powerclub Dispatch
            </p>
            <p className="text-white/50 text-sm mb-4">
              Conference intel, momentum plays, and network invites — straight
              from the circuit.
            </p>
            <NewsletterSignup />
          </div>
          {/* Logo and Social Links */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <img
              src="/logo.webp"
              alt="Logo"
              className="w-20 mb-4 md:mb-0"
            />
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/powerclub.global/"
      aria-label="Powerclub Global on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/p/Powerclub-Global-100093219199164/"
      aria-label="Powerclub Global on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/powerclubglobal"
      aria-label="Powerclub Global on X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>

              <a
                href="https://www.youtube.com/@powerclubglobal"
      aria-label="Powerclub Global on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/powerclubglboal"
      aria-label="Powerclub Global on Telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <FaTelegram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/powerclub-global-usa"
      aria-label="Powerclub Global on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Site navigation — the header nav is the only other route into
              these pages, and /sovereign-stack had no internal link at all. */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8 text-sm"
          >
            {[
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/events", label: "Conferences" },
              { href: "/press", label: "Press" },
              { href: "/insights", label: "Insights" },
              { href: "/sovereign-stack", label: "Sovereign Stack" },
              { href: "/discovery-call", label: "Book a Call" },
              { href: "/schedule-call", label: "Schedule a Call" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/60 hover:text-amber-400 transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <p className="text-center text-xs text-white/40 max-w-xl mx-auto mb-8">
            &ldquo;Text Theodore&rdquo; opens a message to +1 (645) 233-0500.
            Theodore is our AI client-relations assistant. Message and data
            rates may apply; reply STOP to opt out.
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} Powerclub Global. All rights
              reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-amber-400 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-amber-400 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
