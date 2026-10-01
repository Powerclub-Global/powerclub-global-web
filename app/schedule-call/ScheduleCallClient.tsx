"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle, Loader, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { track } from "@/lib/gtag";
import { useSearchParams } from "next/navigation";
import { TOPICS, topicFromParams, intentSentence } from "@/lib/booking";

interface Slot {
  startAt: string;
  endAt: string;
}

interface Availability {
  schedulingAvailable: boolean;
  timezone: string;
  slots: Slot[];
  message?: string;
}

// Render an IANA id as the reader's short zone name.
function tzLabel(timezone: string) {
  try {
    const long = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "long",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
    const short = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
    if (long) return short && short !== long ? `${long} (${short})` : long;
  } catch {
    // fall through to the raw id
  }
  return timezone.split("/").pop()?.replace(/_/g, " ") ?? timezone;
}

export default function ScheduleCallClient() {
  const params = useSearchParams();
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Carry over what the visitor was looking at: /schedule-call?event=&name=&interest=&topic=
  useEffect(() => {
    const t = topicFromParams(params.get("topic"), params.get("interest"));
    if (t) setTopic(t);
    const sentence = intentSentence(params.get("name"), params.get("interest"));
    if (sentence) setMessage((m) => m || sentence);
  }, [params]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ message: string; meetUrl: string | null } | null>(null);

  useEffect(() => {
    fetch("/api/discovery-call/availability")
      .then((r) => r.json())
      .then(setAvailability)
      .catch(() =>
        setAvailability({
          schedulingAvailable: false,
          timezone: "America/New_York",
          slots: [],
        })
      );
  }, []);

  const byDay = useMemo(() => {
    const tz = availability?.timezone ?? "America/New_York";
    const groups = new Map<string, Slot[]>();
    for (const slot of availability?.slots ?? []) {
      const day = new Date(slot.startAt).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        timeZone: tz,
      });
      groups.set(day, [...(groups.get(day) ?? []), slot]);
    }
    return [...groups.entries()];
  }, [availability]);

  const canSubmit =
    name.trim().length > 1 &&
    email.includes("@") &&
    (!availability?.schedulingAvailable || !!selected) &&
    !submitting;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    // The topic is carried in the goals field so this books against the same
    // calendar as /discovery-call and lands in the same CRM view — no separate
    // rail to keep in sync, and no way for the two to double-book.
    const notes = `[General enquiry — ${topic}]${message.trim() ? `\n\n${message.trim()}` : ""}`;

    try {
      if (availability?.schedulingAvailable && selected) {
        const res = await fetch("/api/discovery-call/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requesterName: name.trim(),
            requesterEmail: email.trim(),
            requesterCompany: company.trim() || undefined,
            requesterPhone: phone.trim() || undefined,
            scheduledAt: selected.startAt,
            goalsForConference: notes,
            websiteUrl: honeypot || undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.success === false) {
          setError(data.message || "Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }
        track("general_call_submit", { topic, booked: true });
        setDone({ message: data.message, meetUrl: data.meetUrl ?? null });
      } else {
        // Calendar unavailable — capture the lead rather than lose it.
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: company.trim() || undefined,
            phone: phone.trim() || undefined,
            subject: `Call request — ${topic}`,
            message: notes,
            funnel: "schedule-call",
            sourcePage: "/schedule-call",
          }),
        });
        if (!res.ok) {
          setError("Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }
        track("general_call_submit", { topic, booked: false });
        setDone({
          message: "Thanks — we have your details and will follow up to find a time.",
          meetUrl: null,
        });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          {done ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-[#ae904c] mx-auto mb-6" />
              <h1 className="text-3xl mb-4">You&apos;re booked</h1>
              <p className="text-white/70 mb-6">{done.message}</p>
              {done.meetUrl && (
                <a
                  href={done.meetUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors"
                >
                  Open the Google Meet link
                </a>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <p className="text-[#ae904c] text-sm uppercase tracking-widest mb-3">
                  Talk to Powerclub Global
                </p>
                <h1 className="text-4xl sm:text-5xl mb-4">Schedule a call</h1>
                <p className="text-white/60 max-w-xl mx-auto">
                  Thirty minutes, a Google Meet link, no back-and-forth. Pick a
                  topic and a time and we&apos;ll take it from there.
                </p>
                <p className="text-white/50 text-sm mt-4">
                  Prefer to talk now?{" "}
                  <a
                    href="tel:+16452330500"
                    onClick={() => track("cta_click", { cta: "phone", page: "/schedule-call" })}
                    className="text-[#ae904c] hover:text-[#c9a95e] underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" /> +1 (645) 233-0500
                  </a>
                </p>
              </div>

              <form
                onSubmit={submit}
                className="rounded-xl border border-[#ae904c]/25 bg-black/30 p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="sc-name" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      Your name
                    </label>
                    <input
                      id="sc-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ae904c]"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="sc-email" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      Email
                    </label>
                    <input
                      id="sc-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ae904c]"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="sc-company" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      Company <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="sc-company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ae904c]"
                    />
                  </div>
                  <div>
                    <label htmlFor="sc-phone" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                      Phone <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="sc-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ae904c]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sc-topic" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    What&apos;s this about?
                  </label>
                  <select
                    id="sc-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ae904c]"
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="sc-message" className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                    Anything we should know before the call?
                  </label>
                  <textarea
                    id="sc-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#ae904c]"
                    placeholder="A sentence or two is plenty."
                  />
                </div>

                {/* Honeypot — real people never see or fill this. */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                />

                {availability === null ? (
                  <p className="text-white/50 text-sm flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin" /> Loading available times…
                  </p>
                ) : availability.schedulingAvailable ? (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                      <CalendarClock className="w-4 h-4 text-[#ae904c]" />
                      Times shown in {tzLabel(availability.timezone)} — 30 min via Google Meet
                    </div>
                    <div className="max-h-[360px] overflow-y-auto pr-1 space-y-5">
                      {byDay.map(([day, slots]) => (
                        <div key={day}>
                          <p className="text-white/70 text-sm mb-2">{day}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {slots.map((slot) => {
                              const active = selected?.startAt === slot.startAt;
                              return (
                                <button
                                  type="button"
                                  key={slot.startAt}
                                  onClick={() => setSelected(slot)}
                                  className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                                    active
                                      ? "bg-[#ae904c] text-black font-semibold border-[#ae904c]"
                                      : "border-[#ae904c]/25 text-white/80 hover:border-[#ae904c]/60"
                                  }`}
                                >
                                  {new Date(slot.startAt).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    timeZone: availability.timezone,
                                  })}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-white/60 text-sm">
                    {availability.message ??
                      "Scheduling is temporarily unavailable — send your details and we'll follow up to find a time."}
                  </p>
                )}

                {error && <p className="text-[#e07a7a] text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Booking…"
                    : availability?.schedulingAvailable
                    ? "Book the call"
                    : "Send my details"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
