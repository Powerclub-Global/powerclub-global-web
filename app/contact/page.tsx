import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact PCG — Start Your Engagement",
  description:
    "Talk to Powerclub Global about your next conference engagement — roadshow management, event activations, or a post-event momentum retainer.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact PCG — Start Your Engagement",
    description:
      "Talk to Powerclub Global about your next conference engagement.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
