import { defineField, defineType } from "sanity";
import { CATEGORY_OPTIONS } from "./sectionChip";

export const roundupItem = defineType({
  name: "roundupItem",
  title: "Roundup item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required().min(8).max(200),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "One-line summary",
      type: "text",
      rows: 3,
      description:
        "Written so a featured snippet or AI assistant can lift it directly. Plain prose, no labels.",
      validation: (Rule) => Rule.required().min(40).max(500),
    }),
    defineField({
      name: "whyItMatters",
      title: "Why it matters",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(40).max(800),
    }),
    defineField({
      name: "sourceNote",
      title: "Source note (publishing reminder)",
      type: "text",
      rows: 2,
      description: "Editorial note about which source to verify before publishing.",
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
      description: "Link to the primary source. Required before publishing.",
    }),
    defineField({
      name: "category",
      title: "Section / category",
      type: "string",
      options: {
        list: CATEGORY_OPTIONS.map((value) => ({ title: value, value })),
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "week",
      title: "Week label",
      type: "string",
      description: "e.g. this-week, last-week, 2-weeks-ago",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order within week",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Published newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Week then order",
      name: "weekOrder",
      by: [
        { field: "week", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", week: "week", category: "category" },
    prepare: ({ title, week, category }) => ({
      title,
      subtitle: [week, category].filter(Boolean).join(" · "),
    }),
  },
});
