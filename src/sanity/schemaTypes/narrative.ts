import { defineType, defineField } from "sanity";

/**
 * Singleton — About / Narrative section content.
 * There is always exactly one of these documents.
 */
export const narrativeSchema = defineType({
  name: "narrative",
  title: "Narrative (About Section)",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Bio Text (paragraph 1)",
      type: "text",
      rows: 5,
      description: "First paragraph of the about section.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bioLine2",
      title: "Bio Text (paragraph 2)",
      type: "text",
      rows: 3,
      description: "Second paragraph (e.g. 'Take a look at some of my work below.').",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload your profile photo here.",
    }),
    defineField({
      name: "profileImageUrl",
      title: "Profile Image URL (existing /public path)",
      type: "string",
      description: 'Use if image is already in /public, e.g. "/Images/Me/jag.png".',
    }),
    defineField({
      name: "name",
      title: "Display Name",
      type: "string",
      initialValue: "Erik Karlsson",
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      initialValue: "Digital Designer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Narrative — About Section" };
    },
  },
});
