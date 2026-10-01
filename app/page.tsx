import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomeClient from "./HomeClient";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import { getPressReleases } from "@/lib/press";

export const metadata: Metadata = pageMetadata({
  title: "Conference Impact & Momentum Infrastructure",
  description:
    "PCG creates your conference moment — keynotes, activations, and roadshow presence — then builds the momentum engine that turns the event into pipeline, content, and revenue.",
  path: "/",
  ogDescription:
    "PCG creates your conference moment — then builds the machine that captures it.",
});

export default async function Home() {
  const events = Object.values(eventsData)[0] as Event[];
  const today = new Date().toISOString().slice(0, 10);
  const releases = await getPressReleases().catch(() => []);
  return (
    <HomeClient
      proof={{
        tracked: events.length,
        upcoming: events.filter((e) => (e.dateRange?.start ?? "") >= today).length,
        writeUps: releases.length,
      }}
    />
  );
}
