"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/utils/data";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleCloseModal = () => {
    onClose(); // Just close the modal, don't navigate
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (project) {
      // Store original overflow and position values
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const scrollY = window.scrollY;
      
      // Disable scroll on body and html
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      
      // Add lenis-stopped class to html (for Lenis smooth scroll)
      document.documentElement.classList.add('lenis-stopped');
      
      // Stop Lenis smooth scroll if it exists
      const lenisInstance = (window as any).lenis;
      if (lenisInstance && typeof lenisInstance.stop === 'function') {
        lenisInstance.stop();
      }

      // Prevent scroll events from reaching the background (but allow modal content to scroll)
      const preventBackgroundScroll = (e: WheelEvent | TouchEvent) => {
        const target = e.target as HTMLElement;
        const modal = document.querySelector('[data-modal-container]');
        
        // Only prevent if the event is not from within the modal
        if (modal && !modal.contains(target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      // Add event listeners to prevent background scrolling
      document.addEventListener('wheel', preventBackgroundScroll as EventListener, { passive: false });
      document.addEventListener('touchmove', preventBackgroundScroll as EventListener, { passive: false });

      return () => {
        // Remove event listeners
        document.removeEventListener('wheel', preventBackgroundScroll as EventListener);
        document.removeEventListener('touchmove', preventBackgroundScroll as EventListener);
        
        // Remove lenis-stopped class
        document.documentElement.classList.remove('lenis-stopped');
        
        // Restore original values
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.width = '';
        document.body.style.top = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
        
        // Resume Lenis smooth scroll if it exists
        if (lenisInstance && typeof lenisInstance.start === 'function') {
          lenisInstance.start();
        }
      };
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[45] bg-black/80 backdrop-blur-sm"
        onClick={handleCloseModal}
        data-modal-container
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-24 left-0 right-0 bottom-0 z-[50] w-full bg-black overflow-hidden flex"
          onClick={(e) => e.stopPropagation()}
          data-modal-container
        >
          {/* Left Panel - Text Content */}
          <div className="w-full lg:w-1/2 overflow-y-auto p-8 lg:p-12">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Small Header */}
              <p className="text-white/60 text-sm uppercase tracking-wider">
                {project.title}
              </p>

              {/* Main Title */}
              <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold uppercase leading-tight">
                {project.title}
              </h1>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-white/90 text-base lg:text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Details Table */}
              <div className="space-y-0 border-t border-white/20 pt-6">
                <div className="flex items-start py-3 border-b border-white/10">
                  <span className="text-white/60 text-sm uppercase tracking-wider w-32 flex-shrink-0">
                    Type:
                  </span>
                  <span className="text-white text-sm">
                    <span className="underline">{project.category}</span>
                    {project.category === "Interiors" && " Heritage"}
                  </span>
                </div>
                <div className="flex items-start py-3 border-b border-white/10">
                  <span className="text-white/60 text-sm uppercase tracking-wider w-32 flex-shrink-0">
                    Location:
                  </span>
                  <span className="text-white text-sm">
                    <span className="underline">{project.location}</span>
                  </span>
                </div>
                {project.year && (
                  <div className="flex items-start py-3 border-b border-white/10">
                    <span className="text-white/60 text-sm uppercase tracking-wider w-32 flex-shrink-0">
                      Year:
                    </span>
                    <span className="text-white text-sm">{project.year}</span>
                  </div>
                )}
                {project.collaborators && (
                  <div className="flex items-start py-3 border-b border-white/10">
                    <span className="text-white/60 text-sm uppercase tracking-wider w-32 flex-shrink-0">
                      Collaborators:
                    </span>
                    <span className="text-white text-sm">{project.collaborators}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Large Image */}
          <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Navigation Controls - Top Right */}
            <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
              <button
                className="h-8 w-8 flex items-center justify-center text-white hover:text-white/70 transition-colors"
                aria-label="Previous"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
                className="h-8 w-8 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl font-bold"
                aria-label="Close project"
              >
                ×
              </button>
            </div>
          </div>

          {/* Mobile Image View */}
          <div className="lg:hidden w-full h-64 relative">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseModal();
              }}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center text-white hover:text-white/70 transition-colors text-xl font-bold bg-black/50 rounded"
              aria-label="Close project"
            >
              ×
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
