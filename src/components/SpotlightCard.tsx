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
    if (!container) return;
    window.addEventListener("pointermove", syncPointer);
    return () => window.removeEventListener("pointermove", syncPointer);
  }, [container, syncPointer]);

  const getGlowStyles = () => {
    return {
      "--radius": borderRadius,
      "--border-size": "2px", // Slightly thicker for better edge glow
      "--spotlight-size": "400px",
      "--hue": `calc(${baseHue} + (var(--xp, 0.5) * ${spread}))`,
      "--glow-color": glowColor || `hsl(var(--hue) 100% 70%)`,
    } as React.CSSProperties;
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
      className={`group/spotlight relative ${className}`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        [data-glow] {
          --border-size: 2px;
          --spotlight-size: 400px;
          --bg-spot-opacity: 0.1;
        }

        /* The Outer/Ambient Glow Layer */
        [data-glow] [data-glow-child] {
          position: absolute;
          inset: 0;
          filter: blur(20px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
          z-index: -1;
        }

        [data-glow]:hover [data-glow-child] {
          opacity: 0.4;
        }

        /* Essential pseudo-element setup for Border and Surface Glow */
        [data-glow]::before,
        [data-glow]::after,
        [data-glow] [data-glow-child]::before,
        [data-glow] [data-glow-child]::after {
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1.5px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          pointer-events: none;
        }

        /* Primary Glow Implementation */
        [data-glow]::before,
        [data-glow] [data-glow-child]::before {
          background-image: radial-gradient(
            var(--spotlight-size) var(--spotlight-size) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            var(--glow-color),
            transparent 100%
          );
          z-index: 2;
          filter: brightness(1.5);
        }

        /* Secondary White Highlight for "Glassy" Edges */
        [data-glow]::after,
        [data-glow] [data-glow-child]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / 0.5),
            transparent 100%
          );
          z-index: 3;
        }

        /* Border Glow Masking */
        [data-glow]::before,
        [data-glow]::after {
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
          -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          -webkit-mask-clip: padding-box, border-box;
          -webkit-mask-composite: source-in;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        [data-glow]:hover::before,
        [data-glow]:hover::after {
          opacity: 1;
        }

        /* Internal Content Layer to ensure children are above ambient glow but below border */
        [data-glow] .glow-content {
          position: relative;
          z-index: 1;
          height: 100%;
          width: 100%;
        }
      `}} />
      
      {/* This layer provides the ambient light bleeding out from the card */}
      <div data-glow-child aria-hidden="true" />
      
      <div className="glow-content overflow-hidden rounded-[calc(var(--radius)*1px)]">
        {children}
      </div>
    </div>
  );
}
