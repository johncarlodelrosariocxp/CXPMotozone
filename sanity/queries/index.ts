// app/sanity/queries.ts
import { sanityFetch } from "../lib/live";
import {
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  WAREHOUSE_QUERY,
  DEALER_INFO_QUERY,
  BEST_SELLERS_QUERY,
  TOP_SELLING_PRODUCTS_QUERY,
  FEATURED_BEST_SELLERS_QUERY,
  BRANDS_BY_CATEGORY_QUERY,
  PRODUCTS_BY_BRAND_QUERY,
} from "./query";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import type { Brand, Product, Category, Blog } from "@/sanity.types";

// ✅ Define DealerInfo locally since it's not in sanity.types
interface DealerInfo {
  title: string;
  intro: string;
  benefits: string[];
  requirements: string[];
  steps: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// ✅ Define WarehouseShowcase locally since it's not in sanity.types
interface WarehouseShowcase {
  title: string;
  description: string;
  location: {
    address?: string;
    latitude?: number;
    longitude?: number;
  } | null;
  photos: Array<{ asset: { url: string } }>;
  salesContact: {
    name?: string;
    email?: string;
    phone?: string;
    photo?: { asset: { url: string } };
  };
}

// ✅ SIMPLE FIX: Create a static version for generateStaticParams
export const getBrandsStatic = async (): Promise<Brand[]> => {
  try {
    const data = await client.fetch<Brand[]>(
      groq`*[_type == 'brand'] | order(title asc) {
        _id,
        title,
        slug
      }`
    );
    return data || [];
  } catch (error) {
    console.error("Error fetching static brands:", error);
    return [];
  }
};

// ✅ Categories - FIXED: Add proper type handling
export const getCategories = async (quantity?: number): Promise<Category[]> => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc)[0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;

    const { data } = await sanityFetch<Category[]>({
      query,
      params: quantity ? { quantity } : {},
    });

    // Ensure we return an array
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// ✅ Brands - FIXED: Add proper type handling
export const getAllBrands = async (): Promise<Brand[]> => {
  try {
    const { data } = await sanityFetch<Brand[]>({ query: BRANDS_QUERY });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return [];
  }
};

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const { data } = await sanityFetch<Brand[]>({ query: BRANDS_QUERY });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const getBrand = async (slug: string): Promise<Brand | null> => {
  try {
    const { data } = await sanityFetch<Brand[]>({
      query: BRAND_QUERY,
      params: { slug },
    });
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching brand by slug:", error);
    return null;
  }
};

export const getBrandsByCategory = async (
  categorySlug: string
): Promise<Brand[]> => {
  try {
    const { data } = await sanityFetch<Brand[]>({
      query: BRANDS_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching brands by category:", error);
    return [];
  }
};

export const getProductsByBrand = async (slug: string): Promise<Product[]> => {
  try {
    const { data } = await sanityFetch<Product[]>({
      query: PRODUCTS_BY_BRAND_QUERY,
      params: { slug },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return [];
  }
};

// ✅ Blogs - FIXED: Add proper type handling
export const getLatestBlogs = async (): Promise<Blog[]> => {
  try {
    const { data } = await sanityFetch<Blog[]>({ query: LATEST_BLOG_QUERY });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};

// ✅ Deals - FIXED: Add proper type handling
export const getDealProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await sanityFetch<Product[]>({ query: DEAL_PRODUCTS });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching deal products:", error);
    return [];
  }
};

// ✅ Best Sellers - FIXED: Add proper type handling
export const getBestSellers = async (limit?: number): Promise<Product[]> => {
  try {
    const query = limit
      ? `*[_type == "product" && isBestSeller == true] | order(salesCount desc) [0...$limit] {
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
        }`
      : BEST_SELLERS_QUERY;

    const { data } = await sanityFetch<Product[]>({
      query,
      params: limit ? { limit } : {},
    });

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching best sellers:", error);
    return [];
  }
};

export const getTopSellingProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await sanityFetch<Product[]>({
      query: TOP_SELLING_PRODUCTS_QUERY,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching top selling products:", error);
    return [];
  }
};

export const getFeaturedBestSellers = async (): Promise<Product[]> => {
  try {
    const { data } = await sanityFetch<Product[]>({
      query: FEATURED_BEST_SELLERS_QUERY,
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching featured best sellers:", error);
    return [];
  }
};

// ✅ Product by Slug - FIXED: Add proper type handling
export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const { data } = await sanityFetch<Product | null>({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return data;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

// ✅ Warehouse Showcase
export const getWarehouseShowcase = async (): Promise<WarehouseShowcase> => {
  try {
    const { data } = await sanityFetch<WarehouseShowcase>({
      query: WAREHOUSE_QUERY,
    });

    if (!data || typeof data !== "object") {
      return {
        title: "Default Warehouse",
        description: "No data available.",
        location: null,
        photos: [],
        salesContact: {},
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching warehouse showcase:", error);
    return {
      title: "Default Warehouse",
      description: "No data available.",
      location: null,
      photos: [],
      salesContact: {},
    };
  }
};

// ✅ Dealer Info
export const getDealerInfo = async (): Promise<DealerInfo> => {
  try {
    const { data } = await sanityFetch<DealerInfo>({
      query: DEALER_INFO_QUERY,
    });

    if (!data || typeof data !== "object") {
      return {
        title: "Become a Dealer",
        intro: "No dealer info available.",
        benefits: [],
        requirements: [],
        steps: [],
        contactName: "John Carlo Del Rosario",
        contactEmail: "john@cxpmotozone.com",
        contactPhone: "+63 912 345 6789",
      };
    }

    return data;
  } catch (error) {
    console.error("Error fetching dealer info:", error);
    return {
      title: "Become a Dealer",
      intro: "No dealer info available.",
      benefits: [],
      requirements: [],
      steps: [],
      contactName: "John Carlo Del Rosario",
      contactEmail: "john@cxpmotozone.com",
      contactPhone: "+63 912 345 6789",
    };
  }
};
