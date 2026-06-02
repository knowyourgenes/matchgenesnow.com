import { defineField, defineType } from "sanity";

export const CATEGORY_OPTIONS = [
  "this-week",
  "research",
  "india-focus",
  "explainers",
  "policy-ethics",
  "tools-tests",
  "archive",
] as const;

export const sectionChip = defineType({
  name: "sectionChip",
  title: "Section chip",
  type: "document",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "label", maxLength: 32 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
      description: "Internal category key used to filter roundup items.",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
