import { defineType, defineField } from "sanity";

export const dealerInfoType = defineType({
  name: "dealerInfo",
  title: "Dealer Info Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string" }),
    defineField({ name: "intro", title: "Intro Paragraph", type: "text" }),
    defineField({
      name: "benefits",
      title: "Dealer Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "steps",
      title: "How to Apply Steps",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "contactName", title: "Contact Name", type: "string" }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
  ],
});
