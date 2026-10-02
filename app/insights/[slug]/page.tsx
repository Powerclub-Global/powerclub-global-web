import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import eventsData from "@/data/events.json";
import type { Event } from "@/types/events";
import type { Block } from "@/types/insights";
import { allInsightSlugs, getAuthor, getInsight, SITE } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { plainText, renderInline } from "@/lib/pressBody";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import InlineCTA from "@/components/InlineCTA";
import CTASection from "@/components/CTASection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: "Not found", robots: { index: false } };
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    image: post.coverImage,
    // A draft renders at its real URL so it can be reviewed in place, but it
    // must never be indexed until Sami signs it off.
    noindex: post.status !== "published",
  });
}

const LINK_CLASS = "text-[#ae904c] underline underline-offset-4 hover:text-[#c9a95e]";
const inline = (text: string) => renderInline(text, LINK_CLASS);

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="text-2xl text-[#ae904c] mt-12 mb-4">
          {inline(block.text)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-lg text-white mt-8 mb-3">
          {inline(block.text)}
        </h3>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 text-white/75 my-5">
          {block.items.map((item, n) => (
            <li key={n}>{inline(item)}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-2 border-[#ae904c] pl-5 my-7 text-white/80 italic"
        >
          {inline(block.text)}
          {block.cite && (
            <cite className="block not-italic text-white/40 text-sm mt-2">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case "callout":
      return (
        <p
          key={i}
          className="my-7 border-l-2 border-[#ae904c] bg-[#ae904c]/5 px-5 py-4 text-white/80"
        >
          {inline(block.text)}
        </p>
      );
    case "table":
      return (
        <div key={i} className="my-7 overflow-x-auto">
          <table className="w-full text-sm border border-[#ae904c]/20">
            <thead>
              <tr>
                {block.head.map((h, n) => (
                  <th
                    key={n}
                    className="text-left px-3 py-2 bg-[#ae904c]/10 text-[#ae904c] font-medium border-b border-[#ae904c]/20"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, n) => (
                <tr key={n}>
                  {row.map((cell, m) => (
                    <td key={m} className="px-3 py-2 border-b border-[#ae904c]/10 text-white/75">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <p className="text-white/40 text-xs mt-2">{block.caption}</p>
          )}
        </div>
      );
    default:
      return (
        <p key={i} className="text-white/75 my-5 leading-relaxed">
          {inline(block.text)}
        </p>
      );
  }
}

export default async function InsightPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const author = getAuthor(post.author);

  // Put the call to action just before the h2 nearest the middle of the piece,
  // so it lands between sections rather than inside one.
  const mid = post.body.length / 2;
  let midCtaIndex = -1;
  post.body.forEach((b, i) => {
    if (i > 0 && b.type === "h2" && (midCtaIndex < 0 || Math.abs(i - mid) < Math.abs(midCtaIndex + 1 - mid))) {
      midCtaIndex = i - 1;
    }
  });
  const events = (eventsData.events as Event[]).filter((e) =>
    post.relatedEvents?.includes(e.id)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: {
      "@type": "Person",
      name: author?.name ?? post.author,
      ...(author?.role ? { jobTitle: author.role } : {}),
      worksFor: { "@type": "Organization", name: "Powerclub Global" },
    },
    publisher: {
      "@type": "Organization",
      name: "Powerclub Global",
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: `${SITE}/insights/${post.slug}`,
    ...(post.coverImage ? { image: [`${SITE}${post.coverImage}`] } : {}),
  };

  // Question/answer pairs under the article's FAQ heading, for FAQPage markup.
  const faqStart = post.body.findIndex(
    (b) => b.type === "h2" && /^(frequently asked questions|faq)/i.test(b.text)
  );
  const faq: { q: string; a: string }[] = [];
  if (faqStart >= 0) {
    for (let i = faqStart + 1; i < post.body.length; i++) {
      const b = post.body[i];
      if (b.type === "h2") break;
      const next = post.body[i + 1];
      if (b.type === "h3" && next?.type === "p") {
        faq.push({ q: plainText(b.text), a: plainText(next.text) });
      }
    }
  }
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {post.status === "published" && faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      {post.status === "published" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-2xl mx-auto">
          {post.status !== "published" && (
            <p className="mb-8 border border-[#c9a95e]/40 bg-[#c9a95e]/10 px-4 py-3 text-sm text-[#c9a95e]">
              Draft — not indexed and not in the sitemap. Visible at this URL
              for review.
            </p>
          )}

          <Link
            href="/insights"
            className="text-[#ae904c] text-sm hover:underline underline-offset-4"
          >
            ← Insights
          </Link>

          <h1 className="text-3xl sm:text-4xl mt-6 mb-5 leading-tight">
            {post.title}
          </h1>
          <p className="text-white/50 text-sm mb-10">
            {author?.name ?? post.author}
            {author?.role ? ` · ${author.role}` : ""} ·{" "}
            {new Date(post.published).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · {post.readMinutes} min read
          </p>

          <article>
            {post.body.map((b, i) => (
              <React.Fragment key={i}>
                {renderBlock(b, i)}
                {i === midCtaIndex && (
                  <InlineCTA
                    heading="Planning your circuit for next year?"
                    body="We'll look at your event list and tell you where we'd spend and where we wouldn't."
                    context={{ interest: "sponsor" }}
                    textContext="planning my conference year"
                  />
                )}
              </React.Fragment>
            ))}
          </article>

          {events.length > 0 && (
            <div className="mt-14 border-t border-[#ae904c]/20 pt-8">
              <h2 className="text-sm uppercase tracking-widest text-[#ae904c] mb-4">
                Events referenced
              </h2>
              <ul className="space-y-2 list-none p-0">
                {events.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/conferences/${e.id}`}
                      className="text-white/75 hover:text-[#ae904c] transition-colors"
                    >
                      {e.name} <span className="text-white/40">· {e.location}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {post.relatedPress && post.relatedPress.length > 0 && (
            <div className="mt-10 border-t border-[#ae904c]/20 pt-8">
              <h2 className="text-sm uppercase tracking-widest text-[#ae904c] mb-4">
                From our coverage
              </h2>
              <ul className="space-y-2 list-none p-0">
                {post.relatedPress.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/press/${s}`}
                      className="text-white/75 hover:text-[#ae904c] transition-colors"
                    >
                      {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {author && (
            <div className="mt-12 border-t border-[#ae904c]/20 pt-8">
              <p className="text-sm uppercase tracking-widest text-[#ae904c] mb-2">
                {author.name}
              </p>
              <p className="text-white/50 text-sm mb-2">{author.role}</p>
              <p className="text-white/70 text-sm">{author.bio}</p>
            </div>
          )}
        </div>
      </div>
      <CTASection
        title="Planning next year's circuit?"
        description="We run conference roadshows end to end — and the 30 days after each one."
        primaryHref="/schedule-call?interest=sponsor"
      />
      <Footer />
    </main>
  );
}
