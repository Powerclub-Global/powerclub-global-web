import React, { useState, useRef } from "react";
import { Play, X } from "lucide-react";

const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative w-full bg-black py-16 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ae904c]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ae904c]/10 rounded-full blur-[128px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Video Container with enhanced glass effect */}
          <div
            className="relative aspect-video rounded-xl overflow-hidden group
            before:absolute before:inset-0 before:bg-gradient-to-b 
            before:from-[#ae904c]/10 before:to-transparent before:z-0
            before:pointer-events-none"
          >
            {!isPlaying ? (
              <>
                <img
                  src="/about/video-poster.webp"
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                <button
                  aria-label="Play video"
                  onClick={handlePlayClick}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-[#ae904c]/20 hover:bg-[#ae904c]/30 border border-[#ae904c]/50 
                    rounded-full md:p-8 p-4 transition-all duration-300 
                    group-hover:scale-110 z-20 cursor-pointer
                    hover:shadow-lg hover:shadow-[#ae904c]/20"
                >
                  <Play className="md:w-12 md:h-12 w-8 h-8 text-[#ae904c]" />
                </button>
              </>
            ) : (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  controls
                  playsInline
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/pmm.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 
                    rounded-full transition-all duration-300 hover:scale-110"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Text Content with glass effect */}
          <div
            className="mt-16 relative rounded-xl p-8
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b 
            before:from-[#ae904c]/10 before:to-transparent before:z-0
            after:absolute after:inset-0 after:rounded-xl after:bg-[#ae904c]/5
            after:backdrop-blur-xl after:backdrop-saturate-150 after:-z-10
            border border-[#ae904c]/20"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                <span
                  className="bg-clip-text text-transparent bg-gradient-to-r 
                  from-[#ae904c]/90 via-[#ae904c] to-[#ae904c]/90"
                >
                  About Powerclub Global
                </span>
              </h2>
              <p className="text-white/80 leading-relaxed">
                Founded by Jessy Artman, Powerclub Global empowers businesses
                with expert strategies in AI, blockchain, web development, and
                social design, helping them scale and thrive in the evolving
                digital economy. With a focus on raising brand awareness,
                enhancing user engagement, and driving growth, Powerclub Global
                delivers cutting-edge solutions tailored for the next generation
                of industry leaders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
