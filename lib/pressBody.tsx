import React from "react";
import Link from "next/link";

// Press articles are stored as plain text. Older pieces are bare paragraphs
// with short unpunctuated lines acting as subheadings; newer ones use a light
// markup so they can carry real structure and links:
//   ## Heading      ### Subheading      - bullet      [anchor](url)
// Anything else is a paragraph. Both generations render through this.

export type PressBlock =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

export interface FaqItem {
  question: string;
  answer: string;
}

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parsePressBody(body: string): PressBlock[] {
  const usesMarkup = /^#{2,3} /m.test(body);
  return body
    .split(/\n{2,}/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((block): PressBlock => {
      if (block.startsWith("### ")) return { type: "h3", text: block.slice(4).trim() };
      if (block.startsWith("## ")) return { type: "h2", text: block.slice(3).trim() };
      const lines = block.split("\n");
      if (lines.every((l) => /^[-•] /.test(l.trim()))) {
        return { type: "ul", items: lines.map((l) => l.trim().slice(2).trim()) };
      }
      // Legacy text: a short line with no closing punctuation is a subheading.
      const legacyHeading =
        !usesMarkup &&
        block.length < 90 &&
        !block.includes("\n") &&
        !/[.!?"]$/.test(block);
      return legacyHeading ? { type: "h3", text: block } : { type: "p", text: block };
    });
}

/** Strip link markup, keeping the anchor text. */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}

/** Question/answer pairs under a "Frequently asked questions" heading. */
export function extractFaq(blocks: PressBlock[]): FaqItem[] {
  const start = blocks.findIndex(
    (b) => b.type === "h2" && /^(frequently asked questions|faq)/i.test(b.text)
  );
  if (start < 0) return [];
  const items: FaqItem[] = [];
  for (let i = start + 1; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "h2") break;
    if (b.type === "h3") {
      const next = blocks[i + 1];
      if (next?.type === "p") {
        items.push({ question: plainText(b.text), answer: plainText(next.text) });
      }
    }
  }
  return items;
}

/** Text with [anchor](url) turned into links: internal ones client-routed. */
export function renderInline(text: string, linkClass?: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, anchor, url] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      url.startsWith("/") ? (
        <Link key={at} href={url} className={linkClass}>
          {anchor}
        </Link>
      ) : (
        <a key={at} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {anchor}
        </a>
      )
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function PressBody({ blocks }: { blocks: PressBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}>{renderInline(b.text)}</h2>;
          case "h3":
            return <h3 key={i}>{renderInline(b.text)}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((item, n) => (
                  <li key={n}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          default:
            return <p key={i}>{renderInline(b.text)}</p>;
        }
      })}
    </>
  );
}
