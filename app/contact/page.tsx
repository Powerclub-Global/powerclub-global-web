import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata({
  title: "Contact PCG — Start Your Engagement",
  description:
    "Talk to Powerclub Global about your next conference engagement — roadshow management, event activations, or a post-event momentum retainer.",
  path: "/contact",
  ogDescription:
    "Talk to Powerclub Global about your next conference engagement.",
});

export default function ContactPage() {
  return <ContactClient />;
}
