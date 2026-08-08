import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Conference Calendar — Where PCG Shows Up",
  description:
    "The conference calendar Powerclub Global works — from CES to Intelligence Disrupt. See where PCG shows up and where your startup's next moment happens.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Conference Calendar — Where PCG Shows Up",
    description:
      "The conference calendar Powerclub Global works — see where your startup's next moment happens.",
  },
};

export default function EventsPage() {
  return <EventsClient />;
}
