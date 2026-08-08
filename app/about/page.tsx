"use client";
import React, { Suspense } from "react";
// import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Globe, Lightbulb, MessageCircle, Sparkles, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { useRouter } from "next/navigation";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  desc?: string;
}

const features: FeatureCard[] = [
  {
    title: "Expert Team",
    description:
      "Our team of industry veterans brings decades of combined experience to every project we undertake.",
    icon: <Users className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Global Reach",
    description:
      "With operations in over 25 countries, we connect brands with audiences worldwide through our extensive network.",
    icon: <Globe className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Innovative Solutions",
    description:
      "We deliver cutting-edge approaches tailored specifically to your unique business challenges and goals.",
    icon: <Lightbulb className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Transparent Communication",
    description:
      "We maintain clear, open communication throughout every project, ensuring alignment and peace of mind.",
    icon: <MessageCircle className="w-6 h-6 text-[#ae904c]" />,
  },
];

const stats: Stat[] = [
  {
    value: 750,
    label: "Events Organized",
    suffix: "+",
    desc: "Successfully delivered exceptional experiences across a diverse range of industries and formats.",
  },
  {
    value: 85,
    label: "Attendees",
    suffix: "K+",
    desc: "Connected brands with over 85,000 engaged participants through our immersive events.",
  },
  {
    value: 25,
    label: "Countries",
    suffix: "+",
    desc: "Expanded our global footprint to deliver impactful experiences across five continents.",
  },
  {
    value: 99,
    label: "Client Satisfaction",
    suffix: "%",
    desc: "Consistently exceeding expectations with our attention to detail and commitment to excellence.",
  },
];


