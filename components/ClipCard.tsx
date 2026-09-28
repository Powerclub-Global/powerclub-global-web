"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { EventClip } from "@/types/events";

const YT = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/;

export function youtubeId(url: string): string | null {
  return url.match(YT)?.[1] ?? null;
}

/**
 * A YouTube clip renders as a thumbnail until it is clicked. Embedding ten
 * iframes on load costs about a megabyte of third-party JavaScript each and
 * would undo the page-weight work; the facade costs one image.
 */
export default function ClipCard({ clip }: { clip: EventClip }) {
  const [playing, setPlaying] = useState(false);
  const id = youtubeId(clip.videoUrl);
  const poster =
    clip.thumbnail ?? (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined);

  return (
    <div className="rounded-lg overflow-hidden bg-black/20 border border-[#ae904c]/10">
      {id ? (
        playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={clip.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${clip.title}`}
            className="relative w-full aspect-video group"
          >
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
              <span className="rounded-full bg-[#ae904c] p-3.5">
                <Play className="w-5 h-5 text-black" fill="currentColor" />
              </span>
            </span>
          </button>
        )
      ) : (
        <video
          controls
          preload="none"
          poster={clip.thumbnail}
          className="w-full aspect-video object-cover"
          src={clip.videoUrl}
        />
      )}
      <div className="p-3">
        <div className="text-white/90 text-sm font-medium">{clip.title}</div>
        {clip.speaker && (
          <div className="text-white/50 text-xs mt-0.5">{clip.speaker}</div>
        )}
      </div>
    </div>
  );
}
