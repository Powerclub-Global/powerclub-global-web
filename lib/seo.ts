import type { Metadata } from "next";

export const SITE_URL = "https://powerclubglobal.com";
export const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Powerclub Global" };

interface PageMeta {
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/services". */
  path: string;
  /** Optional override for the share image (absolute path under /public or full URL). */
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
  /** Skip the site-name suffix — for titles that are already long. */
  absoluteTitle?: boolean;
}

/** Keep descriptions inside what a results page shows (~160 chars), cut at a word. */
export function trimDescription(text: string, max = 160): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—\s]+$/, "") + "…";
}

// Next.js does not merge a page's `openGraph` with the root layout's, so every
// page that sets its own metadata used to lose the share image. Build the full
// block here instead.
export function pageMetadata({ title, description: rawDescription, path, image, ogTitle, ogDescription, noindex, absoluteTitle }: PageMeta): Metadata {
  const description = trimDescription(rawDescription);
  const images = image ? [{ url: image, alt: ogTitle ?? title }] : [OG_IMAGE];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Powerclub Global",
      url: path,
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      images: images.map((i) => i.url),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
