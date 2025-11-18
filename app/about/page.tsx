"use client";

import Image from "next/image";
import { founders, awardLogos } from "@/utils/data";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&h=1080&q=80&ixlib=rb-4.0.3"
          alt="Studio"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            About Us
          </h1>
        </div>
      </section>

      {/* Studio Introduction */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
          <h2 className="text-4xl md:text-5xl font-bold">Our Studio</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">
              Founded with a vision to push the boundaries of architecture and design, our studio
              brings together a team of passionate creatives, architects, and designers. We believe
              that great design is not just about aesthetics—it's about creating spaces that enhance
              lives, inspire communities, and respect the environment.
            </p>
            <p className="text-lg leading-relaxed">
              Our approach is collaborative, innovative, and deeply rooted in understanding the
              unique needs of each project. From residential homes to commercial spaces, urban
              planning to interior design, we bring the same level of dedication and excellence to
              every challenge we undertake.
            </p>
          </div>
        </div>
      </section>

      {/* Video/Image Background Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&h=1080&q=80&ixlib=rb-4.0.3"
          alt="Studio workspace"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Founders Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    sizes="(max-width: 768px) 60vw, 240px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">{founder.name}</h3>
                <p className="text-gray-600 mb-4">{founder.role}</p>
                <p className="text-gray-700 leading-relaxed">{founder.bio}</p>
              </motion.div>
            ))}
          </div>
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
        <div className="max-w-4xl mx-auto relative z-10 space-y-8 text-center">
          <h2 className="text-5xl md:text-7xl font-bold">
            We make the improbable possible.
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            This is not just our tagline—it's our commitment. We approach every project with bold
            vision, innovative thinking, and unwavering dedication to turning ambitious ideas into
            reality.
          </p>
        </div>
      </section>

      {/* Awards & Press */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {awardLogos.map((award, index) => (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-700">{award.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

