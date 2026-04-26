"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface SpotlightCardProps {
  glowColor?: string; // Hex or HSL color for the spotlight
  baseHue?: number;   // Base hue if using dynamic hue shifting
  spread?: number;    // Spread for hue shifting
  className?: string;
  children?: React.ReactNode;
  borderRadius?: number;
}

export default function SpotlightCard({
  glowColor,
  baseHue = 210,
  spread = 40,
  className = "",
  children,
  borderRadius = 4,
}: SpotlightCardProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const syncPointer = useCallback(
    (event: PointerEvent) => {
      if (!container) return;
      
      const x = event.clientX;
      const y = event.clientY;
      container.style.setProperty("--x", x.toString());
      container.style.setProperty("--y", y.toString());

      const rect = container.getBoundingClientRect();
      const xp = (x - rect.left) / rect.width;
      const yp = (y - rect.top) / rect.height;
      container.style.setProperty("--xp", xp.toString());
      container.style.setProperty("--yp", yp.toString());
    },
    [container]
  );

  useEffect(() => {
    // Only track if the container is defined
    if (!container) return;

    window.addEventListener("pointermove", syncPointer);
    return () => window.removeEventListener("pointermove", syncPointer);
  }, [container, syncPointer]);

  // Derived styles for the spotlight effect
  const getGlowStyles = () => {
    const styles: any = {
      "--radius": borderRadius,
      "--border-size": "1px",
      "--spotlight-size": "300px",
      "--hue": `calc(${baseHue} + (var(--xp, 0.5) * ${spread}))`,
      // Use glowColor if provided, otherwise fallback to the dynamic hue
      "--glow-color": glowColor || `hsl(var(--hue) 100% 70%)`,
      position: "relative",
    };
    return styles;
  };

  return (
    <div
      ref={(node) => {
        setContainer(node);
        if (containerRef.current !== node) {
          (containerRef as any).current = node;
        }
      }}
      data-glow
      style={getGlowStyles()}
      className={`group/spotlight relative overflow-hidden ${className}`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--xp, 0.5) * 100%)
            calc(var(--yp, 0.5) * 100%),
            var(--glow-color),
            transparent 100%
          );
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        /* Border Glow Masking */
        [data-glow]::before {
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          opacity: 0;
        }

        [data-glow]:hover::before {
          opacity: 1;
        }
        
        /* Surface Glow (Inner) */
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 1.5) calc(var(--spotlight-size) * 1.5) at
            calc(var(--xp, 0.5) * 100%)
            calc(var(--yp, 0.5) * 100%),
            var(--glow-color),
            transparent 100%
          );
          opacity: 0;
        }

        [data-glow]:hover::after {
          opacity: 0.15;
        }
      `}} />
      <div className="relative z-0 h-full w-full">
        {children}
      </div>
    </div>
  );
}
