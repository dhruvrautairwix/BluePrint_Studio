"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
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
    <div className="pt-20">
      <motion.div
        layoutId={cardLayoutId}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div layoutId={mediaLayoutId} className="relative w-full h-full">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          layoutId={overlayLayoutId}
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
          <motion.button
            onClick={() => router.back()}
            className="self-end px-5 py-2 bg-white/90 text-black text-sm font-medium rounded-full hover:bg-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.35, delay: 0.15, ease: [0.2, 0.9, 0.2, 1] }}
          >
            Close
          </motion.button>
          <div>
            <AnimatedText>
              <motion.h1
                layoutId={titleLayoutId}
                className="text-4xl md:text-6xl font-bold text-white mb-3"
              >
                {project.title}
              </motion.h1>
            </AnimatedText>
            <motion.div
              layoutId={categoryLayoutId}
              className="text-white/80 text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
            >
              {project.category}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.35, duration: 0.55, ease: [0.2, 0.9, 0.2, 1] }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <AnimatedText>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Location</h3>
                <p className="text-lg">{project.location}</p>
              </div>
            </AnimatedText>
            <AnimatedText delay={0.1}>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Year</h3>
                <p className="text-lg">{project.year}</p>
              </div>
            </AnimatedText>
            {project.collaborators && (
              <AnimatedText delay={0.2}>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Collaborators</h3>
                  <p className="text-lg">{project.collaborators}</p>
                </div>
              </AnimatedText>
            )}
          </div>

          <AnimatedText delay={0.3}>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
            </div>
          </AnimatedText>
        </div>
      </motion.section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Gallery</h2>
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

