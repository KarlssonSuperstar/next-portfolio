import React from "react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-3xl w-full mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Let&apos;s Build Something.
          </h2>
          <p className="text-foreground-muted text-lg md:text-xl font-light">
            Ready to push boundaries? Drop a line below.
          </p>
        </div>
        
        <form className="space-y-8 mt-12 w-full max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <input 
              type="text" 
              id="name"
              required
              className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent"
              placeholder="Name"
            />
            <label htmlFor="name" className="absolute left-2 top-4 text-white/40text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60">
              Name
            </label>
          </div>
          
          <div className="relative group">
            <input 
              type="email" 
              id="email"
              required
              className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent"
              placeholder="Email"
            />
            <label htmlFor="email" className="absolute left-2 top-4 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60">
              Email
            </label>
          </div>
          
          <div className="relative group">
            <textarea 
              id="message"
              required
              rows={4}
              className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white/90 focus:outline-none focus:border-white/80 transition-colors peer placeholder-transparent resize-none"
              placeholder="Message"
            />
            <label htmlFor="message" className="absolute left-2 top-4 text-white/40 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-white/60">
              Message
            </label>
          </div>
          
          <button 
            type="submit" 
            className="group relative w-full flex items-center justify-center gap-4 py-4 px-6 bg-white text-[#050505] font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-transparent hover:text-white border border-white"
          >
            <span className="relative z-10 transition-transform group-hover:-translate-x-2">Send Message</span>
            <ArrowRight className="relative z-10 w-5 h-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </button>
        </form>
      </div>
    </section>
  );
}
