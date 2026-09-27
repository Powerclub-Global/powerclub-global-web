import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SovereignStackClient from "./SovereignStackClient";

export const metadata: Metadata = pageMetadata({
  title: "The Sovereign Stack — Private AI Infrastructure",
  description:
    "The Sovereign Stack is Powerclub Global's private AI infrastructure layer — sovereign compute, agents, and data ownership for organizations that keep their intelligence in-house.",
  path: "/sovereign-stack",
  ogDescription:
    "Sovereign compute, agents, and data ownership — private AI infrastructure by PCG.",
});

export default function SovereignStackPage() {
  return <SovereignStackClient />;
}
