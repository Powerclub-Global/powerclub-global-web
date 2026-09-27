import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata({
  title: "About PCG — Conference Impact Since 2018",
  description:
    "Powerclub Global has managed high-impact conference engagements for technology startups since 2018 — from stage moments to the momentum infrastructure that compounds them.",
  path: "/about",
  ogDescription:
    "Conference impact management for technology startups since 2018.",
});

export default function AboutPage() {
  return <AboutClient />;
}
