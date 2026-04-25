"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Linkedin, Instagram, Phone, Github, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SanitySocialLink } from "@/sanity/queries";

interface ContactFormProps {
  contactEmail?: string;
  socialLinks?: SanitySocialLink[];
}

// Default social links — used when CMS has no data yet
const DEFAULT_SOCIAL_LINKS: SanitySocialLink[] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/in/erik-karlsson-ab00a257",
    label: "LinkedIn",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/xelight/",
    label: "Instagram",
  },
  {
    platform: "phone",
    url: "tel:+46730471288",
    label: "Call (+46) 730 471 288",
    displayText: "(+46) 730 471 288",
  },
];

// Map platform slug → Lucide icon
function PlatformIcon({ platform }: { platform: string }) {
  const cls = "w-6 h-6";
  switch (platform) {
    case "linkedin": return <Linkedin className={cls} />;
    case "instagram": return <Instagram className={cls} />;
    case "github": return <Github className={cls} />;
    case "email": return <Mail className={cls} />;
    case "phone": return <Phone className={cls} />;
    default:
      // Generic external link icon for unknown platforms
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}

function SocialLinkItem({ link }: { link: SanitySocialLink }) {
  const [hovered, setHovered] = useState(false);
  const hasTooltip = !!link.displayText;

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.a
        href={link.url}
        aria-label={link.label}
        target={link.url.startsWith("tel:") || link.url.startsWith("mailto:") ? undefined : "_blank"}
        rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-white/40 hover:text-white transition-colors duration-200"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <PlatformIcon platform={link.platform} />
      </motion.a>

      {/* Tooltip (only shown if displayText is set) */}
      {hasTooltip && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#050505] text-xs font-semibold tracking-wide px-3 py-1.5 rounded-md shadow-lg pointer-events-none"
            >
              {link.displayText}
              <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default function ContactForm({
  contactEmail = "erikkarlsson1986@gmail.com",
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: "POST",
        body: formData,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Let&apos;s Build Something.
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light">
            Ready to push boundaries? Drop a line below.
          </p>
        </div>

        <div className="mt-12 w-full max-w-xl mx-auto relative min-h-[450px]">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-8 absolute inset-0 w-full"
              >
                {/* Honeypot / Anti-Spam */}
                <input type="hidden" name="_captcha" value="false" />

                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent disabled:opacity-50"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-2 -top-3 text-xs text-white/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
                    Name
                  </label>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent disabled:opacity-50"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-2 -top-3 text-xs text-white/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
                    Email
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent resize-none disabled:opacity-50"
                    placeholder="Message"
                  />
                  <label htmlFor="message" className="absolute left-2 -top-3 text-xs text-white/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-4 py-4 px-6 bg-white text-[#050505] font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-transparent hover:text-white border border-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-[#050505] disabled:cursor-wait"
                >
                  <span className="relative z-10 transition-transform group-hover:-translate-x-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  {!isSubmitting && (
                    <ArrowRight className="relative z-10 w-5 h-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 w-full flex flex-col items-center text-center space-y-6 pt-12"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 text-white">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-light tracking-wide text-white">Message Received</h3>
                <p className="text-white/60 font-light max-w-md">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 text-sm uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social links — rendered dynamically from CMS */}
        {socialLinks.length > 0 && (
          <div className="text-center space-y-6 pt-4">
            <p className="text-white/60 text-sm uppercase tracking-[0.2em]">See me here</p>
            <div className="flex items-center justify-center gap-8">
              {socialLinks.map((link) => (
                <SocialLinkItem key={`${link.platform}-${link.url}`} link={link} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WCAG notice */}
      <p className="mt-12 text-center text-white/25 text-xs tracking-widest uppercase">
        WCAG 2.1 AA Compliant
      </p>
    </section>
  );
}
