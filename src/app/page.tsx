"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from "framer-motion";
import PaintSplashCanvas from "@/components/PaintSplashCanvas";
import ContactForm from "@/components/ContactForm";
import CanvasImageSequence from "@/components/CanvasImageSequence";
import CaseStudy from "@/components/CaseStudy";
import AboutSection from "@/components/AboutSection";
import IndexMenu from "@/components/IndexMenu";
import MobileMenu from "@/components/MobileMenu";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

function HorizontalDivider({ color = "#050505", align = "split" }: { color?: string, align?: "split" | "center" }) {
  return (
    <div className={`w-full relative z-30 flex items-center justify-center pointer-events-none ${align === 'split' ? 'pb-12 md:pb-0' : 'py-8'}`}>
      <div className={`flex flex-col md:flex-row w-full relative ${align === 'split' ? 'gap-8 md:gap-16 max-w-screen-2xl mx-auto px-6 md:px-12' : 'max-w-6xl mx-auto px-6'}`}>
        {/* Invisible spacer matching the CaseStudy Sidebar width offset exactly */}
        {align === "split" && (
          <div className="hidden md:flex flex-col items-center w-32 flex-shrink-0 pointer-events-none" />
        )}
        {/* Active tracking width aligning perfectly with Content Area block */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-white/10" />
          <div 
            className="absolute w-8 h-8 rounded-full border border-white/20 flex items-center justify-center rotate-45 z-10"
            style={{ backgroundColor: color }}
          >
            <div className="w-1.5 h-1.5 border border-white/40" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -left-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -right-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -top-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -bottom-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track progress all the way until the container fully leaves the screen
  const { scrollYProgress: scrollCanvasProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothCanvasProgress = useSpring(scrollCanvasProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Double-speed canvas: complete the full sequence in the first half of scroll
  const doubleSpeedCanvasProgress = useTransform(smoothCanvasProgress, [0, 0.5], [0, 1], { clamp: true });

  // By using the instant scrollYProgress instead of smoothProgress (the spring), we guarantee 
  // the background turns fully blue mechanically, removing any lagging dark edges on fast scroll.
  const bgColor = useTransform(scrollYProgress, [0.20, 0.40], ["#050505", "#3d7db3"]);

  return (
    <main className="min-h-screen text-white selection:bg-white/20 selection:text-white font-sans bg-[#d9e4ec]">
      {/* ─── MOBILE NAV (shown only on mobile) ─── */}
      <MobileMenu />

      {/* ─── DESKTOP OVERLAY (hidden on mobile) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[200] hidden md:flex justify-center px-4 md:px-0">
        <div className="w-full lg:w-[calc(100%-48px)] max-w-[1440px] h-full relative">
          {/* Top-left home link — SVG logo in white */}
          <a
            href="/"
            className="absolute top-12 left-4 pointer-events-auto text-white hover:text-white/70 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Images/Me/Artboard 1.svg"
              alt="Karlsson"
              className="w-20 h-auto"
              style={{ filter: "invert(1)" }}
            />
          </a>
          <IndexMenu />
          {/* Desktop scroll-to-top — absolute inside content container */}
          <ScrollToTopButton mode="desktop" />
        </div>
      </div>

      {/* Mobile scroll-to-top — fixed to viewport, hidden on desktop */}
      <ScrollToTopButton mode="mobile" />
      <div className="w-full lg:w-[calc(100%-48px)] max-w-[1440px] mx-auto bg-[#050505] min-h-screen relative lg:my-6">
      
      {/* 350vh container for scrollytelling Hero section tightly wrapped */}
      <motion.div ref={containerRef} className="relative h-[175vh]" style={{ backgroundColor: bgColor }}>
        
        {/* Sticky Canvas Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
          {/* Canvas sits in background (hidden during Beat A) */}
          <motion.div 
            className="absolute inset-0 z-0"
            style={{ opacity: useTransform(smoothProgress, [0.80, 0.95], [0, 1]) }}
          >
            {/* Hiding the blob scroll effect for now. Uncomment the line below to reactivate it */}
            {/* <PaintSplashCanvas scrollProgress={smoothProgress} /> */}
          </motion.div>

          {/* Image Sequence layer (natively scrolls along with the page instead of fading) */}
          <motion.div className="absolute inset-0 z-0 mix-blend-screen">
            <CanvasImageSequence scrollProgress={doubleSpeedCanvasProgress} />
          </motion.div>

          {/* Beat A (Hero) */}
          <Beat block={smoothProgress} range={[-0.1, 0, 0.85, 0.95]}>
            {/* Subtle darkening vignette in the center to make the text pop against the smoke */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
               <div className="w-[80vw] md:w-[60vw] h-[40vh] bg-black/60 blur-[100px] rounded-full" />
            </div>

            <motion.div 
              className="relative z-10 text-center px-6 pointer-events-none select-none"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15, delayChildren: 0.1 }
                }
              }}
            >
              <motion.h1 
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.9] drop-shadow-2xl flex flex-col items-center justify-center gap-0 my-4"
              >
                <span className="text-[0.65em] text-white/60 font-bold tracking-widest">Where</span>
                <span className="font-mono tracking-widest font-semibold text-[0.9em] text-white my-2 md:my-4">Function</span>
                <span className="text-[0.65em] text-white/60 font-bold tracking-widest">Meets</span>
                <span className={`${rubik.className} font-bold tracking-tight text-[1.1em] text-white my-2 md:my-4`}>Form</span>
              </motion.h1>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="mt-8 text-xl md:text-3xl font-light uppercase tracking-[0.3em] text-white/80 drop-shadow-lg"
              >
                Digital Designer & Digital Artist
              </motion.p>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="mt-4 text-lg md:text-xl font-medium uppercase tracking-[0.4em] text-white/50 drop-shadow-md"
              >
                Erik Karlsson
              </motion.p>
            </motion.div>
          </Beat>

        </div>
      </motion.div>

      {/* Case Studies (Native Document Flow) */}
      {/* -mt-1 prevents 1px sub-pixel gaps from showing the dark background underneath */}
      <div className="relative z-50 w-full -mt-1">
        <div id="about" className="bg-[#3d7db3] pt-1 relative">
          <AboutSection />
          
          {/* --- Smooth Sweeping Curve Transition --- */}
          <div className="absolute top-full -mt-[1px] left-0 w-full z-50 pointer-events-none text-[#3d7db3]">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[150px] lg:h-[200px]">
              <path d="M0,0 L0,200 C500,200 900,40 1440,40 L1440,0 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Wrapper for MindClimber that also contains the overlayed paint drip transition */}
        <div id="mind-climber" className="relative w-full">
          {/* Native paint drip disabled to favor the clean curve transition from the section above */}
          {/* <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
            <NativePaintDrip />
          </div> */}
          <CaseStudy 
            number="01"
            title="Mind Climber"
            category="Brand Identity, UI/UX Design"
            description="Mind Climber is a digital mental health concept where biomarkers and behavioral data are used to guide users toward activities that may improve their well-being. To make a complex and heavy subject feel more approachable, I used mountain climbing as a metaphor for recovery, building a visual direction around support, guidance, and step-by-step progress. In this project, I worked on the concept, UX, and visual identity."
            href="https://www.figma.com/proto/pBSVkPTwRstkDhVUToUfIF/Erik_Karlsson_Mind_Climber?node-id=477-9911&viewport=6743%2C526%2C0.51&t=6X6NP3jk7zavxHAq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=477%3A9911&show-proto-sidebar=1&page-id=477%3A7527"
            ctaText="View Prototype"
            externalLink={true}
            color="#160800" // Kept exactly from previous Aura OS setting
            media={[
              { src: "/Images/MindClimber/Loggo.mp4", type: "video" },
              { src: "/Images/MindClimber/Promo.mp4", type: "video" },
              { src: "/Images/MindClimber/mobile1.png", type: "image" },
              { src: "/Images/MindClimber/mobile2.png", type: "image" },
              { src: "/Images/MindClimber/mobile3.png", type: "image" },
            ]}
            subImages={[
              { src: "/Images/MindClimber/Mindclimber-ProductLine.png", caption: "Mind Climber Product Line", objectPosition: "40% center" },
              { src: "/Images/MindClimber/MindTether.png", caption: "Mind Tether Details", objectPosition: "center 70%" }
            ]}
            className="!pt-[10rem] md:!pt-[21.3rem]"
          />
        </div>

        <HorizontalDivider color="#050a1a" />

        <div id="t-suite">
          <CaseStudy 
            number="02"
          title="T-Suite"
          category="Creative Direction, Motion Graphics"
          description="T-Suite Wrapped 2026 was a concept project for T-Hive where I transformed operational data and annual statistics into an engaging, shareable experience. Instead of a traditional corporate expression, I created a “wrapped” inspired by 90s retro games, using pixel graphics, animation, and sound to give the data more personality and stronger storytelling."
          href="#thive"
          hideCta={true}
          color="#050a1a" // Example massive deep blue background
          heroSplitReverse={true}
          heroSplitMedia={[
            { src: "/Images/T-HiveWrapped/Erik_Karlsson_T-Hive-Wrapped.mp4", type: "video", objectFit: "contain", className: "!h-auto w-full md:!h-[600px] object-bottom md:object-right" },
            { src: "/Images/T-HiveWrapped/T-hive-mobile.png", type: "image", caption: "T-Hive mobile app design." }
          ]}
        />
        </div>

        <HorizontalDivider color="#1a1c29" />

        <div id="vyse-tech">
        <CaseStudy 
          number="03"
          title="Vyse Tech"
          category="research, UX/UI Design"
          description="Helped a startup develop a new website to better highlight their product and make it more alive. Through analysis of their target audience and competitors, we developed a page that better highlighted their brand and product."
          href="https://wondrous-intuition-914204.framer.app/"
          ctaText="View Webpage"
          externalLink={true}
          color="#1a1c29" // Dark tech slate
          media={[
            { src: "/Images/Vyse Tech/vyse techOver.png", type: "image" },
            { src: "/Images/Vyse Tech/vyse tech2.png", type: "image" },
            { src: "/Images/Vyse Tech/vysetech.png", type: "image" }
          ]}
          subImages={[
            { 
              src: "/Images/Vyse Tech/vyse techOver2.png", 
              type: "image", 
              caption: "Vyse Tech interface overview.",
              containerClassName: "w-full md:flex-1 flex flex-col"
            },
            { 
              src: "/Images/Vyse Tech/Instagram.mp4", 
              type: "video", 
              objectFit: "contain", 
              className: "!h-auto w-full md:!w-auto md:!h-[600px] object-bottom md:object-right",
              containerClassName: "w-full md:w-auto flex flex-col" 
            }
          ]}
        />
        </div>

        {/* Toolkit Section mapped statically */}
        <section id="tools" className="py-16 md:py-32 px-6 w-full text-center bg-[#050505] min-h-[50vh] flex flex-col justify-center border-t border-white/5 relative z-20">
          <h2 className="text-5xl md:text-[6rem] font-black tracking-tighter uppercase mb-16 leading-none">
            The Apps & Tools I Use
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto relative z-20">
            {[
              "Figma", "Make", "Lovable", "Spline", "Framer", "Webflow", "Antigravity", "React", "Next.js", "Creative Cloud", "Vercel", "Tailwind CSS"
            ].map((tool) => (
              <div key={tool} className="py-4 px-8 border border-white/10 rounded-full text-2xl md:text-3xl font-light text-white hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto">
                {tool}
              </div>
            ))}
          </div>
        </section>
        
        <HorizontalDivider align="center" />
      </div>

      {/* Static Footer: Contact Form */}
      <div id="contact" className="relative z-10 bg-[#050505]">
        <ContactForm />
      </div>

      </div> {/* End of max-w constraint wrapper */}

      {/* Premium Desktop Frame Overlay */}
      <div 
        className="hidden lg:block fixed z-[100] pointer-events-none rounded-[2rem] border border-white/5 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1440px]" 
        style={{ 
          top: '24px', 
          bottom: '24px', 
          boxShadow: '0 0 0 100vmax #d9e4ec' 
        }} 
      />
    </main>
  );
}

function Beat({ 
  children, 
  block, 
  range 
}: { 
  children: React.ReactNode, 
  block: MotionValue<number>, 
  range: [number, number, number, number]
}) {
  const opacity = useTransform(block, range, [0, 1, 1, 0]);
  const y = useTransform(block, range, [100, 0, 0, -100]);
  const scale = useTransform(block, range, [0.95, 1, 1, 1.05]);
  const display = useTransform(block, (v: number) => (v >= range[0] && v <= range[3]) ? "flex" : "none");

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

function ScrollToTopButton({ mode = "desktop" }: { mode?: "desktop" | "mobile" }) {
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
