import React from "react";
import {
  Car,
  Share2,
  PartyPopper,
  ArrowRight,
  Code,
  LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
  className?: string;
  imageBelow?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  className = "",
  imageBelow = false,
}) => (
  <div className={`group relative rounded-md perspective-1000 ${className}`}>
    <div className="preserve-3d transition-all duration-500 ease-out group-hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
      <div className="absolute inset-0 rounded-md bg-black/30 blur-xl transform translate-y-4 scale-95 transition-all duration-500 group-hover:translate-y-6 group-hover:scale-90" />
      <div
        className="relative rounded-md backdrop-blur-sm bg-gradient-to-b from-[#ae904c]/5 to-[#ae904c]/0 
        border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-500
        before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r 
        before:from-[#ae904c]/0 before:via-[#ae904c]/5 before:to-[#ae904c]/0 
        before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-500"
      >
        <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ae904c]/10 via-transparent to-[#ae904c]/10 animate-gradient-shift" />
          <div className="absolute -inset-px rounded-md bg-gradient-to-r from-[#ae904c]/20 via-[#ae904c]/5 to-[#ae904c]/20 blur-sm group-hover:animate-pulse" />
        </div>

        {!image ? (
          <div className="relative z-10 p-8 transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
              <Icon
                className="w-8 h-8 text-[#ae904c]"
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
              {description}
            </p>
            <button
              className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 
              group-hover:translate-x-2 relative overflow-hidden
              before:absolute before:-inset-3 before:rounded-lg before:bg-[#ae904c]/5 
              before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300"
            >
              Learn More{" "}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        ) : imageBelow ? (
          <div className="relative z-10 h-full flex flex-col transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="p-8 flex-1">
              <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
                <Icon
                  className="w-8 h-8 text-[#ae904c]"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
                {title}
              </h3>
              <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
                {description}
              </p>
              <button className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 group-hover:translate-x-2">
                Learn More{" "}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="p-8 pt-0">
              <div className="relative w-full h-[19rem] rounded-lg overflow-hidden bg-[#ae904c]/10 transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={image}
                  alt={`${title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />{" "}
                {/* Added darker overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />{" "}
                {/* Added gradient overlay */}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-full flex transform transition-transform duration-500 group-hover:-translate-y-1">
            <div className="relative z-10 p-8 flex-1">
              <div className="mb-6 p-4 inline-block rounded-xl bg-[#ae904c]/10 transform transition-transform duration-300 group-hover:scale-110">
                <Icon
                  className="w-8 h-8 text-[#ae904c]"
                  size={24}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#ae904c]/90 group-hover:text-[#ae904c] transition-colors duration-300">
                {title}
              </h3>
              <p className="text-white/60 mb-6 group-hover:text-white/70 transition-colors duration-300">
                {description}
              </p>
              <button className="flex items-center text-[#ae904c]/80 hover:text-[#ae904c] transition-all duration-300 group-hover:translate-x-2">
                Learn More{" "}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="flex-1 p-8">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-[#ae904c]/10 transform transition-transform duration-500 group-hover:scale-105">
                <img
                  src={image}
                  alt={`${title} showcase`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40" />{" "}
                {/* Added darker overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />{" "}
                {/* Added gradient overlay */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  return (
    <div className="relative w-full pb-32 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-24 right-0 w-[200px] h-[200px] rounded-full bg-gradient-to-l from-[#ae904c]/10 to-[#ae904c]/20 blur-[64px] animate-blob animation-delay-2000"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-14 left-10 w-[200px] h-[200px] rounded-full bg-gradient-to-l from-[#ae904c]/10 to-[#ae904c]/20 blur-[64px] animate-blob animation-delay-2000"
      />
      <div className="container mx-auto px-4">
        <div className="text-center md:mb-16 mb-12">
          <h2 className="text-4xl font-bold mb-3 md:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c]/80 via-[#ae904c] to-[#ae904c]/80">
              Our Services
            </span>
          </h2>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/60 max-w-3xl mx-auto text-lg">
              Comprehensive solutions tailored to elevate your brand and create
              memorable experiences
            </p>
            <button
              onClick={() => (window.location.href = "/services")}
              className="group flex items-center gap-2 px-6 py-2 rounded-full bg-[#ae904c]/10 hover:bg-[#ae904c]/20 border border-[#ae904c]/20 hover:border-[#ae904c]/40 transition-all duration-300"
            >
              <span className="text-[#ae904c] font-medium">View All</span>
              <ArrowRight className="w-4 h-4 text-[#ae904c] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="h-full">
            <ServiceCard
              icon={Car}
              title="Road Show"
              description="Professional road show services delivering your message across cities with maximum impact and engagement. Backed by our network of local partners."
              image="/roadshow.webp"
              imageBelow={true}
            />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              icon={Share2}
              title="Social Media"
              description="Strategic social media management to boost your brand presence and connect with your target audience."
            />
            <ServiceCard
              icon={Code}
              title="Web Development"
              description="Custom web solutions that combine cutting-edge technology with seamless UX to bring your digital vision to life."
            />
            <div className="md:col-span-2">
              <ServiceCard
                icon={PartyPopper}
                title="Events"
                description="Unforgettable event experiences that bring your vision to life and leave lasting impressions."
                image="/event.webp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
