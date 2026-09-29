import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { getInsights, getAuthor } from "@/lib/insights";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "Insights — What the Conference Circuit Actually Costs and Returns",
  description:
    "Powerclub Global on running a conference circuit: what sponsorship costs, which events are worth it, and what to do in the 30 days after the booth.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getInsights();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#ae904c] text-sm uppercase tracking-widest mb-3">
            Insights
          </p>
          <h1 className="text-4xl sm:text-5xl mb-5">
            What the conference circuit actually costs — and returns
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-14">
            Written from the floor. Powerclub Global has worked 87 conferences
            and published 25 first-hand recaps; this is what we have learned
            about spending money on them well.
          </p>

          {posts.length === 0 ? (
            <p className="text-white/50">The first pieces are in review.</p>
          ) : (
            <div className="space-y-10">
              {posts.map((post) => {
                const author = getAuthor(post.author);
                return (
                  <article
                    key={post.slug}
                    className="border-t border-[#ae904c]/20 pt-8"
                  >
                    <Link href={`/insights/${post.slug}`} className="group">
                      <h2 className="text-2xl text-white group-hover:text-[#ae904c] transition-colors mb-3">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-white/60 mb-4 max-w-2xl">
                      {post.description}
                    </p>
                    <p className="text-white/40 text-sm">
                      {author?.name ?? post.author}
                      {author?.role ? ` · ${author.role}` : ""} ·{" "}
                      {new Date(post.published).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {post.readMinutes} min read
                    </p>
                  </article>
                );
              })}
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
