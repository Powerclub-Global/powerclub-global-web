"use client";

import { useState } from "react";
import Image from "next/image";

import { initials } from "@/lib/admin/format";

/**
 * Entity photo with an initials fallback.
 *
 * Entity photos come from arbitrary third-party hosts that are not in
 * `next.config.ts`'s image allowlist, so Next's optimiser would reject most of
 * them. `unoptimized` keeps them rendering, and a dead URL falls back to
 * initials rather than a broken-image glyph.
 */
export default function Avatar({
  url,
  name,
  size = "sm",
}: {
  url: string | null;
  name: string;
  size?: "sm" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const px = size === "sm" ? 32 : 56;
  const dimension = size === "sm" ? "h-8 w-8" : "h-14 w-14";

  if (!url || failed) {
    return (
      <span
        className={`flex ${dimension} shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-xs font-semibold text-white/45`}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    <Image
      src={url}
      alt=""
      width={px}
      height={px}
      unoptimized
      onError={() => setFailed(true)}
      className={`${dimension} shrink-0 rounded-full object-cover`}
    />
  );
}
