import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Studio Architecture & Design",
  description: "Creative architecture and design studio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden">
        <Preloader>
          {/* Prevents hydration mismatch */}
          <SmoothScroll>
            <Navbar />

            <PageTransition>
              <main className="min-h-screen w-full">{children}</main>
            </PageTransition>
          </SmoothScroll>
        </Preloader>
      </body>
    </html>
  );
}