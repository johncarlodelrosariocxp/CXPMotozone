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
    productType[0]?.title || ""
  );
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted/hydrated
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const selectedIndex = productType.findIndex(
    (item) => item.title === selectedTab
  );

  // FIXED: Handle client-side only code properly
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

  // FIXED: Improved brand mapping with proper TypeScript typing
  const getBrandForProduct = (productTitle: string): Brand | null => {
    if (currentBrand) {
      return currentBrand;
    }

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
          brand.slug?.current?.toLowerCase() === targetSlug.toLowerCase()
      );

      if (foundBySlug) return foundBySlug;

      const foundByName = brands.find((brand) =>
        brand.title?.toLowerCase().includes(targetSlug.toLowerCase())
      );

      if (foundByName) return foundByName;

      const foundByPartial = brands.find((brand) => {
        const brandName = brand.title?.toLowerCase() || "";
        return brandName.includes(productTitle.toLowerCase().split(" ")[0]);
      });

      if (foundByPartial) return foundByPartial;
    }

    return brands?.[0] || null;
  };

  // FIXED: Improved brand name display function
  const getDisplayBrandName = (productTitle: string): string => {
    const brand = getBrandForProduct(productTitle);

    if (brand?.title) {
      return brand.title.toUpperCase();
    }

    if (productTitle === "KOBY OIL") return "KOBY";
    if (productTitle === "LEGIT MOTO") return "LEGITMOTO";

    return productTitle.split(" ")[0] || "SHOP NOW";
  };

  // FIXED: Improved URL generation with proper fallbacks
  const generateBrandUrl = (productTitle: string): string => {
    const brand = getBrandForProduct(productTitle);

    if (brand?.slug?.current) {
      return `/brand/${brand.slug.current}`;
    }

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

  // Handle image errors
  const handleImageError = (imageKey: string) => {
    setImageErrors((prev) => new Set(prev).add(imageKey));
  };

  // Responsive auto-rotate timing - FIXED: Only runs on client side
  useEffect(() => {
    if (!isMounted || selectedIndex === -1 || productType.length === 0) return;

    const intervalTime = isMobile ? 6000 : isTablet ? 5500 : 5000;

    const interval = setInterval(() => {
      setSelectedTab((prev) => {
        const currentIndex = productType.findIndex(
          (item) => item.title === prev
        );
        const nextIndex = (currentIndex + 1) % productType.length;
        return productType[nextIndex]?.title || productType[0]?.title || "";
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [selectedIndex, isMounted, isMobile, isTablet]); // Added isMounted dependency

  // Intersection Observer for animation - FIXED: Only runs on client side
  useEffect(() => {
    if (!isMounted || !sectionRef.current) return;

    const threshold = isMobile ? 0.05 : 0.1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile, isMounted]); // Added isMounted dependency

  // Responsive card sizes - FIXED: Use consistent values that match server rendering
  const getCardSizes = () => {
    // On server render, use default values (desktop)
    if (!isMounted) {
      return {
        active: "w-full max-w-[400px] mx-3",
        inactive: "w-full max-w-[280px] scale-95 opacity-90",
        gap: "gap-6",
      };
    }

    if (isMobile) {
      return {
        active: "w-full max-w-[280px] mx-1",
        inactive: "w-full max-w-[200px] scale-90 opacity-80",
        gap: "gap-3",
      };
    }
    if (isTablet) {
      return {
        active: "w-full max-w-[320px] mx-2",
        inactive: "w-full max-w-[240px] scale-95 opacity-85",
        gap: "gap-4",
      };
    }
    return {
      active: "w-full max-w-[400px] mx-3",
      inactive: "w-full max-w-[280px] scale-95 opacity-90",
      gap: "gap-6",
    };
  };

  const cardSizes = getCardSizes();

  // Get products for display - FIXED: Handle server vs client rendering
  const getDisplayProducts = () => {
    const currentIndex = productType.findIndex(
      (item) => item.title === selectedTab
    );

    // On server, show all products in default state
    if (!isMounted) {
      const defaultIndex = 0;
      return [
        {
          product: productType[defaultIndex],
          isActive: true,
        },
      ];
    }

    if (isMobile) {
      return [{ product: productType[currentIndex], isActive: true }];
    }

    if (isTablet) {
      const nextIndex = (currentIndex + 1) % productType.length;
      return [
        { product: productType[currentIndex], isActive: true },
        { product: productType[nextIndex], isActive: false },
      ];
    }

    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : productType.length - 1;
    const nextIndex = (currentIndex + 1) % productType.length;

    return [
      { product: productType[prevIndex], isActive: false },
      { product: productType[currentIndex], isActive: true },
      { product: productType[nextIndex], isActive: false },
    ];
  };

  const displayProducts = getDisplayProducts();

  // Product Card Component
  const ProductCard = ({
    product,
    isActive,
  }: {
    product: ProductType;
    isActive: boolean;
  }) => {
    const brandUrl = generateBrandUrl(product.title);
    const brand = getBrandForProduct(product.title);
    const imageKey = `${product.title}-${isActive}`;

    const handleCardClick = () => {
      if (!isMounted) return;

      if (!isActive) {
        setSelectedTab(product.title);
      } else {
        router.push(brandUrl);
      }
    };

    // Determine which image to use
    const getImageSource = () => {
      if (brand?.image && !imageErrors.has(`brand-${brand._id}`)) {
        try {
          return {
            src: urlFor(brand.image).url(),
            alt: brand.title || "Brand Image",
            isBrandImage: true,
          };
        } catch (error) {
          console.error("Error generating image URL:", error);
        }
      }

      return {
        src: product.bgImage || "/images/placeholder.jpg",
        alt: product.title,
        isBrandImage: false,
      };
    };

    const imageSource = getImageSource();

    return (
      <div
        className={`relative overflow-hidden cursor-pointer flex-none flex flex-col items-center rounded-2xl
          transition-all duration-500 ease-out transform group
          ${hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          ${
            isActive
              ? `${cardSizes.active} z-10 scale-105`
              : `${cardSizes.inactive}`
          }
          border-2 border-[#DC0C0C] shadow-[0_0_20px_rgba(220,12,12,0.3)]
          hover:shadow-[0_0_30px_rgba(220,12,12,0.5)]
          hover:scale-105 backdrop-blur-sm bg-black/80`}
        onClick={handleCardClick}
      >
        {/* Image Area */}
        <div className="relative w-full h-full aspect-[4/5]">
          <Image
            src={imageSource?.src || "/images/placeholder.jpg"}
            alt={imageSource?.alt || product.title}
            fill
            priority={isActive}
            className="w-full h-full rounded-2xl object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            onError={() =>
              handleImageError(
                imageSource?.isBrandImage ? `brand-${brand?._id}` : imageKey
              )
            }
            sizes={`
              (max-width: 768px) ${isActive ? "280px" : "200px"},
              (max-width: 1024px) ${isActive ? "320px" : "240px"},
              ${isActive ? "400px" : "280px"}
            `}
          />
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DC0C0C]/10 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />

        {/* Active Indicator */}
        {isActive && isMounted && (
          <div className="absolute top-3 right-3 w-3 h-3 bg-[#DC0C0C] rounded-full animate-pulse shadow-[0_0_10px_rgba(220,12,12,0.8)] z-30" />
        )}
      </div>
    );
  };

  // FIXED: Added proper null checks for productType
  if (!productType || productType.length === 0) {
    return (
      <div
        className="relative w-full min-h-screen flex items-center justify-center text-[#DC0C0C] bg-black bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: "url('/images/cxp.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl mb-4 text-[#DC0C0C] font-rajdhani tracking-wide">
            No Products Available
          </h1>
          <p className="text-gray-300 font-rajdhani tracking-wide">
            Please check your product configuration.
          </p>
        </div>
      </div>
    );
  }

  const mainButtonHref = selectedTab
    ? generateBrandUrl(selectedTab)
    : "/products";

  // FIXED: Get proper brand name for main button
  const getMainButtonText = (): string => {
    if (currentBrand) {
      return ` ${currentBrand.title?.toUpperCase() || "BRAND"}`;
    }

    if (selectedTab) {
      const brandName = getDisplayBrandName(selectedTab);
      return ` ${brandName}`;
    }

    return "SHOP OUR PRODUCTS";
  };

  const mainButtonText = getMainButtonText();

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center text-[#DC0C0C] overflow-hidden py-8 md:py-16 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/images/cxp.jpg')" }}
    >
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Background Effects - UPDATED with DC0C0C color */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#DC0C0C]/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent opacity-70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full">
          {/* Title Section */}
          <div className="w-full flex flex-col items-center mb-8 md:mb-16">
            <div className="flex items-center justify-center w-full gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
              <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent to-[#DC0C0C]" />
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-center text-[#DC0C0C] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-[#DC0C0C] sm:border-2 shadow-lg sm:shadow-xl md:shadow-2xl shadow-[#DC0C0C]/20 uppercase font-rajdhani tracking-widest whitespace-nowrap bg-black/40 backdrop-blur-sm">
                EXPLORE OUR COLLECTION
              </div>
              <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent to-[#DC0C0C]" />
            </div>
          </div>

          {/* Product Cards */}
          <div
            className={`w-full flex flex-row items-center justify-center ${cardSizes.gap} transition-all duration-500 ease-out ${
              hasAnimated
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {displayProducts.map(({ product, isActive }) => (
              <ProductCard
                key={`${product.title}-${isActive}`}
                product={product}
                isActive={isActive}
              />
            ))}
          </div>

          {/* Navigation Dots - Only show after hydration to prevent mismatch */}
          <div className="flex justify-center mt-8 gap-3">
            {productType.map((product) => (
              <button
                key={product.title}
                onClick={() => isMounted && setSelectedTab(product.title)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedTab === product.title
                    ? "bg-[#DC0C0C] scale-125 shadow-[0_0_10px_rgba(220,12,12,0.8)]"
                    : "bg-gray-500 hover:bg-[#DC0C0C]/70"
                }`}
                aria-label={`Show ${product.title}`}
                suppressHydrationWarning // Prevent hydration warning for dynamic classes
              />
            ))}
          </div>

          {/* Main CTA Button */}
          {selectedTab && (
            <div
              className={`flex justify-center mt-8 transition-all duration-500 ease-out ${
                hasAnimated
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Link
                href={mainButtonHref}
                className="group relative inline-flex items-center justify-center gap-4 bg-transparent hover:bg-transparent text-[#DC0C0C] font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#DC0C0C] hover:border-[#DC0C0C] hover:shadow-[0_0_40px_rgba(220,12,12,0.6)] backdrop-blur-sm text-lg tracking-widest overflow-hidden font-rajdhani"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DC0C0C]/20 to-transparent transform -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                <span className="relative z-10 tracking-widest text-[#DC0C0C]">
                  {mainButtonText}
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
