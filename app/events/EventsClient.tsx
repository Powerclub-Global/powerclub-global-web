"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  Search,
  ChevronDown,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import eventsData from "@/data/events.json";
import Footer from "@/components/Footer";
import DarkGridBackground from "@/components/DarkGridBackground3";
import DateRangePicker from "@/components/ui/DateRangePicker";

interface EventCardProps {
  event: (typeof eventsData.events)[0];
}

const FeaturedEventCard = ({ event }: EventCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ae904c]/10 to-black/40 
               border border-[#ae904c]/30 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Image */}
      <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-[#ae904c] mb-3">
          {event.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-white/70">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.dates}</span>
          </div>
          <div className="flex items-center text-white/70">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-white/60 mb-6 line-clamp-2">{event.description}</p>

        <div className="mt-auto flex gap-4">
          <Link
            href={`/events/${event.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c] text-black font-semibold
                     hover:bg-[#ae904c]/90 transition-colors duration-300"
          >
            View Details <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ae904c]/30
                     text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
          >
            Register <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </motion.div>
);

const SmallEventCard = ({ event }: EventCardProps) => (
  <div
    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ae904c]/5 to-black/40 
                    border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-300"
  >
    <div className="relative h-48">
      <Image
        src={event.image}
        alt={event.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" /> */}
    </div>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-[#ae904c] mb-2 line-clamp-1">
        {event.name}
      </h3>

      <div className="space-y-1 mb-3">
        <div className="flex items-center text-white/70 text-sm">
          <Calendar className="w-3 h-3 mr-1.5" />
          <span className="truncate">{event.dates}</span>
        </div>
        <div className="flex items-center text-white/70 text-sm">
          <MapPin className="w-3 h-3 mr-1.5" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      <Link
        href={`/events/${event.id}`}
        className="flex items-center justify-center gap-2 w-full px-3 py-1.5 rounded-lg 
                   bg-[#ae904c]/10 border border-[#ae904c]/30 text-[#ae904c] text-sm
                   hover:bg-[#ae904c]/20 transition-all duration-300"
      >
        View Details <ArrowUpRight className="w-3 h-3" />
      </Link>
    </div>
  </div>
);

const LocationFilter = ({
  selectedLocation,
  locations,
  onChange,
}: {
  selectedLocation: string;
  locations: string[];
  onChange: (location: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg 
                     bg-white/5 border border-white/10 text-white
                     hover:bg-white/10 hover:border-[#ae904c]/40 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#ae904c]" />
          <span>
            {selectedLocation === "all" ? "All Locations" : selectedLocation}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="fixed md:absolute z-[100] w-[calc(100vw-32px)] md:w-full left-4 md:left-0 
               bottom-4 md:bottom-auto md:mt-2 py-2 rounded-lg bg-black/95 
               border border-white/10 backdrop-blur-xl md:translate-y-0"
          style={{
            maxHeight: "40vh",
            overflowY: "auto",
            transform: "translateY(0)", // Reset any transform on mobile
            top: "auto", // Reset top positioning on mobile
          }}
        >
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => {
                onChange(location);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-4 py-2 text-left transition-colors duration-300
                   ${
                     selectedLocation === location
                       ? "bg-[#ae904c]/20 text-[#ae904c]"
                       : "text-white/70 hover:bg-white/5"
                   }`}
            >
              {location === "all" ? "All Locations" : location}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function EventsPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Helper to parse dates from the format "Month Day–Day, Year" or "Month Day, Year"
  const parseDateRange = (dateStr: string) => {
    const [monthYear, yearPart] = dateStr.split(", ");
    const year = yearPart;
    const [month, days] = monthYear.split(" ");

    const [startDay, endDay] = days.split("–").map((d) => d.trim());

    // If there's no end day (single day event), use the start day
    const endDayValue = endDay || startDay;

    // Create date objects
    const startDate = new Date(`${month} ${startDay}, ${year}`);
    const endDate = new Date(`${month} ${endDayValue}, ${year}`);

    return { startDate, endDate };
  };

  const currentDate = new Date();

  // Apply filters to all events
  const filteredEvents = eventsData.events.filter((event) => {
    // Search filter
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Location filter
    const matchesLocation =
      selectedLocation === "all" || event.location === selectedLocation;

    // Date range filter
    const matchesDateRange = (() => {
      if (!startDate && !endDate) return true;

      const { startDate: eventStart, endDate: eventEnd } = parseDateRange(
        event.dates
      );

      if (startDate && !endDate) {
        return eventStart >= startDate || eventEnd >= startDate;
      }

      if (!startDate && endDate) {
        return eventStart <= endDate || eventEnd <= endDate;
      }

      if (startDate && endDate) {
        return (
          (eventStart >= startDate && eventStart <= endDate) ||
          (eventEnd >= startDate && eventEnd <= endDate) ||
          (eventStart <= startDate && eventEnd >= endDate)
        );
      }

      return true;
    })();

    return matchesSearch && matchesLocation && matchesDateRange;
  });

  // Separate filtered events into upcoming and past
  const upcomingEvents = filteredEvents.filter((event) => {
    const { endDate: eventEnd } = parseDateRange(event.dates);
    return eventEnd >= currentDate;
  });

  const pastEvents = filteredEvents.filter((event) => {
    const { endDate: eventEnd } = parseDateRange(event.dates);
    return eventEnd < currentDate;
  });

  const locations = [
    "all",
    ...new Set(eventsData.events.map((event) => event.location)),
  ];

  // Split upcoming events for different sections
  const featuredUpcomingEvents = upcomingEvents.slice(0, 3);
  const remainingUpcomingEvents = upcomingEvents.slice(3);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 md:pt-12 pb-12">
        <DarkGridBackground>
          <div className="container mx-auto px-4 pt-16 pb-12">
            <div className="max-w-6xl mx-auto text-center py-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/90 via-[#ae904c] to-[#ae904c]/90">
                  Conferences
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
              >
                Join us at these blockchain and technology conferences around
                the world
              </motion.p>
            </div>

            {/* Filters */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 
                  text-white placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <LocationFilter
                    selectedLocation={selectedLocation}
                    locations={locations}
                    onChange={setSelectedLocation}
                  />
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDateChange={(start, end) => {
                      setStartDate(start);
                      setEndDate(end);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </DarkGridBackground>

        {/* Upcoming Events Section Title */}
        {upcomingEvents.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8 mt-12">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Calendar className="w-5 h-5 text-[#ae904c]" />
              <h2 className="text-2xl font-semibold text-white">
                Upcoming Conferences
              </h2>
            </div>
          </div>
        )}

        {/* Featured Upcoming Events */}
        {featuredUpcomingEvents.length > 0 && (
          <div className="max-w-6xl mx-auto space-y-6 mb-16">
            {featuredUpcomingEvents.map((event) => (
              <FeaturedEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Remaining Upcoming Events Grid */}
        {remainingUpcomingEvents.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {remainingUpcomingEvents.map((event) => (
              <SmallEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Past Events Section Title */}
        {pastEvents.length > 0 && (
          <div className="max-w-6xl mx-auto mb-8 mt-20">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Clock className="w-5 h-5 text-[#ae904c]" />
              <h2 className="text-2xl font-semibold text-white">
                Past Conferences
              </h2>
            </div>
          </div>
        )}

        {/* Past Events Grid */}
        {pastEvents.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pastEvents.map((event) => (
              <SmallEventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">
              No events found matching your criteria
            </p>
          </div>
        )}

        {/* Results Count */}
        {filteredEvents.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <p className="text-white/60">
              Showing {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""}
              {upcomingEvents.length > 0 && pastEvents.length > 0 && (
                <span>
                  {" "}
                  ({upcomingEvents.length} upcoming, {pastEvents.length} past)
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsPageContent />
    </Suspense>
  );
}
