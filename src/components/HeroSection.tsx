"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const numLines = 20;
  const word = "PORTFOLIO";

  useEffect(() => {
    if (!containerRef.current || !stageRef.current || !posterRef.current || !wheelRef.current) return;

    let master = gsap.timeline();

    const getFontSize = () => {
      if (window.innerWidth < 768) return 50;
      return 120;
    };
    
    const initAnimation = () => {
      const fontSize = getFontSize();
      const radius = (fontSize / (numLines / 2)) / Math.sin((180 / numLines) * (Math.PI / 180));
      const angle = 360 / numLines;
      const origin = `0% 50% -${radius * 2}px`;

      const txtElements = gsap.utils.toArray('.hero-txt');
      const charElements = gsap.utils.toArray('.hero-char');
      
      gsap.set(wheelRef.current, {
        rotation: -90,
        rotationX: 0,
        rotationY: 0
      });

      gsap.set(txtElements, {
        rotationX: (index) => angle * Number(index),
        z: radius * 2,
        transformOrigin: origin
      });

      gsap.set(charElements, {
        rotateX: -90,
        transformOrigin: "50% 50%"
      });

      const animateIn = () => {
        const tl = gsap.timeline({ delay: 0 });
        tl.from(charElements, {
          scale: 0.01,
          y: 440,
          duration: 8,
          rotation: 90,
          ease: 'power4.inOut'
        }, 0)
        .from(txtElements, {
          rotationX: -180,
          duration: 12,
          ease: 'power4'
        }, 0)
        .from(txtElements, {
          x: 100,
          duration: 8,
          ease: 'power4',
          stagger: 0.2
        }, 0)
        .from(wheelRef.current, {
          rotationY: 180,
          z: -2000,
          ease: 'expo',
          duration: 12
        }, 0)
        .from('.titleChar', {
          y: 'random(-20, 20)',
          opacity: 0,
          duration: 4,
          stagger: {
            each: 0.05,
            from: "center"
          },
          ease: "expo",
        }, 1)
        .from('.desc', {
          y: 30,
          opacity: 0,
          duration: 4,
          ease: "power4"
        }, 1.5);
        return tl;
      };

      const rotate = () => {
        const tl = gsap.timeline();
        tl.to(wheelRef.current, {
          rotationX: 360,
          transformOrigin: "50% 50%",
          repeat: -1,
          ease: 'none',
          duration: 12
        });
        return tl;
      };

      gsap.set(posterRef.current, { autoAlpha: 1 });
      master.add(animateIn()).add(rotate(), 0);

      // Save resize logic
      const resize = () => {
        if (!posterRef.current) return;
        const vh = window.innerHeight;
        const sh = posterRef.current.offsetHeight;
        const scaleFactor = vh / sh;
        if (scaleFactor < 1) {
          gsap.set(posterRef.current, { scale: scaleFactor });
        } else {
          gsap.set(posterRef.current, { scale: 1 });
        }
      };

      window.addEventListener('resize', resize);
      resize();

      return () => {
        master.kill();
        window.removeEventListener('resize', resize);
      };
    };

    let cleanupAnimation = initAnimation();

    const calcOffset = (xPos: number, yPos: number) => {
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const dX = 2 * (xPos - winW / 2) / winW;
      const dY = -2 * (yPos - winH / 2) / winH;
      return [dX, dY];
    };

    const rotateTxt = (xPos: number, yPos: number) => {
      const [nX, nY] = calcOffset(xPos, yPos);
      gsap.to(stageRef.current, {
        rotationX: nY * 5,
        rotationY: nX * 5,
        duration: 1,
        ease: 'sine'
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      rotateTxt(event.clientX, event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cleanupAnimation();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const splitText = (text: string, charClass: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className={`inline-block whitespace-pre ${charClass}`} style={{ transformStyle: 'preserve-3d' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div className="w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden z-0 relative" ref={containerRef} style={{ perspective: '1400px' }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-poster {
          --fontSize: 120px;
          --borderW: 20px;
          position: relative;
          height: calc(var(--fontSize)*8);
          width: calc(var(--fontSize)*6);
          transform-style: preserve-3d;
          visibility: hidden;
          opacity: 0;
          background: #050505;
          overflow: hidden;
          perspective: 700px;
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.3), 0 40px 50px -20px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .hero-poster {
            --fontSize: 50px;
            --borderW: 10px;
            height: calc(var(--fontSize)*12);
            width: calc(var(--fontSize)*6.5);
          }
        }
        .hero-poster__base1 {
          position: absolute;
          z-index: 2;
          top: var(--borderW);
          left: var(--borderW);
          width: calc(100% - calc(2*var(--borderW)));
          height: calc(100% - calc(2*var(--borderW)));
          background: #050505;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-poster__base2 {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-wheel {
          position: relative;
          z-index: 3;
          top: calc(-1 * var(--fontSize)/2.5);
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .hero-txt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
          font-size: var(--fontSize);
          font-weight: 900;
          text-transform: uppercase;
          transform-style: preserve-3d;
          line-height: 1;
          white-space: nowrap;
          letter-spacing: -2px;
          color: white;
        }
        .hero-char {
          background: linear-gradient(white 20%, #444 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-content {
          position: absolute;
          z-index: 4;
          bottom: 0;
          width: 100%;
          height: 150px;
          padding: var(--borderW);
          transform-style: preserve-3d;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}} />

      <div ref={stageRef} className="p-5 w-full flex items-center justify-center pointer-events-auto" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={posterRef} className="hero-poster">
          <div ref={wheelRef} className="hero-wheel">
            {Array.from({ length: numLines }).map((_, i) => (
              <h1 key={i} className="hero-txt">
                {splitText(word, "hero-char")}
              </h1>
            ))}
          </div>

          <div className="hero-content">
            <h2 className="text-white text-[1rem] sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-[6px] md:tracking-[20px] text-center pl-[6px] md:pl-[10px] w-full" style={{ transformStyle: 'preserve-3d', whiteSpace: 'nowrap' }}>
              {splitText("Erik Karlsson", "titleChar inline-block")}
            </h2>
            <p className="desc text-[#3d7db3] text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold uppercase tracking-[2px] md:tracking-[4px] mt-4 md:mt-6 text-center w-full" style={{ transformStyle: 'preserve-3d' }}>
              Digital Designer & Digital Artist
            </p>
          </div>

          <div className="hero-poster__base2"></div>
          <div className="hero-poster__base1"></div>
        </div>
      </div>
    </div>
  );
}
