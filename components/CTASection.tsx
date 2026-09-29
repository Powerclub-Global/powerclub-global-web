"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@/lib/gtag";
import {
  BOOK_HREF,
  BOOK_LABEL,
  MESSAGE_HREF,
  MESSAGE_LABEL,
} from "@/lib/booking";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  headingText?: string; // New prop for heading text
  paragraphText?: string; // New prop for paragraph text
  /** Defaults to the sitewide booking route; pass one to carry a topic. */
  primaryHref?: string;
  secondaryHref?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Let's Work Together!",
  description = "Let's work together to achieve your goals. Our team of experts is ready to help bring your vision to life.",
  primaryButtonText = BOOK_LABEL,
  secondaryButtonText = MESSAGE_LABEL,
  onPrimaryClick,
  onSecondaryClick,
  headingText, // Added new prop
  paragraphText, // Added new prop
  primaryHref = BOOK_HREF,
  secondaryHref = MESSAGE_HREF,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const primaryClass =
    "px-8 py-4 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors duration-300 flex items-center justify-center gap-2";
  const secondaryClass =
    "px-8 py-4 rounded-lg border border-[#ae904c]/30 text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300 flex items-center justify-center gap-2";

  const handlePrimaryClick = () => {
    track("cta_click", { cta: "primary", page: pathname || "/" });
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      router.push(primaryHref);
    }
  };

  const handleSecondaryClick = () => {
    track("cta_click", { cta: "secondary", page: pathname || "/" });
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      router.push(secondaryHref);
    }
  };

  // Use headingText if provided, otherwise fall back to title
  const displayHeading = headingText || title;

  // Use paragraphText if provided, otherwise fall back to description
  const displayParagraph = paragraphText || description;

  return (
    <div className="relative w-full bg-black/95 py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 w-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#ae904c 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 w-full">
        <div className="relative mx-auto w-full">
          {/* Border Frame */}
          <div className="absolute inset-0 rounded-xl border border-[#ae904c]/70" />

          {/* Content Box */}
          <div
            className="relative rounded-xl backdrop-blur-sm bg-black/20 border border-[#ae904c]/70 p-12
              transform-gpu transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2 text-center"
          >
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c] to-[#ae904c]/80">
                {displayHeading}
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12">
              {displayParagraph}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {onPrimaryClick ? (
                <button
                  onClick={handlePrimaryClick}
                  className={primaryClass}
                >
                  {primaryButtonText} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={primaryHref}
                  onClick={() => track("cta_click", { cta: "primary", page: pathname || "/" })}
                  className={primaryClass}
                >
                  {primaryButtonText} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {onSecondaryClick ? (
                <button
                  onClick={handleSecondaryClick}
                  className={secondaryClass}
                >
                  {secondaryButtonText} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href={secondaryHref}
                  onClick={() => track("cta_click", { cta: "secondary", page: pathname || "/" })}
                  className={secondaryClass}
                >
                  {secondaryButtonText} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
