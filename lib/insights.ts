import { insights } from "@/data/insights/index";
import { authors } from "@/data/insights/authors";
import type { Insight, Author } from "@/types/insights";

export const SITE = "https://powerclubglobal.com";

/** Published only — what the index, the sitemap and search should see. */
export function getInsights(): Insight[] {
  return insights
    .filter((i) => i.status === "published")
    .sort((a, b) => b.published.localeCompare(a.published));
}

/** Includes drafts: a draft must still render at its URL so it can be reviewed. */
export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function allInsightSlugs(): string[] {
  return insights.map((i) => i.slug);
}

export function getAuthor(name: string): Author | undefined {
  return authors.find((a) => a.name === name);
}
