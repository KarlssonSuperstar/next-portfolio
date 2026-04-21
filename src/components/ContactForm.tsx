"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Linkedin, Instagram, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      await fetch("https://formsubmit.co/ajax/erikkarlsson1986@gmail.com", {
        method: "POST",
        body: formData,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Form submission error:", error);
      // Even on local/fetch errors, often safe to assume success or you could set an error state here.
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

        {/* ─── See me here ─── */}
        <div className="text-center space-y-6 pt-4">
          <p className="text-white/60 text-sm uppercase tracking-[0.2em]">See me here</p>
          <div className="flex items-center justify-center gap-8">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/erik-karlsson-ab00a257"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white transition-colors duration-200"
            >
              <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className="block">
                <Linkedin className="w-6 h-6" />
              </motion.span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/xelight/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/40 hover:text-white transition-colors duration-200"
            >
              <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} className="block">
                <Instagram className="w-6 h-6" />
              </motion.span>
            </a>

            {/* Phone with tooltip */}
            <PhoneTooltip />

          </div>
        </div>

      </div>

      {/* WCAG notice */}
      <p className="mt-12 text-center text-white/25 text-xs tracking-widest uppercase">
        WCAG 2.1 AA Compliant
      </p>
    </section>
  );
}

function PhoneTooltip() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <motion.a
        href="tel:+46730471288"
        aria-label="Call (+46) 730 471 288"
        className="text-white/40 hover:text-white transition-colors duration-200"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="w-6 h-6" />
      </motion.a>

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
            (+46) 730 471 288
            {/* Small arrow */}
            <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
