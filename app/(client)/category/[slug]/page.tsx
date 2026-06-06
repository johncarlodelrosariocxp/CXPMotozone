import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import Title from "@/components/Title";
import { getCategories } from "@/sanity/queries";

// Async server component for rendering category pages
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params because in Next.js 15 it's a Promise
  const { slug } = await params;

  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      {" "}
      {/* Changed from py-10 to pt-10 pb-10 */}
      <Container>
        <div className="mb-12">
          <Title>
            Products by Category:{" "}
            <span className="font-bold text-green-600 capitalize tracking-wide">
              {slug}
            </span>
          </Title>
        </div>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
}
