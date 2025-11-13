"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingWindow from "@/components/FloatingWindow";
import { dynamiteItems } from "@/utils/data";
import Image from "next/image";

export default function DynamitePage() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const createPositions = useCallback(() => {
    return dynamiteItems.reduce<Record<string, { x: number; y: number }>>((acc, item) => {
      if (isMobile) {
        acc[item.id] = { x: 0, y: 0 };
      } else {
        const base = item.position ?? { x: 0, y: 0 };
        acc[item.id] = base;
      }
      return acc;
    }, {});
  }, [isMobile]);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => createPositions());

  const openItems = dynamiteItems.filter((item) => openIds.includes(item.id));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPositions(createPositions());
    setOpenIds([]);
    setFocusedId(null);

    const revealOrder = dynamiteItems.map((item) => item.id);
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutsRef.current = revealOrder.map((id, index) =>
      window.setTimeout(() => {
        setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setFocusedId(id);
      }, index * 520)
    );

    return () => {
      timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, [createPositions]);

  const handleClose = (id: string) => {
    setOpenIds((prev) => prev.filter((itemId) => itemId !== id));
    setFocusedId((prev) => (prev === id ? null : prev));
  };

  const handleFocus = (id: string) => {
    setFocusedId(id);
    setOpenIds((prev) => {
      const next = prev.filter((itemId) => itemId !== id);
      next.push(id);
      return next;
    });
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&h=1300&q=80&ixlib=rb-4.0.3"
          alt="Harbour background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      </div>

      <main className="absolute inset-0 z-20 px-2 sm:px-4 md:px-8 lg:px-12 pt-28 pb-40">
        <div
          ref={scopeRef}
          className={`relative w-full h-full overflow-visible ${
            isMobile ? "flex flex-col gap-6 items-center pb-28" : ""
          }`}
        >
          <AnimatePresence>
            {openItems.map((item) => {
              const zIndex = openIds.indexOf(item.id) + 20;
              const position = positions[item.id];
              return (
                <FloatingWindow
                  key={item.id}
                  item={item}
                  zIndex={zIndex}
                  isFocused={focusedId === item.id}
                  onFocus={handleFocus}
                  onClose={handleClose}
                  dragScope={scopeRef}
                  initialPosition={position}
                  isMobile={isMobile}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
