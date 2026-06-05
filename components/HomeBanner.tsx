"use client";
import React from "react";
import Link from "next/link";

const HomeBanner = () => {
  return (
    // Main container. Fullscreen view with background image
    <div
      className="relative w-full h-[750px] overflow-hidden"
      style={{
        backgroundImage: 'url("/images/homeBanner.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay: Darken background for contrast */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* CTA Button: Bottom-left position */}
      <div className="absolute bottom-10 left-10 z-10 animate-hero-entry">
        <Link
          href="/shop"
          className="bg-shop_dark_green text-white px-10 py-4 rounded-full text-lg font-bold uppercase transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:bg-shop_dark_green/90 border-2 border-white/50"
        >
          Shop Now
        </Link>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes hero-entry {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-hero-entry {
          animation: hero-entry 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HomeBanner;
