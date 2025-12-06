"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue } from "framer-motion";
import Image from "next/image";
import type { DynamiteItem } from "@/utils/data";

interface FloatingWindowProps {
  item: DynamiteItem;
  zIndex: number;
  isFocused: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  dragScope: React.RefObject<HTMLDivElement>;
  initialPosition?: { x: number; y: number };
  isMobile?: boolean;
}

export default function FloatingWindow({
  item,
  zIndex,
  isFocused,
  onFocus,
  onClose,
  dragScope,
  initialPosition,
  isMobile = false,
}: FloatingWindowProps) {
  const prefersReducedMotion = useReducedMotion();

  const windowWidth = item.dimensions?.width ?? 420;
  const windowHeight = item.dimensions?.height ?? 320;
  const mediaHeight = Math.max(180, windowHeight - 80);

  const x = useMotionValue(initialPosition?.x ?? 0);
  const y = useMotionValue(initialPosition?.y ?? 0);

  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  // Constraint calculation
  const calculateConstraints = () => {
    if (typeof window === "undefined" || !dragScope.current)
      return { left: 0, right: 0, top: 0, bottom: 0 };

    const rect = dragScope.current.getBoundingClientRect();
    const margin = 10; // Reduced margin to allow more movement

    // Since the window is centered (50% left, 50% top with translate), 
    // calculate symmetric constraints for equal spacing on both sides
    // Window center starts at rect.width/2, rect.height/2
    // To move left edge to margin: center at (windowWidth/2 + margin), translate by -(rect.width/2 - windowWidth/2 - margin)
    // To move right edge to (rect.width - margin): center at (rect.width - windowWidth/2 - margin), translate by (rect.width/2 - windowWidth/2 - margin)
    const maxOffsetX = rect.width / 2 - windowWidth / 2 - margin;
    const maxOffsetY = rect.height / 2 - windowHeight / 2 - margin;

    return { 
      left: -maxOffsetX, 
      right: maxOffsetX, 
      top: -maxOffsetY, 
      bottom: maxOffsetY 
    };
  };

  const clamp = (cx: number, cy: number) => {
    const c = calculateConstraints();

    return {
      x: Math.max(c.left, Math.min(c.right, cx)),
      y: Math.max(c.top, Math.min(c.bottom, cy)),
    };
  };

  // Initialize position AFTER layout is ready
  useEffect(() => {
    if (!initialPosition) return;

    const update = () => {
      if (!dragScope.current) {
        requestAnimationFrame(update);
        return;
      }

      const c = calculateConstraints();
      setDragConstraints(c);

      const baseX = initialPosition.x ?? 0;
      const baseY = initialPosition.y ?? 0;
      const fixed = clamp(baseX, baseY);

      x.set(fixed.x);
      y.set(fixed.y);
    };

    requestAnimationFrame(update);
  }, [windowWidth, windowHeight, initialPosition]);

  // Re-clamp on viewport resize
  useEffect(() => {
    const onResize = () => {
      const c = calculateConstraints();
      setDragConstraints(c);

      const fixed = clamp(x.get(), y.get());
      x.set(fixed.x);
      y.set(fixed.y);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const containerClass = isMobile
    ? "relative w-full bg-black/85 text-white rounded-sm border border-white/20 overflow-hidden select-none cursor-move mb-6"
    : "absolute bg-black/85 text-white rounded-sm border border-white/20 backdrop-blur-sm overflow-hidden select-none cursor-move -translate-x-1/2 -translate-y-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.28 }}
      drag={!prefersReducedMotion && isFocused}
      dragConstraints={dragConstraints}
      dragMomentum={false}
      dragElastic={0.02}
      onPointerDown={() => onFocus(item.id)}
      className={`${containerClass} ${isFocused ? "ring-2 ring-white/60" : ""
        }`}
      style={{
        ...(isMobile ? {} : { top: "50%", left: "50%" }),
        x,
        y,
        width: isMobile ? "100%" : windowWidth,
        height: isMobile ? "auto" : windowHeight,
        zIndex,
      }}
    >
      {/* Title Bar */}
      <header className="flex items-center justify-between px-4 py-3 text-[0.7rem] uppercase tracking-[0.15em] bg-black/75 border-b border-white/10">
        <span className="truncate">{item.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(item.id);
          }}
          className="h-7 w-7 flex items-center justify-center hover:bg-white/10 rounded"
        >
          ×
        </button>
      </header>

      {/* Content */}
      <div className="relative bg-black">
        {item.mediaType === "video" ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
            style={{ height: mediaHeight }}
          />
        ) : (
          <div className="relative" style={{ height: mediaHeight }}>
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes={isMobile ? "100vw" : `${Math.min(windowWidth, 800)}px`}
              className="object-cover"
              priority={false}
            />

          </div>
        )}

        {(item.subtitle || item.description) && (
          <div className="px-4 py-3 text-[0.75rem] bg-black/85">
            {item.subtitle && (
              <p className="uppercase tracking-[0.2em] text-white/60 mb-1">
                {item.subtitle}
              </p>
            )}
            {item.description && (
              <p className="text-white/80">{item.description}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
