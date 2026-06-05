// sanity/schemaTypes/warehouseType.ts
import { defineType, defineField } from "sanity";

export const warehouseShowcase = defineType({
  name: "warehouseShowcase",
  title: "Warehouse Showcase",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({
      name: "photos",
      title: "Photos of Warehouse",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "salesContact",
      title: "Sales Contact Person",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "phone", title: "Phone", type: "string" }),
        defineField({ name: "photo", title: "Photo", type: "image" }),
      ],
    }),
    defineField({
      name: "location",
      title: "Warehouse Location",
      type: "object",
      fields: [
        defineField({
          name: "address",
          title: "Address",
          type: "string",
          initialValue:
            "Phase 3 Warehouse 6, FOCHUN Industrial Compound, Santol, Balagtas, Bulacan, Philippines",
        }),
        defineField({
          name: "latitude",
          title: "Latitude",
          type: "number",
          initialValue: 14.8227794,
        }),
        defineField({
          name: "longitude",
          title: "Longitude",
          type: "number",
          initialValue: 120.9130435,
        }),
      ],
    }),
  ],
});
