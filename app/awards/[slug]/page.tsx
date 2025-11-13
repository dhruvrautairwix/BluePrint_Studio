"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import AnimatedText from "@/components/AnimatedText";
import { awardCases } from "@/utils/data";
import { use } from "react";
import { useRouter } from "next/navigation";

interface AwardPageProps {
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

export default function AwardPage({ params }: AwardPageProps) {
  const { slug } = use(params);
  const award = useMemo(() => awardCases.find((item) => item.slug === slug), [slug]);

  if (!award) {
    notFound();
  }

  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);
  const cardLayoutId = prefersReducedMotion ? undefined : `award-card-${award.slug}`;
  const mediaLayoutId = prefersReducedMotion ? undefined : `award-media-${award.slug}`;
  const overlayLayoutId = prefersReducedMotion ? undefined : `award-overlay-${award.slug}`;
  const titleLayoutId = prefersReducedMotion ? undefined : `award-title-${award.slug}`;
  const categoryLayoutId = prefersReducedMotion ? undefined : `award-category-${award.slug}`;

  return (
    <div className="pt-20">
      <motion.div
        layoutId={cardLayoutId}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
        style={prefersReducedMotion ? undefined : { scale: heroScale, opacity: heroOpacity }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div layoutId={mediaLayoutId} className="relative w-full h-full">
          <Image
            src={award.coverImage}
            alt={award.title}
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
                {award.title}
              </motion.h1>
            </AnimatedText>
            <motion.div
              layoutId={categoryLayoutId}
              className="text-white/80 text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
            >
              {award.category} · {award.year}
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
        <div className="max-w-4xl mx-auto">
          <AnimatedText>
            <p className="text-lg text-gray-700 leading-relaxed mb-10">{award.description}</p>
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {award.images.map((image, index) => (
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
                  alt={`${award.title} image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
