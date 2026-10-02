import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import type { PressRelease } from "@/lib/press";
import { SITE_URL } from "@/lib/seo";
import { PressBody, extractFaq, parsePressBody } from "@/lib/pressBody";
import { eventForPress, nextEditionFor, siblingPress } from "@/lib/pressLinks";

// The article itself, shared by the public page and the draft preview.
export default function PressArticle({
  post,
  all,
  preview = false,
}: {
  post: PressRelease;
  /** Published articles plus, in preview, the other drafts: used for sibling links. */
  all: PressRelease[];
  preview?: boolean;
}) {
  const id = post.slug;
  const blocks = parsePressBody(post.body);
  const faq = extractFaq(blocks);
  const event = eventForPress(post.slug);
  const nextEdition = nextEditionFor(event);
  const siblings = siblingPress(post.slug, event, all);
  const absolute = (path: string) => (path.startsWith("/") ? `${SITE_URL}${path}` : path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: "Powerclub Global", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Powerclub Global",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/press/${id}`,
    ...(post.coverImage ? { image: [absolute(post.coverImage)] } : {}),
    ...(event
      ? {
          about: {
            "@type": "Event",
            name: event.name,
            ...(event.dateRange ? { startDate: event.dateRange.start, endDate: event.dateRange.end } : {}),
            location: { "@type": "Place", name: event.venue || event.location, address: event.location },
            url: `${SITE_URL}/conferences/${event.id}`,
          },
        }
      : {}),
  };

  const faqLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;


  return (
    <>
      {!preview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {!preview && faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
              <PressBody blocks={blocks} />
            </article>

            {event && (
              <nav
                aria-label={`More on ${event.name}`}
                className="mt-4 mb-12 rounded-lg border border-[#ae904c]/25 bg-black/30 p-6"
              >
                <h2 className="text-lg text-[#ae904c] mb-3">More on {event.name}</h2>
                <ul className="space-y-2 text-white/75 list-none p-0 m-0">
                  <li>
                    <Link href={`/conferences/${event.id}`} className="text-[#ae904c] hover:underline underline-offset-4">
                      {event.name}: dates, venue and how to attend
                    </Link>{" "}
                    <span className="text-white/45">
                      ({event.dates}, {event.location})
                    </span>
                  </li>
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <Link href={`${preview ? "/press/preview" : "/press"}/${s.slug}`} className="text-[#ae904c] hover:underline underline-offset-4">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                  {nextEdition && (
                    <li>
                      Next up:{" "}
                      <Link href={`/conferences/${nextEdition.id}`} className="text-[#ae904c] hover:underline underline-offset-4">
                        {nextEdition.name}
                      </Link>{" "}
                      <span className="text-white/45">
                        ({nextEdition.dates}, {nextEdition.location})
                      </span>
                    </li>
                  )}
                </ul>
              </nav>
            )}

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
                  href="/schedule-call?interest=media"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black font-semibold hover:bg-[#c9a95e] transition-colors"
                >
                  Book a Call
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
