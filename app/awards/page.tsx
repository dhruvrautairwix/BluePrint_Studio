"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import AwardCard from "@/components/AwardCard";
import { awardCases } from "@/utils/data";

const containerVariants = {
  hidden: {},
  visible: (prefersReducedMotion: boolean) => ({
    transition: prefersReducedMotion
      ? undefined
      : {
          staggerChildren: 0.12,
          delayChildren: 0.12,
        },
  }),
};

export default function AwardsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!activeSlug) return;
    const timeout = window.setTimeout(() => setActiveSlug(null), 800);
    return () => window.clearTimeout(timeout);
  }, [activeSlug]);

  return (
    <div className="pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Awards</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Recognitions that celebrate our work and collaborations around the world.
            </p>
          </AnimatedText>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial={prefersReducedMotion ? undefined : "hidden"}
            animate="visible"
            custom={prefersReducedMotion}
          >
            {awardCases.map((award) => (
              <AwardCard
                key={award.id}
                award={award}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
