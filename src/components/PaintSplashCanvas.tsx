"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

interface PaintSplashCanvasProps {
  scrollProgress: MotionValue<number>;
}

export default function PaintSplashCanvas({ scrollProgress }: PaintSplashCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const render = (progress: number) => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      // Draw an undulating fluid blob
      const drawBlob = (
        sizeMod: number, 
        baseHue: number, 
        rotation: number, 
        offsetX: number, 
        offsetY: number, 
        points: number,
        complexity: number,
        speed: number
      ) => {
        ctx.save();
        ctx.translate(cx + offsetX, cy + offsetY);
        ctx.rotate(progress * rotation);
        
        const pointsArr = Array.from({length: points}, (_, i) => {
          const angle = (i / points) * Math.PI * 2;
          const morph = 1 
            + Math.sin(angle * complexity + progress * speed) * 0.25 
            + Math.cos(angle * (complexity - 1) - progress * (speed * 0.8)) * 0.2;
            
          const baseRadius = sizeMod * 0.6 + sizeMod * 0.4 * progress;
          const r = Math.max(10, baseRadius * morph);
          
          return {
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r
          }
        });

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const p0 = pointsArr[(i - 1 + points) % points];
          const p1 = pointsArr[i % points];
          const midX = (p0.x + p1.x) / 2;
          const midY = (p0.y + p1.y) / 2;
          
          if (i === 0) {
            ctx.moveTo(midX, midY);
          } else {
            ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
          }
        }
        ctx.closePath();
        
        // Gradient mapping so it blends seamlessly into background
        const maxR = sizeMod * 2;
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
        grad.addColorStop(0, `hsla(${baseHue}, 100%, 65%, 0.9)`);
        grad.addColorStop(0.4, `hsla(${baseHue - 20}, 100%, 55%, 0.5)`);
        grad.addColorStop(1, "rgba(5, 5, 5, 0)"); // Fades into the #050505 bg
        
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.fill();
        ctx.restore();
      };
      
      // Color progression: Pink/Purple -> Blue/Cyan -> Orange/Red
      const baseHue1 = 330 - progress * 140; 
      const baseHue2 = 280 - progress * 100;
      const baseHue3 = 10 + progress * 80;

      // Choreography based on beats (A, B, C, D, E) logic mapping
      const pX1 = Math.sin(progress * Math.PI * 2) * (width * 0.25);
      const pY1 = Math.cos(progress * Math.PI * 2) * (height * 0.2);
      
      const pX2 = Math.cos(progress * Math.PI * 2.5) * (width * 0.35) * -1;
      const pY2 = Math.sin(progress * Math.PI * 2.5) * (height * 0.3);

      const pX3 = Math.sin(progress * Math.PI * 1.5) * (width * 0.15);
      const pY3 = Math.cos(progress * Math.PI * 1.5) * (height * 0.15);

      const mobileScale = width < 768 ? 0.6 : 1;
      
      // Paint blobs
      drawBlob(450 * mobileScale, baseHue1, Math.PI * 1, pX1, pY1, 60, 4, 15);
      drawBlob(350 * mobileScale, baseHue2, -Math.PI * 1.5, pX2, pY2, 50, 3, 20);
      drawBlob(550 * mobileScale, baseHue3, Math.PI * 0.5, pX3, pY3, 70, 5, 10);

      // Add energy splatters
      ctx.save();
      ctx.translate(cx, cy);
      const numParticles = 100;
      for (let i = 0; i < numParticles; i++) {
        const angle = (i / numParticles) * Math.PI * 2 + progress * 8;
        // They drift outward
        const spread = Math.pow(progress + 0.05, 1.2) * width * 1.5;
        const dist = (20 + (i % 40) * 15) + spread * ((i%4)/4);
        
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        
        const sizeBase = typeof window !== 'undefined' && width < 768 ? 1.5 : 3;
        const size = Math.max(0.5, (sizeBase - (i % 3)) * (Math.sin(progress * Math.PI) + 0.5));
        
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        
        const pColor = i % 2 === 0 ? baseHue1 : baseHue2;
        ctx.fillStyle = `hsla(${pColor}, 100%, 75%, ${Math.max(0.1, 1 - progress)})`;
        ctx.fill();
      }
      ctx.restore();
    };

    // Initial render
    render(scrollProgress.get());

    // Subscribe to smooth progress
    const unsubscribe = scrollProgress.on("change", (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      unsubscribe();
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
    />
  );
}
