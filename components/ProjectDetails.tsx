"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styles from "./ProjectDetails.module.scss";
import type { Project } from "@/utils/data";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for hero image
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -100]
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className={styles.projectDetails}>
      {/* Dark Intro Section - Hero + Sidebar */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroContainer}>
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={styles.heroText}
          >
            <h1 className={styles.heroTitle}>{project.title}</h1>
            <p className={styles.heroDescription}>{project.description}</p>
          </motion.div>

          {/* Project Meta Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={styles.metaSidebar}
          >
            <div className={styles.metaContent}>
              {project.location && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Location</span>
                  <span className={styles.metaValue}>{project.location}</span>
                </div>
              )}
              {project.category && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Category</span>
                  <span className={styles.metaValue}>{project.category}</span>
                </div>
              )}
              {project.year && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Year</span>
                  <span className={styles.metaValue}>{project.year}</span>
                </div>
              )}
              {project.collaborators && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Client</span>
                  <span className={styles.metaValue}>{project.collaborators}</span>
                </div>
              )}
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Status</span>
                <span className={styles.metaValue}>Completed</span>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Hero Image with Parallax */}
        {project.coverImage && (
          <motion.div
            style={{
              y: heroY,
              opacity: heroOpacity,
            }}
            className={styles.heroImage}
          >
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className={styles.heroImageContent}
              priority
              sizes="100vw"
            />
          </motion.div>
        )}
      </section>

      {/* Light Lower Section - Dynamic Images */}
      {project.images && project.images.length > 0 && (
        <section className={styles.imagesSection}>
          {project.images.map((imageSrc, index) => (
            <motion.div
              key={`${imageSrc}-${index}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={styles.imageBlock}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={imageSrc}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className={styles.imageContent}
                  sizes="100vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}
