import { defineType, defineField } from "sanity";

/**
 * Singleton — Global site settings.
 * Controls: tools list, contact email, social media links.
 */
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // ── Tools & Apps ──────────────────────────────────────────────
    defineField({
      name: "tools",
      title: "Apps & Tools",
      type: "array",
      of: [{ type: "string" }],
      description: "Add or remove tools. Order them by dragging.",
      initialValue: [
        "Figma",
        "Figma Make",
        "Lovable",
        "Spline",
        "Framer",
        "Webflow",
        "Antigravity",
        "React",
        "Next.js",
        "Creative Cloud",
        "Vercel",
        "Tailwind CSS",
        "WCAG",
      ],
    }),

    // ── Contact ───────────────────────────────────────────────────
    defineField({
      name: "contactEmail",
      title: "Contact Form Email",
      type: "string",
      description: "Messages from the contact form are sent to this address (via Formsubmit.co).",
      validation: (Rule) => Rule.required().email(),
    }),

    // ── Social Links ──────────────────────────────────────────────
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "GitHub", value: "github" },
                  { title: "Behance", value: "behance" },
                  { title: "Dribbble", value: "dribbble" },
                  { title: "X / Twitter", value: "twitter" },
                  { title: "Phone", value: "phone" },
                  { title: "Email", value: "email" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: 'Full URL or "tel:+46XXXXXXXXX" for phone.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Accessible Label",
              type: "string",
              description: 'e.g. "LinkedIn", "Call (+46) 730 471 288"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "displayText",
              title: "Display Text (tooltip / hover)",
              type: "string",
              description: "Optional text shown on hover (like the phone number tooltip).",
            }),
          ],
          preview: {
            select: { platform: "platform", label: "label" },
            prepare({ platform, label }) {
              const icons: Record<string, string> = {
                linkedin: "💼",
                instagram: "📷",
                github: "🐙",
                behance: "🎨",
                dribbble: "🏀",
                twitter: "🐦",
                phone: "📱",
                email: "✉️",
                other: "🔗",
              };
              return { title: `${icons[platform] ?? "🔗"} ${label}` };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
