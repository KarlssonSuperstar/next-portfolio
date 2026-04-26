"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MediaType = {
  src: string;
  type: "video" | "image";
  description?: string;
  caption?: string;
};

interface MediaCarouselProps {
  items: MediaType[];
  glowColor?: string;
}

import { VolumeOnIcon, VolumeOffIcon } from "./icons";
import SpotlightCard from "./SpotlightCard";

export default function MediaCarousel({ items, glowColor }: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Touch state for swipe handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = Math.abs(touchStartX - touchEndX);
      if (distance >= minSwipeDistance) {
        return; // Ignore click if it was a significant swipe
      }
    }
    handleNext();
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
    <div className={`w-full flex flex-col items-start ${items.length > 1 || (items.length === 1 && currentItem.caption) ? 'gap-4' : ''}`}>
      {/* Main Image/Video Container */}
      <SpotlightCard glowColor={glowColor} className="w-full aspect-video rounded-sm backdrop-blur-sm">
      <div 
        className={`w-full h-full relative overflow-hidden group ${items.length > 1 ? 'cursor-pointer' : ''}`}
        role={items.length > 1 ? "button" : undefined}
        tabIndex={0}
        aria-label={`Slide ${activeIndex + 1} of ${items.length}. Press to advance.`}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNext(); } }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
                {currentItem.description && (
                  <p className="sr-only">{currentItem.description}</p>
                )}
                
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
      </SpotlightCard>

      {/* Indicators */}
      {items.length > 1 && (
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
      )}

      {/* Single-item Caption */}
      {items.length === 1 && currentItem.caption && (
        <p className="text-sm md:text-base font-medium opacity-60 tracking-wide px-4 md:px-0">
          {currentItem.caption}
        </p>
      )}
    </div>
  );
}
