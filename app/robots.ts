import type { MetadataRoute } from "next";

// AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are
// deliberately allowed: accurate AI-engine representation is a distribution
// channel for PCG, not a leak.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/dashboard", "/api/", "/data-deletion"],
      },
    ],
    sitemap: "https://powerclubglobal.com/sitemap.xml",
  };
}
