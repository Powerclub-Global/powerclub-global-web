/**
 * Press release / article data, served from PCG's own CMS (pcg-cc-mcp)
 * instead of the retired Notion integration (see lib/notion.ts — kept only
 * until that module is fully removed).
 */

const PCG_BACKEND_URL =
  process.env.PCG_BACKEND_URL || "https://dashboard.powerclubglobal.com";

const SITE_SLUG = "powerclub-global";

interface CmsPressReleaseDto {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  author: string | null;
  source_url: string | null;
  published_at: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  coverImage: string;
  author: string;
  date: string;
}

function toPressRelease(dto: CmsPressReleaseDto): PressRelease {
  // Route LinkedIn-hosted cover images through our own proxy rather than
  // hotlinking media.licdn.com directly — more reliable than relying on the
  // client to load a third-party CDN URL directly.
  const coverImage = dto.cover_image_url
    ? `/api/image-proxy?url=${encodeURIComponent(dto.cover_image_url)}`
    : "";

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    description: dto.excerpt || dto.subtitle || "",
    body: dto.body,
    coverImage,
    author: dto.author || "",
    date: dto.published_at || dto.created_at,
  };
}

export async function getPressReleases(): Promise<PressRelease[]> {
  // /press and the sitemap prerender, so an unreachable CMS at build time
  // must degrade to an empty list rather than fail the build; ISR fills the
  // page in on the next revalidation.
  try {
    const res = await fetch(
      `${PCG_BACKEND_URL}/api/public/sites/${SITE_SLUG}/press`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      console.warn(`Failed to fetch press releases: ${res.status}`);
      return [];
    }

    const json = (await res.json()) as ApiResponse<CmsPressReleaseDto[]>;
    return json.data.map(toPressRelease);
  } catch (error) {
    console.warn("Press CMS unreachable:", error);
    return [];
  }
}

export async function getPressRelease(
  slug: string
): Promise<PressRelease | null> {
  const res = await fetch(
    `${PCG_BACKEND_URL}/api/public/sites/${SITE_SLUG}/press/${slug}`,
    { next: { revalidate: 300 } }
  );

  if (!res.ok) return null;

  const json = (await res.json()) as ApiResponse<CmsPressReleaseDto>;
  return toPressRelease(json.data);
}
