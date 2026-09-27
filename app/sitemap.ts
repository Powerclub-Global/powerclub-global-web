import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import eventsData from "@/data/events.json";
import { getPressReleases } from "@/lib/press";
import { statSync } from "fs";
import { join } from "path";

const mtime = (rel: string) => {
  try {
    return statSync(join(process.cwd(), rel)).mtime;
  } catch {
    return undefined;
  }
};
const eventsUpdated = mtime("data/events.json");
const servicesUpdated = mtime("data/services.ts");

const BASE = "https://powerclubglobal.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/services`, changeFrequency: "monthly", priority: 0.9, lastModified: servicesUpdated },
    { url: `${BASE}/events`, changeFrequency: "weekly", priority: 0.9, lastModified: eventsUpdated },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/sovereign-stack`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/press`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/discovery-call`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE}/services/${s.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: servicesUpdated,
  }));

  const eventPages: MetadataRoute.Sitemap = eventsData.events.map((e) => ({
    url: `${BASE}/events/${e.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
    lastModified: eventsUpdated,
  }));

  // Press articles live in the CMS, so they cannot be derived from a data
  // file. A CMS outage must not empty the sitemap, hence the catch.
  let pressPages: MetadataRoute.Sitemap = [];
  try {
    pressPages = (await getPressReleases()).map((post) => ({
      url: `${BASE}/press/${post.slug || post.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: post.date ? new Date(post.date) : undefined,
    }));
  } catch {
    pressPages = [];
  }

  return [...staticPages, ...servicePages, ...eventPages, ...pressPages];
}
