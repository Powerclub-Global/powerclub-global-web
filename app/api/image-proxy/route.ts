import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse(
      JSON.stringify({ error: "Missing URL parameter" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: "image/*",
        // LinkedIn's CDN intermittently 403s requests without a browser-like
        // User-Agent (Node's default fetch UA gets flagged).
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType || "image/jpeg",
        "Cache-Control": "public, max-age=604800", // Cache for 7 days
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);

    // Return a transparent 1x1 pixel as fallback
    const transparentPixel =
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    const binaryData = Buffer.from(transparentPixel, "base64");

    return new NextResponse(binaryData, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        // Deliberately uncached: a transient upstream failure should not get
        // stuck serving a blank pixel for a full day.
        "Cache-Control": "no-store",
      },
    });
  }
}
