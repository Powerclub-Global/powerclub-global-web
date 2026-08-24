"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CalendarClock,
  ChevronDown,
  ExternalLink,
  Link2,
  Linkedin,
  Phone,
  Video,
} from "lucide-react";

import LocalTime from "../_components/LocalTime";
import { EmptyState } from "../_components/States";
import {
  answerLabel,
  bookingStatusClass,
  DISCOVERY_QUESTIONS,
  extraAnswers,
} from "@/lib/admin/discovery";
import { BOOKING_TZ, formatInTz, humanize, relativeTime } from "@/lib/admin/format";
import type { DiscoveryCallBooking } from "@/lib/admin/types";

/**
 * Upcoming and past discovery-call bookings.
 *
 * Rows are collapsed by default — the questionnaire is long and the operator is
 * usually scanning for "who am I talking to next". Expanding shows every answer
 * plus the CRM/entity links the backend matched.
 */
export default function DiscoveryCallsList({
  bookings,
}: {
  bookings: DiscoveryCallBooking[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Split against a single timestamp so the two lists can never overlap or
  // drop a row because time advanced mid-render.
  const { upcoming, past } = useMemo(() => {
    const now = Date.now();
    const up: DiscoveryCallBooking[] = [];
    const done: DiscoveryCallBooking[] = [];
    for (const b of bookings) {
      const t = new Date(b.scheduledAt).getTime();
      if (!Number.isNaN(t) && t >= now) up.push(b);
      else done.push(b);
    }
    up.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
    done.sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));
    return { upcoming: up, past: done };
  }, [bookings]);

  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No discovery calls booked yet."
        hint="Bookings made through /discovery-call appear here as soon as they are submitted."
      />
    );
  }

  return (
    <div className="space-y-10">
      <Section
        title="Upcoming"
        count={upcoming.length}
        bookings={upcoming}
        expanded={expanded}
        onToggle={setExpanded}
        emptyLabel="No upcoming calls on the books."
      />
      <Section
        title="Past"
        count={past.length}
        bookings={past}
        expanded={expanded}
        onToggle={setExpanded}
        emptyLabel="No past calls yet."
      />
    </div>
  );
}

function Section({
  title,
  count,
  bookings,
  expanded,
  onToggle,
  emptyLabel,
}: {
  title: string;
  count: number;
  bookings: DiscoveryCallBooking[];
  expanded: string | null;
  onToggle: (id: string | null) => void;
  emptyLabel: string;
}) {
  return (
    <section>
      <div className="mb-3 flex items-baseline gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">
          {title}
        </h2>
        <span className="text-xs text-white/35">{count}</span>
      </div>
      {bookings.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-6 text-sm text-white/35">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingRow
              key={b.id}
              booking={b}
              isExpanded={expanded === b.id}
              onToggle={() => onToggle(expanded === b.id ? null : b.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function BookingRow({
  booking,
  isExpanded,
  onToggle,
}: {
  booking: DiscoveryCallBooking;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const extras = extraAnswers(booking);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate font-semibold">{booking.requesterName}</span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${bookingStatusClass(
                booking.status
              )}`}
            >
              {humanize(booking.status)}
            </span>
            {booking.relatedConferenceName && (
              <span className="rounded-full border border-[#ae904c]/25 bg-[#ae904c]/10 px-2 py-0.5 text-[0.65rem] text-[#ae904c]">
                {booking.relatedConferenceName}
              </span>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45">
            {booking.requesterCompany && (
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {booking.requesterCompany}
              </span>
            )}
            <a
              href={`mailto:${booking.requesterEmail}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[#ae904c] hover:underline"
            >
              {booking.requesterEmail}
            </a>
            {booking.requesterPhone && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {booking.requesterPhone}
              </span>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="inline-flex items-center gap-1.5 font-medium text-white/75">
              <CalendarClock className="h-3.5 w-3.5 text-white/40" />
              {formatInTz(booking.scheduledAt, BOOKING_TZ, "HKT")}
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/45">
              <LocalTime iso={booking.scheduledAt} />
            </span>
            <span className="text-white/30">·</span>
            <span className="text-white/35">{relativeTime(booking.scheduledAt)}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {booking.googleMeetUrl ? (
            <a
              href={booking.googleMeetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hidden items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300 transition-colors hover:bg-emerald-400/20 sm:inline-flex"
            >
              <Video className="h-3 w-3" />
              Join
            </a>
          ) : (
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/35 sm:inline-block">
              No Meet link
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-white/35 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-white/10 px-5 py-5">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {DISCOVERY_QUESTIONS.filter((q) => !q.longForm).map((q) => {
              const value = answerLabel(q, booking[q.key]);
              return (
                <div key={q.key}>
                  <dt className="text-[0.65rem] uppercase tracking-wider text-white/35">
                    {q.label}
                  </dt>
                  <dd
                    className={
                      value ? "mt-1 text-sm text-white/85" : "mt-1 text-sm text-white/25"
                    }
                  >
                    {value ?? "Not answered"}
                  </dd>
                </div>
              );
            })}
          </dl>

          {DISCOVERY_QUESTIONS.filter((q) => q.longForm).map((q) => {
            const value = answerLabel(q, booking[q.key]);
            return (
              <div key={q.key} className="mt-5">
                <div className="text-[0.65rem] uppercase tracking-wider text-white/35">
                  {q.label}
                </div>
                {value ? (
                  <p className="mt-1.5 whitespace-pre-wrap rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-white/85">
                    {value}
                  </p>
                ) : (
                  <p className="mt-1.5 text-sm text-white/25">Not answered</p>
                )}
              </div>
            );
          })}

          {extras.length > 0 && (
            <div className="mt-5">
              <div className="text-[0.65rem] uppercase tracking-wider text-white/35">
                Additional answers
              </div>
              <dl className="mt-1.5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                {extras.map((e) => (
                  <div key={e.key} className="text-sm">
                    <dt className="inline text-white/45">{humanize(e.key)}: </dt>
                    <dd className="inline text-white/85">{e.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs">
            {booking.requesterLinkedinUrl && (
              <a
                href={booking.requesterLinkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-white/70 transition-colors hover:border-[#ae904c]/50 hover:text-white"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            )}
            {booking.matchedEntityId && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#ae904c]/30 bg-[#ae904c]/10 px-3 py-1.5 text-[#ae904c]">
                <Link2 className="h-3.5 w-3.5" />
                Matched entity: {booking.matchedEntityName ?? booking.matchedEntityId}
              </span>
            )}
            {booking.matchedCrmContactId && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-white/70">
                <Link2 className="h-3.5 w-3.5" />
                CRM contact:{" "}
                {booking.matchedContactName ?? booking.matchedCrmContactId}
              </span>
            )}
            {booking.googleMeetUrl && (
              <a
                href={booking.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/25 px-3 py-1.5 text-emerald-300 transition-colors hover:bg-emerald-400/10 sm:hidden"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Join call
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
