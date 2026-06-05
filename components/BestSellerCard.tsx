// components/BestSellerCard.tsx (alternative approach)
import { Product } from "@/sanity.types";
import ProductCard from "./ProductCard";

interface BestSellerProduct extends Omit<Product, "slug"> {
  slug: string | { current: string };
}

const BestSellerCard = ({ product }: { product: BestSellerProduct }) => {
  // Get slug safely
  const getSlug = () => {
    if (typeof product.slug === "string") {
      return product.slug;
    }
    if (
      product.slug &&
      typeof product.slug === "object" &&
      "current" in product.slug
    ) {
      return product.slug.current;
    }
    return "";
  };

  const slug = getSlug();

  // Create a product object that matches ProductCard's expectations
  const productForCard = {
    ...product,
    slug:
      typeof product.slug === "string"
        ? { current: product.slug }
        : product.slug,
  };

  return (
    <div className="relative group">
      {slug && (
        <div className="absolute inset-0 z-10">
          <a
            href={`/product/${slug}`}
            className="absolute inset-0"
            aria-label={`View details for ${product.name}`}
          />
        </div>
      )}
      <ProductCard product={productForCard as Product} />
    </div>
  );
};

export default BestSellerCard;
