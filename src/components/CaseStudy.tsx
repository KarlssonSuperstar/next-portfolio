"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import MediaCarousel, { MediaType } from "./MediaCarousel";
import { VolumeOnIcon, VolumeOffIcon } from "./icons";

export interface MediaContent {
  src: string;
  caption?: string;
  description?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain" | "fill";
  type?: "image" | "video";
  className?: string;
  containerClassName?: string;
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
  heroSplitMedia?: MediaContent[];
  heroSplitReverse?: boolean;
  subImages?: MediaContent[];
  reverseSubImages?: boolean;
  className?: string;
  ctaText?: string;
  externalLink?: boolean;
  hideCta?: boolean;
}

export default function CaseStudy({ 
  number, title, category, description, href, color, 
  imageSrc, media, heroSplitMedia, heroSplitReverse = false, 
  subImages, reverseSubImages = false, className = "",
  ctaText = "View Case Study", externalLink = false, hideCta = false
}: CaseStudyProps) {
  const containerRef = useRef(null);
  const [isMutedLeft, setIsMutedLeft] = useState(true);
  const [isMutedRight, setIsMutedRight] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const renderSplitMedia = (items: MediaContent[], reverse: boolean, isHero: boolean) => {
    if (!items || items.length !== 2) return null;
    
    // We treat 'reverse' as the flag that makes the left item the "smaller" one.
    // If reverse is false, the right item is the "smaller" one.
    const isLeftSmaller = reverse;

    return (
      <div className={`w-full ${isHero ? 'mb-4 md:mb-8' : 'mt-12 md:mt-24 md:aspect-video md:max-h-[600px]'} relative`}>
        {/* On mobile, standard flex-col. On desktop, flex-row. Absolute positioning removed as requested. */}
        <div className="flex flex-col md:flex-row w-full h-full gap-4 md:gap-0">
          
          {/* Left Item */}
          <div className={`w-full ${isLeftSmaller ? 'md:w-auto md:flex-none md:max-w-[35%]' : 'md:flex-1'} flex flex-col h-auto ${!isHero ? 'md:h-full' : ''}`}>
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative overflow-hidden group flex justify-center bg-black/20"
            >
              {items[0].type === 'video' ? (
                <>
                  <video 
                    src={items[0].src} 
                    autoPlay loop muted={isMutedLeft} playsInline 
                    style={{ objectFit: items[0].objectFit || 'cover', objectPosition: items[0].objectPosition }} 
                    className={`${!isHero ? 'h-[400px] md:h-full' : 'h-auto'} ${isLeftSmaller ? 'w-full md:w-auto' : 'w-full'} ${(items[0].className || '').replace(/md:!h-\[600px\]/g, '').replace(/!h-auto/g, '').trim()}`} 
                  />
                  {items[0].description && <p className="sr-only">{items[0].description}</p>}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMutedLeft(!isMutedLeft); }}
                    className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100"
                    aria-label={isMutedLeft ? "Unmute video" : "Mute video"}
                  >
                    {isMutedLeft ? <VolumeOffIcon /> : <VolumeOnIcon />}
                  </button>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={items[0].src} 
                    alt={items[0].caption || ''} 
                    style={{ objectFit: items[0].objectFit || 'cover', objectPosition: items[0].objectPosition }} 
                    className={`${!isHero ? 'h-[400px] md:h-full' : 'h-auto'} ${isLeftSmaller ? 'w-full md:w-auto' : 'w-full'} ${(items[0].className || '').replace(/md:!h-\[600px\]/g, '').replace(/!h-auto/g, '').trim()}`} 
                  />
                </>
              )}
            </motion.div>
            {items[0].caption && (
              <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide px-4 md:px-0">
                {items[0].caption}
              </p>
            )}
          </div>

          {/* Right Item */}
          <div className={`w-full ${!isLeftSmaller ? 'md:w-auto md:flex-none md:max-w-[35%]' : 'md:flex-1'} flex flex-col h-auto ${!isHero ? 'md:h-full' : ''}`}>
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="w-full h-full relative overflow-hidden group flex justify-center bg-black/20"
            >
              {items[1].type === 'video' ? (
                <>
                  <video 
                    src={items[1].src} 
                    autoPlay loop muted={isMutedRight} playsInline 
                    style={{ objectFit: items[1].objectFit || 'cover', objectPosition: items[1].objectPosition }} 
                    className={`${!isHero ? 'h-[400px] md:h-full' : 'h-auto'} ${!isLeftSmaller ? 'w-full md:w-auto' : 'w-full'} ${(items[1].className || '').replace(/md:!h-\[600px\]/g, '').replace(/!h-auto/g, '').trim()}`} 
                  />
                  {items[1].description && <p className="sr-only">{items[1].description}</p>}
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMutedRight(!isMutedRight); }}
                    className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100"
                    aria-label={isMutedRight ? "Unmute video" : "Mute video"}
                  >
                    {isMutedRight ? <VolumeOffIcon /> : <VolumeOnIcon />}
                  </button>
                </>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={items[1].src} 
                    alt={items[1].caption || ''} 
                    style={{ objectFit: items[1].objectFit || 'cover', objectPosition: items[1].objectPosition }} 
                    className={`${!isHero ? 'h-[400px] md:h-full' : 'h-auto'} ${!isLeftSmaller ? 'w-full md:w-auto' : 'w-full'} ${(items[1].className || '').replace(/md:!h-\[600px\]/g, '').replace(/!h-auto/g, '').trim()}`} 
                  />
                </>
              )}
            </motion.div>
            {items[1].caption && (
              <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide px-4 md:px-0">
                {items[1].caption}
              </p>
            )}
          </div>

        </div>
      </div>
    );
  };

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
          viewport={{ once: true, margin: "0px" }}
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
          
          {/* Media Presentation: Carousel, Single Image, or Split Hero Media */}
          {media && media.length > 0 ? (
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              <MediaCarousel items={media} />
            </motion.div>
          ) : imageSrc ? (
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-video bg-white/5 overflow-hidden relative group rounded-sm"
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            </motion.div>
          ) : heroSplitMedia && heroSplitMedia.length === 2 ? (
            renderSplitMedia(heroSplitMedia, heroSplitReverse, true)
          ) : null}

          {/* Split Typography Grids */}
          <div className="grid grid-cols-1 [@media(min-width:1445px)]:grid-cols-2 gap-12">
            
            {/* Left Col: Title & Meta */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "0px" }}
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
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col justify-start"
            >
              <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 mb-12">
                {description}
              </p>
              
              {!hideCta && (
                <div>
                  <a 
                    href={href}
                    target={externalLink ? "_blank" : undefined}
                    rel={externalLink ? "noopener noreferrer" : undefined}
                    className="inline-block group relative text-xl font-bold uppercase tracking-wider pb-2"
                  >
                    {ctaText}
                    {/* Hover Underline Effect */}
                    <span className="absolute bottom-0 left-0 w-0 outline-none h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                  </a>
                </div>
              )}
            </motion.div>

          </div>

          {/* Sub-Images Layout */}
          {subImages && subImages.length === 2 && renderSplitMedia(subImages, reverseSubImages, false)}
        </div>
      </div>
    </section>
  );
}
