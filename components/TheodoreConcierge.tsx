"use client";

import { useEffect, useRef, useState } from "react";

const gold = "#ae904c";
const goldBright = "#c9a95e";
const BOOK_URL = "https://cal.com/powerclub-global";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Hey — I'm Theodore, PowerClub's concierge. (Talking to me is a live demo of the AI Front Desk we'd run for your business.) What do you do, and what's slowing your growth right now?";

const SUGGESTIONS = [
  "I'm losing leads / missing messages",
  "No time for marketing",
  "I need a website or app",
];

export default function TheodoreConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // let other parts of the page (e.g. the hero CTA) open Theodore
  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("theodore:open", openHandler);
    return () => window.removeEventListener("theodore:open", openHandler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || busy) return;
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((m) => [...m, { role: "user", content: message }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/theodore/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = await res.json();
      const reply =
        data?.data?.reply ||
        data?.message ||
        "I'm having trouble responding right now — the fastest way forward is to grab a free call and we'll take it from there.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I'm offline for a second — book a free call and the team will reach out." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {/* launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Theodore, the PowerClub concierge"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 60,
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 18px 12px 14px", borderRadius: 999, border: "none", cursor: "pointer",
            background: `linear-gradient(180deg, ${goldBright}, ${gold})`, color: "#08090c",
            boxShadow: "0 12px 34px -10px rgba(174,144,76,0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
            fontWeight: 600, fontSize: 14,
          }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 28, height: 28, borderRadius: "50%", background: "rgba(8,9,12,0.18)", fontSize: 15,
          }}>💬</span>
          Chat with Theodore
        </button>
      )}

      {/* panel */}
      {open && (
        <div
          className="theo-panel"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 60,
            width: "min(380px, calc(100vw - 32px))", height: "min(560px, calc(100vh - 48px))",
            display: "flex", flexDirection: "column", overflow: "hidden",
            background: "#0c0e13", border: "1px solid rgba(174,144,76,0.3)", borderRadius: 18,
            boxShadow: "0 30px 80px -20px rgba(0,0,0,0.85)",
          }}
        >
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(174,144,76,0.06)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(180deg, ${goldBright}, ${gold})`, color: "#08090c", fontWeight: 800, fontSize: 14 }}>T</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#e8eaf0" }}>Theodore</div>
              <div style={{ fontSize: 11, color: "rgba(232,234,240,0.45)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                PowerClub concierge
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", color: "rgba(232,234,240,0.5)", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
          </div>

          {/* messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                <div style={{
                  padding: "9px 13px", borderRadius: 14, fontSize: 13.5, lineHeight: 1.5,
                  background: m.role === "user" ? `linear-gradient(180deg, ${goldBright}, ${gold})` : "rgba(255,255,255,0.05)",
                  color: m.role === "user" ? "#08090c" : "#e8eaf0",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                  borderBottomRightRadius: m.role === "user" ? 4 : 14,
                  borderBottomLeftRadius: m.role === "user" ? 14 : 4,
                  whiteSpace: "pre-wrap",
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div style={{ alignSelf: "flex-start" }}>
                <div className="theo-typing" style={{ padding: "11px 14px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span /><span /><span />
                </div>
              </div>
            )}

            {/* quick suggestions, only before the visitor has said anything */}
            {messages.length === 1 && !busy && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} style={{
                    fontSize: 12, padding: "7px 11px", borderRadius: 999, cursor: "pointer",
                    background: "rgba(174,144,76,0.08)", border: "1px solid rgba(174,144,76,0.3)", color: goldBright,
                  }}>{s}</button>
                ))}
              </div>
            )}
          </div>

          {/* input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 8 }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell Theodore about your business…"
              style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 12px", fontSize: 13.5, color: "#e8eaf0" }}
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send" style={{
              border: "none", borderRadius: 10, padding: "0 14px", cursor: busy || !input.trim() ? "not-allowed" : "pointer",
              background: busy || !input.trim() ? "rgba(174,144,76,0.35)" : `linear-gradient(180deg, ${goldBright}, ${gold})`,
              color: "#08090c", fontWeight: 700, fontSize: 16,
            }}>↑</button>
          </form>
          <div style={{ padding: "0 12px 10px", textAlign: "center" }}>
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "rgba(232,234,240,0.35)" }}>
              or book a free call directly →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
