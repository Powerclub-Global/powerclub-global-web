import type { Metadata } from "next";
import { getPressRelease, getPressReleases } from "@/lib/press";
import { pageMetadata } from "@/lib/seo";
import PressArticle from "@/components/PressArticle";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


// Prerendered so metadata lands in <head>: a streamed dynamic render emitted
// these pages' <meta description> after </head>. getPressReleases swallows a
// CMS outage, in which case articles fall back to on-demand rendering.
export async function generateStaticParams() {
  const posts = await getPressReleases();
  return posts.map((post) => ({ id: post.slug || post.id }));
}

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPressRelease(id).catch(() => null);
  if (!post) return { title: "Press release not found", robots: { index: false } };
  return pageMetadata({
    // absolute: the " · Powerclub Global" template pushed article titles past
    // 100 characters, well beyond what search results display.
    title: post.title,
    absoluteTitle: true,
    description: post.description || `${post.title} — press release from Powerclub Global.`,
    path: `/press/${id}`,
    // Self-hosted covers ship a 1200x630 JPEG beside the WebP for share cards.
    image: post.coverImage.startsWith("/press-covers/")
      ? post.coverImage.replace(/\.webp$/, "-og.jpg")
      : post.coverImage || undefined,
  });
}

export default async function PressPostPage({ params }: PageProps) {
  const { id } = await params;
  // Resolved here rather than inside <Suspense>: once the streamed shell is
  // flushed the 200 is committed, so notFound() could no longer set the
  // status. Legacy Notion-UUID URLs were serving a "not found" body with a
  // 200, which Google treats as a soft 404.
  const post = await getPressRelease(id).catch(() => null);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-black">
      <PressArticle post={post} all={await getPressReleases()} />
      <Footer />
    </main>
  );
}
