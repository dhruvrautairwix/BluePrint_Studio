"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Mail, FolderOpen, Award, Bomb } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About", icon: () => <span className="text-3xl font-bold">P</span> },
  { href: "/projects", label: "Projects", icon: Globe },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/dynamite", label: "Dynamite", icon: Bomb },
];

export default function PartisansBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-[15%] -translate-x-1/2 flex items-center gap-12 z-50">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Icon */}
            <Icon
              className={`h-8 w-8 transition-all 
              ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}
              strokeWidth={1.5}
            />

            {/* Label */}
            <span
              className={`text-sm transition-all tracking-wide
              ${active ? "text-white" : "text-white/70 group-hover:text-white"}`}
            >
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
