import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import EventsClient from "./EventsClient";

export const metadata: Metadata = pageMetadata({
  title: "Conference Calendar — Where PCG Shows Up",
  description:
    "The conference calendar Powerclub Global works — from CES to Intelligence Disrupt. See where PCG shows up and where your startup's next moment happens.",
  path: "/events",
  ogDescription:
    "The conference calendar Powerclub Global works — see where your startup's next moment happens.",
});

export default function EventsPage() {
  return <EventsClient />;
}
