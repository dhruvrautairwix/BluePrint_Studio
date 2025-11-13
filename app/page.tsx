"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import AnimatedText from "@/components/AnimatedText";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/utils/data";
import Link from "next/link";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const featuredProjects = projects.slice(0, 3);

  const featuredContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="STUDIO"
        subtitle="Making the improbable possible"
        backgroundImage="https://images.unsplash.com/photo-1487958449943-2429e4be02d3?auto=format&fit=crop&w=1920&h=1080&q=80&ixlib=rb-4.0.3"
      />

      {/* About Studio Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About the Studio</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are a creative architecture and design studio dedicated to pushing the
                boundaries of what's possible. Through innovative thinking and meticulous
                attention to detail, we transform visions into reality, creating spaces that
                inspire and endure.
              </p>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Parallax Section */}
      <motion.section
        style={{ y }}
        className="relative h-[600px] overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&h=1080&q=80&ixlib=rb-4.0.3"
          alt="Architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.section>

      {/* Featured Projects */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
          </AnimatedText>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={featuredContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                activeSlug={null}
                onSelect={() => undefined}
              />
            ))}
          </motion.div>
          <AnimatedText delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-block px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </AnimatedText>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&h=1080&q=80&ixlib=rb-4.0.3"
            alt="Pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedText>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-center">
              We make the improbable possible.
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-xl text-gray-300 text-center leading-relaxed">
              Through bold vision, innovative thinking, and unwavering commitment to excellence,
              we transform challenges into opportunities and dreams into reality.
            </p>
          </AnimatedText>
        </div>
      </section>
    </>
  );
}

