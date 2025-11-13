"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const targetX = isMobile ? 0 : initialPosition?.x ?? 0;
  const targetY = isMobile ? 0 : initialPosition?.y ?? 0;
  const windowWidth = item.dimensions?.width ?? 420;
  const windowHeight = item.dimensions?.height ?? 320;
  const mediaHeight = Math.max(180, windowHeight - 80);
  const rotation = 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, x: 0, y: isMobile ? 20 : 0 }}
      animate={{ opacity: 1, scale: 1, x: targetX, y: targetY }}
      transition={{ duration: 0.85, ease: [0.18, 0.8, 0.2, 1] }}
      exit={{ opacity: 0, scale: 0.9, x: targetX, y: targetY + 40, transition: { duration: 0.3 } }}
      drag={!prefersReducedMotion}
      dragConstraints={dragScope.current ?? undefined}
      dragMomentum={!prefersReducedMotion}
      dragElastic={0.12}
      whileDrag={!prefersReducedMotion ? { scale: 1.02, cursor: "grabbing" } : undefined}
      onPointerDown={() => onFocus(item.id)}
      className={`relative md:absolute w-full md:w-auto bg-black/85 text-white shadow-2xl rounded-sm border border-white/20 backdrop-blur-sm overflow-hidden select-none cursor-grab ${
        isFocused ? "ring-2 ring-white/80" : "ring-0"
      } ${isMobile ? "mb-6" : "md:-translate-x-1/2 md:-translate-y-1/2"}`}
      style={{
        zIndex,
        top: isMobile ? undefined : "50%",
        left: isMobile ? undefined : "50%",
        width: isMobile ? "100%" : windowWidth,
      }}
    >
      <header className="flex items-center justify-between px-4 py-2 text-[0.65rem] uppercase tracking-[0.15em] bg-black/70 border-b border-white/10">
        <span className="truncate pr-3">{item.title}</span>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onClose(item.id);
          }}
          className="h-6 w-6 flex items-center justify-center text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`Close ${item.title}`}
        >
          ×
        </button>
      </header>
      <div className="relative bg-black">
        {item.mediaType === "video" ? (
          <video
            src={item.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full object-cover"
            style={{ height: isMobile ? Math.min(mediaHeight, 280) : mediaHeight }}
          />
        ) : (
          <div className="relative" style={{ height: isMobile ? Math.min(mediaHeight, 280) : mediaHeight }}>
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
              sizes={isMobile ? "92vw" : `${Math.min(windowWidth, 720)}px`}
              priority={isFocused}
            />
          </div>
        )}
        {(item.subtitle || item.description) && (
          <div className="px-4 py-3 text-[0.7rem] leading-relaxed bg-black/80">
            {item.subtitle && <p className="uppercase tracking-[0.25em] text-white/70 mb-2">{item.subtitle}</p>}
            {item.description && <p className="text-white/80">{item.description}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
