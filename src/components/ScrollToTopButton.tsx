"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

interface ScrollToTopButtonProps {
  mode?: "desktop" | "mobile";
}

export default function ScrollToTopButton({ mode = "desktop" }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setVisible(latest > 100);
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const positionClass =
    mode === "mobile"
      ? "fixed bottom-12 right-4 md:hidden z-[200]"
      : "absolute bottom-12 right-4 pointer-events-auto";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          onClick={scrollToTop}
          className={`${positionClass} w-12 h-12 rounded-full bg-[#3d7db3] hover:bg-[#4e8ec4] text-white flex items-center justify-center transition-colors`}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
