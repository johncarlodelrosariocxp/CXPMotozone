// app/sanity/schema/product.ts
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Base Price (₱)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "discount",
      title: "Base Discount Percentage %",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    }),

    // ✅ BEST SELLER FIELDS
    defineField({
      name: "isBestSeller",
      title: "Best Seller",
      type: "boolean",
      description: "Mark this product as a best seller",
      initialValue: false,
    }),
    defineField({
      name: "salesCount",
      title: "Sales Count",
      type: "number",
      description: "Number of times this product has been sold",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),

    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      description: "Is this product currently in stock?",
      initialValue: true,
    }),

    defineField({
      name: "variantType",
      title: "Variant Type",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Volume", value: "volume" },
          { title: "Scent", value: "scent" },
          { title: "Size", value: "size" },
          { title: "Color", value: "color" },
        ],
      },
      initialValue: "none",
    }),

    defineField({
      name: "volumeVariants",
      title: "Volume Variants",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.variantType !== "volume",
    }),

    defineField({
      name: "scentVariants",
      title: "Scent Variants",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.variantType !== "scent",
    }),

    // 🛒 E-commerce Links for main product
    defineField({
      name: "shopeeUrl",
      title: "Shopee URL",
      type: "url",
      description: "Main Shopee link for this product",
    }),
    defineField({
      name: "lazadaUrl",
      title: "Lazada URL",
      type: "url",
      description: "Main Lazada link for this product",
    }),

    // 🛍️ Product Variants with E-commerce Links
    defineField({
      name: "variants",
      title: "Product Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Variant Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price (₱)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "discount",
              title: "Discount %",
              type: "number",
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "shopeeUrl",
              title: "Shopee URL for this variant",
              type: "url",
            }),
            defineField({
              name: "lazadaUrl",
              title: "Lazada URL for this variant",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "name",
              price: "price",
              discount: "discount",
            },
            prepare({ title, price, discount }) {
              return {
                title: title || "Unnamed Variant",
                subtitle: `₱${price}${discount ? ` (${discount}% off)` : ""}`,
              };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "images.0",
      subtitle: "price",
      isBestSeller: "isBestSeller",
      salesCount: "salesCount",
      shopeeUrl: "shopeeUrl",
      lazadaUrl: "lazadaUrl",
    },
    prepare({
      title,
      subtitle,
      media,
      isBestSeller,
      salesCount,
      shopeeUrl,
      lazadaUrl,
    }) {
      const hasLinks = shopeeUrl || lazadaUrl;
      return {
        title: isBestSeller ? `🔥 ${title}` : title,
        subtitle: subtitle
          ? `₱${subtitle}${salesCount ? ` • ${salesCount} sold` : ""}${hasLinks ? " • 🛒" : ""}`
          : "No base price",
        media,
      };
    },
  },
});
