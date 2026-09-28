import Link from "next/link";
import type { Metadata } from "next";
import { getPressRelease, getPressReleases } from "@/lib/press";
import { pageMetadata } from "@/lib/seo";
import { ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ShareButton";
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
    image: post.coverImage || undefined,
  });
}

async function PressPost({ id }: { id: string }) {
  const post = await getPressRelease(id);

  const jsonLd = post
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { "@type": "Organization", name: post.author || "Powerclub Global" },
        publisher: {
          "@type": "Organization",
          name: "Powerclub Global",
          logo: { "@type": "ImageObject", url: "https://powerclubglobal.com/logo.png" },
        },
        mainEntityOfPage: `https://powerclubglobal.com/press/${id}`,
        ...(post.coverImage ? { image: [post.coverImage] } : {}),
      }
    : null;

  if (!post) {
    notFound();
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/press"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white
                      transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Press
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30
                        backdrop-blur-sm rounded-xl p-8 mb-8"
          >
            {post.coverImage && (
              <div className="relative w-full mb-8 rounded-lg overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element -- variable
                    aspect ratio per article; a plain img avoids forcing a crop */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                />
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#ae904c]">
                {post.title}
              </h1>
              <ShareButton title={post.title} description={post.description} />
            </div>

            <div className="flex flex-wrap gap-4 items-center text-[#ae904c]/80">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.author && (
                <span className="text-sm text-[#ae904c]/60">
                  by {post.author}
                </span>
              )}
            </div>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none my-16 prose-headings:text-[#ae904c] prose-a:text-[#ae904c]">
              <p className="lead text-xl text-white/80 mb-8">
                {post.description}
              </p>
              {post.body.split(/\n{2,}/).map((block, i) => {
                // Short, unpunctuated lines act as subheadings in this source
                // text (e.g. "Ross Ulbricht — Champion of Digital Liberty"),
                // so render them as headings rather than flat paragraphs.
                const isHeading =
                  block.length < 90 &&
                  !block.includes("\n") &&
                  !/[.!?"]$/.test(block.trim());
                return isHeading ? (
                  <h3 key={i}>{block}</h3>
                ) : (
                  <p key={i}>{block}</p>
                );
              })}
            </article>

            {/* Press articles are the site's best-engaged organic landing
                pages but carried no route onward — this is that route. */}
            <div className="mt-16 border-t border-[#ae904c]/20 pt-10">
              <p className="text-[#ae904c] text-sm uppercase tracking-widest mb-3">
                Covering this conference?
              </p>
              <h2 className="text-2xl text-white mb-4">
                PCG turns a conference appearance into pipeline.
              </h2>
              <p className="text-white/60 mb-6 max-w-2xl">
                Coverage, activations and the momentum engine that keeps the
                event working after the doors close.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/discovery-call"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors"
                >
                  Book a discovery call
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ae904c]/40 text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors"
                >
                  What PCG does
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
      <PressPost id={id} />
      <Footer />
    </main>
  );
}
