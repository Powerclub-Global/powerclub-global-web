"use client";

import React from "react";
import {
  ArrowRight,
  Car,
  Code,
  Globe,
  Palette,
  Share2,
  MessageSquare,
  Newspaper,
  PartyPopper,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import DarkGridBackground from "@/components/DarkGridBackground3";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  className?: string;
  imageBelow?: boolean;
  href?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  className = "",
  imageBelow = false,
  href = "#",
}) => (
  <Link
    href={href}
    className={`group relative rounded-md perspective-1000 ${className}`}
  >
    <div className="preserve-3d transition-all duration-500 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
      <div className="absolute inset-0 rounded-md bg-black/30 blur-xl transform translate-y-4 scale-95 transition-all duration-500 group-hover:translate-y-6 group-hover:scale-90" />
      <div
        className="relative rounded-md backdrop-blur-sm bg-gradient-to-b from-[#ae904c]/5 to-[#ae904c]/0 
        border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-500
        before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r 
        before:from-[#ae904c]/0 before:via-[#ae904c]/5 before:to-[#ae904c]/0 
        before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500"
      >
        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/10 via-transparent to-[#ae904c]/10 animate-gradient-shift" />
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/20 via-[#ae904c]/5 to-[#ae904c]/20 blur-sm group-hover:animate-pulse" />
        </div>

        {!image ? (
          <div className="relative z-10 p-8 transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
              <Icon
                className="w-8 h-8 text-[#ae904c]"
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <h2 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
              {title}
            </h2>
            <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
              {description}
            </p>
            <div
              className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 
              group-hover:translate-x-2 relative overflow-hidden
              before:absolute before:-inset-3 before:rounded-lg before:bg-[#ae904c]/5 
              before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300"
            >
              Learn More{" "}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        ) : imageBelow ? (
          <div className="relative z-10 h-full flex flex-col transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="p-8 flex-1">
              <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
                <Icon
                  className="w-8 h-8 text-[#ae904c]"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
                {title}
              </h2>
              <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
                {description}
              </p>
              <div className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 group-hover:translate-x-2">
                Learn More{" "}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div className="p-8 pt-0">
              <div className="relative w-full h-[19rem] rounded-lg overflow-hidden bg-[#ae904c]/10 transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={image}
                  alt={`${title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-full flex transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="relative z-10 p-8 flex-1">
              <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
                <Icon
                  className="w-8 h-8 text-[#ae904c]"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
                {title}
              </h2>
              <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
                {description}
              </p>
              <div className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 group-hover:translate-x-2">
                Learn More{" "}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div className="flex-1 p-8">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#ae904c]/10 transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={image}
                  alt={`${title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </Link>
);

// Roadshow and Experiences are the offer; press and influencer relations are
// how the coverage-for-credentials model actually works, so all four earn a page.
const FEATURED_IDS = [
  "roadshow-management",
  "experiences",
  "press-relations",
  "influencer-relations",
];

const services = [
  {
    id: "roadshow-management",
    title: "Roadshow Management",
    description:
      "Professional roadshow services delivering your message across cities with maximum impact and engagement. Backed by our network of local partners.",
    icon: Car,
    image: "/roadshow.webp",
    imageBelow: true,
  },
  {
    id: "social-media",
    title: "Social Media",
    description:
      "Strategic social media management to boost your brand presence and connect with your target audience.",
    icon: Share2,
  },
  {
    id: "development",
    title: "Web Development",
    description:
      "Custom web solutions that combine cutting-edge technology with seamless UX to bring your digital vision to life.",
    icon: Code,
  },
  {
    id: "experiences",
    title: "Experiences",
    description:
      "Unforgettable event experiences that bring your vision to life and leave lasting impressions.",
    icon: PartyPopper,
    image: "/event.webp",
  },
  {
    id: "blockchain-consulting",
    title: "Blockchain Solutions",
    description:
      "Strategic guidance for blockchain integration and Web3 transformation.",
    icon: Globe,
  },
  {
    id: "branding",
    title: "Branding",
    description: "Comprehensive brand strategy and identity development.",
    icon: Palette,
  },
  {
    id: "influencer-relations",
    image: "/services/influencer-relations1.webp",
    title: "Influencer Relations",
    description: "Connect with authentic voices in the industry.",
    icon: MessageSquare,
  },
  {
    id: "press-relations",
    image: "/services/press-relations4.webp",
    title: "Press Relations",
    description: "Strategic media coverage and PR campaign management.",
    icon: Newspaper,
  },
];

const featured = FEATURED_IDS.map((id) => services.find((s) => s.id === id)!).filter(Boolean);
const supporting = services.filter((s) => !FEATURED_IDS.includes(s.id));

export default function ServicesPage() {
  return (
    <DarkGridBackground>
      <main className="min-h-screen bg-black">
        <Navbar />

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-12">
          <div className="max-w-6xl mx-auto mb-20">
            <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6">
              <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              How We Can Help
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6">
              <span className="whitespace-normal lg:whitespace-nowrap">
                Empowering Your Brand
              </span>
              <br />{" "}
              <span className="font-bold text-[#ae904c] whitespace-normal lg:whitespace-nowrap">
                With Our Services
              </span>
              <br />{" "}
              and Solutions
            </h1>
            <p className="text-white/60 max-w-2xl text-lg">
              Comprehensive solutions focused on delivering impactful roadshows
              and supporting services that elevate your brand and create
              memorable experiences.
            </p>
          </div>

          {/* Three services carry the business; the rest are capabilities
              that support them rather than pages competing for their own
              queries. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {featured.map((svc) => (
              <div key={svc.id} className="h-full">
                <ServiceCard
                  {...svc}
                  className="h-full"
                  href={`/services/${svc.id}`}
                  imageBelow
                />
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto mt-16 border-t border-[#ae904c]/20 pt-10">
            <h2 className="text-[#ae904c] text-sm uppercase tracking-widest mb-3">
              Also delivered as part of an engagement
            </h2>
            <p className="text-white/60 max-w-2xl mb-6">
              These run inside a roadshow or activation rather than as
              standalone retainers. Ask about them on your call.
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-3 list-none p-0">
              {supporting.map((svc) => (
                <li
                  key={svc.id}
                  className="px-4 py-2 rounded-full border border-[#ae904c]/25 text-white/75 text-sm"
                >
                  {svc.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CTASection
          title="Ready to Make an Impact?"
          description="Whether you're planning a roadshow or need supporting services, we're here to help you succeed."
          primaryButtonText="Start Your Journey"
          secondaryButtonText="Explore Services"
        />

        <Footer />
      </main>
    </DarkGridBackground>
  );
}
