import Container from "@/components/Container";
import { client } from "@/sanity/lib/client";
import BlogContent from "@/components/BlogContent";

// Fallback Title component if the import fails
const Title = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;

interface Blog {
  title: string;
  publishedAt: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
  author?: {
    name: string;
  };
  blogcategories?: Array<{
    title: string;
  }>;
  body: unknown[];
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog: Blog | null = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      publishedAt,
      mainImage {
        asset->{ url }
      },
      author->{ name },
      blogcategories[]->{ title },
      body
    }`,
    { slug }
  );

  if (!blog) {
    return (
      <Container>
        <Title>Blog Not Found</Title>
        <p className="text-gray-500">
          We couldn&apos;t find the blog you&apos;re looking for.
        </p>
      </Container>
    );
  }

  return (
    <Container className="pt-10 pb-20">
      <BlogContent />
    </Container>
  );
}
