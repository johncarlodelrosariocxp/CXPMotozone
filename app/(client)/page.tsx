// app/(client)/page.tsx
import Container from "@/components/Container";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import HomeBestSellers from "@/components/HomeBestSellers";
import AboutSection from "@/components/AboutSection";
import { getCategories, getBrands } from "@/sanity/queries";
import ImageGallery from "@/components/ImageGallery";

// Define image paths for gallery
const galleryImages = [
  "/images/Gallery/coocase.jpg",
  "/images/Gallery/koby1.jpg",
  "/images/Gallery/koby2.jpg",
  "/images/Gallery/koby4.jpg",
  "/images/Gallery/mokoto.jpg",
  "/images/Gallery/primaxx.jpg",
  "/images/Gallery/Zeus.jpg",
];

const Home = async () => {
  // Fetch data
  const [categories, brands] = await Promise.all([
    getCategories(6),
    getBrands(),
  ]);

  // Log for debugging (server-side only)
  console.log("Rendering Home with:", {
    categoriesCount: categories?.length,
    brandsCount: brands?.length,
  });

  return (
    <main className="text-black min-h-screen w-full bg-white overflow-x-hidden">
      <Container className="w-full max-w-none p-0 m-0 overflow-hidden">
        {/* Make sure ProductGrid properly handles empty/null states */}
        <AboutSection />

        {/* Gallery Section - Direct Display with White Background */}
        <div className="py-12 bg-white">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-[#DC0C0C] uppercase tracking-wider">
                <span className="w-8 h-px bg-[#DC0C0C]" />
                <span>Visual Tour</span>
                <span className="w-8 h-px bg-[#DC0C0C]" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Our <span className="text-[#DC0C0C]">Gallery</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 font-light text-lg">
              Explore our collection of premium products
            </p>
          </div>
          <ImageGallery images={galleryImages} />
        </div>

        <LatestBlog />
        <ProductGrid brands={brands || []} />
        <HomeBestSellers />
      </Container>
    </main>
  );
};

export default Home;
