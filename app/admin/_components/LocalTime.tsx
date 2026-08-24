"use client";

import { useEffect, useState } from "react";

/**
 * Renders a timestamp in the *viewer's* timezone.
 *
 * Server-rendered markup can only use an explicit timezone — using the
 * container's locale would disagree with the browser and trip a hydration
 * mismatch. So this deliberately renders nothing on the first paint and fills
 * in after mount, when `Intl` can be trusted to know where the operator is.
 */
export default function LocalTime({ iso }: { iso: string }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return;
    setText(
      d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "short",
      })
    );
  }, [iso]);

  if (!text) return null;
  return <span suppressHydrationWarning>{text}</span>;
}
