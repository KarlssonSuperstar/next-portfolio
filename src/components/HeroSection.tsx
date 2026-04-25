"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
  AnimatePresence,
} from "framer-motion";
import CanvasImageSequence from "@/components/CanvasImageSequence";
import { Rubik } from "next/font/google";
import { useState } from "react";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

/**
 * Hero section — client component that owns all scroll-driven animations.
 * Extracted from page.tsx to allow page.tsx to be a Server Component.
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollYProgress: scrollCanvasProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothCanvasProgress = useSpring(scrollCanvasProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const doubleSpeedCanvasProgress = useTransform(
    smoothCanvasProgress,
    [0, 0.5],
    [0, 1],
    { clamp: true }
  );

  const bgColor = useTransform(scrollYProgress, [0.2, 0.4], [
    "#050505",
    "#3d7db3",
  ]);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[175vh]"
      style={{ backgroundColor: bgColor }}
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        {/* Canvas background (currently unused / can be re-enabled) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            opacity: useTransform(smoothProgress, [0.8, 0.95], [0, 1]),
          }}
        />

        {/* Image Sequence layer */}
        <motion.div className="absolute inset-0 z-0 mix-blend-screen">
          <CanvasImageSequence scrollProgress={doubleSpeedCanvasProgress} />
        </motion.div>

        {/* Beat A (Hero text) */}
        <Beat block={smoothProgress} range={[-0.1, 0, 0.85, 0.95]}>
          {/* Darkening vignette */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <div className="w-[80vw] md:w-[60vw] h-[40vh] bg-black/60 blur-[100px] rounded-full" />
          </div>

          <motion.div
            className="relative z-10 text-center px-6 pointer-events-none select-none"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.1 },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl flex flex-col items-center justify-center gap-0 my-4"
            >
              <span className="text-[0.65em] text-white/60 font-bold tracking-widest">
                Where
              </span>
              <span className="font-mono tracking-widest font-semibold text-[0.9em] text-white my-2 md:my-4">
                Function
              </span>
              <span className="text-[0.65em] text-white/60 font-bold tracking-widest">
                Meets
              </span>
              <span
                className={`${rubik.className} font-bold tracking-tight text-[1.1em] text-white my-2 md:my-4`}
              >
                Form
              </span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mt-8 text-xl md:text-3xl font-light uppercase tracking-[0.3em] text-white/80 drop-shadow-lg"
            >
              Digital Designer &amp; Digital Artist
            </motion.p>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="mt-4 text-lg md:text-xl font-medium uppercase tracking-[0.4em] text-white/70 drop-shadow-md"
            >
              Erik Karlsson
            </motion.p>
          </motion.div>
        </Beat>
      </div>
    </motion.div>
  );
}

// ─── Beat helper (scroll-driven visibility) ───────────────────────────────────

function Beat({
  children,
  block,
  range,
}: {
  children: React.ReactNode;
  block: MotionValue<number>;
  range: [number, number, number, number];
}) {
  const opacity = useTransform(block, range, [0, 1, 1, 0]);
  const y = useTransform(block, range, [100, 0, 0, -100]);
  const scale = useTransform(block, range, [0.95, 1, 1, 1.05]);
  const display = useTransform(block, (v: number) =>
    v >= range[0] && v <= range[3] ? "flex" : "none"
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center w-full z-10 pointer-events-none"
      style={{ opacity, y, scale, display }}
    >
      <div className="pointer-events-none w-full flex flex-col justify-center h-full">
        {children}
      </div>
    </motion.div>
  );
}
