"use client";
import { Brand, Category, Product } from "@/sanity.types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Container from "./Container";
import Title from "./Title";
import { useSearchParams } from "next/navigation";
import BrandList from "./Shop/BrandList";
import PriceList from "./Shop/PriceList";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import CategoryList from "./Shop/CategoryList";

interface Props {
  categories: Category[];
  brands: Brand[];
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const productsContainerRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }

      const query = `
        *[_type == 'product' 
          ${selectedCategory ? `&& references(*[_type == "category" && slug.current == $selectedCategory]._id)` : ""}
          ${selectedBrand ? `&& references(*[_type == "brand" && slug.current == $selectedBrand]._id)` : ""}
          && price >= $minPrice && price <= $maxPrice
        ] 
        | order(name asc) {
          ...,
          "categories": categories[]->{title, slug},
          "brand": brand->{title, slug}
        }
      `;

      const data = await client.fetch(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
        },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching Error", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = [...products].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );

  return (
    <div
      className="min-h-screen border-t"
      style={{
        backgroundImage:
          "url('/images/black-texture-background-gy5uqdi0tjs40qei.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="mt-20">
        <div className="sticky top-0 z-10 mb-5 pt-4">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide text-white">
              Get the products as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_btn_dark_green/50 scrollbar-hide">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <BrandList
                brands={brands}
                setSelectedBrand={setSelectedBrand}
                selectedBrand={selectedBrand}
              />
              <PriceList
                setSelectedPrice={setSelectedPrice}
                selectedPrice={selectedPrice}
              />
            </div>
          </div>
          <div className="flex-1 pt-5 relative">
            <div
              ref={productsContainerRef}
              className="h-[calc(100vh-160px)] overflow-y-auto pr-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#dc0c0c #2d3748",
              }}
            >
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
                  <Loader2 className="w-10 h-10 text-shop_dark_green animate-spin" />
                  <p className="font-semibold tracking-wide text-base text-white">
                    Product is loading . . .
                  </p>
                </div>
              ) : sortedProducts?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-black/70 backdrop-blur-sm rounded-lg">
                  <NoProductAvailable className="bg-transparent mt-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
