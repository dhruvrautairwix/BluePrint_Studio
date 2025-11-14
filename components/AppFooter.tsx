"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function AppFooter() {
  const pathname = usePathname();
  if (pathname === "/dynamite" || pathname?.startsWith("/dynamite/") || pathname === "/contact") {
    return null;
  }
  return <Footer />;
}
