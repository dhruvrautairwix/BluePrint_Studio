"use client";

import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const manifestoCopy = [
  "Blueprint 3D Studios is a visualization and design studio based in Mississauga, Canada, specializing in photorealistic 3D renders, architectural walkthroughs, and concept visualization for residential and commercial projects.",
  "We help architects, designers, and developers bring their ideas to life through high-quality visuals that communicate the essence of every space blending artistic depth with technical precision."
];

const windowBlueprint = [
  {
    id: "studio-photo",
    title: "ABOUT",
    width: 520,
    height: 520,
    position: { top: 60, left: 80 },
    render: () => (
      <div 
        className="relative h-full w-full flex-shrink-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1503386435953-66943ba0e08f?auto=format&fit=crop&w=1400&q=80"
          alt="Studio portrait"
          fill
          className="object-cover"
          priority
        />
      </div>
    )
  },
  {
    id: "manifesto",
    title: "ABOUT",
    width: 560,
    height: 520,
    position: { top: 140, left: 540 },
    render: () => (
      <div className="flex h-full flex-col bg-black/90">
        <div className="px-6 pb-6 pt-6">
          <p className="text-[0.75rem] uppercase tracking-[0.35em] text-white/60">
            Blueprint 3D Studios
          </p>
          <p className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            BLUEPRINT 3D STUDIOS
          </p>
        </div>
        <div 
          data-scrollable
          className="flex-1 overflow-y-auto px-6 pb-8 text-lg leading-8 text-zinc-200"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {manifestoCopy.map((paragraph) => (
            <p key={paragraph} className="mb-6 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    )
  }
];

export default function AboutPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [closedWindows, setClosedWindows] = useState<Set<string>>(new Set());
  const [dragConstraints, setDragConstraints] = useState<Record<string, any>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Calculate drag constraints for full screen movement using actual element dimensions
  const getDragConstraints = (cardId: string, initialTop: number, initialLeft: number) => {
    if (typeof window === "undefined" || isMobile) {
      return { left: 0, right: 0, top: 0, bottom: 0 };
    }
    
    const cardElement = cardRefs.current[cardId];
    let cardWidth = windowBlueprint.find(w => w.id === cardId)?.width || 520;
    let cardHeight = windowBlueprint.find(w => w.id === cardId)?.height || 520;
    
    // Use actual element dimensions if available
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      if (rect.width > 0) cardWidth = rect.width;
      if (rect.height > 0) cardHeight = rect.height;
    }
    
    const margin = 20; // Equal margin on all sides
    const bottomMargin = 0; // No margin at bottom - allow cards to reach the very bottom
    
    // Calculate equal padding on left and right
    // Find the maximum distance the card can move while maintaining equal padding
    const maxLeftMovement = initialLeft - margin; // How far left from initial position
    const maxRightMovement = (window.innerWidth - cardWidth - initialLeft) - margin; // How far right from initial position
    const equalPadding = Math.min(maxLeftMovement, maxRightMovement); // Use the smaller value for equal padding
    
    // Constraints relative to initial position with equal left/right padding
    return {
      left: -equalPadding,
      right: equalPadding,
      top: -initialTop + margin,
      bottom: window.innerHeight - cardHeight - initialTop - bottomMargin,
    };
  };

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Recalculate constraints when card becomes active to ensure accurate dimensions
  useEffect(() => {
    if (isMounted && !isMobile) {
      const updateConstraints = () => {
        windowBlueprint.forEach((win) => {
          const cardElement = cardRefs.current[win.id];
          if (cardElement) {
            let cardWidth = win.width;
            let cardHeight = win.height;
            
            const rect = cardElement.getBoundingClientRect();
            if (rect.width > 0) cardWidth = rect.width;
            if (rect.height > 0) cardHeight = rect.height;
            
            const margin = 20;
            const bottomMargin = 0;
            
            // Calculate equal padding on left and right
            const maxLeftMovement = win.position.left - margin;
            const maxRightMovement = (window.innerWidth - cardWidth - win.position.left) - margin;
            const equalPadding = Math.min(maxLeftMovement, maxRightMovement);
            
            const constraints = {
              left: -equalPadding,
              right: equalPadding,
              top: -win.position.top + margin,
              bottom: window.innerHeight - cardHeight - win.position.top - bottomMargin,
            };
            
            setDragConstraints(prev => ({
              ...prev,
              [win.id]: constraints
            }));
          } else {
            // If element not ready, set initial constraints based on blueprint
            const margin = 20;
            const bottomMargin = 0;
            
            // Calculate equal padding on left and right
            const maxLeftMovement = win.position.left - margin;
            const maxRightMovement = (window.innerWidth - win.width - win.position.left) - margin;
            const equalPadding = Math.min(maxLeftMovement, maxRightMovement);
            
            const constraints = {
              left: -equalPadding,
              right: equalPadding,
              top: -win.position.top + margin,
              bottom: window.innerHeight - win.height - win.position.top - bottomMargin,
            };
            setDragConstraints(prev => ({
              ...prev,
              [win.id]: constraints
            }));
          }
        });
      };

      // Use multiple requestAnimationFrame to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateConstraints();
          });
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isMounted, isMobile, activeCard]);

  const handleCardFocus = (cardId: string) => {
    setActiveCard(cardId);
    setZIndexCounter(prev => prev + 1);
  };

  const handleCloseWindow = (windowId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent dragging when clicking close
    setClosedWindows(prev => new Set(prev).add(windowId));
    if (activeCard === windowId) {
      setActiveCard(null);
    }
  };

  return (
    <div className="relative min-h-screen h-screen w-full overflow-visible bg-black text-white">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80"
          alt="Studio background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative flex min-h-screen flex-col overflow-visible">

        <div
          ref={canvasRef}
          className="relative flex-1 w-full h-full overflow-visible"
        >
          <div className="absolute inset-0" />
          <div className="relative w-full h-full">
            {windowBlueprint.map((win) => {
              const isActive = activeCard === win.id;
              const cardZIndex = isActive ? zIndexCounter : 10;
              const isClosed = closedWindows.has(win.id);
              // Only apply mobile styles after mount to prevent hydration mismatch
              const shouldUseMobileStyles = isMounted && isMobile;
              
              // Don't render closed windows
              if (isClosed) return null;
              
              return (
              <motion.div
                key={win.id}
                ref={(el) => {
                  if (el) cardRefs.current[win.id] = el;
                }}
                drag={isMounted && !isMobile}
                dragConstraints={dragConstraints[win.id] ?? getDragConstraints(win.id, win.position.top, win.position.left)}
                dragElastic={0.1}
                dragMomentum={false}
                dragPropagation={false}
                onDragStart={() => handleCardFocus(win.id)}
                onPointerDown={(e) => {
                  // Only focus if not clicking on close button or scrollable content
                  const target = e.target as HTMLElement;
                  if (!target.closest('button') && !target.closest('[data-scrollable]')) {
                    handleCardFocus(win.id);
                  }
                  // Don't stop propagation - allow drag to work
                }}
                initial={{
                  opacity: 0,
                  scale: 0.94,
                  y: -40
                }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.05 : 1,
                  y: 0
                }}
                transition={{
                  scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                whileHover={isMounted && !isMobile ? { scale: isActive ? 1.05 : 1.02 } : {}}
                whileDrag={{ cursor: "grabbing" }}
                className={`mb-6 flex flex-col rounded border border-white/20 bg-black/85 text-white shadow-2xl backdrop-blur-sm transition-shadow select-none ${
                  shouldUseMobileStyles ? "relative w-full" : "absolute"
                } ${isActive ? "shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-2 ring-white/60 cursor-move" : "cursor-pointer"}`}
                style={{
                  width: shouldUseMobileStyles ? "100%" : win.width,
                  height: shouldUseMobileStyles ? "auto" : win.height,
                  ...(shouldUseMobileStyles ? {} : { top: win.position.top, left: win.position.left }),
                  zIndex: cardZIndex
                }}
              >
                <div 
                  className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[0.65rem] uppercase tracking-[0.35em] flex-shrink-0"
                >
                  <span>{win.title}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCloseWindow(win.id, e)}
                      onPointerDown={(e) => e.stopPropagation()}
                      className="inline-flex h-6 w-6 items-center justify-center rounded border border-white/20 text-base leading-none hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer"
                      aria-label="Close window"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  {win.render()}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

