// components/VariantSelector.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Variant {
  name: string;
  price: number;
  discount?: number;
  stock?: number;
  shopeeUrl?: string;
  lazadaUrl?: string;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  productSlug: string;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  productSlug,
}: VariantSelectorProps) {
  const router = useRouter();
  const [localSelected, setLocalSelected] = useState(selectedVariant);

  const handleVariantSelect = (variant: Variant) => {
    setLocalSelected(variant);
    const params = new URLSearchParams(window.location.search);
    params.set("variant", variant.name);
    router.push(`/product/${productSlug}?${params.toString()}`, {
      scroll: false,
    });
  };

  if (variants.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">Select Variant</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.name}
            onClick={() => handleVariantSelect(variant)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              localSelected?.name === variant.name
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            } ${variant.stock === 0 ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={variant.stock === 0}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  {variant.name}
                </span>
                {variant.stock === 0 && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                    Out of stock
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₱{variant.price.toLocaleString()}
                  </span>
                  {variant.discount && variant.discount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-red-100 text-red-700 rounded">
                      -{variant.discount}%
                    </span>
                  )}
                </div>

                {variant.stock && variant.stock > 0 && (
                  <div className="text-sm text-green-600">
                    {variant.stock} available
                  </div>
                )}
              </div>

              {/* E-commerce availability indicators */}
              <div className="flex gap-2 mt-2">
                {variant.shopeeUrl && (
                  <span className="px-2 py-1 text-xs bg-[#ee4d2d]/10 text-[#ee4d2d] rounded">
                    Shopee
                  </span>
                )}
                {variant.lazadaUrl && (
                  <span className="px-2 py-1 text-xs bg-[#0f849c]/10 text-[#0f849c] rounded">
                    Lazada
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected variant details */}
      {localSelected && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="font-semibold text-gray-800 mb-2">
            Selected Variant: {localSelected.name}
          </h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Price:</span>
              <span className="ml-2 font-semibold">
                ₱{localSelected.price.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Stock:</span>
              <span
                className={`ml-2 font-semibold ${
                  localSelected.stock && localSelected.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {localSelected.stock && localSelected.stock > 0
                  ? `${localSelected.stock} available`
                  : "Out of stock"}
              </span>
            </div>
            {localSelected.discount && localSelected.discount > 0 && (
              <div>
                <span className="text-gray-600">Discount:</span>
                <span className="ml-2 font-semibold text-red-600">
                  {localSelected.discount}% off
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