const VideoGrid = () => {
  const videos = [
    "/about/permissionless2022.mp4",
    "/about/mbw2022.mp4",
    "/about/versace2.mp4",
    "/about/versace1.mp4",
  ];

  return (
    <div className="w-full lg:w-[40%] flex justify-end z-0 mt-20 lg:mt-20 gap-4">
      <div className="w-1/2 flex flex-col gap-4 -mt-12">
        {videos.slice(0, 2).map((src, index) => (
          <div
            key={index}
            className={`h-[${
              index === 0 ? "300" : "400"
            }px] rounded-xl overflow-hidden`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all"
              style={{ objectFit: "cover" }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {videos.slice(2).map((src, index) => (
          <div
            key={index}
            className={`h-[${
              index === 0 ? "400" : "300"
            }px] rounded-xl overflow-hidden`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all"
              style={{ objectFit: "cover" }}
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCounter = ({ stat, index }: { stat: Stat; index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col lg:border-r border-[#ae904c]/20 py-10 relative group/feature",
        (index === 0 || index === 4) && "lg:border-l border-[#ae904c]/50",
        index < 4 && "lg:border-b border-[#ae904c]/50"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ae904c]/5 to-transparent pointer-events-none" />

      <div className="mb-4 relative z-10 px-10">
        <div className="text-4xl font-bold text-[#ae904c]">
          {inView ? (
            <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
          ) : (
            "0"
          )}
        </div>
      </div>

      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ae904c]/20 group-hover/feature:bg-[#ae904c] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {stat.label}
        </span>
        <p className="text-sm text-white/70 max-w-xs relative z-10 pt-2">
          {stat.desc}
        </p>
      </div>
    </div>
  );
};

function AboutPageContent() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/contact");
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row justify-between pt-10 lg:pt-20 px-4 md:px-8 lg:px-16 xl:px-32 overflow-hidden">
        <div className="w-full lg:w-1/2 flex items-start justify-between pt-16 px-4 lg:pl-20 z-10">
          <div className="flex flex-col w-full">
            <div>
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6 md:mb-8">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Transforming Experiences Since 2018
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
              <span className="whitespace-normal lg:whitespace-nowrap">
                Where Vision <br /> meets
              </span>
              <br />
              <span className="font-bold text-[#ae904c] whitespace-normal">
                Excellence <span className="text-white font-normal">And</span>{" "}
                Innovation
              </span>
              <br />
            </h1>

            {/* <div className="flex gap-3 mt-8 lg:mt-12">
              <AnimatedTooltip items={people} />
            </div> */}
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-8 lg:mt-12">
              At PowerClub Global, we&apos;re more than an agency – we&apos;re a
              dynamic collective of visionaries, strategists, and creators
              dedicated to transforming how brands connect with their audiences.
            </p>
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-6 lg:mt-8">
              With a proven track record spanning over five years, we&apos;ve
              partnered with leading brands across industries to create
              immersive experiences that leave lasting impressions.
            </p>
            <div className="">
              <button
                onClick={handleGetStarted}
                className="bg-[#ae904c] text-white max-w-44 px-6 py-3 rounded-lg mt-8 lg:mt-12 flex items-center gap-2"
              >
                Book A Call
              </button>
            </div>
          </div>
        </div>

        <VideoGrid />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 relative z-10 md:py-10 max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <StatCounter key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Building Tomorrow Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mt-32">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#ae904c] mb-8">
          Crafting Exceptional Brand Experiences
        </h2>
        <p className="text-white/70 text-lg leading-relaxed">
          Since our founding, PowerClub Global has been at the forefront of
          innovative event management, digital transformation, and strategic
          brand experiences. We&apos;ve collaborated with industry pioneers,
          global brands, and influential figures who share our commitment to
          excellence and innovation.
        </p>
      </div>

      {/* Images with influential people */}
      <div className="w-full mt-24 overflow-y-visible overflow-x-clip">
        <div className="flex flex-nowrap gap-6 justify-between ">
          {[
            "/about/influenfial-ppl-1.jpeg",
            "/about/influenfial-ppl-2.jpeg",
            "/about/influenfial-ppl-3.jpeg",
            "/about/influenfial-ppl-4.jpeg",
            "/about/influenfial-ppl-5.jpeg",
            "/about/influenfial-ppl-6.jpeg",
          ].map((img, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                transform: `rotate(${index % 2 === 0 ? "-5" : "5"}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-2xl transform scale-105 shadow-2xl" />
              <div className="relative w-36 h-36 lg:w-64 lg:h-64 overflow-hidden rounded-xl">
                <img
                  src={img}
                  alt={`Influential person ${index + 1}`}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center max-w-4xl mx-auto px-4 mt-32">
        <p className="text-white/70 text-lg leading-relaxed">
          Our journey is defined by groundbreaking achievements and meaningful
          partnerships that continue to shape the future of brand experiences.
          Our collaborative approach has allowed us to build meaningful
          relationships with industry leaders, visionaries, and change-makers
          across the globe. Through strategic partnerships, we&apos;ve amplified
          our clients&apos; reach and impact, creating authentic connections
          that resonate with audiences and drive measurable results. These
          collaborations have enabled us to push boundaries, challenge
          conventions, and deliver truly transformative experiences that stand
          the test of time.
        </p>
      </div>
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 relative z-10 md:py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              "flex flex-col lg:border-r border-[#ae904c]/20 py-10 relative group/feature",
              (index === 0 || index === 4) && "lg:border-l border-[#ae904c]/50",
              index < 4 && "lg:border-b border-[#ae904c]/50"
            )}
          >
            {index < 4 && (
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#ae904c]/5 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
              <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#ae904c]/5 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-[#ae904c]">
              {feature.icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
              <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ae904c]/20 group-hover/feature:bg-[#ae904c] transition-all duration-200 origin-center" />
              <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                {feature.title}
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-xs relative z-10 px-10">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      {/* Past Events Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-32">
        <h2 className="text-4xl lg:text-5xl font-bold text-[#ae904c] text-center mb-16">
          Signature Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Event Card 1 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/permissionless2022.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Permissionless 2022
                </h3>
                <span className="text-sm text-[#ae904c]">West Palm Beach, FL</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                A landmark conference bringing together industry pioneers,
                developers, and investors to explore the frontiers of
                decentralized technology and its real-world applications.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>May 17–19, 2022</span>
                <span className="text-white/30">•</span>
                <span>7,000+ Attendees</span>
              </div>
            </div>
          </div>

          {/* Event Card 2 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/mbw2022.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Conference Circuit Coverage
                </h3>
                <span className="text-sm text-[#ae904c]">On Location</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Ground-level production from the blockchain conference circuit —
                capturing the energy, the people, and the moments that turn an
                event into lasting content.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>2022 Season</span>
                <span className="text-white/30">•</span>
                <span>Event Media Production</span>
              </div>
            </div>
          </div>

          {/* Event Card 3 */}
          <div className="group bg-gradient-to-br from-[#ae904c]/10 to-black/40 rounded-2xl border border-[#ae904c]/20 overflow-hidden">
            <div className="h-[300px] overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectFit: "cover" }}
              >
                <source src="/about/versace1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  Private Afterparty Production
                </h3>
                <span className="text-sm text-[#ae904c]">Invite Only</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Curated rooms where founders, sponsors, and investors actually
                meet — the signature PCG afterparty experience that turns a
                conference badge into a network.
              </p>
              <div className="flex items-center gap-2 text-[#ae904c] text-sm">
                <span>2022 Season</span>
                <span className="text-white/30">•</span>
                <span>Experience Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Sections */}
      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                Our Approach
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  At PowerClub Global, we believe in a collaborative,
                  client-centered approach that puts your objectives at the
                  heart of everything we do. Our team works closely with you to
                  understand your unique challenges, audience, and goals,
                  developing tailored solutions that drive meaningful engagement
                  and measurable results.
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  In today&apos;s rapidly evolving digital landscape, having a
                  strategic partner who understands both traditional and
                  emerging channels is essential. Our interdisciplinary team
                  combines deep industry expertise with creative thinking to
                  help you navigate complexity, seize opportunities, and
                  maintain a competitive edge in your market.
                </p>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
              <img
                src="/services/press-relations1.jpeg"
                alt="Team collaboration session"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <img
                src="/about/team-at-work.jpeg"
                alt="PowerClub Global team at work"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                Our Commitment
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  Our track record of success is built on a foundation of
                  excellence, integrity, and innovation. We&apos;ve helped
                  organizations of all sizes transform their digital presence,
                  create unforgettable experiences, and achieve substantial
                  growth through strategic implementation and creative
                  problem-solving.
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  By combining specialized industry expertise with cutting-edge
                  technology and creative thinking, we ensure that every project
                  we undertake delivers exceptional value and sustainable
                  results. We&apos;re committed to pushing boundaries, exceeding
                  expectations, and helping our clients thrive in an
                  increasingly competitive landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutPageContent />
    </Suspense>
  );
}
