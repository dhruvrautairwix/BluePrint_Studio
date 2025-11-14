"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ContactWindow from "@/components/ContactWindow";

interface WindowData {
  id: string;
  title: string;
  content: string | string[];
  initialPosition: { x: number; y: number };
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: "phone",
      title: "PHONE",
      content: "+1 647 846 3428",
      initialPosition: { x: 150, y: 100 },
    },
    {
      id: "email",
      title: "EMAIL",
      content: "HELLO@PARTISANS.COM",
      initialPosition: { x: 530, y: 280 },
    },
    {
      id: "address",
      title: "ADDRESS",
      content: ["99 CROWNS LANE", "TORONTO, ON", "M5R 3P4"],
      initialPosition: { x: 850, y: 460 },
    },
  ]);

  const [zIndexOrder, setZIndexOrder] = useState<string[]>([
    "phone",
    "email",
    "address",
  ]);

  const handleFocus = (id: string) => {
    setZIndexOrder((prev) => {
      const newOrder = prev.filter((item) => item !== id);
      return [...newOrder, id];
    });
  };

  const handleClose = (id: string) => {
    setWindows((prev) => prev.filter((window) => window.id !== id));
    setZIndexOrder((prev) => prev.filter((item) => item !== id));
  };

  const getZIndex = (id: string) => {
    return zIndexOrder.indexOf(id) + 10;
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&h=1300&q=80&ixlib=rb-4.0.3"
          alt="Dark interior background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Drag Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {windows.map((window) => (
          <ContactWindow
            key={window.id}
            id={window.id}
            title={window.title}
            content={window.content}
            initialPosition={window.initialPosition}
            onClose={handleClose}
            onFocus={handleFocus}
            zIndex={getZIndex(window.id)}
            dragScope={containerRef}
          />
        ))}
      </div>
    </main>
  );
}

