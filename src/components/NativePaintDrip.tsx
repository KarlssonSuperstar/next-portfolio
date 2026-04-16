"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NativePaintDrip() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const drips = [
    { left: "10%", start: 0.30, end: 0.60, width: "12px" },
    { left: "25%", start: 0.22, end: 0.50, width: "30px" },
    { left: "45%", start: 0.32, end: 0.64, width: "8px" },
    { left: "55%", start: 0.30, end: 0.58, width: "40px" },
    { left: "70%", start: 0.26, end: 0.54, width: "24px" },
    { left: "85%", start: 0.34, end: 0.62, width: "16px" },
    { left: "92%", start: 0.30, end: 0.58, width: "20px" },
  ];

  return (
    <div ref={containerRef} className="relative h-full w-full pointer-events-none z-0">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden pointer-events-none">

        {/* Drop elements falling down */}
        {drips.map((drip, i) => {
           // eslint-disable-next-line react-hooks/rules-of-hooks
           const top = useTransform(scrollYProgress, [drip.start - 0.20, drip.end], ["-20%", "120%"]);
           // eslint-disable-next-line react-hooks/rules-of-hooks
           const height = useTransform(scrollYProgress, [drip.start - 0.20, drip.start], ["30px", "150px"]);
           return (
             <motion.div
               key={i}
               className="absolute rounded-full"
               style={{ 
                 left: drip.left, 
                 top, 
                 width: drip.width, 
                 height,
                 background: "radial-gradient(ellipse at 75% 85%, rgba(255,255,255,0.8) 0%, transparent 40%), #3d7db3",
                 boxShadow: "inset -2px -4px 6px rgba(0,0,0,0.2), inset 2px 4px 6px rgba(255,255,255,0.5)",
                 border: "1px solid rgba(255, 255, 255, 0.15)"
               }}
             />
           );
        })}
      </div>
    </div>
  );
}
