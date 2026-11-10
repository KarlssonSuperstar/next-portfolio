import { defineField, defineType } from "sanity";
import { createVideoSlug, validateVideoSlug } from "../../lib/video-page";

export const videoPageSchema = defineType({
  name: "videoPage",
  title: "Videosida (olistad)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Sidnamn efter /",
      type: "slug",
      description:
        "Skriv bara namnet, till exempel min-film. Adressen blir https://next-portfolio-fawn-zeta.vercel.app/min-film. Generate skapar ett förslag från titeln. Namnet måste vara unikt.",
      options: { source: "title", slugify: createVideoSlug },
      validation: (Rule) =>
        Rule.required().custom((value) => validateVideoSlug(value?.current)),
    }),
    defineField({
      name: "videoFile",
      title: "Video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "Ladda upp en MP4 (H.264) eller WebM. Videon får en egen sida när du klickar Publish. Den visas inte på startsidan eller i menyerna.",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "poster",
      title: "Omslagsbild (valfri)",
      type: "image",
      options: { hotspot: true },
      description: "Visas i spelaren innan besökaren startar videon.",
    }),
    defineField({
      name: "description",
      title: "Beskrivning (valfri)",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", media: "poster" },
    prepare({ title, slug, media }) {
      return { title, subtitle: slug ? `/${slug}` : "Välj ett sidnamn", media };
    },
  },
});
