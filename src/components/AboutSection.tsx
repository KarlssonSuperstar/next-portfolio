"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full py-24 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-screen-xl mx-auto w-full relative z-10 flex flex-col md:flex-row gap-16 md:gap-0">
        
        {/* Desktop Center Rule with Ornament */}
        <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-white/10 flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-[#3d7db3] rotate-45">
            {/* Inner tiny dot ornament mimicking reference */}
            <div className="w-1.5 h-1.5 border border-white/40" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -left-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -right-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -top-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -bottom-1" />
          </div>
        </div>

        {/* Left Column (Text) */}
        <div className="w-full md:w-1/2 md:pr-24 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg lg:text-xl font-light leading-relaxed opacity-90 text-white/90 space-y-8"
          >
            <p>
              I am a digital designer based in Gothenburg. A creator who builds and runs customized experiences. Former front-end developer who built websites for companies ranging from car brands to e-commerce for a decade but has now transitioned to digital designer.
            </p>
            <p>
              Take a look at some of my work below.
            </p>
            <div className="pt-8 opacity-50">
              ↓
            </div>
          </motion.div>
        </div>

        {/* Right Column (Image) */}
        <div className="w-full md:w-1/2 md:pl-24 flex flex-col items-start justify-center">
          <motion.div 
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
             className="w-full max-w-md"
          >
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="/Images/Me/jag.png" 
               alt="Erik Karlsson Profile" 
               className="w-full aspect-[4/5] object-cover grayscale brightness-90 contrast-125 rounded-sm"
             />
             <div className="mt-6">
                <h3 className="text-xl font-medium tracking-wide">Erik Karlsson</h3>
                <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-50 mt-1">Digital Designer</p>
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
