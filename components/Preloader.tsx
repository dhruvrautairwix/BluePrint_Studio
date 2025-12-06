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
              className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src="/images/Main_Logo.png"
                    alt="Company Logo"
                    width={150}
                    height={150}
                    className="object-contain"
                    priority
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-white text-4xl font-bold"
                >
                  Blueprint 3D Studio
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </PreloaderContext.Provider>
  );
}
