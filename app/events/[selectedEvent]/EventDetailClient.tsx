"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Building,
  ArrowLeft,
  ExternalLink,
  Calendar as CalendarIcon,
  Share2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
// import eventsData from "@/data/events.json";
import type { Event, EventListItem } from "@/types/events";
import Footer from "@/components/Footer";

interface EventDetailClientProps {
  /** Resolved on the server so the page renders in HTML rather than a
   * loading skeleton — these pages are the site's main organic entry point. */
  event: Event | null;
  otherEvents: Event[];
}

interface ScrollingRowProps {
  events: Event[];
  direction: "left" | "right";
}

// Event Card Component from EventSection
const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  return (
    <div
      className="flex-shrink-0 w-[260px] sm:w-[400px] lg:w-[500px] h-auto sm:h-52 mx-3 sm:mx-6 
                    relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#ae904c]/10 group-hover:from-[#ae904c]/10 to-black/40 
                    border border-[#ae904c]/30 group-hover:border-[#ae904c]/90 overflow-hidden transform-gpu hover:scale-[1.02] 
                    transition-transform duration-300"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <div className="w-full h-32 sm:h-48 sm:w-48 sm:h-full relative will-change-transform">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
            loading={index < 4 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-transparent to-black/50" />
        </div>

        <div className="flex-1 p-3 sm:p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-xl font-semibold text-[#ae904c] mb-2 sm:mb-4 line-clamp-2">
              {truncateText(event.name, 18)}
            </h3>

            <div className="space-y-1.5 sm:space-y-3">
              <div className="flex items-center text-white/70">
                <Calendar
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-1.5 sm:mr-3 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-base">{event.dates}</span>
              </div>

              <div className="flex items-center text-white/70">
                <MapPin
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 mr-1.5 sm:mr-3 flex-shrink-0"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-base truncate">
                  {truncateText(event.location, 20)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-row gap-2 sm:gap-4 mt-3 sm:mt-4">
            {event.url && (
              <Link
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                                 rounded-md sm:rounded-lg bg-[#ae904c] text-xs sm:text-base 
                                 text-white w-full sm:w-auto transition-colors duration-300 
                                 hover:bg-[#ae904c]/90"
              >
                Register <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            )}
            <Link
              href={`/events/${event.id}`}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                               rounded-md sm:rounded-lg border border-[#ae904c]/30 bg-transparent text-xs sm:text-base 
                               text-[#ae904c] w-full sm:w-auto transition-colors duration-300 
                               hover:bg-[#ae904c]/10"
            >
              Details <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Scrolling Row Component
const ScrollingRow: React.FC<ScrollingRowProps> = ({ events, direction }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`scroll-row-${direction}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [direction]);

  const animationClass = isVisible
    ? direction === "right"
      ? "animate-scroll-reverse"
      : "animate-scroll-slow"
    : "";

  return (
    <div
      id={`scroll-row-${direction}`}
      className="flex overflow-hidden py-6"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className={`flex ${animationClass} ${isPaused ? "animate-none" : ""}`}
      >
        {events.map((event, idx) => (
          <EventCard key={`${event.name}-${idx}`} event={event} index={idx} />
        ))}
      </div>
    </div>
  );
};


interface EventListCardProps {
  event: EventListItem;
}
const SmallEventListCard = ({ event }: EventListCardProps) => (
  <div
    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ae904c]/5 to-black/40 
                    border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-300"
  >
    <div className="relative h-48">
      {event.image ? (
        <Image
          src={event.image}
          alt={event.name || "Event"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-[#ae904c]/5 flex items-center justify-center">
          <Calendar className="w-12 h-12 text-[#ae904c]/30" />
        </div>
      )}
    </div>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#ae904c] mb-2 line-clamp-1">
        {event.name || "Unnamed Event"}
      </h3>

      {event.description && (
        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
      )}

      <div className="space-y-1 mb-3">
        {event.date && (
          <div className="flex items-center text-white/70 text-sm">
            <Calendar className="w-3 h-3 mr-1.5" />
            <span className="truncate">{event.date}</span>
          </div>
        )}
        {event.time && (
          <div className="flex items-center text-white/70 text-sm">
            <Clock className="w-3 h-3 mr-1.5" />
            <span className="truncate">{event.time}</span>
          </div>
        )}
      </div>

      {event.applyLink && (
        <Link
          href={event.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-3 py-1.5 rounded-lg 
                     bg-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] text-sm
                     hover:bg-[#ae904c]/20 transition-all duration-300"
        >
          Apply Now <ArrowUpRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  </div>
);
export default function EventDetailClient({
  event,
  otherEvents,
}: EventDetailClientProps) {
  // Doubled so the marquee can scroll continuously without a visible seam.
  const marqueeEvents = [...otherEvents, ...otherEvents];

  if (!event) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-white/60">Event not found</div>
      </div>
    );
  }

  const mid = Math.ceil(marqueeEvents.length / 2);
  const firstRow = marqueeEvents.slice(0, mid);
  const secondRow = marqueeEvents.slice(mid);

  return (
    <>
      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

          {/* Back Button */}
          <Link
            href="/events"
            className="absolute top-8 left-8 flex items-center gap-2 text-white/90 hover:text-white 
                 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>
        </div>

        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                     backdrop-blur-sm rounded-xl p-8 mb-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[#ae904c]">
                  {event.name}
                </h1>
                <button
                  className="p-2 rounded-lg border border-[#ae904c]/30 text-[#ae904c] 
                         hover:bg-[#ae904c]/10 transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-white/70">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{event.dates}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <Building className="w-5 h-5 mr-3" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {event.capacity && (
                    <div className="flex items-center text-white/70">
                      <Users className="w-5 h-5 mr-3" />
                      <span>
                        Capacity: {event.capacity.toLocaleString()} attendees
                      </span>
                    </div>
                  )}
                  {event.ticketPrice && (
                    <div className="flex items-center text-white/70">
                      <Ticket className="w-5 h-5 mr-3" />
                      <span>From ${event.ticketPrice.early}</span>
                    </div>
                  )}
                  {event.registrationDeadline && (
                    <div className="flex items-center text-white/70">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>
                        Registration closes:{" "}
                        {new Date(
                          event.registrationDeadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                {/* PCG's own CTA sits first: these pages are the site's main
                    organic entry point, and every link on them used to send
                    the visitor to the organiser instead. */}
                <Link
                  href="/discovery-call"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-black
                         font-semibold hover:bg-[#c9a95e] transition-colors duration-300"
                >
                  Going? Talk to PCG <ArrowRight className="w-4 h-4" />
                </Link>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ae904c]/40
                         text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
                  >
                    Register Now <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ae904c]/30
                         text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
                >
                  Add to Calendar <CalendarIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-4">
                    About the Event
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>

                {/* PCG at this event */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-gradient-to-br from-[#ae904c]/15 to-black/40 border border-[#ae904c]/40
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-4">
                    Attend or Sponsor {event.name} with PCG
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    PCG covers the conference circuit as a media partner and
                    books sponsorships directly for the shows we work. Whether
                    you&apos;re buying a ticket, taking a booth, or building a
                    full activation — start here and we&apos;ll handle the rest.
                  </p>
                  <ul className="text-white/70 text-sm space-y-2 mb-6">
                    <li>— Sponsorship packages &amp; booth placement, brokered by PCG</li>
                    <li>— Tickets{event.promoCode ? ` — use code ${event.promoCode}` : ""}</li>
                    <li>— Activations, afterparties &amp; post-event momentum</li>
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/contact?event=${event.id}&interest=sponsor`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ae904c] text-white
                             hover:bg-[#ae904c]/90 transition-colors duration-300"
                    >
                      Book a Sponsorship <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={event.ticketUrl || event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#ae904c]/40
                             text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
                    >
                      Get Tickets <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>

                {/* PCG Coverage — articles */}
                {event.articles && event.articles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    PCG Coverage
                  </h2>
                  <div className="space-y-4">
                    {event.articles.map((a, i) => (
                      <a
                        key={i}
                        href={a.url}
                        className="block p-4 rounded-lg bg-black/20 border border-[#ae904c]/10
                               hover:border-[#ae904c]/40 transition-colors duration-300"
                      >
                        <div className="text-white/90 font-medium">{a.title}</div>
                        {a.summary && (
                          <div className="text-white/60 text-sm mt-1">{a.summary}</div>
                        )}
                        {a.date && (
                          <div className="text-[#ae904c] text-xs mt-2">{a.date}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </motion.div>
                )}

                {/* From the Stage — clips */}
                {event.clips && event.clips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    From the Stage
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.clips.map((c, i) => (
                      <div key={i} className="rounded-lg overflow-hidden bg-black/20 border border-[#ae904c]/10">
                        <video
                          controls
                          preload="none"
                          poster={c.thumbnail}
                          className="w-full aspect-video object-cover"
                          src={c.videoUrl}
                        />
                        <div className="p-3">
                          <div className="text-white/90 text-sm font-medium">{c.title}</div>
                          {c.speaker && (
                            <div className="text-white/50 text-xs mt-0.5">{c.speaker}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                )}

                {/* Schedule */}
                {event.schedule && event.schedule.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    Event Schedule
                  </h2>
                  {(event.schedule || []).map((day, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="text-white/90 font-medium mb-4">
                        {day.date}
                      </h3>
                      <div className="space-y-4">
                        {day.events.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-4 p-4 rounded-lg bg-black/20 border border-[#ae904c]/10"
                          >
                            <div className="text-[#ae904c]">{item.time}</div>
                            <div>
                              <div className="text-white/90 font-medium">
                                {item.title}
                              </div>
                              <div className="text-white/60 text-sm">
                                {item.speaker} • {item.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Speakers */}
                {event.speakers && event.speakers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    Speakers
                  </h2>
                  <div className="space-y-4">
                    {(event.speakers || []).map((speaker, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-white/90 font-medium">
                            {speaker.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {speaker.title}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
                )}

                {/* Sponsors */}
                {event.sponsors && event.sponsors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    Sponsors
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(event.sponsors || []).map((sponsor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-sm"
                      >
                        {sponsor}
                      </span>
                    ))}
                  </div>
                </motion.div>
                )}

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                         backdrop-blur-sm rounded-xl p-8"
                >
                  <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                    Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(event.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
                )}
              </div>
            </div>

            {event.eventList && event.eventList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-[#ae904c] mb-6">
                  Events to Attend
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {event.eventList.map((eventItem, index) => (
                    <SmallEventListCard key={index} event={eventItem} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Explore Other Events Section */}
        <div className="w-full py-20">
          <div className="container mx-auto px-4 mb-8 sm:mb-12">
            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
                  Explore Other Events
                </span>
              </h2>
              <p className="text-white/60 text-center max-w-2xl text-sm sm:text-base">
                Discover more blockchain and technology events
              </p>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full 
                           bg-[#ae904c]/10 hover:bg-[#ae904c]/20 border border-[#ae904c]/20 
                           hover:border-[#ae904c]/40 transition-colors duration-300"
              >
                <span className="text-[#ae904c] font-medium text-sm sm:text-base">
                  View All Events
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ae904c]" />
              </Link>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <ScrollingRow events={firstRow} direction="left" />
            <ScrollingRow events={secondRow} direction="right" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
