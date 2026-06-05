// components/ProductCharacteristics.tsx (or wherever this file is located)

/* eslint-disable @typescript-eslint/no-explicit-any */
// REMOVED: import { Product } from "@/sanity.types"; // We will use a dedicated type from the page file
import { getBrand } from "@/sanity/queries";
import React from "react";

// DEFINE A GENERIC PRODUCT TYPE FOR THIS COMPONENT'S USE
// We assume it receives the fully constructed SanityProduct from page.tsx
interface ProductForCharacteristics {
  _id: string;
  name: string;
  brand?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key?: string;
  } | null;
  variant?: string;
  status?: "new" | "hot" | "sale" | null;
  isBestSeller?: boolean; // Ensure categories can be an array of objects that *might* contain title (if resolved)
  categories?: Array<any>;
}

const ProductCharacteristics = async ({
  product,
}: {
  product: ProductForCharacteristics | null | undefined;
}) => {
  if (!product) {
    return (
      <div className="space-y-2">
               {" "}
        <h3 className="text-white text-lg font-semibold">
                    Product Characteristics        {" "}
        </h3>
                <p className="text-white">No product information available.</p> 
           {" "}
      </div>
    );
  }

  let brand = null; // Handle brand reference
  // Use the expected type of the brand property

  if (
    product.brand &&
    typeof product.brand === "object" &&
    "_ref" in product.brand
  ) {
    try {
      brand = await getBrand((product.brand as { _ref: string })._ref);
    } catch (error) {
      console.error("Error fetching brand:", error);
    }
  }

  const productAny = product as any;
  const variant = productAny.variant;
  const status = productAny.status;
  const isBestSeller = productAny.isBestSeller;
  const categories = productAny.categories;

  return (
    <div className="space-y-2">
           {" "}
      <h3 className="text-white text-lg font-semibold">
                {product.name || "Product"}: Characteristics      {" "}
      </h3>
           {" "}
      {brand && (
        <p className="flex items-center justify-between text-white">
                    Brand:          {" "}
          <span className="font-semibold tracking-wide text-white">
                       {" "}
            {(brand as any).title || (brand as any).name || "Unknown Brand"}   
                 {" "}
          </span>
                 {" "}
        </p>
      )}
           {" "}
      {variant && (
        <p className="flex items-center justify-between text-white">
                    Type:          {" "}
          <span className="font-semibold tracking-wide text-white">
                        {variant}         {" "}
          </span>
                 {" "}
        </p>
      )}
           {" "}
      {status && (
        <p className="flex items-center justify-between text-white">
                    Status:          {" "}
          <span className="font-semibold tracking-wide text-white">
                        {status}         {" "}
          </span>
                 {" "}
        </p>
      )}
           {" "}
      {isBestSeller && (
        <p className="flex items-center justify-between text-white">
                    Best Seller:          {" "}
          <span className="font-semibold tracking-wide text-white text-green-400">
                        Yes          {" "}
          </span>
                 {" "}
        </p>
      )}
           {" "}
      {categories && categories.length > 0 && (
        <p className="flex items-center justify-between text-white">
                    Categories:          {" "}
          <span className="font-semibold tracking-wide text-white">
                       {" "}
            {categories
              .map((cat: any) => (typeof cat === "object" ? cat.title : cat))
              .join(", ")}
                     {" "}
          </span>
                 {" "}
        </p>
      )}
           {" "}
      {!brand &&
        !variant &&
        !status &&
        !isBestSeller &&
        !categories?.length && (
          <p className="text-white text-sm">
                        No additional characteristics available.          {" "}
          </p>
        )}
         {" "}
    </div>
  );
};

export default ProductCharacteristics;
