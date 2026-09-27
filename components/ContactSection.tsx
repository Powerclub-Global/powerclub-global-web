import React, { useRef, useState, useEffect } from "react";
import {
  Mail,
  Send,
  LucideIcon,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { submitContactForm, ContactFormData } from "@/app/contact/contact";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  info: string;
  delay?: number;
  primary?: boolean;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  info,
  primary = false,
}) => (
  <div
    className={`group p-6 rounded-xl backdrop-blur-sm 
      ${
        primary
          ? "bg-[#ae904c] border-none"
          : "bg-black/20 border border-[#ae904c]/20"
      } 
      hover:scale-105 transition-all duration-300 h-full`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`p-3 rounded-lg ${
          primary ? "bg-black/20" : "bg-[#ae904c]/10"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${primary ? "text-white" : "text-[#ae904c]"}`}
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h4
          className={`font-medium mb-1 ${
            primary ? "text-white" : "text-[#ae904c]"
          }`}
        >
          {title}
        </h4>
        <p className={`${primary ? "text-white/90" : "text-white/60"}`}>
          {info}
        </p>
      </div>
    </div>
    <p className="text-white/60 mt-2">
      We&apos;re here to answer any questions you may have.
    </p>
  </div>
);

const HighlightCard: React.FC = () => (
  <div className="relative h-full">
    {/* Static border frame */}
    <div className="absolute inset-0 rounded-xl border border-[#ae904c]/30" />

    {/* Card content */}
    <div
      className="relative p-8 rounded-xl bg-gradient-to-br from-[#ae904c]/20 to-black/40 
      border border-[#ae904c]/30 backdrop-blur-md transform-gpu h-full
      transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-[#ae904c]" />
          <h3 className="text-xl font-semibold text-[#ae904c]">
            Quick Response
          </h3>
        </div>
        <p className="text-white/70">
          We typically respond within 2 hours during business hours. Schedule a
          call or send us a message - we&apos;re here to help!
        </p>
        <p className="text-white/70">We&apos;d love to hear from you.</p>
        <div className="flex gap-4">
          <button
            onClick={onScheduleCall}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ae904c] text-white
            hover:bg-[#ae904c]/90 transition-colors duration-300"
          >
            Schedule Call <ArrowRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#ae904c]/30
            text-[#ae904c] hover:bg-[#ae904c]/10 transition-colors duration-300"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ContactSection: React.FC = () => {
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Effect to clear form status after 5 seconds
  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => {
        setFormStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Form handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      await submitContactForm(formData, "/");
      setFormStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit form:", error);
      setFormStatus({
        success: false,
        message: "Failed to send your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full bg-black/95 pt-10 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(#ae904c 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ae904c] to-[#ae904c]/80">
                Let&apos;s Connect
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-center text-lg">
              Have a project in mind? We&apos;d love to help bring your vision
              to life
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <HighlightCard />
              <ContactCard
                icon={Mail}
                title="Email Us"
                info="innovate@powerclubglobal.com"
                primary
              />
            </div>

            {/* Right Column - Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 20 }}
              animate={
                isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }
              }
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                {/* Static border frame */}
                <div className="absolute inset-0 rounded-xl border border-[#ae904c]/20" />

                {/* Form content */}
                <div
                  className="relative rounded-xl backdrop-blur-sm bg-black/20 border border-[#ae904c]/20 p-8
                  transform-gpu transition-all duration-300 hover:-translate-x-2 hover:-translate-y-2"
                >
                  {formStatus && (
                    <div
                      className={`mb-6 p-4 rounded-lg flex items-start gap-3 
                        ${
                          formStatus.success
                            ? "bg-green-900/20 border border-green-500/30 text-green-200"
                            : "bg-red-900/20 border border-red-500/30 text-red-200"
                        }
                        animate-fadeIn`}
                    >
                      {formStatus.success ? (
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      )}
                      <p>{formStatus.message}</p>
                    </div>
                  )}

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300
                          focus:bg-black/40"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                          text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                          focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300
                          focus:bg-black/40"
                      />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                        text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                        focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300
                        focus:bg-black/40"
                    />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full p-4 rounded-lg bg-black/40 border border-[#ae904c]/20 
                        text-white/90 placeholder:text-white/40 focus:outline-none focus:border-[#ae904c]/40
                        focus:ring-1 focus:ring-[#ae904c]/40 transition-all duration-300 resize-none
                        focus:bg-black/40"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-lg bg-[#ae904c] text-white
                        hover:bg-[#ae904c]/90 transition-colors duration-300 flex items-center justify-center gap-2
                        disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
const onScheduleCall = () => {
  window.open(
    "https://calendly.com/powerclub-global/business-interaction",
    "_blank"
  );
};
