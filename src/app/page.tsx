"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import PaintSplashCanvas from "@/components/PaintSplashCanvas";
import ContactForm from "@/components/ContactForm";
import CanvasImageSequence from "@/components/CanvasImageSequence";
import NativePaintDrip from "@/components/NativePaintDrip";
import CaseStudy from "@/components/CaseStudy";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

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

  // By using the instant scrollYProgress instead of smoothProgress (the spring), we guarantee 
  // the background turns fully blue mechanically, removing any lagging dark edges on fast scroll.
  const bgColor = useTransform(scrollYProgress, [0.40, 0.60], ["#050505", "#3d7db3"]);

  return (
    <main className="min-h-screen text-white selection:bg-white/20 selection:text-white font-sans bg-[#d9e4ec]">
      <div className="w-full lg:w-[calc(100%-48px)] max-w-[1440px] mx-auto bg-[#050505] min-h-screen relative lg:my-6">
      
      {/* 350vh container for scrollytelling Hero section tightly wrapped */}
      <motion.div ref={containerRef} className="relative h-[350vh]" style={{ backgroundColor: bgColor }}>
        
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
            <CanvasImageSequence scrollProgress={smoothCanvasProgress} />
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
        <div className="bg-[#3d7db3] pt-1 relative">
          <CaseStudy 
            number="01"
            title="Neon Void"
            category="Brand Identity, UI/UX Design"
            description="A brutalist digital platform redefining luxury commerce. Bold typography, stark contrasts, and immersive interactions that break the mold of traditional e-commerce."
            href="#neon-void"
            color="transparent" 
            imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            subImages={[
              { src: "https://images.unsplash.com/photo-1614850523459-c2f4c699052e?q=80&w=1200&auto=format&fit=crop", caption: "Deep aesthetic explorations." },
              { src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1200&auto=format&fit=crop", caption: "Color palette iterations." }
            ]}
          />
          
          {/* --- Smooth Sweeping Curve Transition --- */}
          <div className="absolute top-full -mt-[1px] left-0 w-full z-50 pointer-events-none text-[#3d7db3]">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[150px] lg:h-[200px]">
              <path d="M0,0 L0,200 C500,200 900,40 1440,40 L1440,0 Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Wrapper for MindClimber that also contains the overlayed paint drip transition */}
        <div className="relative w-full">
          {/* Native paint drip disabled to favor the clean curve transition from the section above */}
          {/* <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
            <NativePaintDrip />
          </div> */}
          <CaseStudy 
            number="02"
            title="Mind Climber"
            category="Brand Identity, UI/UX Design"
            description="A surreal mountain traversal experience redefining the mental boundaries of players. Bold visuals merging industrial grunge with ethereal vistas."
            href="#mindclimber"
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
        <CaseStudy 
          number="03"
          title="Kinetics"
          category="Creative Direction, WebGL"
          description="Interactive real-time audio visualization using raw WebGL. The geometry listens and reacts to frequencies, producing mesmerizing, generative landscapes."
          href="#kinetics"
          color="#050a1a" // Example massive deep blue background
          imageSrc="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
          subImages={[
            { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", caption: "Audio reactive geometry." },
            { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", caption: "Waveform analysis view." }
          ]}
        />

        {/* Toolkit Section mapped statically */}
        <section className="py-16 md:py-32 px-6 w-full text-center bg-[#050505] min-h-[50vh] flex flex-col justify-center border-t border-white/5 relative z-20">
          <h2 className="text-5xl md:text-[6rem] font-black tracking-tighter uppercase mb-16 leading-none">
            The Apps & Tools I Use
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto relative z-20">
            {[
              "Figma", "Next.js", "Framer Motion", "Three.js", "GSAP", "Creative Cloud", "WebGL", "Vercel", "Tailwind CSS", "Cinema4D"
            ].map((tool) => (
              <div key={tool} className="py-4 px-8 border border-white/10 rounded-full text-2xl md:text-3xl font-light text-white hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto">
                {tool}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Static Footer: Contact Form */}
      <div className="relative z-10 bg-[#050505]">
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
