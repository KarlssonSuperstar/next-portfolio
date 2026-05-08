"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import MediaCarousel, { MediaType } from "./MediaCarousel";
import SpotlightCard from "./SpotlightCard";
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

    // Helper to extract cleanly parsed class strings without heavy inline duplication
    const cleanClassName = (cls?: string) => 
      (cls || '').replace(/md:!h-\[600px\]/g, '').replace(/!h-auto/g, '').replace(/\bw-full\b/g, '').trim();

    // ORIGINAL LOGIC for subImages (!isHero)
    if (!isHero) {
      return (
        <div className={`w-full mt-12 md:mt-24 md:max-h-[600px] relative md:aspect-video`}>
          <div className="flex flex-col md:flex-row w-full h-full gap-4 md:gap-0 md:absolute md:inset-0">
            {/* Left Item */}
            <div className={`flex flex-col h-auto md:h-full justify-center relative ${isLeftSmaller ? 'w-full md:w-fit md:flex-none md:max-w-[35%]' : 'w-full md:flex-1'}`}>
              <SpotlightCard glowColor={color} className={`h-full flex justify-center bg-transparent rounded-sm ${isLeftSmaller ? 'w-fit mx-auto md:mx-0' : 'w-full'}`}>
                <motion.div 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative overflow-hidden flex justify-center bg-transparent"
                >
                  {items[0].type === 'video' ? (
                    <>
                      <video 
                        src={items[0].src} 
                        autoPlay loop muted={isMutedLeft} playsInline 
                        style={{ objectFit: items[0].objectFit || 'cover', objectPosition: items[0].objectPosition }} 
                        className={`${isLeftSmaller ? 'max-h-[600px] h-auto w-full md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[0].className)}`} 
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
                        className={`${isLeftSmaller ? 'max-h-[600px] h-auto w-full md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[0].className)}`} 
                      />
                    </>
                  )}
                </motion.div>
              </SpotlightCard>
              {items[0].caption && (
                <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide px-4 md:px-0 md:absolute md:top-full md:left-0 md:w-full md:mt-4">
                  {items[0].caption}
                </p>
              )}
            </div>

            {/* Right Item */}
            <div className={`flex flex-col h-auto md:h-full justify-center relative ${!isLeftSmaller ? 'w-full md:w-fit md:flex-none md:max-w-[35%]' : 'w-full md:flex-1'}`}>
              <SpotlightCard glowColor={color} className={`h-full flex justify-center bg-transparent rounded-sm ${!isLeftSmaller ? 'w-fit mx-auto md:mx-0' : 'w-full'}`}>
                <motion.div 
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                  viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="w-full h-full relative overflow-hidden flex justify-center bg-transparent"
                >
                  {items[1].type === 'video' ? (
                    <>
                      <video 
                        src={items[1].src} 
                        autoPlay loop muted={isMutedRight} playsInline 
                        style={{ objectFit: items[1].objectFit || 'cover', objectPosition: items[1].objectPosition }} 
                        className={`${!isLeftSmaller ? 'max-h-[600px] h-auto w-full md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[1].className)}`} 
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
                        className={`${!isLeftSmaller ? 'max-h-[600px] h-auto w-full md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[1].className)}`} 
                      />
                    </>
                  )}
                </motion.div>
              </SpotlightCard>
              {items[1].caption && (
                <p className="mt-4 text-sm md:text-base font-medium opacity-60 tracking-wide px-4 md:px-0 md:absolute md:top-full md:left-0 md:w-full md:mt-4">
                  {items[1].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // NEW LOGIC: T-Suite Hero only (isHero === true) -> Gapless perfectly fitting
    return (
      <div className={`w-full mb-4 md:mb-8 relative md:aspect-video`}>
        {/* On mobile, standard flex-col. On desktop, absolute inset-0 to perfectly fill the aspect-video container and ensure equal column heights. */}
        <div className="flex flex-col md:flex-row w-full h-full gap-4 md:gap-0 md:absolute md:inset-0">
          
          {/* Left Item */}
          <div className={`flex flex-col h-auto md:h-full justify-center relative ${isLeftSmaller ? 'w-full md:w-fit md:flex-none bg-black/5' : 'w-full md:flex-1'}`}>
            <SpotlightCard glowColor={color} className={`h-full flex justify-center bg-transparent rounded-sm ${isLeftSmaller ? 'w-fit mx-auto md:mx-0' : 'w-full'}`}>
              <motion.div 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative overflow-hidden flex justify-center bg-transparent"
              >
                {items[0].type === 'video' ? (
                  <>
                    <video 
                      src={items[0].src} 
                      autoPlay loop muted={isMutedLeft} playsInline 
                      style={{ objectFit: items[0].objectFit || 'cover', objectPosition: items[0].objectPosition }} 
                      className={`${isLeftSmaller ? 'w-full h-auto max-h-[600px] md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[0].className)}`} 
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
                      className={`${isLeftSmaller ? 'w-full h-auto max-h-[600px] md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[0].className)}`} 
                    />
                  </>
                )}
              </motion.div>
            </SpotlightCard>
          </div>

          {/* Right Item */}
          <div className={`flex flex-col h-auto md:h-full justify-center relative ${!isLeftSmaller ? 'w-full md:w-fit md:flex-none bg-black/5' : 'w-full md:flex-1'}`}>
            <SpotlightCard glowColor={color} className={`h-full flex justify-center bg-transparent rounded-sm ${!isLeftSmaller ? 'w-fit mx-auto md:mx-0' : 'w-full'}`}>
              <motion.div 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="w-full h-full relative overflow-hidden flex justify-center bg-transparent"
              >
                {items[1].type === 'video' ? (
                  <>
                    <video 
                      src={items[1].src} 
                      autoPlay loop muted={isMutedRight} playsInline 
                      style={{ objectFit: items[1].objectFit || 'cover', objectPosition: items[1].objectPosition }} 
                      className={`${!isLeftSmaller ? 'w-full h-auto max-h-[600px] md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[1].className)}`} 
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
                      className={`${!isLeftSmaller ? 'w-full h-auto max-h-[600px] md:max-h-none md:h-full md:w-auto' : 'w-full aspect-video md:aspect-auto md:h-full object-cover'} ${cleanClassName(items[1].className)}`} 
                    />
                  </>
                )}
              </motion.div>
            </SpotlightCard>
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
              whileInView={{ clipPath: "inset(-40px)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative"
            >
              <MediaCarousel items={media} glowColor={color} />
            </motion.div>
          ) : imageSrc ? (
            <motion.div 
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(-40px)" }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-video bg-white/5 relative group rounded-sm"
            >
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <SpotlightCard glowColor={color} className="w-full h-full">
                 <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
               </SpotlightCard>
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
