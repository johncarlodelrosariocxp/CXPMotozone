"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Title from "./Title";
import { Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

interface HomeCategoriesProps {
  categories: Category[];
}

const HomeCategories = ({ categories }: HomeCategoriesProps) => {
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle scroll for mobile indicator
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth =
        container.querySelector(".category-card")?.clientWidth || 180;
      const gap = 16; // gap-4 = 16px
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentScrollIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const currentRefs = categoryRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? "0px 0px -30px 0px" : "0px 0px -50px 0px",
      }
    );

    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile]);

  const setCategoryRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      categoryRefs.current[index] = el;
    },
    []
  );

  const getImageSource = useCallback((category: Category) => {
    if (!category?.image) return "/images/placeholder.jpg";
    try {
      return urlFor(category.image).url();
    } catch (error) {
      console.warn("urlFor failed:", error);
      return "/images/placeholder.jpg";
    }
  }, []);

  const getCategoryUrl = useCallback((category: Category) => {
    if (!category?.slug?.current) return "/categories";
    return `/category/${category.slug.current}`;
  }, []);

  // Responsive grid configuration with bigger pictures
  const getGridConfig = () => {
    if (isMobile) {
      return {
        grid: "flex overflow-x-auto gap-4 pb-4",
        maxWidth: "w-[300px] flex-none", // Increased from 280px to 300px
        imageSize: "w-36 h-36", // Increased from w-32 h-32 to w-36 h-36
        contentPadding: "p-3 pt-10", // Increased pt-8 to pt-10
        titleSize: "text-sm",
        buttonSize: "py-1.5 px-3 text-xs",
        iconSize: "w-2.5 h-2.5",
      };
    }
    if (isTablet) {
      return {
        grid: "grid-cols-3 gap-4",
        maxWidth: "max-w-[240px]", // Increased from 220px to 240px
        imageSize: "w-44 h-44", // Increased from w-36 h-36 to w-44 h-44
        contentPadding: "p-4 pt-12", // Increased pt-10 to pt-12
        titleSize: "text-base",
        buttonSize: "py-2 px-4 text-sm",
        iconSize: "w-4 h-4",
      };
    }
    return {
      grid: "grid-cols-3 gap-6",
      maxWidth: "max-w-[320px]", // Increased from 280px to 320px
      imageSize: "w-52 h-52", // Increased from w-42 h-42 to w-52 h-52
      contentPadding: "p-4 pt-12", // Increased pt-10 to pt-12
      titleSize: "text-base",
      buttonSize: "py-2 px-4 text-sm",
      iconSize: "w-4 h-4",
    };
  };

  const gridConfig = getGridConfig();

  return (
    <div
      className="relative w-full min-h-[80vh] sm:min-h-screen bg-black text-white flex items-center"
      style={{
        backgroundImage:
          "url('/images/news&eventpics/482135724_662567279674499_8061972321946893179_n.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="w-full flex flex-col items-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center w-full gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent to-[#DC0C0C]" />
            <Title className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-center text-white bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] bg-clip-text text-transparent px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border border-[#DC0C0C] sm:border-2 shadow-lg sm:shadow-xl md:shadow-2xl shadow-red-500/20 uppercase font-rajdhani tracking-widest whitespace-nowrap">
              EXCLUSIVE SELECTION
            </Title>
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent to-[#DC0C0C]" />
          </div>
        </div>

        {/* Categories Container */}
        <div className="w-full">
          {/* Mobile Horizontal Scroll */}
          {isMobile && (
            <>
              <div
                ref={scrollContainerRef}
                className={`${gridConfig.grid} scrollbar-hide px-4 snap-x snap-mandatory scroll-smooth`}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {categories?.map((category, index) => (
                  <div
                    key={category?._id}
                    ref={setCategoryRef(index)}
                    className={`category-card group relative ${gridConfig.maxWidth} snap-center flex flex-col items-center opacity-0 translate-y-6 scale-95 transition-all duration-700 ease-out [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0 [.animate-in_&]:scale-100`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Category Card */}
                    <div className="relative w-full transform transition-all duration-500 group-hover:translate-y-[-4px]">
                      {/* Image */}
                      <div
                        className={`relative z-20 ${gridConfig.imageSize} -mb-6 mx-auto`} // Increased from -mb-4 to -mb-6
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden bg-transparent shadow-md">
                          <Image
                            src={getImageSource(category)}
                            alt={category?.title || "Category"}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 scale-105"
                            sizes="300px" // Updated from 280px to 300px
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder.jpg";
                            }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`relative z-10 w-full bg-black backdrop-blur-xl rounded-lg border border-[#dc0c0c]/50 ${gridConfig.contentPadding} flex flex-col gap-1 shadow-lg`}
                      >
                        <h3
                          className={`font-bold ${gridConfig.titleSize} text-center text-white line-clamp-2 min-h-[2.5rem] flex items-center justify-center font-rajdhani tracking-wide`}
                        >
                          {category?.title || "Category"}
                        </h3>

                        <Link
                          href={getCategoryUrl(category)}
                          className={`group/btn mt-1 inline-flex items-center justify-center gap-1 bg-gradient-to-r from-[#dc0c0c] to-[#ff4444] text-white font-bold ${gridConfig.buttonSize} rounded-md transition-all duration-300 transform hover:scale-105 active:scale-105 border border-[#dc0c0c]/60 font-rajdhani touch-manipulation`}
                        >
                          <span>EXPLORE</span>
                          <svg
                            className={`${gridConfig.iconSize} transform transition-transform duration-300 group-hover/btn:translate-x-1`}
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
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator for Mobile */}
              {categories && categories.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {categories.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentScrollIndex
                          ? "bg-[#DC0C0C] scale-125"
                          : "bg-gray-600 opacity-50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Tablet & Desktop Grid */}
          {!isMobile && (
            <div className={`grid ${gridConfig.grid} justify-items-center`}>
              {categories?.map((category, index) => (
                <div
                  key={category?._id}
                  ref={setCategoryRef(index)}
                  className={`group relative w-full ${gridConfig.maxWidth} flex flex-col items-center opacity-0 translate-y-6 sm:translate-y-8 scale-95 transition-all duration-700 ease-out [.animate-in_&]:opacity-100 [.animate-in_&]:translate-y-0 [.animate-in_&]:scale-100`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Category Card */}
                  <div className="relative w-full transform transition-all duration-500 group-hover:translate-y-[-4px] sm:group-hover:translate-y-[-8px]">
                    {/* Image */}
                    <div
                      className={`relative z-20 ${gridConfig.imageSize} -mb-6 sm:-mb-8 md:-mb-10 mx-auto`} // Increased from -mb-4/-mb-6/-mb-8 to -mb-6/-mb-8/-mb-10
                    >
                      <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-transparent shadow-md sm:shadow-lg">
                        <Image
                          src={getImageSource(category)}
                          alt={category?.title || "Category"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110 scale-105"
                          sizes={`
                            (max-width: 768px) 144px,
                            (max-width: 1024px) 176px,
                            208px
                          `} // Updated from 144px/168px/200px to match new sizes
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/placeholder.jpg";
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`relative z-10 w-full bg-black backdrop-blur-xl rounded-lg sm:rounded-xl border border-[#dc0c0c]/50 sm:border-2 ${gridConfig.contentPadding} flex flex-col gap-1 sm:gap-2 shadow-lg`}
                    >
                      <h3
                        className={`font-bold ${gridConfig.titleSize} text-center text-white line-clamp-2 min-h-[2.5rem] flex items-center justify-center font-rajdhani tracking-wide`}
                      >
                        {category?.title || "Category"}
                      </h3>

                      <Link
                        href={getCategoryUrl(category)}
                        className={`group/btn mt-1 sm:mt-2 inline-flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-[#dc0c0c] to-[#ff4444] text-white font-bold ${gridConfig.buttonSize} rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-105 border border-[#dc0c0c]/60 sm:border-2 font-rajdhani touch-manipulation`}
                      >
                        <span>EXPLORE</span>
                        <svg
                          className={`${gridConfig.iconSize} transform transition-transform duration-300 group-hover/btn:translate-x-1`}
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
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All Categories Button - Updated to match ProductGrid button style */}
        <div className="pt-10 flex justify-center mt-8 transition-all duration-500 ease-out">
          <Link
            href="/categories"
            className="group relative inline-flex items-center justify-center gap-4 bg-transparent hover:bg-transparent text-[#DC0C0C] font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#DC0C0C] hover:border-[#DC0C0C] hover:shadow-[0_0_40px_rgba(220,12,12,0.6)] backdrop-blur-sm text-lg tracking-widest overflow-hidden font-rajdhani"
          >
            <div className=" absolute inset-0 bg-gradient-to-r from-transparent via-[#DC0C0C]/20 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
            <span className="relative z-10 tracking-widest text-[#DC0C0C]">
              VIEW ALL CATEGORIES
            </span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-in {
          animation: fadeInUp 0.7s ease-out forwards;
        }

        /* Hide scrollbar for mobile */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Improve touch experience on mobile */
        @media (max-width: 768px) {
          .group:active .group-hover\\:translate-y-\\[-4px\\] {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

export default React.memo(HomeCategories);
