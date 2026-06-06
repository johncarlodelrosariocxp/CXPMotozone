// components/HomeBestSellers.tsx
"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";
import { motion } from "framer-motion";
import { TrendingUp, Star } from "lucide-react";

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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
                <span className="w-8 h-px bg-[#DC0C0C]" />
                <span>Top Rated</span>
                <span className="w-8 h-px bg-[#DC0C0C]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900">
              Best <span className="font-bold text-[#DC0C0C]">Sellers</span>
            </h2>
          </div>
          <div className="animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (bestSellers.length === 0) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-light text-gray-900 mb-2">
            No Best Sellers Yet
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Mark products as "Best Seller" in Sanity Studio to see them here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Consistent Design */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
              <span className="w-8 h-px bg-[#DC0C0C]" />
              <span>Top Rated Products</span>
              <span className="w-8 h-px bg-[#DC0C0C]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900">
            Best <span className="font-bold text-[#DC0C0C]">Sellers</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 font-light">
            Most popular products chosen by our customers
          </p>
        </div>

        {/* Products Grid */}
        {bestSellers.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product._id || `product-${index}`}
                variants={itemVariants}
                className="relative group"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HomeBestSellers;
