import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = pageMetadata({
  title: "Services — Roadshow Management to Momentum Infrastructure",
  description:
    "Powerclub Global services: conference roadshow management, event activations, content capture, and the post-event momentum engine that turns moments into pipeline.",
  path: "/services",
  ogDescription:
    "Conference roadshow management, event activations, and the post-event momentum engine.",
});

export default function ServicesPage() {
  return <ServicesClient />;
}
