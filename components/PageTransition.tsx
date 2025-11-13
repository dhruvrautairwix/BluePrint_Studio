"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const easeStandard = [0.2, 0.9, 0.2, 1];
const overlayEase = [0.45, 0, 0.55, 1];

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: easeStandard }}
          className="min-h-screen relative"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <motion.div
        key={`overlay-${pathname}`}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40 bg-black"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: ["-100%", "0%", "100%"],
          opacity: [0, 0.35, 0],
        }}
        transition={{ duration: 0.6, ease: overlayEase, times: [0, 0.5, 1] }}
      />
    </LayoutGroup>
  );
}

