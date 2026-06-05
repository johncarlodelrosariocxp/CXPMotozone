// components/BrandScroller.tsx
"use client";

import React from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { Brand } from "@/sanity.types";

interface BrandScrollerProps {
  brands: Brand[];
}

const BrandScroller = ({ brands }: BrandScrollerProps) => {
  return (
    <div className="relative mb-16 overflow-hidden">
      {brands.length > 0 ? (
        <>
          <div className="flex space-x-4 py-4 animate-scroll">
            {[...brands, ...brands].map((brand: Brand, index) => (
              <Link
                key={`${brand._id}-${index}`}
                href={`/brand/${brand.slug?.current}`}
                className="flex-shrink-0 bg-black w-48 h-32 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(220,12,12,0.6)] border border-[#DC0C0C]/30 hover:border-[#DC0C0C]/60 group"
              >
                {brand.image ? (
                  <Image
                    src={urlFor(brand.image).url()}
                    alt={brand.title || "Brand Image"}
                    width={192}
                    height={128}
                    className="w-40 h-24 object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-white font-semibold text-lg">
                      {brand.title || "Brand"}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No brands available at the moment.
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default BrandScroller;
