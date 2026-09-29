"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare, Phone, Mail, CalendarClock, X } from "lucide-react";
import { track } from "@/lib/gtag";
import {
  smsHref,
  BOOK_HREF,
  BOOK_LABEL,
  MESSAGE_HREF,
  MESSAGE_LABEL,
  THEODORE_NUMBER,
  THEODORE_NUMBER_DISPLAY,
} from "@/lib/booking";

interface Props {
  open: boolean;
  onClose: () => void;
  /** What the visitor is looking at, e.g. "TOKEN2049 Dubai 2027". Goes into the pre-filled text. */
  context?: string;
}

// Text-first contact panel. A bare sms: link does nothing on most desktop
// browsers, so the panel also carries a QR code (the same sms: URI) to scan
// from a phone, a call link, and the form routes for people who won't text.
const TextTheodoreModal: React.FC<Props> = ({ open, onClose, context }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="text-theodore-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-md border border-[#ae904c]/30 bg-[#0b0c10] text-white shadow-2xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 text-white/50 hover:text-[#ae904c] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <h2
            id="text-theodore-title"
            className="text-2xl md:text-3xl font-semibold text-[#ae904c] pr-8"
          >
            Text Theodore. No form to fill out.
          </h2>
          <p className="mt-3 text-white/65 max-w-lg">
            Theodore is our AI client-relations assistant. Send a text and he
            replies right away with answers about our services and can help
            you book a call.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] items-start rounded-md border border-[#ae904c]/15 p-5">
            <div className="space-y-3">
              <a
                href={smsHref(context)}
                onClick={() => track("text_theodore_click", { placement: "modal_text" })}
                className="flex items-center justify-center gap-2 rounded-md bg-[#ae904c] px-5 py-3 font-medium text-black hover:bg-[#c2a45c] transition-colors"
              >
                <MessageSquare className="w-4 h-4" /> Text Theodore
              </a>
              <a
                href={`tel:${THEODORE_NUMBER}`}
                onClick={() => track("text_theodore_click", { placement: "modal_call" })}
                className="flex items-center justify-center gap-2 rounded-md border border-[#ae904c]/40 px-5 py-3 text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors"
              >
                <Phone className="w-4 h-4" /> Call {THEODORE_NUMBER_DISPLAY}
              </a>
              <p className="text-xs text-white/40 leading-relaxed">
                Message and data rates may apply. Reply STOP to opt out.
              </p>
            </div>
            <div className="hidden md:block text-center">
              <img
                src="/text-theodore-qr.svg"
                alt="QR code that opens a text to Theodore"
                width={136}
                height={136}
                className="rounded bg-white p-1.5 w-[136px] h-[136px]"
              />
              <p className="mt-2 text-xs text-white/50">Scan from your phone</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-white/40">
            <div className="h-px flex-1 bg-[#ae904c]/15" />
            Prefer a call or a message?
            <div className="h-px flex-1 bg-[#ae904c]/15" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={BOOK_HREF}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md border border-[#ae904c]/15 p-4 hover:border-[#ae904c]/40 transition-colors"
            >
              <CalendarClock className="w-5 h-5 text-[#ae904c]" />
              <span>
                <span className="block">{BOOK_LABEL}</span>
                <span className="block text-xs text-white/45">Pick a time that suits you</span>
              </span>
            </Link>
            <Link
              href={MESSAGE_HREF}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md border border-[#ae904c]/15 p-4 hover:border-[#ae904c]/40 transition-colors"
            >
              <Mail className="w-5 h-5 text-[#ae904c]" />
              <span>
                <span className="block">{MESSAGE_LABEL}</span>
                <span className="block text-xs text-white/45">Email or the contact form</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextTheodoreModal;
