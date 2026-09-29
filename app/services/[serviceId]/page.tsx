import React from "react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
// import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

import {
  ArrowUpRight,
  Globe,
  MessageCircle,
  Lightbulb,
  Phone,
  Sparkles,
  Users,
  Handshake,
  Globe2Icon,
  ChartAreaIcon,
  Search,
} from "lucide-react";
import Footer from "@/components/Footer";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import InlineCTA from "@/components/InlineCTA";
import { serviceBookingHref } from "@/lib/booking";
import type { Metadata } from "next";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import Partners from "@/components/Carousel";
import { cn } from "@/lib/utils";
import FAQSection from "@/components/FAQSection";
import WorkflowSection from "@/components/WorkflowSection";
import { FaSchoolFlag } from "react-icons/fa6";

// const people = [
//   {
//     id: 1,
//     name: "John Doe",
//     designation: "Founder & CEO",
//     image:
//       "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//   },
//   {
//     id: 2,
//     name: "Robert Johnson",
//     designation: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 3,
//     name: "Jane Smith",
//     designation: "CO-Founder",
//     image:
//       "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     designation: "CFO",
//     image:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//   },
//   {
//     id: 5,
//     name: "Tyler Durden",
//     designation: "CEO",
//     image:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//   },
// ];

interface ServiceCardProps {
  title: string;
  image: string;
  description: string;
  id: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  image,
  description,
  id,
}) => (
  <Link href={`/services/${id}`} className="block">
    <div className="relative group rounded-2xl overflow-hidden h-48 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="text-lg font-medium flex items-center gap-2">
          {title}
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </p>
        <p className="text-sm text-white/80 mt-1 max-w-[200px] hidden group-hover:flex transition-opacity">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

// interface FAQ {
//   question: string;
//   answer: string;
// }

const features: FeatureCard[] = [
  {
    title: "Expert Team",
    description:
      "Our team brings decades of combined experience in the industry.",
    icon: <Users className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Global Reach",
    description:
      "Connect with audiences worldwide through our extensive network.",
    icon: <Globe className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Innovative Solutions",
    description: "Cutting-edge approaches tailored to your unique needs.",
    icon: <Lightbulb className="w-6 h-6 text-[#ae904c]" />,
  },
  {
    title: "Transparent Communication",
    description: "Open lines of communication for clarity and peace of mind.",
    icon: <MessageCircle className="w-6 h-6 text-[#ae904c]" />,
  },
];

// const faqs: FAQ[] = [
//   {
//     question: "What services do you offer?",
//     answer:
//       "We design, build, and maintain websites. We also help with SEO, web performance, and custom web apps.",
//   },
//   {
//     question: "Can you make a website for my small business?",
//     answer:
//       "Yes, we create websites for businesses of all sizes, big or small.",
//   },
//   {
//     question: "Will my website work on phones and tablets?",
//     answer:
//       "Absolutely, we make responsive websites that look great on all devices.",
//   },
//   {
//     question: "How do you help my site show up on search engines?",
//     answer:
//       "We use SEO techniques to improve your site’s ranking and visibility online.",
//   },
//   {
//     question: "What if I need help after my site is live?",
//     answer:
//       "No worries, we offer maintenance and support to keep your site running smoothly.",
//   },
// ];
interface PageProps {
  params: Promise<{
    serviceId: string;
  }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}


export function generateStaticParams() {
  return services.filter((s) => s.featured).map((s) => ({ serviceId: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}): Promise<Metadata> {
  const { serviceId } = await params;
  const service = services.find((s) => s.id === serviceId);
  if (!service) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({
    title: `${service.maintitle || service.title} — Powerclub Global Services`,
    description: service.description,
    path: `/services/${service.id}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: PageProps) {
  // Service schema: these three pages are the ones meant to rank for
  // "roadshow management" / "event activations" style intent queries.

  const resolvedParams = await params;

  const service = services.find((s) => s.id === resolvedParams.serviceId);

  if (!service) {
    notFound();
  }

  const currentIndex = services.findIndex((s) => s.id === service.id);
  const relatedServices = Array.from({ length: 3 }, (_, i) => {
    const nextIndex = (currentIndex + i + 1) % services.length;
    return services[nextIndex];
  });
  const serviceJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.maintitle || service.title,
        description: service.description,
        serviceType: service.maintitle || service.title,
        areaServed: "Worldwide",
        provider: {
          "@type": "Organization",
          name: "Powerclub Global",
          url: "https://powerclubglobal.com",
          telephone: "+1-645-233-0500",
        },
        url: `https://powerclubglobal.com/services/${service.id}`,
        ...(service.image
          ? { image: `https://powerclubglobal.com${service.image}` }
          : {}),
      }
    : null;

  return (
    <>
      {serviceJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      )}
    <main className="min-h-screen bg-black" data-page-context={service.maintitle || service.title}>
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between pt-10 lg:pt-20 px-4 md:px-8 lg:px-16 xl:px-32 overflow-hidden">
        {/* Left side content */}
        <div className="w-full lg:w-1/2 flex items-start justify-between pt-16 lg:pt-20 px-4 lg:pl-20 z-10">
          <div className="flex flex-col w-full">
            <div>
              <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#ae904c]/10 text-[#ae904c] text-xs md:text-sm mb-6 md:mb-8">
                <Sparkles className="inline-block w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                Built for the conference circuit
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white uppercase">
              <span className="whitespace-normal lg:whitespace-nowrap">
                {service.prefix}
              </span>
              <br />
              <span className="font-bold text-[#ae904c] whitespace-normal">
                {service.title}
              </span>
              <br />
              {service.suffix}
            </h1>

            {/* <div className="flex gap-3 mt-8 lg:mt-12">
              <AnimatedTooltip items={people} />
            </div> */}
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-8 lg:mt-12">
              {service.description}
            </p>
            <p className="text-white/70 text-base lg:text-lg max-w-xl mt-6 lg:mt-8">
              {service.longDescription}
            </p>

            <button className="bg-[#ae904c] text-white max-w-40 px-6 py-3 rounded-lg mt-8 lg:mt-12 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Book a call
            </button>
          </div>
        </div>

        {/* Right side images */}
        <div className="w-full lg:w-[30%] flex justify-end z-0 mt-8 lg:mt-0 overflow-hidden">
          <div className="flex flex-col gap-5 w-full lg:max-w-lg">
            <div className="h-48 lg:h-1/3">
              <img
                src={`/services/${service.id}3.webp`}
                className="w-full h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
            <div className="flex gap-5 h-32 lg:h-1/4">
              <img
                src={`/services/${service.id}2.webp`}
                className="w-1/2 h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
              <img
                src={`/services/${service.id}1.webp`}
                className="w-1/2 h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
            <div className="h-48 lg:h-1/3">
              <img
                src={`/services/${service.id}4.webp`}
                className="w-full h-full object-cover brightness-75 hover:brightness-100"
                alt={service.title}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Additional Information Section */}
      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                {service.heading1}
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  {service.para1}
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  {service.para2}
                </p>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
              <img
                src={`/services/${service.id}-cover.webp`}
                alt="Placeholder"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <InlineCTA
        heading={`Talk to us about ${service.maintitle || service.title}`}
        body="Book a call and we will tell you plainly whether this fits, what it involves and what it costs."
        bookHref={serviceBookingHref(service.id)}
        textContext={(service.maintitle || service.title).toLowerCase()}
      />
      {/* Feature cards 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 md:py-10 max-w-7xl mx-auto">
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
      <section className="py-16 lg:py-24 px-4 md:px-8 lg:px-16 xl:px-32 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <img
                src={`/services/${service.id}1.webp`}
                alt="Placeholder"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl lg:text-5xl font-semibold text-[#ae904c]">
                {service.heading2}
              </h3>
              <div className="space-y-4">
                <p className="text-white/70 text-base lg:text-lg">
                  {service.para3}
                </p>
                <p className="text-white/70 text-base lg:text-lg">
                  {service.para4}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Workflow Section */}
      <section className="w-full flex flex-col items-center justify-between">
        <WorkflowSection />
      </section>
      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <FAQSection faqs={service.faq} />
      )}
      {/* Partner Logos Section */}
      <section className="pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <div className="lg:w-1/2">
              <h3 className="text-4xl lg:text-5xl font-semibold text-[#ae904c] mb-8">
                Why Choose Us
              </h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {service.whyus}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <Handshake className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">3000+ brands consulted</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <Globe2Icon className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">Proven global strategies</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <FaSchoolFlag className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">Expert industry insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <ChartAreaIcon className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">Tailored growth solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <Search className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">
                    Innovative marketing tactics
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#ae904c]/10">
                    <Users className="w-6 h-6 text-[#ae904c]" />
                  </div>
                  <span className="text-white">Data-driven decisions</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="/team-at-work.jpeg"
                alt="Team at work"
                className="rounded-2xl object-cover w-full h-[400px] brightness-75"
              />
              <img
                src="/services/press-relations3.webp"
                alt="Office space"
                className="rounded-2xl object-cover w-full h-[400px] mt-8 brightness-75"
              />
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="w-full flex flex-col items-center justify-center md:pt-16 ">
        <div className="mt-28 md:mt-40">
          <Partners />
        </div>
      </section>
      <CTASection
        headingText={service.ctaheading}
        paragraphText={service.ctapara}
        primaryHref={serviceBookingHref(service.id)}
      />
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#ae904c] mb-16">
          Other Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 my-8 lg:my-12">
          {relatedServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.maintitle!}
              image={`/services/${service.id}-cover.webp`}
              description={service.description}
            />
          ))}
          <Link href="/services" className="block">
            <div className="h-48 rounded-2xl border border-[#ae904c] flex items-center justify-between p-4 group cursor-pointer hover:bg-[#ae904c]/10 transition-colors">
              <p className="text-white text-lg font-medium group-hover:text-[#ae904c] transition-colors flex items-center gap-2 self-end">
                See all
                <ArrowUpRight className="w-4 h-4" />
              </p>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
}
