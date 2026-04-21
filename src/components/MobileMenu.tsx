"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Inline logo SVG — uses currentColor so parent text color controls fill
const KarlssonLogo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 594.36 324"
    className={className}
    aria-label="Karlsson"
    style={{ fill: "currentColor" }}
  >
    <path d="M435.43,137.06l-19.82,23.42-11.82,13.21c-8.25,9.22-19.56,23.96-26.88,16.34-3.47-3.62-2.81-9.29-.37-13.65,9.28-16.54,17.51-32.88,24.27-50.75.74-1.95.86-5.03.86-7.23l-20-.95-18.78,35.25c-7.48,14.03-15.38,27.23-25.99,39-3.31,3.67-8.27,4.18-11.94,1.7s-4.31-7.96-1.22-11.89c11.38-14.48,24.68-30.26,29.31-48.67l-17.12,7.07c-6.66,2.75-14.09,2.9-20.35.03l-14.13,26.46c-4.34,8.13-10.86,15.06-17.19,21.62-3.57,3.7-9.18,4.54-13.52,2.9s-6.93-5.75-7.9-11.28c-9.44,10.93-19.53,29.48-31.2,29.07-10.81-.38-16.44-11.46-18.49-23.59-5.86,8.27-14.96,9.68-23.86,4.36l-10.84,24.81c-2.31,5.29-7.41,9.9-11.77,10.92-6.5,1.51-12.72.81-17.04-3.98-3.62-4.01-3.07-9.8-2.94-15.64-7.48,12.41-13.4,25.27-19.08,38.97-1.34,3.22-6.72,4.12-9.5,3.04-2.36-.92-6-4.26-6.31-7.61l-3.24-35.29c-1.03-11.26.91-22.07-1.34-33.7-6.56,14.46-13.11,27.38-17.15,41.84l-8.56,30.64c-1.68,6.01-4.41,11.72-5.06,17.69-.61,5.66-4.7,6.43-8.47,8.84-3.37,2.15-6.07,4.92-10.37,4.09-4.03-.78-6.24-4.59-6.21-9.28.06-14.25-.55-27.9-1.91-42.13-1.82-19.05-4.05-37.49-4.18-56.71l-.29-43.3c-3.84,8.01-7.63,15.45-11.96,23.3l-13.87,25.1c-2.17,3.93-8.2,5.75-11.36,1.9-2.15-2.61-.6-7.35.93-10.24l18.08-33.9c6.55-12.28,11.11-25.1,15.88-38.21,3.16-8.68,1.14-19.1,9.81-18.54,3.18.2,7.02,3.52,7.08,7.51l1.24,91.25c.24,17.47,2.59,33.77,4.52,51.35l7.1-46.81c1.89-12.43,5.81-23.69,9.18-35.88,7.63-27.66,16.14-54.43,26.79-81.05l7.75-19.38c1.63-4.08,5.52-6.03,9.23-4.92,3.51,1.05,7.53,5.24,5.94,10.07-11.54,35.07-21.47,70.05-28.41,106.8,8.08-2.41,15.57,1.1,18.19,8.96,2.05,6.16,3.12,13.04,3.28,19.7l.74,29.95c9.59-17.07,18.31-32.63,29.16-48.64,4.27-21.08,13.6-39.89,26.88-56.86,3.42-5.17,7.19-10.19,12.37-13.48,3.26-2.07,7.94-1.03,10.5,1.51,2.01,1.99,3.29,6.2,1.86,9.49l-2.82,6.5c3.44,3.9,4.22,8.76,3.1,13.95-2.53,11.69-4.53,22.85-6.35,34.74-1.89,12.31-6.24,17.35,0,20.11,6.55-9.88,11.19-19.69,15.58-30.57,3.7-23.98,13.59-45.79,27.45-65.4,2.84-4.02,4.96-7.95,10.52-8.85,2.39-.39,6.3,1.87,7.44,3.74,1.4,2.3,1.48,6.58.23,9.14-5.1,10.51-10.82,20.15-14.8,31.11-4.54,12.48-8.66,24.27-15.53,35.83-1.31,10.73-1.85,21.04-2.04,31.95l3.58,8.42c6.74-8.37,13.21-15.29,18.83-24.34,6.43-10.35,11.9-22.28,14.2-34.46,3.84-20.35,7.95-39.44,13.84-59.3,6.39-21.55,12.91-42.22,22.56-62.4,1.43-2.99,6.93-4.18,9.3-3.46,10.08,3.08,5.7,18.53,2.35,31.01l-12.94,48.11c-5.42,20.16-16.93,41.44-18.89,51.66s-2.06,19.49-2.46,30.31c5.08-5.12,8.48-10.44,11.77-16.77,11.01-21.16,22.26-41.62,34.86-61.91,7.2-11.59,20.59-27.66,28.88-19,3.62,3.78,2.59,8.2-.63,12.13-10.73,13.11-21.01,25.84-27.54,42.2,14.53-3.09,28.31-16,39.46-6.01l5-8.5c-3.88-6.39-2.73-13.31.98-19.84,9-15.8,20.57-29.57,32.56-43.3,5.8-6.64,12.31-10.75,17.05-5.47,1.39,1.55,2.27,6.47.92,8.2l-7.58,9.68c-10.18,13-18.11,27.29-25.86,41.92l12.8.53c10.35.42,16.61,9.48,15.02,19.68-1.14,7.32-4.2,13.59-6.75,21.86,4.73-4.99,9.29-10.6,13.68-16.66-2.4-4.93-3.89-10.37-3.74-16.27.49-19.34,6.7-36.99,16.54-53.41,7.1-11.84,17.3-27.1,29.22-23.95,10.46,2.76,11.95,25.99,5.68,38.82l-8.21,16.78-18.73,33.09c11.03-2.56,16.32-11.13,21.13-19.81,8.05-14.54,13.71-29.07,17.68-45.26,1.65-6.74,2.37-12.14.38-19.29-.88-3.16,1.14-7.28,3.86-8.82,2.43-1.37,6.44-1.12,9.17,1.37s3.64,6.92,3.88,10.52l.96,14.42c7.23-14.09,13.61-26.92,24.36-37.35,5.22-5.06,13.58-7.18,19.26-2.12,7.89,7.02,7.16,35.15,4.26,47.48l-10.27,43.7c-2.48,10.55-7.05,20.27-12.51,29.41-3.69,6.19-9.28,9.28-16.63,9.39-21.02,16.12-40.81,32.68-63.01,47.02l-52.95,34.22c-32.81,21.2-65.53,40.66-100.39,58.7,20.98-3.46,40.2-7.44,60.34-13.09l122.38-34.33c32.3-9.06,77.22-22.7,108.13-25.02,4.45-.33,8.43,3.2,9.35,6.29,1.34,4.47-.22,9.59-4.95,11.24l-14.96,5.22c-4.22,1.47-9.58.49-14.05-.06-28.24,6.22-55.25,13.92-83.34,21.5l-119.62,32.27c-33.72,9.1-67.17,14.23-101.8,18.11-11.43,1.28-21.81,3.48-32.7,6.45-13.31,3.64-30.18,8.94-31.61-1.87-.68-5.13,2.47-8.29,7.65-9.24,22.37-4.13,43.16-11.49,64-20.98,35.81-16.32,69.61-34.86,102.76-56.13l60.3-38.69c13.35-8.56,25.75-17.12,38.25-26.75l33.34-25.66c4.35-3.35,9.33-5.2,14.72-6.35,6.32-7.61,9.98-17.78,12.37-27.56l9.23-37.8c2.61-10.7,3.06-21.44,1.5-32.82-9.92,12.07-17.59,24.88-21.49,39.8-3.48,13.3-3.56,26.56-3.93,40.13-.12,4.33-3.55,8-7.14,8.33-3.97.36-8.62-2.66-9.23-7.27l-3.17-24.03-10.37,20.93c-8.81,17.77-23.23,32.04-44.22,27.6ZM435.41,109.9l19.83-34.78c3.35-7.98,7.26-15.26,5.35-24.51-6.16,6.12-10.59,13.42-14.65,21.33-6.24,12.17-10.91,25.02-10.54,37.97ZM171.15,191.34l7.75-17.36c-1.54-6.41-1.76-11.44-2.06-18.5-4.83,6.58-7.26,13.6-8.82,21.5-2.08,10.5-4.64,20.04-4.56,31.44l7.69-17.07Z"/>
  </svg>
);

