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
      className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden bg-white"
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
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
                  <span className="w-8 h-px bg-[#DC0C0C]" />
                  <span>About Us</span>
                  <span className="w-8 h-px bg-[#DC0C0C]" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                About{" "}
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  CXP Moto Zone
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-700 text-lg leading-relaxed"
            >
              CXP Moto Zone is a trusted motorcycle parts, accessories, and
              motorcare provider located in Balagtas. We are proud to be one of
              the leading suppliers of high-quality motorcycle products and
              services in the Philippines, serving riders with reliability,
              excellence, and passion.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-gray-600 leading-relaxed"
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
              className="text-gray-600 leading-relaxed"
            >
              Over the years, we have earned the trust of countless riders and
              motorcycle enthusiasts through our dedication to quality,
              competitive pricing, and excellent customer service. Whether
              you&apos;re looking for replacement parts, performance upgrades,
              accessories, or professional motorcare products, CXP Moto Zone is
              your trusted partner on the road.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
