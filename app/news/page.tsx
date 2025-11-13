"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { newsArticles } from "@/utils/data";
import { motion } from "framer-motion";

export default function NewsPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedText>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">News & Journal</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Stay updated with our latest projects, awards, and insights.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/news/${article.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 rounded-lg mb-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{article.date}</div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:opacity-70 transition-opacity">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <span className="text-black font-medium hover:underline">Read more →</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

