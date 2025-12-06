"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { projects } from "@/utils/data";
import { use } from "react";
import { useRouter } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.9, 0.2, 1] },
  },
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 5);

  if (!project) {
    notFound();
  }

  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const cardLayoutId = prefersReducedMotion ? undefined : `project-card-${project.slug}`;
  const mediaLayoutId = prefersReducedMotion ? undefined : `project-media-${project.slug}`;
  const overlayLayoutId = prefersReducedMotion ? undefined : `project-overlay-${project.slug}`;
  const titleLayoutId = prefersReducedMotion ? undefined : `project-title-${project.slug}`;
  const categoryLayoutId = prefersReducedMotion ? undefined : `project-category-${project.slug}`;

  return (
    <div className="pt-20 min-h-screen w-full overflow-y-auto bg-black text-white">
      {/* Header Section - Two Column Layout */}
      <section className="px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Title and Description */}
            <div className="space-y-6">
              <motion.h1
                layoutId={titleLayoutId}
                className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-white/80 text-base md:text-lg leading-relaxed"
              >
                <p>{project.description}</p>
              </motion.div>

              {/* Project Details Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Client</div>
                    <div className="text-white">{project.collaborators || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Date</div>
                    <div className="text-white">{project.year}</div>
                  </div>
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Location</div>
                    <div className="text-white">{project.location}</div>
                  </div>
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Status</div>
                    <div className="text-white">Completed</div>
                  </div>
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Consultants</div>
                    <div className="text-white">3rd Party Independent Consultants</div>
                  </div>
                  <div>
                    <div className="text-white/60 uppercase tracking-wider text-xs mb-1">Key Staff</div>
                    <div className="text-white">Mehul Bhai</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Hero Image */}
            <motion.div
              layoutId={mediaLayoutId}
              className="relative w-full aspect-[4/3] lg:aspect-square"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Images Gallery */}
      {project.images.length > 1 && (
        <section className="w-full">
          {project.images.slice(1).map((image, index) => (
            <motion.div
              key={image}
              className="relative w-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index < 2}
                />
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-16 py-16 lg:py-24 bg-black">
          <div className="max-w-[1800px] mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Related Projects
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-square overflow-hidden border border-white/20"
                  >
                    <Image
                      src={relatedProject.coverImage}
                      alt={relatedProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Top / Navigation Footer */}
      <footer className="px-4 sm:px-6 lg:px-16 py-8 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-center gap-6 text-sm uppercase tracking-wider">
          <button
            onClick={() => router.back()}
            className="hover:text-white/60 transition-colors"
          >
            Back
          </button>
          <Link href="/" className="hover:text-white/60 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-white/60 transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-white/60 transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-white/60 transition-colors">
            Contact
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white/60 transition-colors"
          >
            Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
}
