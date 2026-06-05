import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    // New field for an external video URL
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description:
        "Optional: Add a link to a hosted video (e.g., YouTube, Vimeo).",
    }),
    // End of new field
    defineField({
      name: "blogcategories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "blogcategory" } }),
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "isLatest",
      title: "Latest Blog",
      type: "boolean",
      description: "Toggle to Latest on or off",
      initialValue: true,
    }),
    defineField({
      name: "body",
      type: "blockContent", // Assuming you have a custom 'blockContent' type defined
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      isLatest: "isLatest",
    },
    prepare(selection) {
      const { author, isLatest } = selection;
      return {
        ...selection,
        subtitle: author && `${isLatest ? "Latest | " : ""} By ${author}`,
      };
    },
  },
});
