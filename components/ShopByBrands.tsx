"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Title from "./Title";
import { Brand } from "@/sanity.types";

interface BrandCarouselProps {
  brands?: Brand[];
}

const BrandCarousel = ({ brands = [] }: BrandCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Enhanced brand name to image mapping
  const getBrandImage = (brandName: string | null | undefined): string => {
    if (!brandName) return "";

    const brandNameLower = brandName.toLowerCase().trim();

    // More flexible mapping to handle different brand name formats
    const imageMappings: Record<string, string> = {
      // Coocase variations
      coocase: "/images/categories/coocase.png",
      "coo case": "/images/categories/coocase.png",

      // CXP variations
      cxpm: "/images/categories/cxpmlogo.png",
      cxp: "/images/categories/cxpmlogo.png",
      "cxp motozone": "/images/categories/cxpmlogo.png",
      "cxp moto zone": "/images/categories/cxpmlogo.png",

      // Koby variations
      koby: "/images/categories/koby.png",
      "koby oil": "/images/categories/kobyoil.png",
      "koby oils": "/images/categories/kobyoil.png",

      // Legit Moto variations
      "legit moto": "/images/categories/legitmoto.png",
      legitmoto: "/images/categories/legitmoto.png",
      legit: "/images/categories/legitmoto.png",

      // Mokoto variations
      mokoto: "/images/categories/mokoto.png",
      "moko to": "/images/categories/mokoto.png",

      // Motocentric variations
      motocentric: "/images/categories/motocentric.png",
      "moto centric": "/images/categories/motocentric.png",

      // Philed variations
      philed: "/images/categories/philed.png",
      "phil ed": "/images/categories/philed.png",

      // Primaax variations
      primaax: "/images/categories/primaax.png",
      primax: "/images/categories/primaax.png",
      "prima ax": "/images/categories/primaax.png",

      // Zeus variations
      zeus: "/images/categories/zeus.png",
    };

    // First try exact match
    if (imageMappings[brandNameLower]) {
      return imageMappings[brandNameLower];
    }

    // Then try partial matching
    for (const [key, imagePath] of Object.entries(imageMappings)) {
      if (
        brandNameLower.includes(key.toLowerCase()) ||
        key.toLowerCase().includes(brandNameLower)
      ) {
        return imagePath;
      }
    }

    // If no match found, return empty string to show fallback
    return "";
  };

  const handleImageError = (brandImage: string, brandName: string) => {
    console.warn(`Failed to load image: ${brandImage} for brand: ${brandName}`);
    setImageErrors((prev) => new Set(prev).add(brandImage));
  };

  // Auto-rotate carousel - FIXED: Proper dependency array
  useEffect(() => {
    if (!brands || brands.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [brands]); // Fixed: Removed brands.length as it's already covered by brands dependency

  const getVisibleBrands = () => {
    if (!brands || brands.length === 0) return [];

    const visibleBrands = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + brands.length) % brands.length;
      visibleBrands.push(brands[index]);
    }
    return visibleBrands;
  };

  const visibleBrands = getVisibleBrands();

  if (!brands || brands.length === 0) {
    return (
      <section className="relative py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="text-center">
          <Title className="text-3xl md:text-4xl font-bold text-white mb-4">
            OUR BRANDS
          </Title>
          <p className="text-gray-400">No brands available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-30" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#DC0C0C]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${10 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[2px] w-20 bg-[#DC0C0C] animate-pulse rounded-full" />
            <Title className="text-3xl md:text-4xl font-bold text-white">
              OUR <span className="text-[#DC0C0C]">BRANDS</span>
            </Title>
            <div className="h-[2px] w-20 bg-[#DC0C0C] animate-pulse rounded-full" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our premium collection of trusted motorcycle brands
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative h-64 md:h-80 flex items-center justify-center">
          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + brands.length) % brands.length
              )
            }
            className="absolute left-4 z-20 bg-black/80 hover:bg-[#DC0C0C] text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 border border-[#DC0C0C] hover:shadow-[0_0_20px_rgba(220,12,12,0.6)]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % brands.length)
            }
            className="absolute right-4 z-20 bg-black/80 hover:bg-[#DC0C0C] text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 border border-[#DC0C0C] hover:shadow-[0_0_20px_rgba(220,12,12,0.6)]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Brand Cards */}
          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            {visibleBrands.map((brand, index) => {
              const position = index - 1; // -1: left, 0: center, 1: right
              const isCenter = position === 0;
              const brandImage = getBrandImage(brand.title || "");
              const hasImageError = imageErrors.has(brandImage);
              const shouldShowImage = brandImage && !hasImageError;

              return (
                <Link
                  key={`${brand._id}-${currentIndex + position}`}
                  href={`/brand/${brand.slug?.current || "#"}`}
                  className={`relative transition-all duration-500 ease-out transform hover:scale-105 group
                    ${
                      isCenter
                        ? "z-10 scale-110 opacity-100"
                        : "z-0 scale-90 opacity-70 blur-sm hover:blur-0"
                    }`}
                >
                  {/* Brand Card */}
                  <div
                    className={`
                    relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border-2 
                    ${
                      isCenter
                        ? "border-[#DC0C0C] shadow-[0_0_30px_rgba(220,12,12,0.4)] w-48 h-48 md:w-64 md:h-64"
                        : "border-[#DC0C0C]/30 shadow-[0_0_15px_rgba(220,12,12,0.2)] w-32 h-32 md:w-40 md:h-40"
                    }
                    overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(220,12,12,0.5)] group-hover:border-[#DC0C0C]
                  `}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DC0C0C]/10 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

                    {/* Brand Image or Fallback */}
                    <div className="relative w-full h-full p-4 flex items-center justify-center">
                      {shouldShowImage ? (
                        <Image
                          src={brandImage}
                          alt={brand.title || "Brand Logo"}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                          onError={() =>
                            handleImageError(
                              brandImage,
                              brand.title || "Unknown"
                            )
                          }
                        />
                      ) : (
                        <div className="text-white text-center p-4 flex flex-col items-center justify-center h-full">
                          <div className="w-16 h-16 bg-[#DC0C0C]/20 rounded-full flex items-center justify-center mb-3">
                            <svg
                              className="w-8 h-8 text-[#DC0C0C]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                          <span className="font-bold text-sm md:text-base">
                            {brand.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Brand Name Overlay */}
                    {isCenter && shouldShowImage && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                        <span className="text-white font-bold text-sm md:text-base">
                          {brand.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Active Indicator */}
                  {isCenter && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#DC0C0C] rounded-full animate-pulse shadow-[0_0_10px_rgba(220,12,12,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {brands.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-[#DC0C0C] scale-125 shadow-[0_0_10px_rgba(220,12,12,0.6)]"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to brand ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/brands"
            className="inline-flex items-center gap-3 bg-black/80 hover:bg-black/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#DC0C0C] hover:shadow-[0_0_30px_rgba(220,12,12,0.4)] backdrop-blur-sm text-lg group"
          >
            <span>VIEW ALL BRANDS</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandCarousel;
