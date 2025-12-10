"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PreloaderContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export const usePreloader = () => useContext(PreloaderContext);

export default function Preloader({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // show preloader only on first load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreloaderContext.Provider value={{ isLoading }}>
      {/* Page content - always visible, not hidden by opacity */}
      <div className="relative">
        {children}
      </div>

      {/* Preloader overlay - only shows on top when loading */}
      {isMounted && (
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main logo container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.2,
                  rotate: 180,
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex items-center justify-center relative"
              >
                {/* Glow effect behind logo */}
                <motion.div
                  className="absolute inset-0 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                  }}
                />

                {/* Logo with pulse and subtle rotation */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0],
                  }}
                  transition={{
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="relative z-10"
                >
                  <Image
                    src="/images/Main_Logo.png"
                    alt="Company Logo"
                    width={300}
                    height={300}
                    className="object-contain w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] drop-shadow-2xl"
                    priority
                  />
                </motion.div>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)",
                    transform: "skewX(-20deg)",
                  }}
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PreloaderContext.Provider>
  );
}
