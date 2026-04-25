import { defineType, defineField } from "sanity";

/**
 * Project document — maps directly to CaseStudy component props.
 * Add, remove, and reorder projects in the studio.
 */
export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Order (manual)",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  fields: [
    // ── Identity ──────────────────────────────────────────────────
    defineField({
      name: "orderRank",
      title: "Order",
      type: "number",
      description: "Controls the display order. Lower numbers appear first.",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "number",
      title: "Number Label",
      type: "string",
      description: 'Displayed in the sidebar, e.g. "01"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionId",
      title: "Section ID (anchor link)",
      type: "slug",
      description: 'Determines the URL anchor, e.g. "mind-climber" → #mind-climber. Used for nav links.',
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: 'e.g. "Brand Identity, UI/UX Design"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Background Color",
      type: "string",
      description: "Hex color for the section background, e.g. #160800",
      initialValue: "#050505",
      validation: (Rule) => Rule.required(),
    }),

    // ── Media ─────────────────────────────────────────────────────
    defineField({
      name: "mediaLayout",
      title: "Main Media Layout",
      type: "string",
      description: "Choose how the main media is presented.",
      options: {
        list: [
          { title: "Carousel (multiple images/videos, swipeable)", value: "carousel" },
          { title: "Hero Split (2 items side by side)", value: "heroSplit" },
          { title: "None (text-only)", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "carousel",
    }),
    defineField({
      name: "carouselMedia",
      title: "Carousel Media",
      type: "array",
      of: [{ type: "mediaItem" }],
      description: "Images and videos that appear in the swipeable carousel.",
      hidden: ({ document }) => document?.mediaLayout !== "carousel",
    }),
    defineField({
      name: "heroSplitMedia",
      title: "Hero Split Media",
      type: "array",
      of: [{ type: "mediaItem" }],
      description: "Exactly 2 items displayed side by side at the top of the section.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.mediaLayout !== "heroSplit") return true;
          if (!value || (value as unknown[]).length !== 2)
            return "Hero Split requires exactly 2 media items.";
          return true;
        }),
      hidden: ({ document }) => document?.mediaLayout !== "heroSplit",
    }),
    defineField({
      name: "heroSplitReverse",
      title: "Reverse Hero Split Layout",
      type: "boolean",
      description: "Swap which side the larger image appears on.",
      initialValue: false,
      hidden: ({ document }) => document?.mediaLayout !== "heroSplit",
    }),

    // ── Sub Images ────────────────────────────────────────────────
    defineField({
      name: "hasSubImages",
      title: "Show Sub-Images Section",
      type: "boolean",
      description: "Show a second row of 2 images/videos below the text.",
      initialValue: false,
    }),
    defineField({
      name: "subImages",
      title: "Sub-Images",
      type: "array",
      of: [{ type: "mediaItem" }],
      description: "Exactly 2 items shown below the title/description.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!context.document?.hasSubImages) return true;
          if (!value || (value as unknown[]).length !== 2)
            return "Sub-Images requires exactly 2 items.";
          return true;
        }),
      hidden: ({ document }) => !document?.hasSubImages,
    }),
    defineField({
      name: "reverseSubImages",
      title: "Reverse Sub-Images Layout",
      type: "boolean",
      description: "Swap which item is larger in the sub-images row.",
      initialValue: false,
      hidden: ({ document }) => !document?.hasSubImages,
    }),

    // ── CTA ───────────────────────────────────────────────────────
    defineField({
      name: "hideCta",
      title: "Hide CTA Button",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "View Case Study",
      hidden: ({ document }) => !!document?.hideCta,
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Link URL",
      type: "string",
      hidden: ({ document }) => !!document?.hideCta,
    }),
    defineField({
      name: "externalLink",
      title: "Open in new tab",
      type: "boolean",
      initialValue: true,
      hidden: ({ document }) => !!document?.hideCta,
    }),
  ],
  preview: {
    select: {
      number: "number",
      title: "title",
    },
    prepare({ number, title }) {
      return { title: `${number} — ${title}` };
    },
  },
});
