import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ORCHA — PCG's Sovereign Agent Runtime",
  description:
    "Download ORCHA, Powerclub Global's local-first agent runtime for macOS, Windows and Linux — the desktop companion to the Sovereign Stack.",
  path: "/orcha",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
