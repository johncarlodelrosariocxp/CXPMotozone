// app/(client)/product/[slug]/page.tsx
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import { getProductBySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";

// Use type definitions that exactly match Sanity
interface SanityImageHotspot {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
}

interface SanityImageCrop {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// Define the exact image type that ImageView component expects
interface ImageViewImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    metadata?: Record<string, unknown>;
    url?: string;
    path?: string;
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  caption?: string;
}

// Define category reference interface
interface CategoryReference {
  _ref?: string;
  _type: "reference";
  _weak?: boolean;
  _key?: string;
}

// Define brand reference interface
interface BrandReference {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
  _key?: string;
}

// Extended type that includes discountPrice
interface ExtendedProduct {
  _id: string;
  _type: "product";
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  name: string;
  slug?: {
    current: string;
  };
  price?: number;
  discountPrice?: number;
  images?: ImageViewImage[];
  stock?: number;
  description?: string;
  shopeeUrl?: string;
  lazadaUrl?: string;
  status?: "new" | "hot" | "sale" | null;
  categories?: CategoryReference[];
  brand?: BrandReference | null;
  isBestSeller?: boolean;
  salesCount?: number;
  [key: string]: unknown; // Index signature for other properties
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  // Cast the product to our extended type
  const extendedProduct = product as ExtendedProduct;

  // Create a properly typed product with all required fields
  const productData: ExtendedProduct = {
    ...extendedProduct,
    _type: "product",
    _rev: extendedProduct._rev || "default-rev",
    _createdAt: extendedProduct._createdAt || new Date().toISOString(),
    _updatedAt: extendedProduct._updatedAt || new Date().toISOString(),
    name: extendedProduct.name || "",
    price: extendedProduct.price || 0,
    stock: extendedProduct.stock || 0,
    description: extendedProduct.description || "",
    slug: extendedProduct.slug || { current: slug },
    images: extendedProduct.images || [],
    categories: extendedProduct.categories || [],
    brand: extendedProduct.brand || null,
    discountPrice: extendedProduct.discountPrice || 0,
    shopeeUrl: extendedProduct.shopeeUrl || "",
    lazadaUrl: extendedProduct.lazadaUrl || "",
    status: extendedProduct.status || null,
    isBestSeller: extendedProduct.isBestSeller || false,
    salesCount: extendedProduct.salesCount || 0,
  };

  const displayShopeeUrl = productData?.shopeeUrl;
  const displayLazadaUrl = productData?.lazadaUrl;
  const displayStock = productData?.stock || 0;
  const displayPrice = productData?.price || 0;
  const displayDiscount = productData?.discountPrice || 0;
  const hasEcommerceLinks = displayShopeeUrl || displayLazadaUrl;

  // Transform the images to match the exact type expected by ImageView
  const transformedImages = productData?.images?.map((image) => ({
    ...image,
    hotspot: image.hotspot
      ? {
          _type: "sanity.imageHotspot" as const,
          x: image.hotspot.x,
          y: image.hotspot.y,
          height: image.hotspot.height,
          width: image.hotspot.width,
        }
      : undefined,
    crop: image.crop
      ? {
          _type: "sanity.imageCrop" as const,
          top: image.crop.top,
          bottom: image.crop.bottom,
          left: image.crop.left,
          right: image.crop.right,
        }
      : undefined,
  }));

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url('/images/black-carbon-fiber-in-4k-arrz83wq23ifqm3q.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <Container className="flex flex-col md:flex-row gap-10 py-10 mt-10">
          {/* Product Images */}
          {transformedImages && transformedImages.length > 0 && (
            <div className="relative z-10">
              <ImageView images={transformedImages} />
            </div>
          )}

          <div className="w-full md:w-1/2 flex flex-col gap-6 relative z-10">
            {/* Semi-transparent background for content area */}
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-2xl -z-10"></div>

            <div className="p-6 md:p-8 rounded-2xl">
              {/* Title + Description */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white">
                  {productData?.name}
                </h1>

                {productData?.description && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Description
                    </h3>
                    <p className="text-white/90 leading-relaxed whitespace-pre-line">
                      {productData.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Price, Stock & Buy Buttons */}
              <div className="space-y-4 border-t border-gray-700 py-6">
                {/* Price Display */}
                <PriceView
                  price={displayPrice}
                  discount={displayDiscount}
                  className="text-2xl font-bold"
                />

                {/* Buy Buttons */}
                {displayStock > 0 && hasEcommerceLinks && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    {/* Shopee Button */}
                    {displayShopeeUrl && (
                      <div className="flex-1">
                        <a
                          href={displayShopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <button className="w-full h-14 flex items-center justify-center gap-3 bg-gradient-to-r from-[#ee4d2d] to-[#ff7337] text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-orange-900/30">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21.23 7.41L19.77 6l-1.45 1.41 1.45 1.41 1.46-1.41zM12 12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM5.54 9.41L4.08 8l-1.45 1.41 1.45 1.41 1.46-1.41zM12 4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7.46-1.41L19.77 6l-1.45 1.41 1.45 1.41 1.46-1.41z" />
                            </svg>
                            Buy on Shopee
                          </button>
                        </a>
                        <p className="text-xs text-gray-300 mt-2 text-center">
                          Redirects to official Shopee store
                        </p>
                      </div>
                    )}

                    {/* Lazada Button */}
                    {displayLazadaUrl && (
                      <div className="flex-1">
                        <a
                          href={displayLazadaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <button className="w-full h-14 flex items-center justify-center gap-3 bg-gradient-to-r from-[#1a9cb7] to-[#0f849c] text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-[0.98] shadow-lg shadow-cyan-900/30">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21.29 4.58l-8.09 8.09L21.29 20.75l1.42-1.42-7.67-7.67 7.67-7.67-1.42-1.41zM2.71 4.58l1.42 1.42 7.67 7.67-7.67 7.67-1.42-1.42 8.09-8.09L2.71 4.58z" />
                            </svg>
                            Buy on Lazada
                          </button>
                        </a>
                        <p className="text-xs text-gray-300 mt-2 text-center">
                          Redirects to official Lazada store
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* If in stock but no e-commerce links */}
                {displayStock > 0 && !hasEcommerceLinks && (
                  <div className="mt-6 p-4 bg-blue-900/50 rounded-lg border border-blue-600/50 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-300">
                          Contact for Purchase
                        </h4>
                        <p className="text-sm text-blue-200/90 mt-1">
                          This product is available for purchase. Please contact
                          us for pricing and ordering information.
                        </p>
                        <button className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-900/30">
                          Contact Sales
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* If out of stock but has e-commerce links */}
                {displayStock <= 0 && hasEcommerceLinks && (
                  <div className="mt-6 p-4 bg-yellow-900/50 rounded-lg border border-yellow-600/50 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.694-.833-2.464 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-300">
                          Currently Out of Stock
                        </h4>
                        <p className="text-sm text-yellow-200/90 mt-1">
                          This product is currently out of stock. Check back
                          soon or contact us for restock information.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Characteristics */}
              <ProductCharacteristics product={productData} />

              {/* Product Status Badge */}
              {productData?.status && productData.status !== "new" && (
                <div className="pt-4 border-t border-gray-700">
                  <span
                    className={`px-4 py-2 text-sm font-semibold rounded-full inline-flex items-center gap-2 ${
                      productData.status === "hot"
                        ? "bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white shadow-lg shadow-orange-900/30"
                        : "bg-gradient-to-r from-red-500/90 to-pink-500/90 text-white shadow-lg shadow-red-900/30"
                    }`}
                  >
                    {productData.status === "hot" ? (
                      <>
                        <span className="text-lg">🔥</span>
                        Hot Deal
                      </>
                    ) : (
                      <>
                        <span className="text-lg">📢</span>
                        On Sale
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
