import { Metadata } from "next";
import {
  getBrand,
  getBrandsStatic,
  getProductsByBrand,
} from "@/sanity/queries";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Title from "@/components/Title";
import NoProductAvailable from "@/components/NoProductAvailable";
import ProductCard from "@/components/ProductCard";
import { Product, Brand } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `${brand.title} Products | Motorcycle Parts & Accessories`,
    description: `Browse all ${brand.title} motorcycle parts, accessories, and riding gear. High-quality products for riders.`,
  };
}

// ✅ FIXED: Use the static version for generateStaticParams
export async function generateStaticParams() {
  const brands = await getBrandsStatic(); // Use static function here

  return brands.map((brand: Brand) => ({
    slug: brand.slug?.current || "",
  }));
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [brand, products] = await Promise.all([
    getBrand(slug),
    getProductsByBrand(slug),
  ]);

  if (!brand) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pt-20 mt-16">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#DC0C0C]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#DC0C0C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Brand Header */}
      <div className="relative bg-gradient-to-r from-white via-gray-50 to-white border-b border-[#DC0C0C]/30">
        <div className="absolute inset-0 bg-white/60" />
        <Container>
          <div className="relative flex flex-col md:flex-row items-center gap-8 py-12">
            {brand.image && (
              <div className="w-32 h-32 md:w-48 md:h-48 relative bg-gradient-to-br from-gray-100 to-white rounded-2xl p-6 border-2 border-[#DC0C0C]/50 shadow-[0_0_30px_rgba(220,12,12,0.3)] group hover:shadow-[0_0_40px_rgba(220,12,12,0.5)] transition-all duration-500">
                <Image
                  src={urlFor(brand.image).url()}
                  alt={brand.title || "Brand Logo"}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <Title className="mb-0 text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] bg-clip-text text-transparent">
                {brand.title}
              </Title>
              {brand.description && (
                <p className="text-gray-600 text-xl max-w-3xl leading-relaxed mb-8">
                  {brand.description}
                </p>
              )}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white px-6 py-3 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(220,12,12,0.4)] border border-[#DC0C0C]">
                  {products?.length || 0}{" "}
                  {products?.length === 1 ? "Product" : "Products"}
                </div>
                <Link
                  href="/shop"
                  className="group bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white px-6 py-3 rounded-full text-lg font-bold border-2 border-[#DC0C0C] hover:from-[#b30a0a] hover:to-[#DC0C0C] hover:shadow-[0_0_30px_rgba(220,12,12,0.5)] transition-all duration-300 flex items-center gap-2"
                >
                  <span>Browse All Brands</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Products Grid */}
      <Container className="py-20 relative">
        {products && products.length > 0 ? (
          <>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-2">
                <div className="h-[2px] w-20 bg-[#DC0C0C] animate-pulse rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {brand.title}{" "}
                  <span className="text-[#DC0C0C]">Collection</span>
                </h2>
                <div className="h-[2px] w-20 bg-[#DC0C0C] animate-pulse rounded-full" />
              </div>
              <p className="text-gray-600 text-lg">
                Showing {products.length} product
                {products.length !== 1 ? "s" : ""} from {brand.title}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border-2 border-[#DC0C0C]/30 hover:border-[#DC0C0C] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,12,12,0.3)]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <NoProductAvailable
              selectedTab={brand.title || "brand"}
              className="mt-8"
            />
            <div className="mt-8">
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                No products available for {brand.title} at the moment. Check
                back soon for new arrivals!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="bg-gradient-to-r from-[#DC0C0C] to-[#ff4444] text-white px-6 py-3 rounded-full font-bold hover:shadow-[0_0_30px_rgba(220,12,12,0.5)] transition-all duration-300"
                >
                  Browse All Products
                </Link>
                <Link
                  href="/brands"
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-bold border border-gray-300 hover:bg-gray-300 transition-all duration-300"
                >
                  View Other Brands
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
