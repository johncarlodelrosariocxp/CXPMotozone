"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FiMenu,
  FiX,
  FiChevronUp,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { SiShopee } from "react-icons/si";

// Fallback header data in case the import fails
const fallbackHeaderData = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "News & Event", href: "/blog" },
  { title: "Warehouse", href: "/warehouse" },
  { title: "Become a Dealer", href: "/become-a-dealer" },
];

// Custom hook to remove fdprocessedid attributes
function useRemoveFdProcessedIds() {
  useEffect(() => {
    const removeFdProcessedIds = () => {
      if (typeof document !== "undefined") {
        document.querySelectorAll("[fdprocessedid]").forEach((el) => {
          el.removeAttribute("fdprocessedid");
        });
        document.body?.removeAttribute("fdprocessedid");
        document.documentElement?.removeAttribute("fdprocessedid");
      }
    };

    removeFdProcessedIds();

    const observer = new MutationObserver((mutations) => {
      let shouldRemove = false;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as Element;
            if (element.hasAttribute("fdprocessedid")) {
              element.removeAttribute("fdprocessedid");
              shouldRemove = true;
            }
            const children = element.querySelectorAll?.("[fdprocessedid]");
            if (children && children.length > 0) {
              children.forEach((el) => el.removeAttribute("fdprocessedid"));
              shouldRemove = true;
            }
          }
        });
      });
      if (shouldRemove) {
        removeFdProcessedIds();
      }
    });

    if (typeof document !== "undefined") {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    const timer1 = setTimeout(removeFdProcessedIds, 50);
    const timer2 = setTimeout(removeFdProcessedIds, 200);
    const timer3 = setTimeout(removeFdProcessedIds, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, []);
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activePath, setActivePath] = useState(pathname);
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showTimer, setShowTimer] = useState<NodeJS.Timeout | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [headerData, setHeaderData] = useState(fallbackHeaderData);

  // Updated bannerImages array with the new images
  const bannerImages = [
    "/images/CXP WEBSITE/COOCASE.jpg",
    "/images/CXP WEBSITE/CXP.jpg",
    "/images/CXP WEBSITE/KOBY MOTOR OIL.jpg",
    "/images/CXP WEBSITE/Mokoto.jpg",
    "/images/CXP WEBSITE/Motocentric.jpg",
    "/images/CXP WEBSITE/Philed.jpg",
    "/images/CXP WEBSITE/PRIMAAX.jpg",
    "/images/CXP WEBSITE/ZEUS.jpg",
    "/images/CXP WEBSITE/CXP_ Banner Koby x katagumpay.jpg", // Added new image
  ];

  useRemoveFdProcessedIds();

  useEffect(() => {
    setIsClient(true);

    // Dynamically import headerData to avoid build issues
    const loadHeaderData = async () => {
      try {
        const headerModule = await import("@/constants/data");

        // Check if headerData exists and is an array
        if (headerModule.headerData && Array.isArray(headerModule.headerData)) {
          setHeaderData(headerModule.headerData);
        }
        // If headerData doesn't exist, check if the module itself is the array
        else if (Array.isArray(headerModule)) {
          setHeaderData(headerModule);
        }
        // If none of the above, use fallback
        else {
          console.warn(
            "Failed to load header data from constants, using fallback"
          );
          setHeaderData(fallbackHeaderData);
        }
      } catch (error) {
        console.warn(
          "Failed to load header data from constants, using fallback:",
          error
        );
        setHeaderData(fallbackHeaderData);
      }
    };

    loadHeaderData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 0);

      // Show back to top button when scrolled down 300px
      setShowBackToTop(currentScrollY > 300);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (showTimer) clearTimeout(showTimer);
        setHeaderVisible(false);
      } else {
        if (showTimer) clearTimeout(showTimer);
        const timer = setTimeout(() => setHeaderVisible(true), 100);
        setShowTimer(timer);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (showTimer) clearTimeout(showTimer);
    };
  }, [lastScrollY, showTimer]);

  useEffect(() => {
    if (pathname !== activePath) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setActivePath(pathname);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [pathname, activePath]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setMobileMenuOpen(false);
      setSearchValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onHome = pathname === "/";

  // UPDATED: Removed shadow when hovered with white background
  const headerBgClass =
    onHome && !scrolled && !isHovered
      ? "bg-transparent"
      : isHovered
        ? "bg-white" // Removed shadow-lg
        : "bg-[#e2e2e2] shadow-md";

  const textColorClass =
    onHome && !scrolled && !isHovered
      ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
      : "text-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";

  const logoSrc =
    onHome && !scrolled && !isHovered
      ? "/images/LOGO/LOGO_CXP Motozone/LOGO_CXP Motozone-02.png"
      : "/images/LOGO/LOGO_CXP Motozone/LOGO_CXP Motozone-01.png";

  const burgerColor =
    onHome && !scrolled && !isHovered ? "text-black" : "text-black";

  // Safe header data
  const safeHeaderData = Array.isArray(headerData)
    ? headerData
    : fallbackHeaderData;

  // Return simplified version for SSR
  if (!isClient) {
    return (
      <>
        {/* HEADER - SSR Version */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 font-montserrat transition-all duration-[700ms] ease-in-out ${headerBgClass} translate-y-0`}
          style={{
            transform: "translateY(0)",
          }}
        >
          <div className="mt-5 mb-5 max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4 w-full">
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="w-40 h-auto flex items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  <Image
                    src={logoSrc}
                    alt="CXP Motozone Logo"
                    width={160}
                    height={80}
                    priority
                    draggable={false}
                  />
                </div>
              </Link>
            </div>

            <nav
              className={`hidden md:flex items-center gap-5 uppercase font-semibold tracking-tight ${textColorClass}`}
            >
              {safeHeaderData.map((item) => {
                const isCurrent = pathname === item.href;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`transition-all duration-300 ease-in-out ${
                      isCurrent
                        ? "text-white bg-black border-2 border-white px-4 py-1.5 rounded-md font-bold shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                        : "hover:opacity-80 px-3 py-1.5 "
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Desktop Search - SSR Version */}
              <div className="relative">
                <div
                  className={`hidden lg:flex items-center border-2 rounded-full bg-transparent w-[220px] h-[48px] transition-all duration-500 ${
                    onHome && !scrolled && !isHovered
                      ? "border-white/80 bg-white/10 backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
                      : "border-gray-300 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value=""
                    readOnly
                    className={`flex-1 px-5 pr-12 text-sm bg-transparent focus:outline-none placeholder-opacity-80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${
                      onHome && !scrolled && !isHovered
                        ? "text-white placeholder-white"
                        : "text-gray-800 placeholder-gray-500"
                    }`}
                    style={{ fontSize: "0.9rem" }}
                    suppressHydrationWarning
                  />
                  <button
                    type="button"
                    className={`absolute right-3 p-2 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${
                      onHome && !scrolled && !isHovered
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-r from-[#dc0c0c] to-[#ff4444] text-white"
                    }`}
                    style={{ fontSize: "0.9rem" }}
                    suppressHydrationWarning
                  >
                    <FiSearch size={16} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Hamburger with darker shadow */}
              <button
                className={`block md:hidden text-2xl transition-colors p-3 rounded bg-white/30 ${burgerColor} shadow-[0_6px_20px_rgba(0,0,0,0.8)]`}
                aria-label="Open Menu"
                suppressHydrationWarning
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </header>

        {/* HERO BANNER - SSR Version */}
        {onHome && (
          <section className="relative w-full">
            <div className="relative h-[50vh] md:h-screen overflow-hidden">
              {bannerImages.slice(0, 1).map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`CXP Banner ${index + 1}`}
                  fill
                  className="object-cover opacity-100 z-10"
                  priority={index === 0}
                  draggable={false}
                  sizes="100vw"
                />
              ))}
            </div>
          </section>
        )}
      </>
    );
  }

  // Client-side rendering
  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 font-montserrat transition-all duration-[700ms] ease-in-out ${headerBgClass} ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        onMouseEnter={() => {
          setIsHovered(true);
          if (showTimer) {
            clearTimeout(showTimer);
            setShowTimer(null);
          }
          setHeaderVisible(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <div className="mt-5 mb-5 max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4 w-full">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-40 h-auto flex items-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                <Image
                  src={logoSrc}
                  alt="CXP Motozone Logo"
                  width={160}
                  height={80}
                  priority
                  draggable={false}
                />
              </div>
            </Link>
          </div>

          <nav
            className={`hidden md:flex items-center gap-5 uppercase font-semibold tracking-tight ${textColorClass}`}
          >
            {safeHeaderData.map((item) => {
              const isCurrent = pathname === item.href;
              const isNext = activePath === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`transition-all duration-300 ease-in-out ${
                    isCurrent
                      ? "text-white bg-black border-2 border-white px-4 py-1.5 rounded-md font-bold shadow-[0_3px_8px_rgba(0,0,0,0.4)]"
                      : "hover:opacity-80 px-3 py-1.5 "
                  } ${isAnimating && isNext ? "animate-nav-highlight" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Desktop Search - Premium Design */}
            <div className="relative">
              <div
                className={`hidden lg:flex items-center border-2 rounded-full bg-transparent w-[220px] h-[48px] transition-all duration-500 ${
                  onHome && !scrolled && !isHovered
                    ? "border-white/80 bg-white/10 backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
                    : "border-gray-300 bg-white/95 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                } hover:shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:scale-105`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  suppressHydrationWarning
                  className={`flex-1 px-5 pr-12 text-sm bg-transparent focus:outline-none placeholder-opacity-80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] ${
                    onHome && !scrolled && !isHovered
                      ? "text-white placeholder-white"
                      : "text-gray-800 placeholder-gray-500"
                  }`}
                  style={{ fontSize: "0.9rem" }}
                />
                <button
                  onClick={handleSearch}
                  suppressHydrationWarning
                  className={`absolute right-3 p-2 rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${
                    onHome && !scrolled && !isHovered
                      ? "bg-white/20 text-white hover:bg-white/30 hover:scale-110"
                      : "bg-gradient-to-r from-[#dc0c0c] to-[#ff4444] text-white hover:from-[#b30a0a] hover:to-[#dc0c0c] hover:scale-110"
                  } transform hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)]`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <FiSearch size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Hamburger with darker shadow */}
            <button
              className={`block md:hidden text-2xl transition-colors p-3 rounded bg-white/30 ${burgerColor} shadow-[0_6px_20px_rgba(0,0,0,0.8)]`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
              suppressHydrationWarning
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU - Black Theme */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black z-50 shadow-2xl transform transition-transform duration-500 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-32 h-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/LOGO/LOGO_CXP Motozone/LOGO_CXP Motozone-02.png"
                alt="CXP Motozone Logo"
                width={128}
                height={64}
                priority
                draggable={false}
              />
            </div>
          </div>
          <button
            className="text-2xl font-bold text-white hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-gray-800"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
            suppressHydrationWarning
          >
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col p-6 gap-4">
          {safeHeaderData.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-white font-medium hover:text-red-500 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300 border-l-4 border-transparent hover:border-red-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Search - Premium Black Theme */}
        <div className="p-6 border-t border-gray-700 flex flex-col gap-6 items-center">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              suppressHydrationWarning
              className="w-full border-2 border-gray-600 rounded-full px-5 py-3 focus:outline-none focus:border-red-500 bg-gray-800 text-white placeholder-gray-400 shadow-[0_6px_20px_rgba(0,0,0,0.3)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
            />
            <button
              onClick={handleSearch}
              suppressHydrationWarning
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white p-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:scale-110"
            >
              <FiSearch size={16} className="stroke-[2.5]" />
            </button>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://www.facebook.com/CXPMotozone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full hover:bg-blue-600 shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110"
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              href="https://shopee.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full hover:bg-orange-500 shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110"
            >
              <SiShopee size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      {onHome && (
        <section className="relative w-full">
          <div className="relative h-[50vh] md:h-screen overflow-hidden">
            {bannerImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`CXP Banner ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                priority={index === 0}
                draggable={false}
                sizes="100vw"
              />
            ))}

            {/* Premium Left & Right Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? bannerImages.length - 1 : prev - 1
                )
              }
              suppressHydrationWarning
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
              aria-label="Previous Slide"
            >
              <FiChevronLeft
                size={24}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </button>

            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
              }
              suppressHydrationWarning
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
              aria-label="Next Slide"
            >
              <FiChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>

            {/* Custom button for the new image (last image in array) */}
            {currentSlide === bannerImages.length - 1 ? (
              <div className="absolute bottom-20 left-20 z-20">
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 ease-in-out transform hover:scale-105 active:scale-95 border border-blue-500/30"
                  style={{
                    fontSize: "0.9rem",
                    textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  Learn More
                </Link>
              </div>
            ) : (
              <div className="absolute bottom-20 left-20 z-20">
                <Link
                  href="/shop"
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-500 ease-in-out transform hover:scale-105 active:scale-95 border border-red-500/30"
                  style={{
                    fontSize: "0.9rem",
                    textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        suppressHydrationWarning
        className={`fixed right-6 bottom-6 z-40 p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:from-red-700 hover:to-red-800 hover:scale-110 active:scale-95 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to Top"
      >
        <FiChevronUp size={20} />
      </button>

      <style jsx>{`
        @keyframes nav-highlight {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-nav-highlight {
          animation: nav-highlight 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Header;
