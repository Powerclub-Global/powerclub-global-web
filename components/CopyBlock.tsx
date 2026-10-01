"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Boilerplate the reader is meant to paste somewhere else.
export default function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked: the text is selectable on the page
    }
  };
  return (
    <div className="rounded-lg border border-[#ae904c]/25 bg-black/30 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">{label}</h3>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-sm text-[#ae904c] hover:text-[#c9a95e]"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
