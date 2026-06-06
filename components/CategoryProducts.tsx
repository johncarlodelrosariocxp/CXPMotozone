"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] 
        | order(name asc){
          ...,
          "categories": categories[]->title
        }
      `;
      const data: Product[] = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Category Sidebar */}
      <div className="flex flex-col md:min-w-40 border-2 border-gray-200 bg-white">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 p-0 rounded-none text-gray-700 shadow-none hover:bg-shop_orange hover:text-white font-semibold hoverEffect border-b-2 border-gray-200 last:border-b-0 transition-colors capitalize ${
              item?.slug?.current === currentSlug &&
              "bg-shop_orange text-white border-shop_orange"
            }`}
          >
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-60 space-y-4 text-center bg-gray-50 rounded-lg w-full border-2 border-gray-200">
            <div className="flex items-center space-x-2 text-[#DC0C0C]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-gray-700">Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.map((product: Product) => (
              <AnimatePresence key={product._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg overflow-hidden flex flex-col border-2 border-gray-200 hover:border-[#DC0C0C] transition-all duration-300"
                >
                  {/* ProductCard will render picture + description */}
                  <div className="w-full aspect-[5/6]">
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
