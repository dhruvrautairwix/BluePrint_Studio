"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Mail, Home, Bomb, X, FolderOpen, Award, BookOpen } from "lucide-react";

// Mmake red border around the obile menu links (Home, About, Projects, Contact)
const mobileNavLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: () => <span className="text-6xl font-bold">B</span> },
  { href: "/projects", label: "Projects", icon: Globe },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [localTime, setLocalTime] = useState("");
  const [temperature, setTemperature] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Update time to show user's local time
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      // No timeZone specified - uses user's local timezone
    });

    const updateTime = () => setLocalTime(formatter.format(new Date()));
    updateTime();

    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  // Fetch temperature for Mississauga
  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        // Using OpenWeatherMap API (free tier)
        // You'll need to get an API key from https://openweathermap.org/api
        // For now, using a free alternative: Open-Meteo API (no API key required)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=43.5890&longitude=-79.6441&current=temperature_2m&timezone=America/Toronto"
        );
        
        if (response.ok) {
          const data = await response.json();
          const temp = data.current?.temperature_2m;
          if (temp !== undefined) {
            setTemperature(Math.round(temp).toString());
          }
        }
      } catch (error) {
        console.error("Failed to fetch temperature:", error);
        // Fallback to empty string if API fails
        setTemperature("");
      }
    };

    fetchTemperature();
    // Refresh temperature every 10 minutes
    const interval = setInterval(fetchTemperature, 600000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Support both regular scroll and Lenis smooth scroll
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || window.pageYOffset;
      setIsScrolled(scrollPosition > 50);
    };

    // Listen to both scroll events (for Lenis) and regular scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Desktop Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`hidden lg:block fixed inset-x-0 top-0 z-40 px-8 xl:px-16 py-6 transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1800px] flex items-center justify-between gap-8">
          {/* Left - Logo */}
          <div className="flex items-center justify-start flex-shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/Main_Logo.png"
                alt="Blueprint 3D Studios Logo"
                width={60}
                height={60}
                className="object-contain h-14 w-14 xl:h-16 xl:w-16"
                priority
              />
            </Link>
            <div className="flex flex-col items-center justify-start  flex-shrink-0">
            <p className="text-[0.65rem] xl:text-xs tracking-[0.25em] text-white/80 uppercase whitespace-nowrap">
              Building dreams, one pixel at a time.
            </p>
          </div>
          </div>

          {/* Right - Time and Location */}
          <div className="flex items-center justify-end gap-2 xl:gap-3 text-[0.65rem] xl:text-xs tracking-[0.2em] xl:tracking-[0.25em] text-white/90 uppercase flex-shrink-0 whitespace-nowrap">
            <span>{localTime}</span>
            <span>|</span>
            <span>MISSISSAUGA</span>
            <span>|</span>
            <span>ONTARIO</span>
            {temperature && (
              <>
                <span>|</span>
                <span>{temperature}°C</span>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`lg:hidden fixed inset-x-0 top-0 z-40 px-4 py-5 sm:px-8 transition-colors duration-300 ${
          isScrolled ? "bg-black" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center text-center">
          <div className="flex flex-col items-center gap-2.5">
            {/* Logo/Brand Name */}
            <Link href="/" className="flex items-center justify-center">
              <h1 className="text-base sm:text-lg font-bold tracking-[0.4em] text-white uppercase">
                BLUEPRINT 3D STUDIO
              </h1>
            </Link>
            
            {/* Time and Location Info */}
            <div className="flex items-center gap-2.5 text-[0.7rem] sm:text-xs tracking-[0.3em] text-white/80 uppercase">
              <span>{localTime}</span>
              <span>|</span>
              <span>MISSISSAUGA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Navigation - Bottom Left */}
      <div className="hidden lg:flex fixed bottom-8 left-16 z-50 items-center gap-8 xl:gap-10">
        <Link href="/" className="group flex flex-col items-center gap-1.5">
          <Home
            className={`h-7 w-7 xl:h-8 xl:w-8 transition-all ${
              pathname === "/" ? "text-white" : "text-white/70 group-hover:text-white"
            }`} 
            strokeWidth={1.5}
          />
          <span
            className={`text-sm xl:text-base font-bold tracking-[0.15em] uppercase transition-all ${
              pathname === "/" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Home
          </span>
        </Link>

        <Link href="/about" className="group flex flex-col items-center gap-1.5">
          <span
            className={`text-2xl xl:text-3xl font-bold transition-all ${
              pathname === "/about" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            B
          </span>
          <span
            className={`text-sm xl:text-base font-bold tracking-[0.15em] uppercase transition-all ${
              pathname === "/about" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            About
          </span>
        </Link>

        <Link href="/projects" className="group flex flex-col items-center gap-1.5">
          <Globe
            className={`h-7 w-7 xl:h-8 xl:w-8 transition-all ${
              pathname === "/projects" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-sm xl:text-base font-bold tracking-[0.15em] uppercase transition-all ${
              pathname === "/projects" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Projects
          </span>
        </Link>

        <Link href="/contact" className="group flex flex-col items-center gap-1.5">
          <Mail
            className={`h-7 w-7 xl:h-8 xl:w-8 transition-all ${
              pathname === "/contact" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-sm xl:text-base font-bold tracking-[0.15em] uppercase transition-all ${
              pathname === "/contact" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Contact
          </span>
        </Link>

        <Link href="/dynamite" className="group flex flex-col items-center gap-1.5">
          <Bomb
            className={`h-7 w-7 xl:h-8 xl:w-8 transition-all ${
              pathname === "/dynamite" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`text-sm xl:text-base font-bold tracking-[0.15em] uppercase transition-all ${
              pathname === "/dynamite" ? "text-white" : "text-white/70 group-hover:text-white"
            }`}
          >
            Dynamite
          </span>
        </Link>
      </div>

      {/* Mobile/Tablet Hamburger Menu Button - Full Width Black Bar at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black py-6">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mx-auto flex items-center justify-center text-white transition-all"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" strokeWidth={2.5} />
          ) : (
            <div className="flex flex-col gap-[5px]">
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
              <div className="w-8 h-[2.5px] bg-white rounded-sm"></div>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu - Half Screen Bottom Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Half Screen Menu Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black h-1/2 rounded-t-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Grid Layout - 2x2 grid for 4 items */}
                <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-px bg-black p-px">
                  {/* Home - Top Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black"
                  >
                    <Link
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Home className="h-12 w-12 text-white" strokeWidth={1.5} />
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                        Home
                      </span>
                    </Link>
                  </motion.div>

                  {/* About - Top Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-black"
                  >
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-4xl font-bold text-white">B</span>
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                        About
                      </span>
                    </Link>
                  </motion.div>

                  {/* Projects - Bottom Left */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black"
                  >
                    <Link
                      href="/projects"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Globe className="h-12 w-12 text-white" strokeWidth={1.5} />
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                        Projects
                      </span>
                    </Link>
                  </motion.div>

                  {/* Contact - Bottom Right */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="bg-black"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="h-full w-full flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors"
                    >
                      <Mail className="h-12 w-12 text-white" strokeWidth={1.5} />
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
                        Contact
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}