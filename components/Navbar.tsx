"use client";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Menu, X, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

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

const NavItem: React.FC<NavItemProps> = ({
  text,
  href,
  isMobile,
  isContact,
  onClick,
}) => (
  <button
    className={`group relative ${
      isContact
        ? "bg-[#ae904c] text-white px-6 py-2 rounded-md hover:bg-[#98803f] transition-colors duration-300"
        : `px-4 py-2 ${isMobile ? "w-full text-center" : ""}`
    }`}
    onClick={(e) => {
      if (isContact) {
        trackCtaClick({
          cta: "nav_contact",
          location: isMobile ? "navbar_mobile" : "navbar",
          destination: href,
        });
      }
      if (onClick) {
        e.preventDefault();
        onClick();
      }
      window.location.href = href;
    }}
  >
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
  </button>
);

const SocialLinks = () => (
  <div className="flex space-x-6">
    <a
      href="https://www.instagram.com/powerclub.global/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
    >
      <Instagram className="w-5 h-5" />
    </a>
    <a
      href="https://www.facebook.com/p/Powerclub-Global-100093219199164/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
    >
      <Facebook className="w-5 h-5" />
    </a>
    <a
      href="https://x.com/powerclubglobal"
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
    >
      <FaXTwitter className="w-5 h-5" />
    </a>

    <a
      href="https://www.youtube.com/@powerclubglobal"
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
    >
      <Youtube className="w-5 h-5" />
    </a>
    <a
      href="t.me/powerclubglboal"
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-400/60 hover:text-amber-400 transition-colors duration-300"
    >
      <FaTelegram className="w-5 h-5" />
    </a>
    <a
      href="https://www.linkedin.com/company/powerclub-global-usa"
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

  const navItems = [
    { text: "ABOUT", href: "/about" },
    { text: "EVENTS", href: "/events" },
    { text: "SERVICES", href: "/services" },
    { text: "PRESS RELEASES", href: "/press" },
    { text: "CONTACT", href: "/contact", isContact: true },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-4 md:px-8 py-2 ${inter.className} bg-black`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <img src="/logo-transparent.png" alt="Home" className="w-20" />
          </Link>
          {navItems.map((item) => (
            <NavItem
              key={item.text}
              text={item.text}
              href={item.href}
              isContact={item.isContact}
            />
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden justify-between items-center relative z-50">
          <Link href="/" className="cursor-pointer">
            <img src="/logo-transparent.png" alt="Home" className="w-16" />
          </Link>
          <button className="p-2" onClick={() => setIsOpen(!isOpen)}>
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
            <img src="/logo-transparent.png" alt="Logo" className="w-32" />
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
                  onClick={() => setIsOpen(false)}
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
    </nav>
  );
};

export default Navbar;
