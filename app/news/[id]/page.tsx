"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import AnimatedText from "@/components/AnimatedText";
import { newsArticles } from "@/utils/data";
import { use } from "react";

interface NewsArticlePageProps {
  params: Promise<{ id: string }>;
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { id } = use(params);
  const article = newsArticles.find((a) => a.slug === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <AnimatedText>
            <div className="text-sm text-white/80 mb-2">{article.date}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {article.title}
            </h1>
          </AnimatedText>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedText>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">{article.excerpt}</p>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content}
              </p>
            </div>
          </AnimatedText>
        </div>
      </section>
    </div>
  );
}

