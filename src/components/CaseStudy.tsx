"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import MediaCarousel, { MediaType } from "./MediaCarousel";

export interface SubImage {
  src: string;
  caption: string;
  objectPosition?: string;
}

interface CaseStudyProps {
  number: string;
  title: string;
  category: string;
  description: string;
  href: string;
  color: string;
  imageSrc?: string; 
  media?: MediaType[];
  subImages?: SubImage[];
  className?: string;
}

export default function CaseStudy({ number, title, category, description, href, color, imageSrc, media, subImages, className = "" }: CaseStudyProps) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className={`relative w-full min-h-screen flex flex-col pt-32 pb-12 md:pt-64 md:pb-24 px-6 md:px-12 lg:px-24 ${className}`}>
      
      {/* Dynamic Background Layer mapped uniquely for this section */}
      <motion.div 
        className="fixed inset-0 z-[-1] pointer-events-none"
        style={{ backgroundColor: color, opacity: bgOpacity }}
      />

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 max-w-screen-2xl mx-auto w-full relative z-10">
        
        {/* Sticky Sidebar (Left) */}
        <motion.div 
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex flex-col items-center w-32 flex-shrink-0"
        >
          <div className="sticky top-40 flex flex-col items-center justify-between h-[60vh]">
            <span className="text-xl tracking-[0.4em] font-light opacity-50">
              {number}
            </span>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xl md:text-3xl tracking-widest font-black uppercase -rotate-90 whitespace-nowrap opacity-90">
                {title}
              </span>
            </div>
            {/* Decorative line */}
            <div className="w-[1px] h-24 bg-white/20 mt-4" />
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col gap-16 md:gap-24">
          
          {/* Media Presentation: Carousel or Single Image */}
          {media && media.length > 0 ? (
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              <MediaCarousel items={media} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-video bg-white/5 overflow-hidden relative group rounded-sm"
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={imageSrc} alt={title} className="w-full h-full object-cover saturate-0 opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:saturate-100 group-hover:opacity-100" />
            </motion.div>
          )}

          {/* Split Typography Grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left Col: Title & Meta */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <h2 className="text-6xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none mb-6">
                {title}
              </h2>
              <p className="text-xl uppercase tracking-[0.2em] opacity-80 font-medium">
                {category}
              </p>
            </motion.div>

            {/* Right Col: Desc & CTA */}
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col justify-start"
            >
              <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90 mb-12">
                {description}
              </p>
              
              <div>
                <a href={href} className="inline-block group relative text-xl font-bold uppercase tracking-wider pb-2">
                  View Case Study
                  {/* Hover Underline Effect */}
                  <span className="absolute bottom-0 left-0 w-0 outline-none h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Sub-Images Layout */}
          {subImages && subImages.length === 2 && (
            <div className="flex flex-col md:flex-row w-full mt-12 md:mt-24 gap-4 md:gap-0">
              
              {/* Left Image (Wider) */}
              <div className="w-full md:w-[65%] flex flex-col">
                <motion.div 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full relative overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={subImages[0].src} alt={subImages[0].caption} style={{ objectPosition: subImages[0].objectPosition }} className="w-full h-[300px] md:h-[600px] object-cover saturate-0 opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:saturate-100 group-hover:opacity-100" />
                </motion.div>
                <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide">
                  {subImages[0].caption}
                </p>
              </div>

              {/* Right Image (Narrower) */}
              <div className="w-full md:w-[35%] flex flex-col">
                <motion.div 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="w-full relative overflow-hidden group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={subImages[1].src} alt={subImages[1].caption} style={{ objectPosition: subImages[1].objectPosition }} className="w-full h-[300px] md:h-[600px] object-cover saturate-0 opacity-80 transition-all duration-1000 group-hover:scale-105 group-hover:saturate-100 group-hover:opacity-100" />
                </motion.div>
                <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide">
                  {subImages[1].caption}
                </p>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
