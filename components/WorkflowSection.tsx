"use client";
import React, { useState } from "react";
import {
  useScroll,
  motion,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

const Timeline = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      title: "Initial Consultation",
      shortDescription: "Schedule a consultation to discuss your needs",
      description:
        "We start by understanding your business, goals, and vision. This helps us craft a strategy that fits your unique requirements.",
      benefits: [
        "In-depth needs analysis",
        "Custom solution planning",
        "Budget optimization",
        "Timeline planning",
      ],
      keyPoints: [
        "Custom strategies",
        "Goal-focused plans",
        "Expert insights",
        "Smooth process",
        "Measurable results",
      ],
    },
    {
      title: "Strategy Development",
      shortDescription: "Get your customized strategic plan",
      description:
        "Our team develops a detailed strategy tailored to your objectives and market position. We outline a clear roadmap to guide every step of the implementation process.",
      benefits: [
        "Personalized strategy",
        "Clear roadmap",
        "Market-aligned plans",
        "Step-by-step guidance",
      ],
      keyPoints: [
        "Detailed action plans",
        "KPI establishment",
        "Resource optimization",
        "Milestone definition",
      ],
    },
    {
      title: "Implementation",
      shortDescription: "Execute the plan with our expert team",
      description:
        "We bring the strategy to life. Our specialists handle everything from content creation to campaign management ensuring smooth execution across all channels.",
      benefits: [
        "Expert execution",
        "Regular updates",
        "Quality assurance",
        "Agile adaptation",
      ],
      keyPoints: [
        "Timeline adherence",
        "Progress tracking",
        "Issue resolution",
        "Performance monitoring",
      ],
    },
    {
      title: "Optimization & Growth",
      shortDescription: "Achieve and maintain optimal results",
      description:
        "We continuously monitor, analyze, and refine your campaigns to maximize performance. Our goal is to help you scale sustainably and stay ahead of the curve.",
      benefits: [
        "Performance analysis",
        "Growth optimization",
        "Continuous improvement",
        "Long-term success",
      ],
      keyPoints: [
        "Data analytics",
        "Strategy refinement",
        "Performance tracking",
        "Scalability planning",
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center relative w-full max-w-5xl my-14">
      {/* Timeline Section */}
      <div className="flex md:flex-row justify-between items-start md:p-4 relative w-full">
        {/* Background line */}
        <div className="absolute left-12 md:left-0 top-0 md:top-3 w-0.5 md:w-full h-full md:h-0.5 bg-neutral-500 mt-2"></div>

        {/* Gradient Blobs - Only show on desktop */}
        <div className="hidden md:block absolute bottom-20 right-1/4 h-[200px] w-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ae904c] via-[#ae904c]/20 to-transparent blur-2xl opacity-20"></div>
        <div className="hidden md:block absolute top-40 left-1/4 h-[180px] w-[240px] rounded-full bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-[#ae904c] via-[#8b7339] to-[#443a1d] blur-2xl opacity-10"></div>
        <div className="hidden md:block absolute top-20 right-1/3 h-[150px] w-[250px] rounded-full bg-gradient-to-br from-[#ae904c]/30 via-[#ae904c]/10 to-transparent blur-xl"></div>
        <div className="hidden md:block absolute bottom-32 left-1/4 h-[220px] w-[280px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ae904c] via-[#ae904c]/5 to-transparent blur-3xl opacity-20 animate-pulse"></div>
        <div className="hidden md:block absolute top-0 right-0 h-[400px] w-[500px] rounded-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ae904c]/10 via-[#ae904c]/5 to-transparent blur-3xl opacity-20"></div>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row w-full gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col w-full">
              {/* Step with its description on mobile */}
              <div className="flex flex-col w-full">
                {/* Step Button */}
                <div
                  className="flex md:flex-col items-start md:items-center relative text-left md:text-center w-full md:max-w-[200px] pl-16 md:px-4 cursor-pointer group"
                  onClick={() =>
                    setActiveStep(activeStep === index ? null : index)
                  }
                >
                  <div
                    className={`absolute left-11 md:static w-3 h-3 bg-[#ae904c] rounded-full z-10 shadow-[0_0_10px_rgba(174,144,76,0.5)] transition-transform duration-300 ${
                      activeStep === index
                        ? "scale-150"
                        : "group-hover:scale-125"
                    }`}
                  ></div>

                  {index !== steps.length - 1 && (
                    <div className="hidden md:block absolute left-full top-0 ml-2 w-4 h-4 border-t border-r border-[#ae904c]/90 rotate-45"></div>
                  )}

                  <div className="flex flex-col gap-2 md:items-center">
                    <p className="text-base font-medium text-white group-hover:text-[#ae904c] transition-colors md:mt-5">
                      {step.title}
                    </p>
                    <p className="text-sm text-white/70">
                      {step.shortDescription}
                    </p>
                    <ChevronDown
                      className={`w-4 h-4 text-[#ae904c] transition-transform duration-300 ${
                        activeStep === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Mobile Description Panel */}
                <AnimatePresence>
                  {activeStep === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden w-full mt-4 pl-16"
                    >
                      <div className="bg-[#ae904c]/10 border border-[#ae904c]/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="space-y-4">
                          <p className="text-white/90 text-sm leading-relaxed">
                            {step.description}
                          </p>
                          <div className="space-y-3">
                            <h4 className="text-base font-medium text-[#ae904c]">
                              Key Benefits
                            </h4>
                            <ul className="space-y-2">
                              {step.benefits.map((benefit, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2 text-white/80 text-sm"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#ae904c] flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Description Panel */}
      <AnimatePresence>
        {activeStep !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block w-full mt-8 overflow-hidden"
          >
            <div className="bg-[#ae904c]/10 border border-[#ae904c]/20 rounded-xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Description */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-[#ae904c] my-4">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium text-[#ae904c]">
                      Key Benefits
                    </h4>
                    <ul className="space-y-2">
                      {steps[activeStep].benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-white/80"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#ae904c]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column - Additional Info */}
                <div className="bg-black/90 rounded-lg p-6 border border-[#ae904c]/10">
                  <h4 className="text-lg font-medium text-[#ae904c] mb-4">
                    What to Expect
                  </h4>
                  <ul className="space-y-4">
                    {steps[activeStep].keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#ae904c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#ae904c] text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-white/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WorkflowSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center my-12 md:my-24"
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <h2 className="text-4xl lg:text-5xl font-semibold text-[#ae904c] mb-8">
        Our Workflow
      </h2>
      <Timeline />
    </motion.div>
  );
};

export default WorkflowSection;
