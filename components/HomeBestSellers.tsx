// components/HomeBestSellers.tsx
"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

// Define types for Sanity product data
interface SanityImage {
  _key?: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

interface SanityVariant {
  _key?: string;
  name: string;
  value: string;
  price?: number;
  discountPrice?: number;
  stock?: number;
  image?: SanityImage;
}

interface SanityProduct {
  _id: string;
  name: string;
  slug:
    | {
        current: string;
      }
    | string;
  price: number;
  discountPrice?: number;
  images: SanityImage[];
  isBestSeller: boolean;
  salesCount: number;
  stock: number;
  description?: string;
  shopeeUrl?: string;
  lazadaUrl?: string;
  status?: "new" | "hot" | "sale" | null;
  discount?: number;
  variantType?: string;
  variants?: SanityVariant[];
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  brand?: {
    _id: string;
    title: string;
    slug: { current: string };
  } | null;
  _type?: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
}

// Helper function to get slug safely from any product object
const getProductSlug = (product: SanityProduct): string => {
  if (!product) return "";

  if (typeof product.slug === "string") {
    return product.slug;
  }

  if (
    product.slug &&
    typeof product.slug === "object" &&
    product.slug.current
  ) {
    return product.slug.current;
  }

  return "";
};

// Transform images to match Product type
const transformImages = (images: SanityImage[] = []) => {
  return images.map((image) => ({
    _key: image._key || `image-${Math.random()}`,
    _type: "image" as const,
    asset: {
      _ref: image.asset._ref,
      _type: "reference" as const,
    },
    alt: image.alt,
    caption: image.caption,
  }));
};

// Transform Sanity data to match Product type expected by ProductCard
const transformSanityProduct = (sanityProduct: SanityProduct): Product => {
  const slugValue = getProductSlug(sanityProduct);

  // Build product object
  const product = {
    _id: sanityProduct._id,
    _type: "product" as const,
    _rev: sanityProduct._rev || "",
    _createdAt: sanityProduct._createdAt || "",
    _updatedAt: sanityProduct._updatedAt || "",
    name: sanityProduct.name || "",
    slug: {
      _type: "slug" as const,
      current: slugValue,
    },
    price: sanityProduct.price || 0,
    discountPrice: sanityProduct.discountPrice,
    images: transformImages(sanityProduct.images),
    isBestSeller: sanityProduct.isBestSeller || false,
    salesCount: sanityProduct.salesCount || 0,
    stock: sanityProduct.stock || 0,
    description: sanityProduct.description || "",
    shopeeUrl: sanityProduct.shopeeUrl,
    lazadaUrl: sanityProduct.lazadaUrl,
    status: sanityProduct.status || null,
    categories: sanityProduct.categories || [],
    brand: sanityProduct.brand || null,
    discount: sanityProduct.discount,
    variantType: sanityProduct.variantType,
    variants: sanityProduct.variants,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return product as any as Product;
};

// Direct query functions - show only 8 best sellers
const fetchBestSellers = async (
  limit: number = 8,
): Promise<SanityProduct[]> => {
  try {
    const query = groq`
      *[_type == "product" && isBestSeller == true] | order(salesCount desc) [0...$limit] {
        _id,
        _type,
        _rev,
        _createdAt,
        _updatedAt,
        name,
        "slug": slug.current,
        price,
        discountPrice,
        images,
        isBestSeller,
        salesCount,
        stock,
        description,
        shopeeUrl,
        lazadaUrl,
        status,
        discount,
        variantType,
        variants,
        "categories": categories[]->{
          _id,
          title,
          slug
        },
        "brand": brand->{
          _id,
          title,
          slug
        }
      }
    `;

    const products = await client.fetch<SanityProduct[]>(query, { limit });
    return products || [];
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

const HomeBestSellers = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBestSellers = async () => {
      setLoading(true);
      try {
        const allBestSellers = await fetchBestSellers(8);
        const transformedAll = allBestSellers.map(transformSanityProduct);
        setBestSellers(transformedAll);
      } catch (error) {
        console.error("Error loading best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBestSellers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 relative min-h-[600px]"
        style={{
          backgroundImage: "url('/images/2813985.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 relative min-h-[500px]"
        style={{
          backgroundImage: "url('/images/2813985.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            No Best Sellers Yet
          </h2>
          <p className="text-gray-300">
            Mark products as &quot;Best Seller&quot; in Sanity Studio to see
            them here.
            <br />
            Go to: Products → Edit Product → Check &quot;Best Seller&quot;
            checkbox
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: "url('/images/2813985.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DC0C0C] to-transparent"></div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#DC0C0C]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#DC0C0C]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="w-full flex flex-col items-center mb-8 md:mb-16">
          <div className="flex items-center justify-center w-full gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent to-[#DC0C0C]" />
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-wide text-center text-[#DC0C0C] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-[#DC0C0C] sm:border-2 shadow-lg sm:shadow-xl md:shadow-2xl shadow-[#DC0C0C]/40 uppercase font-rajdhani tracking-widest whitespace-nowrap bg-black/60 backdrop-blur-sm">
              BEST SELLER
            </div>
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent to-[#DC0C0C]" />
          </div>
        </div>

        {bestSellers.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product._id || `product-${index}`}
                variants={itemVariants}
                custom={index}
                className="relative group"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/60 rounded-full mb-4 backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Best Seller Products Found
            </h3>
            <p className="text-gray-300">
              Mark products as best sellers in Sanity Studio to see them here
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeBestSellers;
