// app/sanity/query.ts
import { groq } from "next-sanity";

// ✅ Product Queries - Fixed to match your schema
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    stock,
    status,
    variantType,
    volumeVariants,
    scentVariants,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "brand": brand->{
      _id,
      title,
      slug,
      image
    },
    variants[] {
      name,
      price,
      discount,
      stock,
      shopeeUrl,
      lazadaUrl
    }
  }
`;

export const DEAL_PRODUCTS = groq`
  *[_type == 'product' && status == 'hot'] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    status,
    stock,
    "categories": categories[]->title,
    "brand": brand->{
      _id,
      title,
      slug,
      image
    }
  }
`;

export const BEST_SELLERS_QUERY = groq`
  *[_type == "product" && isBestSeller == true] | order(salesCount desc) [0...8] {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    status,
    stock,
    "category": category->title,
    "brand": brand->{
      _id,
      title,
      slug,
      image
    }
  }
`;

export const TOP_SELLING_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(salesCount desc) [0...12] {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    status,
    stock,
    "category": category->title,
    "brand": brand->{
      _id,
      title,
      slug,
      image
    }
  }
`;

export const FEATURED_BEST_SELLERS_QUERY = groq`
  *[_type == "product" && isBestSeller == true] | order(salesCount desc) [0...4] {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    status,
    stock,
    "category": category->title,
    "brand": brand->{
      _id,
      title,
      slug,
      image
    }
  }
`;

export const PRODUCTS_BY_BRAND_QUERY = groq`
  *[_type == "product" && references(*[_type == "brand" && slug.current == $slug]._id)] 
  | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    price,
    discount,
    images,
    isBestSeller,
    salesCount,
    inStock,
    description,
    shopeeUrl,
    lazadaUrl,
    status,
    stock,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "brand": brand->{
      _id,
      title,
      slug,
      image
    }
  }
`;

export const BRANDS_QUERY = groq`
  *[_type == 'brand'] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }
`;

export const BRAND_QUERY = groq`
  *[_type == "brand" && slug.current == $slug] {
    _id,
    title,
    slug,
    description,
    image
  }
`;

export const BRANDS_BY_CATEGORY_QUERY = groq`
  *[_type == "brand" && _id in *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)].brand._ref] 
  | order(title asc) {
    _id,
    title,
    slug,
    description,
    image
  }
`;

// ✅ Blog Queries
export const LATEST_BLOG_QUERY = groq`
  *[_type == 'blog' && isLatest == true] | order(title asc) {
    ...,
    blogcategories[]->{ title }
  }
`;

// ✅ Warehouse Showcase Query
export const WAREHOUSE_QUERY = groq`
  *[_type == "warehouseShowcase"][0] {
    title,
    description,
    photos[]{ asset->{ url } },
    salesContact {
      name,
      email,
      phone,
      photo { asset->{ url } }
    },
    location {
      address,
      latitude,
      longitude
    }
  }
`;

// ✅ Dealer Info Query
export const DEALER_INFO_QUERY = groq`
  *[_type == "dealerInfo"][0]{
    title,
    intro,
    benefits,
    requirements,
    steps,
    contactName,
    contactEmail,
    contactPhone
  }
`;

// ✅ Get brand by ID
export const GET_BRAND_BY_ID = groq`
  *[_type == "brand" && _id == $id][0] {
    _id,
    title,
    slug,
    description,
    image
  }
`;
