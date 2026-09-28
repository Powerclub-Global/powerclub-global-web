import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import EventDetailClient from "./EventDetailClient";

interface PageProps {
  params: Promise<{ selectedEvent: string }>;
}

function isPast(event: Event): boolean {
  const end = event.dateRange?.end;
  return !!end && end < new Date().toISOString().slice(0, 10);
}

function findEvent(id: string): Event | undefined {
  return (eventsData.events as Event[]).find((e) => e.id === id);
}

export function generateStaticParams() {
  return (eventsData.events as Event[]).map((e) => ({ selectedEvent: e.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { selectedEvent } = await params;
  const event = findEvent(selectedEvent);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "This event could not be found on the Powerclub Global conference calendar.",
    };
  }

  return pageMetadata({
    title: event.name,
    description: event.description,
    path: `/events/${event.id}`,
    image: event.image,
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { selectedEvent } = await params;
  const event = findEvent(selectedEvent);
  // Enough neighbours to fill the marquee without shipping all 87 events.
  const otherEvents = (eventsData.events as unknown as Event[])
    .filter((e) => e.id !== selectedEvent)
    .slice(0, 12);

  const jsonLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        description: event.description,
        startDate: event.dateRange?.start ?? event.dates,
        endDate: event.dateRange?.end ?? undefined,
        location: {
          "@type": "Place",
          name: event.venue || event.location,
          address: event.location,
        },
        // `url` must point at this page — the organiser link lives in
        // `offers.url`, which is what Google surfaces as the ticket link.
        url: `https://powerclubglobal.com/events/${event.id}`,
        ...(event.image
          ? { image: [`https://powerclubglobal.com${event.image}`] }
          : {}),
        ...(event.organizer
          ? { organizer: { "@type": "Organization", name: event.organizer } }
          : {}),
        // Only upcoming events advertise tickets: Google's event policy treats
        // "InStock" on a finished event as misleading, and 54 of 87 are past.
        ...(event.url && !isPast(event)
          ? { offers: { "@type": "Offer", url: event.url, availability: "https://schema.org/InStock" } }
          : {}),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <EventDetailClient event={event ?? null} otherEvents={otherEvents} />
    </>
  );
}
