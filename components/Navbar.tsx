"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, Mail, House, Bomb } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About", icon: () => <span className="text-3xl font-bold">P</span> },
  { href: "/projects", label: "Projects", icon: Globe },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/dynamite", label: "Dynamite", icon: Bomb },
];

export default function PartisansBottomNav() {
  const pathname = usePathname();
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Toronto",
    });

    const updateTime = () => setLocalTime(formatter.format(new Date()));
    updateTime();

    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-black/80 via-black/60 to-transparent px-6 py-4 sm:px-10 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-white sm:text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/Main_Logo.png"
                alt="Blueprint 3D Studios Logo"
                width={120}
                height={120}
                className="object-contain h-16 w-16 sm:h-20 sm:w-20"
                priority
              />
            </Link>
            <span className="hidden text-xs sm:text-sm tracking-[0.35em] sm:block">
              Building dreams, one pixel at a time.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[0.55rem] tracking-[0.35em]">
            <span>{localTime}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">MISSISSAUGA</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">ONTARIO</span>
            <span className="hidden lg:inline">| 35.8</span>
          </div>
        </div>
      </motion.div>

      <div className="fixed bottom-6 left-[15%] z-50 flex -translate-x-1/2 items-center gap-12">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-2"
            >
              <Icon
                className={`h-8 w-8 transition-all ${
                  active ? "text-white" : "text-white/70 group-hover:text-white"
                }`}
                strokeWidth={1.5}
              />

              <span
                className={`text-sm tracking-wide transition-all ${
                  active ? "text-white" : "text-white/70 group-hover:text-white"
                }`}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
