"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Loader2,
  Sparkles,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Slot {
  startAt: string;
  endAt: string;
}

interface AvailabilityResponse {
  schedulingAvailable: boolean;
  timezone: string;
  slots: Slot[];
  message?: string | null;
}

interface Questionnaire {
  conferencesSponsoredPerYear: string;
  hostsOwnEvents: string;
  investingInContentForEvent: string;
  currentCoverageProvider: string;
  timelineUrgency: string;
  relatedConferenceName: string;
  goalsForConference: string;
}

const EMPTY_Q: Questionnaire = {
  conferencesSponsoredPerYear: "",
  hostsOwnEvents: "",
  investingInContentForEvent: "",
  currentCoverageProvider: "",
  timelineUrgency: "",
  relatedConferenceName: "",
  goalsForConference: "",
};

type Step = "questions" | "slot" | "details" | "success";

function StepDot({ active, done }: { active: boolean; done: boolean }) {
  return (
    <div
      className={`h-2 w-2 rounded-full transition-all ${
        active
          ? "bg-[#ae904c] w-6"
          : done
            ? "bg-[#ae904c]/60"
            : "bg-white/15"
      }`}
    />
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium uppercase tracking-wider text-white/50 mb-2">
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-black/30 border border-[#ae904c]/25 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#ae904c] transition-colors";

function groupSlotsByDay(slots: Slot[], timezone: string) {
  const groups = new Map<string, Slot[]>();
  for (const slot of slots) {
    const d = new Date(slot.startAt);
    const key = d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: timezone,
    });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(slot);
  }
  return Array.from(groups.entries());
}

export default function DiscoveryCallClient() {
  const [step, setStep] = useState<Step>("questions");
  const [q, setQ] = useState<Questionnaire>(EMPTY_Q);

  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMeta, setSuccessMeta] = useState<{
    message: string;
    meetUrl: string | null;
    status: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/discovery-call/availability")
      .then((r) => r.json())
      .then((data: AvailabilityResponse) => {
        if (!cancelled) setAvailability(data);
      })
      .catch(() => {
        if (!cancelled) {
          setAvailability({
            schedulingAvailable: false,
            timezone: "Asia/Hong_Kong",
            slots: [],
            message: "Scheduling is temporarily unavailable. Please submit your info and we'll follow up.",
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(
    () => groupSlotsByDay(availability?.slots ?? [], availability?.timezone ?? "Asia/Hong_Kong"),
    [availability],
  );

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/discovery-call/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: name.trim(),
          requesterEmail: email.trim(),
          requesterCompany: company.trim() || undefined,
          requesterLinkedinUrl: linkedin.trim() || undefined,
          requesterPhone: phone.trim() || undefined,
          scheduledAt: selectedSlot?.startAt,
          conferencesSponsoredPerYear: q.conferencesSponsoredPerYear || undefined,
          hostsOwnEvents: q.hostsOwnEvents || undefined,
          investingInContentForEvent: q.investingInContentForEvent || undefined,
          currentCoverageProvider: q.currentCoverageProvider || undefined,
          timelineUrgency: q.timelineUrgency || undefined,
          relatedConferenceName: q.relatedConferenceName.trim() || undefined,
          goalsForConference: q.goalsForConference.trim() || undefined,
          websiteUrl: honeypot || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setError(data.message || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setSuccessMeta({
        message: data.message,
        meetUrl: data.meetUrl ?? null,
        status: data.status ?? "confirmed",
      });
      setStep("success");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const canProceedFromQuestions = true; // all questionnaire fields optional except intent to move forward
  const canProceedFromSlot = availability?.schedulingAvailable ? !!selectedSlot : true;
  const canSubmitDetails = name.trim().length > 1 && email.trim().includes("@");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, #ae904c 0%, transparent 45%), radial-gradient(circle at 80% 60%, #ae904c 0%, transparent 40%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          {step !== "success" && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ae904c]/30 bg-[#ae904c]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ae904c] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Conference Services Discovery Call
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
                Let&apos;s talk about your{" "}
                <span className="text-[#ae904c]">next conference</span>
              </h1>
              <p className="text-white/60 max-w-lg mx-auto">
                A few quick questions, then pick a real time on our calendar. We&apos;ll send a
                Google Meet link — no back-and-forth required.
              </p>
            </div>
          )}

          {step !== "success" && (
            <div className="flex items-center justify-center gap-2 mb-10">
              <StepDot active={step === "questions"} done={step !== "questions"} />
              <StepDot
                active={step === "slot"}
                done={step === "details"}
              />
              <StepDot active={step === "details"} done={false} />
            </div>
          )}

          <div className="rounded-2xl border border-[#ae904c]/20 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm p-6 md:p-8">
            {step === "questions" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>How many conferences do you sponsor/attend per year?</FieldLabel>
                    <select
                      className={inputClass}
                      value={q.conferencesSponsoredPerYear}
                      onChange={(e) => setQ({ ...q, conferencesSponsoredPerYear: e.target.value })}
                    >
                      <option value="">Select…</option>
                      <option value="1-2">1–2</option>
                      <option value="3-5">3–5</option>
                      <option value="6-10">6–10</option>
                      <option value="10+">10+</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel>Do you host your own events?</FieldLabel>
                    <select
                      className={inputClass}
                      value={q.hostsOwnEvents}
                      onChange={(e) => setQ({ ...q, hostsOwnEvents: e.target.value })}
                    >
                      <option value="">Select…</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="planning_to">Planning to</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel>Currently investing in event content/coverage?</FieldLabel>
                    <select
                      className={inputClass}
                      value={q.investingInContentForEvent}
                      onChange={(e) =>
                        setQ({ ...q, investingInContentForEvent: e.target.value })
                      }
                    >
                      <option value="">Select…</option>
                      <option value="yes_actively">Yes, actively</option>
                      <option value="somewhat">Somewhat / ad hoc</option>
                      <option value="not_yet">Not yet</option>
                    </select>
                  </div>
                  <div>
                    <FieldLabel>Timeline / urgency</FieldLabel>
                    <select
                      className={inputClass}
                      value={q.timelineUrgency}
                      onChange={(e) => setQ({ ...q, timelineUrgency: e.target.value })}
                    >
                      <option value="">Select…</option>
                      <option value="asap">ASAP — event is imminent</option>
                      <option value="1-3_months">1–3 months out</option>
                      <option value="3-6_months">3–6 months out</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <FieldLabel>Current coverage/production provider (if any)</FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="e.g. in-house team, another agency, none"
                    value={q.currentCoverageProvider}
                    onChange={(e) => setQ({ ...q, currentCoverageProvider: e.target.value })}
                  />
                </div>

                <div>
                  <FieldLabel>
                    Which conference or event is this about?{" "}
                    <span className="normal-case text-white/30">(optional)</span>
                  </FieldLabel>
                  <input
                    className={inputClass}
                    placeholder="e.g. Bitcoin Asia 2026, or leave blank if general inquiry"
                    value={q.relatedConferenceName}
                    onChange={(e) => setQ({ ...q, relatedConferenceName: e.target.value })}
                  />
                </div>

                <div>
                  <FieldLabel>What are your goals for this conference?</FieldLabel>
                  <textarea
                    className={`${inputClass} min-h-[90px] resize-y`}
                    placeholder="Tell us what you're trying to accomplish"
                    value={q.goalsForConference}
                    onChange={(e) => setQ({ ...q, goalsForConference: e.target.value })}
                  />
                </div>

                <button
                  onClick={() => setStep("slot")}
                  disabled={!canProceedFromQuestions}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#ae904c] text-black font-semibold py-3.5 hover:bg-[#c4a55c] transition-colors"
                >
                  Continue to scheduling <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === "slot" && (
              <div className="space-y-5">
                {loadingAvailability ? (
                  <div className="flex items-center justify-center py-16 text-white/50 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading availability…
                  </div>
                ) : availability?.schedulingAvailable ? (
                  <>
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-2">
                      <CalendarClock className="w-4 h-4 text-[#ae904c]" />
                      Times shown in {availability.timezone.replace("_", " ")} — 30 min via
                      Google Meet
                    </div>
                    <div className="max-h-[420px] overflow-y-auto pr-1 space-y-5">
                      {grouped.length === 0 && (
                        <p className="text-white/50 text-sm py-8 text-center">
                          No open slots in the next couple weeks — submit your info below and
                          we&apos;ll reach out to find a time.
                        </p>
                      )}
                      {grouped.map(([day, daySlots]) => (
                        <div key={day}>
                          <div className="text-sm font-medium text-white/70 mb-2">{day}</div>
                          <div className="grid grid-cols-3 gap-2">
                            {daySlots.map((slot) => {
                              const active = selectedSlot?.startAt === slot.startAt;
                              const label = new Date(slot.startAt).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                timeZone: availability.timezone,
                              });
                              return (
                                <button
                                  key={slot.startAt}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`rounded-lg py-2.5 text-sm font-medium border transition-colors ${
                                    active
                                      ? "bg-[#ae904c] border-[#ae904c] text-black"
                                      : "bg-black/30 border-[#ae904c]/20 text-white/80 hover:border-[#ae904c]/60"
                                  }`}
                                >
                                  {label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-[#ae904c]/30 bg-[#ae904c]/5 px-5 py-6 text-center">
                    <p className="text-white/70 text-sm">
                      {availability?.message ??
                        "Scheduling is temporarily unavailable. Submit your info below and we'll follow up personally to find a time."}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("questions")}
                    className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-white/70 hover:border-white/30 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep("details")}
                    disabled={!canProceedFromSlot}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ae904c] text-black font-semibold py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c4a55c] transition-colors"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "details" && (
              <div className="space-y-5">
                {selectedSlot && (
                  <div className="rounded-lg border border-[#ae904c]/25 bg-[#ae904c]/5 px-4 py-3 text-sm text-white/80 flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-[#ae904c] shrink-0" />
                    {new Date(selectedSlot.startAt).toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: availability?.timezone,
                    })}{" "}
                    ({availability?.timezone.replace("_", " ")})
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <FieldLabel>Your name</FieldLabel>
                    <input
                      className={inputClass}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <FieldLabel>Email</FieldLabel>
                    <input
                      className={inputClass}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <FieldLabel>Company</FieldLabel>
                    <input
                      className={inputClass}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <FieldLabel>LinkedIn profile</FieldLabel>
                    <input
                      className={inputClass}
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="Optional — linkedin.com/in/…"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>Phone</FieldLabel>
                    <input
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Honeypot — hidden from real users */}
                <input
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("slot")}
                    className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-white/70 hover:border-white/30 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmitDetails || submitting}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#ae904c] text-black font-semibold py-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#c4a55c] transition-colors"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Booking…
                      </>
                    ) : (
                      <>Book the call</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === "success" && successMeta && (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-[#ae904c] mx-auto mb-5" />
                <h2 className="text-2xl font-semibold mb-3">
                  {successMeta.status === "confirmed" ? "You're booked!" : "Got it — thank you!"}
                </h2>
                <p className="text-white/60 max-w-md mx-auto mb-6">{successMeta.message}</p>
                {successMeta.meetUrl && (
                  <a
                    href={successMeta.meetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#ae904c] text-black font-semibold px-6 py-3 hover:bg-[#c4a55c] transition-colors"
                  >
                    <Video className="w-4 h-4" /> View Meet link
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
