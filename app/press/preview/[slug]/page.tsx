import type { Metadata } from "next";
import { notFound } from "next/navigation";
import drafts from "@/data/press-drafts.json";
import { getPressReleases, type PressRelease } from "@/lib/press";
import PressArticle from "@/components/PressArticle";
import Footer from "@/components/Footer";

// Review copies of unpublished press drafts, exported from the CMS into
// data/press-drafts.json. Never indexed and not linked from anywhere: the URL
// is handed to the reviewer. A draft leaves this file once it is published.

const all = drafts as PressRelease[];

export const metadata: Metadata = {
  title: "Draft preview",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return all.map((d) => ({ slug: d.slug }));
}

export default async function PressPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = all.find((d) => d.slug === slug);
  if (!post) notFound();
  const published = await getPressReleases();

  return (
    <main className="min-h-screen bg-black">
      <div className="fixed top-0 inset-x-0 z-50 bg-[#ae904c] text-black text-sm text-center py-1.5 px-4">
        Draft preview, not published. Dated {post.date.slice(0, 10)} · title {post.title.length} characters ·
        description {post.description.length} characters
      </div>
      <PressArticle post={post} all={[...published, ...all]} preview />
      <Footer />
    </main>
  );
}
