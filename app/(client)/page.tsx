// app/(client)/page.tsx
import Container from "@/components/Container";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import HomeBestSellers from "@/components/HomeBestSellers";
import AboutSection from "@/components/AboutSection";
import { getCategories, getBrands } from "@/sanity/queries";

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
    <main className="text-white min-h-screen w-full bg-black overflow-x-hidden">
      <Container className="w-full max-w-none p-0 m-0 overflow-hidden">
        {/* Make sure ProductGrid properly handles empty/null states */}
        <ProductGrid brands={brands || []} />
        <HomeBestSellers />
        <AboutSection />
        <HomeCategories categories={categories || []} />
        <LatestBlog />
      </Container>
    </main>
  );
};

export default Home;
