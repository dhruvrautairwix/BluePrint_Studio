"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useMotionValue } from "framer-motion";

interface ContactWindowProps {
  id: string;
  title: string;
  content: string | string[];
  initialPosition: { x: number; y: number };
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  zIndex: number;
  dragScope: React.RefObject<HTMLDivElement>;
}

export default function ContactWindow({
  id,
  title,
  content,
  initialPosition,
  onClose,
  onFocus,
  zIndex,
  dragScope,
}: ContactWindowProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calculate drag constraints based on container
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set initial position after mount - x and y should start at 0 since we use left/top
  useEffect(() => {
    if (isMounted) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        x.set(0);
        y.set(0);
      });
    }
  }, [isMounted, x, y]);

  useEffect(() => {
    if (!isMounted || !dragScope.current || typeof window === "undefined") {
      return;
    }

    const calculateConstraints = () => {
      if (!dragScope.current) return { left: 0, right: 0, top: 0, bottom: 0 };

      const containerRect = dragScope.current.getBoundingClientRect();
      const windowWidth = 550; // Approximate window width
      const windowHeight = 400; // Approximate window height

      // Constraints relative to initial position
      const minX = 0 - initialPosition.x;
      const maxX = containerRect.width - windowWidth - initialPosition.x;
      const minY = 0 - initialPosition.y;
      const maxY = containerRect.height - windowHeight - initialPosition.y;

      return {
        left: minX,
        right: maxX,
        top: minY,
        bottom: maxY,
      };
    };

    const updateConstraints = () => {
      if (!dragScope.current) {
        requestAnimationFrame(updateConstraints);
        return;
      }
      setDragConstraints(calculateConstraints());
    };

    updateConstraints();

    const handleResize = () => {
      setDragConstraints(calculateConstraints());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted, dragScope, initialPosition, x, y]);

  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      drag={isMounted && !prefersReducedMotion}
      dragConstraints={dragConstraints}
      dragElastic={0.05}
      dragMomentum={false}
      whileDrag={{ cursor: "grabbing" }}
      onPointerDown={() => onFocus(id)}
      style={{
        left: initialPosition.x,
        top: initialPosition.y,
        x,
        y,
        zIndex,
        position: "absolute",
      }}
      className="bg-black border-2 border-white overflow-hidden select-none cursor-move w-[500px] max-w-[90vw]"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/20">
        <span className="text-[11px] uppercase tracking-[0.15em] text-white">
          CONTACT
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="h-5 w-5 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl leading-none"
          aria-label={`Close ${title}`}
          onPointerDown={(e) => e.stopPropagation()}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="px-10 py-8 bg-black">
        <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold uppercase text-white leading-none mb-4">
          {title}
        </h2>
        <div className="space-y-1">
          {contentArray.map((line, i) => (
            <p key={i} className="text-[16px] md:text-[18px] text-white/85 leading-tight">
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

