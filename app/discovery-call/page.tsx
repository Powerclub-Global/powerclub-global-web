import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import DiscoveryCallClient from "./DiscoveryCallClient";

export const metadata: Metadata = pageMetadata({
  title: "Book a Discovery Call — Conference Services",
  description:
    "Talk to Powerclub Global about your next conference engagement — roadshow management, event activations, or a post-event momentum retainer. Pick a real time on our calendar.",
  path: "/discovery-call",
  // Shared by hand when we want the detailed questions; not a public entry point.
  noindex: true,
  ogTitle: "Book a Discovery Call — Powerclub Global",
  ogDescription:
    "Tell us about your event, pick a time, and talk to PCG about conference services.",
});

export default function DiscoveryCallPage() {
  return (
    <Suspense fallback={null}>
      <DiscoveryCallClient />
    </Suspense>
  );
}
