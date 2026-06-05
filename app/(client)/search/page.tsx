import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  let results: Product[] = [];

  if (query) {
    results = await client.fetch(
      groq`*[
        _type == "product" && (name match $q || description match $q)
      ]{
        _id,
        name,
        slug,
        description,
        images,
        price,
        discount,
        stock,
        status,
        "categories": categories[]->title
      }`,
      { q: `*${query}*` }
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_110%)]" />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Search
            </h1>

            {query && (
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-black-900 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl">
                <span className="text-gray-300 text-xl">Results for</span>
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  &ldquo;{query}&rdquo;
                </span>
                <span className="px-4 py-2 bg-[#DC0C0C] text-white text-sm rounded-full font-bold shadow-lg">
                  {results.length} {results.length === 1 ? "item" : "items"}
                </span>
              </div>
            )}
          </div>

          {/* Results */}
          {results.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-lg mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  {query ? "No Results Found" : "Ready to Explore?"}
                </h3>
                <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                  {query
                    ? "We couldn't find any matches. Try adjusting your search terms or explore our categories."
                    : "Enter keywords to discover our premium motorcycle products and accessories."}
                </p>
                {query && (
                  <div className="flex flex-wrap gap-3 justify-center">
                    <span className="px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 text-base hover:bg-gray-700 transition-colors cursor-pointer">
                      Try different terms
                    </span>
                    <span className="px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 text-base hover:bg-gray-700 transition-colors cursor-pointer">
                      Browse all products
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {results.map((product) => (
                  <div key={product._id} className="group">
                    <div className="relative transform group-hover:scale-105 group-hover:shadow-2xl transition-all duration-500 ease-out">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#DC0C0C] to-red-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500" />
                      <div className="relative">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Summary */}
              <div className="text-center pt-8">
                <p className="text-gray-400 text-lg">
                  Showing{" "}
                  <span className="text-white font-semibold">
                    {results.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-white font-semibold">
                    {results.length}
                  </span>{" "}
                  products
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
