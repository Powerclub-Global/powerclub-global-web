import { NextResponse } from "next/server";
import { getPressReleases } from "@/lib/press";
import type { BlogPost } from "@/lib/notion";

export const dynamic = "force-dynamic";

// Homepage "latest press" strip. Press moved from Notion to PCG's own CMS
// (lib/press.ts); this route keeps the BlogPost shape the section renders.
export async function GET() {
  try {
    const releases = await getPressReleases();
    const posts: BlogPost[] = releases.map((p) => ({
      id: p.id,
      title: p.title,
      coverImage: p.coverImage,
      coverVideo: "",
      mediaType: "image",
      description: p.description,
      content: [],
      date: p.date,
      tags: [],
    }));
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
