"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function PaintDripEffect({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  // Configured precisely for the gap between Beat B and Beat C in the new 250vh Hero wrapper
  const drips = [
    { left: "10%", start: 0.70, end: 0.90, width: "12px", delayMod: 0 },
    { left: "25%", start: 0.68, end: 0.86, width: "30px", delayMod: 0.01 },
    { left: "45%", start: 0.72, end: 0.94, width: "8px", delayMod: -0.01 },
    { left: "55%", start: 0.70, end: 0.88, width: "40px", delayMod: 0.02 },
    { left: "70%", start: 0.66, end: 0.84, width: "24px", delayMod: -0.02 },
    { left: "85%", start: 0.74, end: 0.92, width: "16px", delayMod: 0 },
    { left: "92%", start: 0.70, end: 0.88, width: "20px", delayMod: 0.01 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {drips.map((drip, i) => {
        // Calculates the Y path mapping to physically drop across the whole 100vh window
        const yPath = useTransform(scrollProgress, [drip.start, drip.end], ["-20vh", "120vh"]);
        
        // Dynamically elongate the drip mid-air to mimic gravity physics
        const heightPath = useTransform(
          scrollProgress, 
          [drip.start, drip.start + (drip.end - drip.start) * 0.6, drip.end], 
          ["5vh", "45vh", "15vh"]
        );

        return (
          <motion.div 
            key={i}
            className="absolute top-0 bg-[#3d7db3] rounded-full"
            style={{ 
              left: drip.left, 
              width: drip.width,
              y: yPath, 
              height: heightPath 
            }}
          />
        );
      })}
    </div>
  );
}
