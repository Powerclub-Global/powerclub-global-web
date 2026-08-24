"use client";

/**
 * PostHog bootstrap for the App Router.
 *
 * Initialises the self-hosted PostHog instance from environment variables and
 * fires a manual `$pageview` on every client-side navigation (Next's App Router
 * does not trigger a document load, so autocapture pageviews would miss them).
 *
 * When `NEXT_PUBLIC_POSTHOG_KEY` is unset the component renders nothing and
 * never touches the PostHog SDK — the site behaves exactly as it did before.
 */

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import posthog from "posthog-js";
import { trackPageview } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://analytics.powerclubglobal.com";

function PostHogTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialised = useRef(false);

  // One-time SDK init.
  useEffect(() => {
    if (initialised.current || !POSTHOG_KEY) return;
    initialised.current = true;
    try {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        // Manual pageviews — see PostHogTracker below.
        capture_pageview: false,
        capture_pageleave: true,
        persistence: "localStorage+cookie",
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
        },
        autocapture: true,
      });
    } catch (err) {
      console.error("PostHog init failed:", err);
    }
  }, []);

  // Attribution + manual pageview on every route change.
  useEffect(() => {
    captureAttribution();

    const query = searchParams.toString();
    const path = `${pathname}${query ? `?${query}` : ""}`;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${path}`
        : path;
    trackPageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider() {
  // useSearchParams requires a Suspense boundary to avoid opting the whole
  // tree into client-side rendering.
  return (
    <Suspense fallback={null}>
      <PostHogTracker />
    </Suspense>
  );
}
