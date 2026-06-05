"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image"; // ✅ Converts Sanity image ref to usable URL
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

// ✅ Props include Sanity image array and optional stock status
interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [isZoomed, setIsZoomed] = useState([0]); // ✅ Tracks which image is active

  const active = images[isZoomed[0]]; // ✅ Gets the currently selected image

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      {/* ✅ Main image display with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-[550px] min-h-[450px] rounded-md group overflow-hidden bg-transparent"
        >
          <Image
            src={urlFor(active).url()} // ✅ Converts Sanity image ref to URL
            alt="productImage"
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-110 hoverEffect rounded-md ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>

      {/* ✅ Thumbnail selector grid */}
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24 bg-transparent">
        {images?.map((image, idx) => (
          <button
            key={image?._key}
            onClick={() => setIsZoomed([idx])} // ✅ Updates active image index
            className={`rounded-md overflow-hidden bg-transparent backdrop-blur-sm ${
              active?._key === image?._key
                ? "ring-2 ring-white/50 shadow-lg shadow-white/20"
                : "opacity-80 hover:opacity-100"
            } transition-all duration-200`}
          >
            <Image
              src={urlFor(image).url()} // ✅ Renders thumbnail from Sanity image
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
