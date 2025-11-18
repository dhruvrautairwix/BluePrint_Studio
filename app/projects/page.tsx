"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projects, Project } from "@/utils/data";

type Category = "All" | "Architecture" | "Interiors" | "Urban" | "Object";

const containerVariants = {
  hidden: {},
  visible: (prefersReducedMotion: boolean) => ({
    transition: prefersReducedMotion
      ? undefined
      : {
          staggerChildren: 0.14,
          delayChildren: 0.15,
        },
  }),
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!activeSlug) return;
    const timeout = window.setTimeout(() => setActiveSlug(null), 800);
    return () => window.clearTimeout(timeout);
  }, [activeSlug]);

  const categories: Category[] = ["All", "Architecture", "Interiors", "Urban", "Object"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">Projects</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Explore our portfolio of innovative architecture and design projects.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial={prefersReducedMotion ? undefined : "hidden"}
              animate="visible"
              custom={prefersReducedMotion}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  activeSlug={activeSlug}
                  onSelect={setActiveSlug}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