const navItems = [
  { label: "Narrative", id: "about" },
  { label: "01 Mind Climber", id: "mind-climber" },
  { label: "02 T-Suite", id: "t-suite" },
  { label: "03 Vyse Tech", id: "vyse-tech" },
  { label: "Apps & Tools", id: "tools" },
  { label: "Contact", id: "contact" },
];

const FONT = "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif";
const HEADER_H = 56; // px

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* ─── HEADER BAR — bottom radius removed when open ─── */}
      <div
        className={`fixed left-3 right-3 z-[260] flex items-center justify-between px-5 md:hidden bg-white/95 backdrop-blur-sm shadow-sm transition-[border-radius] duration-200 ${
          isOpen ? "rounded-t-xl" : "rounded-xl"
        }`}
        style={{ fontFamily: FONT, height: HEADER_H, top: 12 }}
      >
        <a href="/" className="text-black" aria-label="Karlsson — Home">
          <KarlssonLogo className="w-20 h-auto" />
        </a>

        {/* Hamburger ↔ X */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="text-black p-1"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="20" height="20" viewBox="0 0 20 20" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              >
                <line x1="3" y1="3" x2="17" y2="17"/>
                <line x1="17" y1="3" x2="3" y2="17"/>
              </motion.svg>
            ) : (
              <motion.svg
                key="burger"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.18 }}
                width="22" height="16" viewBox="0 0 22 16" fill="none"
              >
                <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ─── DROPDOWN PANEL — exactly below header, same side margins ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed left-3 right-3 z-[250] md:hidden rounded-b-xl overflow-hidden"
            style={{
              top: HEADER_H + 12, // flush below header (header top 12 + header height)
              backgroundColor: "#3d7db3",
              fontFamily: FONT,
            }}
          >
            <nav className="flex flex-col items-center py-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, type: "spring", stiffness: 260, damping: 28 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleItemClick(e, item.id)}
                    className="block text-center text-[2.2rem] leading-snug font-semibold text-white/90 hover:text-white transition-colors py-1"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[240] md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
