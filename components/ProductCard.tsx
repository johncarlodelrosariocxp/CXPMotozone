import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import PriceView from "./PriceView";
import Title from "./Title";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group bg-white border border-[#DC0C0C] rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-[#DC0C0C]/20 transition-all duration-500 hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {product?.images && product?.stock !== 0 && (
          <Link href={`/product/${product?.slug?.current}`}>
            <div className="relative">
              <Image
                src={urlFor(product.images[0]).url()}
                alt="productImage"
                width={500}
                height={500}
                priority
                className="w-full h-52 object-contain transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>
        )}

        {product?.images && product?.stock === 0 && (
          <div className="relative">
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className="w-full h-52 object-contain opacity-60"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium border border-gray-600">
                Out of Stock
              </span>
            </div>
          </div>
        )}

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.status === "new" && (
            <span className="bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white px-3 py-1 rounded-full text-xs font-semibold border border-[#DC0C0C] shadow-lg">
              New
            </span>
          )}

          {product?.status === "hot" && (
            <span className="bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white px-3 py-1 rounded-full text-xs font-semibold border border-[#DC0C0C] shadow-lg flex items-center gap-1">
              <Flame size={12} fill="currentColor" />
              Hot
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        {product?.categories && product.categories.length > 0 && (
          <p className="uppercase tracking-wider text-xs text-gray-500 font-medium">
            {product.categories
              .map((cat) => {
                // Handle both string values and object references
                if (typeof cat === "string") {
                  return cat;
                } else if (
                  cat &&
                  typeof cat === "object" &&
                  "title" in cat &&
                  cat.title
                ) {
                  return cat.title;
                }
                return "";
              })
              .filter(Boolean) // Remove empty strings
              .join(" • ")}
          </p>
        )}

        <Title className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors duration-300">
          {product.name}
        </Title>

        <div className="flex items-center justify-between mt-2">
          <PriceView
            price={product.price}
            className="text-lg font-bold text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
