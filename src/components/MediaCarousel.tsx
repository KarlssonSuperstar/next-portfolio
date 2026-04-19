"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MediaType = {
  src: string;
  type: "video" | "image";
};

interface MediaCarouselProps {
  items: MediaType[];
}

const VolumeOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const VolumeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

export default function MediaCarousel({ items }: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't advance the carousel when clicking the mute button
    setIsMuted(!isMuted);
  };

  if (!items || items.length === 0) return null;

  const currentItem = items[activeIndex];

  return (
    <div className="w-full flex flex-col items-start gap-4">
      {/* Main Image/Video Container */}
      <div 
        className="w-full aspect-video relative overflow-hidden group cursor-pointer"
        onClick={handleNext}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            {currentItem.type === "video" ? (
              <>
                <video 
                  src={currentItem.src}
                  className="w-full h-full object-cover transition-transform duration-1000"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                />
                
                {/* Overlay Mute Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                </button>
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={currentItem.src} 
                alt={`Carousel frame ${activeIndex}`} 
                className="w-full h-full object-cover transition-transform duration-1000" 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex gap-2 w-full max-w-[200px] mt-1 pl-1">
        {items.map((_, idx) => (
          <button
             key={idx}
             onClick={(e) => {
               e.stopPropagation();
               handleSelect(idx);
             }}
             className={`h-[2px] flex-1 transition-colors duration-300 ${
               idx === activeIndex ? "bg-white" : "bg-white/30 hover:bg-white/60"
             }`}
             aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
