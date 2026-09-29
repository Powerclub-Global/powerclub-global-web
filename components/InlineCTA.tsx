"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/gtag";
import TextTheodoreModal from "./TextTheodoreModal";
import { BOOK_HREF, BOOK_LABEL, withContext, type BookingContext } from "@/lib/booking";

interface InlineCTAProps {
  heading: string;
  body?: string;
  /** Topic / event context carried into the booking page. */
  context?: BookingContext;
  /** Overrides the default booking route (e.g. a service-specific one). */
  bookHref?: string;
  /** Shown in the pre-filled text to Theodore, e.g. "roadshow management". */
  textContext?: string;
}

// A short prompt placed after the strongest section of a page, so the first
// way to act is not 80% of the way down. Same ladder as everywhere else:
// book a call, or text Theodore.
const InlineCTA: React.FC<InlineCTAProps> = ({ heading, body, context, bookHref, textContext }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  return (
    <section className="w-full px-4 py-12">
      <div className="max-w-5xl mx-auto rounded-xl border border-[#ae904c]/30 bg-gradient-to-br from-[#ae904c]/10 to-black/40 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#ae904c]">{heading}</h2>
          {body && <p className="mt-2 text-white/65 max-w-xl">{body}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={bookHref ?? withContext(BOOK_HREF, context)}
            onClick={() => track("cta_click", { cta: "inline_book", page: pathname })}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors"
          >
            {BOOK_LABEL} <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              track("text_theodore_click", { placement: "inline" });
              setOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#ae904c]/40 text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Text Theodore
          </button>
        </div>
      </div>
      <TextTheodoreModal open={open} onClose={() => setOpen(false)} context={textContext} />
    </section>
  );
};

export default InlineCTA;
