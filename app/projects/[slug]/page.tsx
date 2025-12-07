"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/utils/data";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import ProjectDetails from "@/components/ProjectDetails";
import AstronLegalCard from "@/components/AstronLegalCard";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 5);

  if (!project) {
    notFound();
  }

  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // Ensure page can scroll and Lenis recalculates scroll height
  useEffect(() => {
    // Ensure body/html can scroll
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.remove('lenis-stopped');
    
    // Force Lenis to recalculate scrollable area after a short delay
    const timer = setTimeout(() => {
      // Try to access Lenis instance from window or trigger resize
      const lenisInstance = (window as any).lenis;
      if (lenisInstance && typeof lenisInstance.resize === 'function') {
        lenisInstance.resize();
      }
      
      // Also trigger a scroll event to help Lenis recalculate
      window.dispatchEvent(new Event('resize'));
    }, 300);

    return () => clearTimeout(timer);
  }, [project]);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-y-auto">
      {/* Fixed Header Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20"
      >
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <h1 className="text-xs lg:text-sm font-semibold uppercase tracking-[0.2em]">
              {project.title}
            </h1>
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Close project"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20 relative z-10">
        {/* Project Details Component */}
        <ProjectDetails project={project} />

        {/* Project Card Section - Astron Legal Card */}
        <section className="w-full bg-white py-16 lg:py-24 px-4 md:px-8 border-t-2 border-gray-200">
          <div className="max-w-[1800px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center"
            >
              <h2 className="text-sm lg:text-base uppercase tracking-[0.2em] text-gray-600 font-semibold mb-2">
                Project Summary Card
              </h2>
              <p className="text-xs text-gray-400">
                Complete project overview with gallery preview
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AstronLegalCard project={project} />
            </motion.div>
          </div>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="w-full bg-black px-6 lg:px-12 xl:px-16 py-16 lg:py-20 xl:py-24 border-t border-white/10">
            <div className="max-w-[1800px] mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10 lg:mb-12"
              >
                <h2 className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
                  Related Projects
                </h2>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 lg:gap-1.5">
                {relatedProjects.map((relatedProject, index) => (
                  <Link
                    key={relatedProject.id}
                    href={`/projects/${relatedProject.slug}`}
                    className="group relative aspect-square overflow-hidden bg-zinc-900"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={relatedProject.coverImage}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                      
                      {/* Project Title Overlay on Hover */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-full">
                          <h3 className="text-xs font-medium text-white uppercase tracking-wide">
                            {relatedProject.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <footer className="w-full bg-black border-t border-white/10 px-6 lg:px-12 py-10 lg:py-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              <button
                onClick={() => router.back()}
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Back
              </button>
              <Link
                href="/"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 font-medium"
              >
                Back to Top
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}