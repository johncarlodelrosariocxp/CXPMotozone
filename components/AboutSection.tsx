// components/AboutSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-b from-black to-zinc-950"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20"
          >
            <div className="aspect-video relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/about-poster.jpg"
              >
                <source
                  src="/images/AQMmOjRreJhvOs5WcqjBrKS044MeyCaeyW7i4HbXjicpOjQbuYMgEwpuGN3AAhSpsM-4odiFN7GTMfvS10lgDIhEjg0UTd4T26llmya9cYGByQ.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>

            {/* Play/Pause button */}
            <button
              onClick={(e) => {
                const video =
                  e.currentTarget.previousElementSibling?.querySelector(
                    "video",
                  );
                if (video) {
                  if (video.paused) {
                    video.play();
                    e.currentTarget.innerHTML = "⏸";
                  } else {
                    video.pause();
                    e.currentTarget.innerHTML = "▶";
                  }
                }
              }}
              className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 z-20"
            >
              ⏸
            </button>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : {}}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                About{" "}
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  CXP Moto Zone
                </span>
              </h2>
              <div className="w-20 h-1 bg-red-600 rounded-full" />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-lg leading-relaxed"
            >
              CXP Moto Zone is a trusted motorcycle parts, accessories, and
              motorcare provider located in Balagtas. We are proud to be one of
              the leading suppliers of high-quality motorcycle products and
              services in the Philippines, serving riders with reliability,
              excellence, and passion.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 leading-relaxed"
            >
              At CXP Moto Zone, we offer a wide range of motorcycle parts,
              accessories, maintenance products, and motorcare solutions
              designed to enhance the performance, safety, and appearance of
              your motorcycle. We are committed to providing only quality
              products sourced from trusted brands to ensure customer
              satisfaction.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 leading-relaxed"
            >
              Over the years, we have earned the trust of countless riders and
              motorcycle enthusiasts through our dedication to quality,
              competitive pricing, and excellent customer service. Whether
              you&apos;re looking for replacement parts, performance upgrades,
              accessories, or professional motorcare products, CXP Moto Zone is
              your trusted partner on the road.
            </motion.p>

            {/* Mission & Vision Cards */}
            <motion.div
              variants={fadeInUp}
              className="grid sm:grid-cols-2 gap-6 pt-4"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-400 text-sm">
                  To provide high-quality motorcycle parts, accessories, and
                  motorcare products that help riders enjoy a safer, smoother,
                  and more reliable riding experience.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-400 text-sm">
                  To be one of the most trusted and preferred motorcycle parts
                  and accessories providers in the Philippines, recognized for
                  quality, innovation, and customer satisfaction.
                </p>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              variants={fadeInUp}
              className="pt-4 border-t border-white/10"
            >
              <p className="text-red-500 font-semibold text-lg italic">
                CXP Moto Zone — Quality You Can Trust, Performance You Can Rely
                On.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
