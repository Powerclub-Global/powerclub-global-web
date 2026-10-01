import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import EventsClient from "./EventsClient";

export const metadata: Metadata = pageMetadata({
  title: "Conference Calendar — Where PCG Shows Up",
  description:
    "Crypto, AI and fintech conferences for 2026–2027, with the government summits we follow. See where Powerclub Global shows up and where your next moment happens.",
  path: "/conferences",
  ogDescription:
    "The conference calendar Powerclub Global works — see where your startup's next moment happens.",
});

export default function EventsPage() {
  return <EventsClient />;
}
