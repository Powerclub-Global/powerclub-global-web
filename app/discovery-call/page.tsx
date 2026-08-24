import type { Metadata } from "next";
import DiscoveryCallClient from "./DiscoveryCallClient";

export const metadata: Metadata = {
  title: "Book a Discovery Call — Conference Services",
  description:
    "Talk to Powerclub Global about your next conference engagement — roadshow management, event activations, or a post-event momentum retainer. Pick a real time on our calendar.",
  alternates: { canonical: "/discovery-call" },
  openGraph: {
    title: "Book a Discovery Call — Powerclub Global",
    description:
      "Tell us about your event, pick a time, and talk to PCG about conference services.",
  },
};

export default function DiscoveryCallPage() {
  return <DiscoveryCallClient />;
}
