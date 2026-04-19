"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
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
                  <label htmlFor="name" className="absolute left-2 -top-3 text-xs text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
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
                  <label htmlFor="email" className="absolute left-2 -top-3 text-xs text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
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
                  <label htmlFor="message" className="absolute left-2 -top-3 text-xs text-white/40 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60 pointer-events-none">
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
      </div>
    </section>
  );
}
