"use client";

import { useRef, useEffect, useState } from "react";
import { MotionValue, useTransform, useMotionValueEvent, motion, useMotionTemplate } from "framer-motion";

interface Props {
  scrollProgress: MotionValue<number>;
  frameCount?: number;
}

export default function CanvasImageSequence({ scrollProgress, frameCount = 320 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Map progress (0 to 1) so it tracks through the entire "scroll down overlay" sequence
  const frameIndex = useTransform(scrollProgress, [0, 1], [0, frameCount - 1], {
    clamp: true,
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(3, "0");
      img.src = `/Images/frame_${frameString}_delay-0.041s.jpg`;
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
           drawFrame(0); // Paint first frame directly once loaded
        }
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Resize dynamically if window resized
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const img = images[Math.round(index)];
    if (!img) return;

    const scaleMultiplier = 1.08; // 8% zoom to crop out the Veo watermark on edges

    // Object-cover equivalent for canvas
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width * scaleMultiplier;
      drawHeight = (canvas.width / imgRatio) * scaleMultiplier;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height * scaleMultiplier;
      drawWidth = (canvas.height * imgRatio) * scaleMultiplier;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Redraw when scroll position changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(latest);
  });

  // Redraw when resized or after images finish loading
  useEffect(() => {
    drawFrame(frameIndex.get());
    
    const handleResize = () => drawFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Animate the gradient mask so it only appears at the end of the sequence
  const maskGradientStart = useTransform(scrollProgress, [0.75, 0.90], [100, 75]);
  const maskImage = useMotionTemplate`linear-gradient(to bottom, black ${maskGradientStart}%, transparent 100%)`;

  return (
    <motion.canvas
      ref={canvasRef}
      className="w-full h-full object-cover"
      style={{
        maskImage: maskImage,
        WebkitMaskImage: maskImage
      }}
    />
  );
}
