"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import styles from "./ProjectDetails.module.scss";
import type { Project } from "@/utils/data";

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={styles.projectDetails}>
      <div className={styles.container}>
        {/* Left Sidebar - Project Information */}
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.sidebar}
        >
          <div className={styles.sidebarContent}>
            {/* Project Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={styles.projectTitle}
            >
              {project.title}
            </motion.h1>

            {/* Project Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={styles.projectDescription}
            >
              {project.description}
            </motion.p>

            {/* Project Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={styles.metaContent}
            >
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
            </motion.div>
          </div>
        </motion.aside>

        {/* Right Column - Image Gallery */}
        <div className={styles.imageGallery}>
          {/* Main Image */}
          {project.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={styles.mainImageWrapper}
            >
              <div className={styles.mainImageContainer}>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className={styles.mainImage}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          )}

          {/* All Project Images */}
          {project.images && project.images.length > 0 && (
            <div className={styles.imagesList}>
              {project.images.map((imageSrc, index) => {
                // Skip the cover image if it's already shown as the main image
                if (imageSrc === project.coverImage) return null;

                return (
                  <motion.div
                    key={`${imageSrc}-${index}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: prefersReducedMotion ? 0 : index * 0.1,
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
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
