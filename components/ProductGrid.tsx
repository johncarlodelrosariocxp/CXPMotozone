// components/ProductGrid.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { productType } from "@/constants/data";
import { urlFor } from "@/sanity/lib/image";
import { Brand } from "@/sanity.types";
import { useRouter } from "next/navigation";

type ProductType = (typeof productType)[number];

interface ProductGridProps {
  brands: Brand[];
  currentBrand?: Brand;
}

const ProductGrid: React.FC<ProductGridProps> = ({ brands, currentBrand }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    productType[0]?.title || "",
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getBrandForProduct = (productTitle: string): Brand | null => {
    if (currentBrand) return currentBrand;
    const productToBrandMap: { [key: string]: string } = {
      KOBY: "koby",
      "KOBY OIL": "koby-oil",
      PRIMAAX: "primaax",
      MOTOCENTRIC: "motocentric",
      COOCASE: "coocase",
      MOKOTO: "mokoto",
      "LEGIT MOTO": "legitmoto",
      PHILED: "philed",
      ZEUS: "zeus",
    };
    const targetSlug = productToBrandMap[productTitle];
    if (targetSlug && brands) {
      const foundBySlug = brands.find(
        (brand) =>
          brand.slug?.current?.toLowerCase() === targetSlug.toLowerCase(),
      );
      if (foundBySlug) return foundBySlug;
      const foundByName = brands.find((brand) =>
        brand.title?.toLowerCase().includes(targetSlug.toLowerCase()),
      );
      if (foundByName) return foundByName;
    }
    return brands?.[0] || null;
  };

  const getDisplayBrandName = (productTitle: string): string => {
    const brand = getBrandForProduct(productTitle);
    if (brand?.title) return brand.title.toUpperCase();
    return productTitle.split(" ")[0] || "SHOP NOW";
  };

  const generateBrandUrl = (productTitle: string): string => {
    const brand = getBrandForProduct(productTitle);
    if (brand?.slug?.current) return `/brand/${brand.slug.current}`;
    const productToSlugMap: { [key: string]: string } = {
      KOBY: "koby",
      "KOBY OIL": "koby-oil",
      PRIMAAX: "primaax",
      MOTOCENTRIC: "motocentric",
      COOCASE: "coocase",
      MOKOTO: "mokoto",
      "LEGIT MOTO": "legitmoto",
      PHILED: "philed",
      ZEUS: "zeus",
    };
    const fallbackSlug = productToSlugMap[productTitle];
    return fallbackSlug ? `/brand/${fallbackSlug}` : "/products";
  };

  const handleImageError = (imageKey: string) => {
    setImageErrors((prev) => new Set(prev).add(imageKey));
  };

  useEffect(() => {
    if (!isMounted || !productType.length) return;
    const interval = setInterval(() => {
      setSelectedTab((prev) => {
        const currentIndex = productType.findIndex(
          (item) => item.title === prev,
        );
        const nextIndex = (currentIndex + 1) % productType.length;
        return productType[nextIndex]?.title || productType[0]?.title || "";
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  const getGridLayout = () => {
    if (isMobile) return "grid-cols-1 gap-6";
    if (isTablet) return "grid-cols-2 gap-6";
    return "grid-cols-3 gap-8";
  };

  const ProductCard = ({
    product,
    index,
  }: {
    product: ProductType;
    index: number;
  }) => {
    const brand = getBrandForProduct(product.title);
    const isActive = selectedTab === product.title;
    const isHovered = hoveredCard === product.title;

    const getImageSource = () => {
      if (brand?.image && !imageErrors.has(`brand-${brand._id}`)) {
        try {
          return {
            src: urlFor(brand.image).url(),
            alt: brand.title || "Brand Image",
          };
        } catch (error) {
          console.error("Error generating image URL:", error);
        }
      }
      return {
        src: product.bgImage || "/images/placeholder.jpg",
        alt: product.title,
      };
    };

    const imageSource = getImageSource();

    return (
      <div
        className={`group relative transform transition-all duration-700 ease-out
          ${hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredCard(product.title)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div
          className="relative cursor-pointer overflow-hidden rounded-2xl bg-white"
          onClick={() => router.push(generateBrandUrl(product.title))}
        >
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={imageSource.src}
              alt={imageSource.alt}
              fill
              className={`object-cover transition-all duration-700 ease-out
                ${isHovered ? "scale-110 rotate-1" : "scale-100"}
              `}
              onError={() => handleImageError(`product-${product.title}`)}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
            />

            {/* Brand Label */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500
              ${isHovered ? "translate-y-0" : "translate-y-full"}
            `}
            >
              <div className="text-white text-center">
                <p className="text-xs uppercase tracking-[0.2em] mb-2 opacity-80">
                  Explore Collection
                </p>
                <p className="text-lg font-bold">
                  {getDisplayBrandName(product.title)}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500">Premium Quality</p>

            {/* Selection Indicator */}
            <div
              className={`mt-4 h-0.5 
              ${isActive ? "w-full" : "w-0 mx-auto"}
            `}
            />
          </div>

          {/* Click Ripple Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-100" />
          </div>
        </div>
      </div>
    );
  }; // <-- IMPORTANT: This closing brace was missing

  if (!productType || productType.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🛵</div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">
            No Products Available
          </h2>
          <p className="text-gray-500">Please check your configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative w-full py-24 md:py-32 bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#DC0C0C] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#DC0C0C] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section with Consistent Design */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
              <span className="w-8 h-px bg-[#DC0C0C]" />
              <span>Premium Selection</span>
              <span className="w-8 h-px bg-[#DC0C0C]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
            Choose Your
            <span className="text-[#DC0C0C] block mt-2">Ride Style</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg font-light">
            Discover our curated collection of premium motorcycle parts and
            accessories
          </p>
        </div>

        {/* Product Grid */}
        <div className={`grid ${getGridLayout()} mb-12`}>
          {productType.map((product, idx) => (
            <ProductCard key={product.title} product={product} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
