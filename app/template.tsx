"use client";

import { ReactNode } from "react";

/**
 * Template component for route transitions.
 * 
 * Note: The overlay logic for the about page is handled
 * in app/about/layout.tsx instead, which is more appropriate
 * for route-specific layouts in Next.js App Router.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

