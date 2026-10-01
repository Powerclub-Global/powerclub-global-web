"use client";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Menu, X, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { track } from "@/lib/gtag";
import TextTheodoreModal from "./TextTheodoreModal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

interface NavItemProps {
  text: string;
  href: string;
  isMobile?: boolean;
  isContact?: boolean;
  onClick?: () => void;
}

// Rendered as a real anchor: these were <button onClick={window.location}>,
// which meant crawlers saw no internal links at all (every page read as an
// orphan), middle-click/open-in-new-tab did nothing, and each nav click cost
// a full page reload instead of a client-side transition.
const NavItem: React.FC<NavItemProps> = ({
  text,
  href,
  isMobile,
  isContact,
  onClick,
}) => {
  const className = `group relative inline-flex items-center justify-center ${
    isContact
      ? "bg-[#ae904c] text-white px-6 py-2 rounded-md hover:bg-[#98803f] transition-colors duration-300"
      : `px-4 py-2 ${isMobile ? "w-full text-center" : ""}`
  }`;
  const label = (
    <>
      <span
        className={`text-sm font-light tracking-widest ${
          isContact
            ? "text-white"
            : isMobile
            ? "text-amber-400/90"
            : "text-amber-400/50 group-hover:text-amber-400/80"
        }`}
      >
        {text}
      </span>
      {!isContact && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400/70" />
      )}
    </>
  );
  // The contact slot is a button: it opens the Text Theodore panel rather
  // than navigating.
  return isContact ? (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  ) : (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
};

const SocialLinks = () => (
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
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const [textContext, setTextContext] = useState<string | undefined>();

  // Pages that know what they are about mark themselves with
  // data-page-context, so the pre-filled text can name it.
  const openText = (placement: string) => {
    track("text_theodore_click", { placement });
    setTextContext(
      document.querySelector("[data-page-context]")?.getAttribute("data-page-context") || undefined
    );
    setTextOpen(true);
  };

  const navItems = [
    { text: "ABOUT", href: "/about" },
    { text: "CONFERENCES", href: "/conferences" },
    { text: "SERVICES", href: "/services" },
    { text: "PRESS RELEASES", href: "/press" },
    { text: "TEXT THEODORE", href: "#", isContact: true },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-4 md:px-8 py-2 ${inter.className} bg-black`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <img src="/logo.webp" alt="Home" className="w-20" />
          </Link>
          {navItems.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              href={item.href}
              isContact={item.isContact}
              onClick={
                item.isContact
                  ? () => openText("nav")
                  : undefined
              }
            />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-center relative z-50">
          <Link href="/" className="cursor-pointer">
            <img src="/logo.webp" alt="Home" className="w-16" />
          </Link>
          <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-amber-400/50" />
            ) : (
              <Menu className="h-6 w-6 text-amber-400/50" />
            )}
          </button>
        </div>

        {/* Full-screen Mobile Navigation Menu */}
        <div
          className={`
            md:hidden 
            fixed left-0 right-0 bottom-0
            bg-black 
            transition-all duration-300 ease-in-out
            ${
              isOpen
                ? "top-16 opacity-100 pointer-events-auto"
                : "-top-full opacity-0 pointer-events-none"
            }
            flex flex-col
            z-40
          `}
        >
          {/* PCG Logo at top with larger size */}
          <div className="flex justify-center pt-8">
            <img src="/logo.webp" alt="Logo" className="w-32" />
          </div>

          {/* Main navigation items */}
          <div className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
            {navItems.map((item, index) => (
              <div
                key={item.text}
                className={`transform transition-all duration-300 delay-${
                  index * 100
                }`}
              >
                <NavItem
                  text={item.text}
                  href={item.href}
                  isMobile
                  isContact={item.isContact}
                  onClick={() => {
                    setIsOpen(false);
                    if (item.isContact) openText("nav_mobile");
                  }}
                />
              </div>
            ))}
          </div>

          {/* Social Links at Bottom */}
          <div className="p-8 flex flex-col items-center space-y-6">
            <SocialLinks />
          </div>
        </div>
      </div>
      <TextTheodoreModal
        open={textOpen}
        onClose={() => setTextOpen(false)}
        context={textContext}
      />
    </nav>
  );
};

export default Navbar;
