import { defineType, defineField } from "sanity";

/**
 * Reusable media item — used in carousel, hero split, and sub-images.
 * Supports both uploaded Sanity assets and URL references (for existing /public files).
 */
export const mediaItemSchema = defineType({
  name: "mediaItem",
  title: "Media Item",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    // ── Image fields ──────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL (existing /public path)",
      type: "string",
      description: 'Use this for existing images already in /public, e.g. "/Images/MindClimber/mobile1.png"',
      hidden: ({ parent }) => parent?.mediaType !== "image",
    }),
    // ── Video fields ──────────────────────────────────────────────
    defineField({
      name: "videoFile",
      title: "Video File (upload)",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (existing /public path or external URL)",
      type: "string",
      description: 'Use this for existing videos already in /public, e.g. "/Images/MindClimber/Loggo.mp4"',
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    // ── Shared fields ─────────────────────────────────────────────
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the media.",
    }),
    defineField({
      name: "description",
      title: "Accessibility Description",
      type: "text",
      rows: 2,
      description: "Screen-reader description of the media content.",
    }),
    defineField({
      name: "objectFit",
      title: "Object Fit",
      type: "string",
      options: {
        list: [
          { title: "Cover (fill frame, crop)", value: "cover" },
          { title: "Contain (show full media)", value: "contain" },
          { title: "Fill (stretch)", value: "fill" },
        ],
      },
      initialValue: "cover",
    }),
    defineField({
      name: "objectPosition",
      title: "Object Position",
      type: "string",
      description: 'e.g. "center", "top", "40% center". Defaults to "center".',
    }),
    defineField({
      name: "className",
      title: "Extra CSS Classes",
      type: "string",
      description: "Advanced: Tailwind classes for the media element itself.",
    }),
    defineField({
      name: "containerClassName",
      title: "Container CSS Classes",
      type: "string",
      description: "Advanced: Tailwind classes for the wrapping container.",
    }),
  ],
  preview: {
    select: {
      mediaType: "mediaType",
      caption: "caption",
      imageUrl: "imageUrl",
      videoUrl: "videoUrl",
      image: "image",
    },
    prepare({ mediaType, caption, imageUrl, videoUrl, image }) {
      const label = caption || imageUrl || videoUrl || "(no caption)";
      return {
        title: `${mediaType === "video" ? "🎬" : "🖼️"} ${label}`,
        media: image,
      };
    },
  },
});
