import type { Metadata } from "next";
import eventsData from "@/data/events.json";
import EventDetailClient from "./EventDetailClient";

interface PageProps {
  params: Promise<{ selectedEvent: string }>;
}

interface EventRecord {
  id: string;
  name: string;
  dates: string;
  dateRange?: { start: string; end: string };
  location: string;
  url?: string;
  description: string;
}

function findEvent(id: string): EventRecord | undefined {
  return (eventsData.events as EventRecord[]).find((e) => e.id === id);
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

  return {
    title: event.name,
    description: event.description,
    alternates: { canonical: `/events/${event.id}` },
    openGraph: {
      title: event.name,
      description: event.description,
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { selectedEvent } = await params;
  const event = findEvent(selectedEvent);

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
          name: event.location,
          address: event.location,
        },
        ...(event.url ? { url: event.url } : {}),
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
      <EventDetailClient selectedEvent={selectedEvent} />
    </>
  );
}
