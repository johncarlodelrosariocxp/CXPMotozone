import Shop from "@/components/Shop";
import { getAllBrands, getCategories } from "@/sanity/queries";
import React, { Suspense } from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <div className="bg-white">
      {/* ✅ Wrap Shop in Suspense because it uses useSearchParams */}
      <Suspense
        fallback={<div className="p-10 text-center">Loading shop...</div>}
      >
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default ShopPage;
