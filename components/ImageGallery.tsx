// components/ImageGallery.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isHovered = useRef(false);
  const [imageDimensions, setImageDimensions] = useState<
    { width: number; height: number }[]
  >([]);

  useEffect(() => {
    // Get actual dimensions of each image
    const loadImageDimensions = async () => {
      const dimensions = await Promise.all(
        images.map((src) => {
          return new Promise<{ width: number; height: number }>((resolve) => {
            const img = document.createElement("img");
            img.onload = () => {
              resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => {
              resolve({ width: 320, height: 320 }); // fallback
            };
            img.src = src;
          });
        }),
      );
      setImageDimensions(dimensions);
    };

    loadImageDimensions();
  }, [images]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.8; // Adjust speed as needed

    const animate = () => {
      if (!scrollContainer || isHovered.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      scrollPosition += scrollSpeed;

      // Reset scroll position when reaching the end
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Double the images for seamless looping
  const doubledImages = [...images, ...images];
  const doubledDimensions = [...imageDimensions, ...imageDimensions];

  // Fixed height (e.g., 300px) - adjust as needed
  const fixedHeight = 300;

  return (
    <div className="w-full overflow-hidden bg-white">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto items-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          gap: "0px", // Walang gap
        }}
        onMouseEnter={() => {
          isHovered.current = true;
        }}
        onMouseLeave={() => {
          isHovered.current = false;
        }}
      >
        {doubledImages.map((image, index) => {
          const originalWidth = doubledDimensions[index]?.width || 320;
          const originalHeight = doubledDimensions[index]?.height || 320;
          // Calculate width based on fixed height to maintain aspect ratio
          const calculatedWidth =
            (fixedHeight / originalHeight) * originalWidth;

          return (
            <div
              key={`${image}-${index}`}
              className="flex-none relative"
              style={{
                flexShrink: 0,
                width: calculatedWidth,
                height: fixedHeight,
              }}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, auto"
                priority={index < 4}
              />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageGallery;
