import { Suspense } from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/notion";

export const dynamic = 'force-dynamic';
import { ArrowUpRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import NotionImage from "@/components/NotionImage";

async function PressReleases() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="rounded-md border border-[#ae904c]/20 bg-[#ae904c]/5 px-8 py-12">
          <h2 className="text-xl text-[#ae904c] mb-3">
            No press releases to show right now
          </h2>
          <p className="text-white/60">
            Our newsroom is being updated. Please check back shortly, or{" "}
            <Link href="/contact" className="text-[#ae904c] underline">
              get in touch
            </Link>{" "}
            for media enquiries.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {posts.map((post) => (
        <Link href={`/press/${post.id}`} key={post.id}>
          <div className="group relative h-[450px] perspective-1000">
            <div className="preserve-3d transition-transform duration-500 ease-out group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
              <div className="absolute inset-0 rounded-md bg-black/30 blur-xl transform translate-y-4 scale-95 transition-all duration-500 group-hover:translate-y-8 group-hover:scale-90" />
              <div className="absolute inset-0 rounded-md backdrop-blur-sm bg-[#ae904c]/5 border border-[#ae904c]/20 transform transition-all duration-500" />
              <div
                className="relative h-[450px] rounded-md backdrop-blur-sm bg-gradient-to-b from-[#ae904c]/5 to-[#ae904c]/0 
                  border border-[#ae904c]/20 group-hover:border-[#ae904c]/40
                  transition-all duration-500 ease-out transform
                  group-hover:-translate-y-2 group-hover:-translate-x-2"
              >
                <div className="h-48 w-full rounded-t-md overflow-hidden relative bg-[#ae904c]/5">
                  {post.mediaType === "video" && post.coverVideo ? (
                    <div className="h-full w-full flex items-center justify-center">
                      <video
                        src={post.coverVideo}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : post.coverImage ? (
                    <NotionImage
                      src={post.coverImage}
                      alt={post.title}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ae904c]/10 flex items-center justify-center">
                      <span className="text-[#ae904c]/50 text-sm">
                        No image available
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                </div>

                <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/20 via-transparent to-[#ae904c]/20 animate-gradient-shift" />
                  <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/30 via-[#ae904c]/10 to-[#ae904c]/30 blur-sm group-hover:animate-pulse" />
                </div>

                <div className="relative z-10 p-6 w-full h-[calc(100%-12rem)] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#ae904c]/80 text-sm font-medium">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-[#ae904c] group-hover:text-[#ae904c]/90 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-white/60 mb-4 flex-grow text-sm line-clamp">
                    {post.description}
                  </p>

                  <div
                    className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 
                      group-hover:translate-x-1 mt-auto relative
                      before:absolute before:-inset-4 before:rounded-lg before:bg-[#ae904c]/5 before:opacity-0 
                      before:group-hover:opacity-100 before:transition-opacity before:duration-300"
                  >
                    Read More <ArrowUpRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="relative w-full min-h-screen pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black/80" />

        <div className="relative z-10 pt-32">
          <div className="container mx-auto px-4 mb-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-sm mb-6">
                <Sparkles className="inline-block w-4 h-4 mr-2" />
                Latest Updates
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase mb-6">
                <span className="whitespace-normal lg:whitespace-nowrap">
                  Stay Updated with Our
                </span>
                <br />
                <span className="font-bold text-[#ae904c] whitespace-normal lg:whitespace-nowrap">
                  Latest News
                </span>
                <br />
                and Announcements
              </h1>
              <p className="text-white/60 max-w-2xl text-lg">
                Discover our latest press releases, company updates, and
                industry insights
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#ae904c]" />
                </div>
              }
            >
              <PressReleases />
            </Suspense>
          </div>
        </div>
      </div>
      <CTASection />
      <Footer />
    </main>
  );
}
