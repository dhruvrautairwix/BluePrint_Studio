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
      content: "+1 (647) 894-7187",
      initialPosition: { x: 150, y: 100 },
    },
    {
      id: "email",
      title: "EMAIL",
      content: "HELLO@blueprint3dstudios.com",
      initialPosition: { x: 530, y: 200 },
    },
    {
      id: "address",
      title: "CONTACT FORM",
      content: [""],
      initialPosition: { x: 850, y: 300 },
    },
  ]);

  const [zIndexOrder, setZIndexOrder] = useState<string[]>([
    "phone",
    "email",
    "address",
  ]);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleFocus = (id: string) => {
    setFocusedId(id);
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
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      {/* Background */}
      <div className="absolute inset-0 z-[1] h-full w-full">
        <Image
          src="/images/urban-bistro-mississauga-dining-3.png"
          alt="Dark interior background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Bordered Section for Cards */}
      <div className="relative z-[2] w-full h-screen overflow-visible">
        {/* Drag Container */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-visible"
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
              isFocused={focusedId === window.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

