"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState, useRef } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);
  const previousPathname = useRef<string | null>(null);
  const shouldAnimate = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    // Allow animations after a short delay
    const timer = setTimeout(() => {
      shouldAnimate.current = true;
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (previousPathname.current !== null && previousPathname.current !== pathname) {
      shouldAnimate.current = true;
    }
    previousPathname.current = pathname;
  }, [pathname]);

  // During SSR or initial mount, render children immediately without animation
  // Preloader will handle the loading state
  if (!isMounted || reduce) {
    return <div className="w-full h-full opacity-100">{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
