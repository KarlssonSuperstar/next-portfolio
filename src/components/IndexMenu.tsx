"use client";
import type { Transition } from "framer-motion";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { label: "NARRATIVE", id: "about" },
  { label: "01 MIND CLIMBER", id: "mind-climber" },
  { label: "02 T-SUITE", id: "t-suite" },
  { label: "03 VYSE TECH", id: "vyse-tech" },
  { label: "APPS & TOOLS", id: "tools" },
  { label: "CONTACT", id: "contact" },
];

const PlusIcon = () => (
  <span className="text-2xl font-light leading-none">+</span>
);

const SPRING: Transition = { type: "spring", stiffness: 260, damping: 28 };
const FADE: Transition = { duration: 0.25, ease: "easeInOut" };

export default function IndexMenu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100 && !isScrolled) {
      setIsScrolled(true);
    }
    if (latest <= 100 && isScrolled) {
      setIsScrolled(false);
      setIsMenuOpen(false);
    }
  });

  const handleMenuClick = () => {
    if (isScrolled) setIsMenuOpen((v) => !v);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (isScrolled) setIsMenuOpen(false);
  };

  const isExpanded = !isScrolled || isMenuOpen;

  return (
    <div
      className="absolute top-12 right-4 select-none pointer-events-auto"
      style={{ fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ─── EXPANDED STATE ─── */}
      <AnimatePresence mode="popLayout">
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={FADE}
            className="flex flex-col items-start text-white"
          >
            {/* Title row */}
            <button
              className="flex items-center gap-1 mb-1 cursor-pointer group"
              onClick={handleMenuClick}
              aria-label="Close index menu"
            >
              <motion.div
                animate={{ rotate: 45 }}
                className="w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors"
              >
                <PlusIcon />
              </motion.div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#3d7db3]">Index</span>
            </button>

            {/* Item list */}
            <nav aria-label="Page sections">
            <motion.ul
              className="flex flex-col gap-0 pb-2"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
                closed: {}
              }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  variants={{
                    open: { opacity: 1, x: 0, transition: SPRING },
                    closed: { opacity: 0, x: 16 }
                  }}
                  className="flex items-center"
                  style={{ marginLeft: `${index * 14 + 28}px` }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleItemClick(e, item.id)}
                    className="py-[2px] inline-block text-white/70 hover:text-white uppercase tracking-widest text-sm font-medium transition-all duration-200 hover:translate-x-1.5 transform"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            </nav>
          </motion.div>
        )}

        {/* ─── COLLAPSED STATE ─── */}
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={SPRING}
            className="flex flex-col items-center gap-3 cursor-pointer text-white"
            role="button"
            tabIndex={0}
            aria-label="Open index menu"
            aria-expanded={isMenuOpen}
            onClick={handleMenuClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleMenuClick(); } }}
          >
            <motion.div
              className="w-12 h-12 rounded-full bg-[#3d7db3] hover:bg-[#4e8ec4] transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={SPRING}
            >
              <PlusIcon />
            </motion.div>
            <span
              className="text-xs font-bold tracking-[0.25em] uppercase text-white/80"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            >
              INDEX
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
