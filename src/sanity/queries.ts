import { groq } from "next-sanity";
import { client, urlFor } from "./client";
import type { MediaType } from "@/components/MediaCarousel";
import type { MediaContent } from "@/components/CaseStudy";

// ─── Raw Sanity types ─────────────────────────────────────────────────────────

interface SanityMediaItem {
  mediaType: "image" | "video";
  image?: { asset: { _ref: string; url?: string }; hotspot?: unknown };
  imageUrl?: string;
  videoFile?: { asset: { _ref: string; url: string } };
  videoUrl?: string;
  caption?: string;
  description?: string;
  objectFit?: "cover" | "contain" | "fill";
  objectPosition?: string;
  className?: string;
  containerClassName?: string;
}

export interface SanityProject {
  _id: string;
  orderRank: number;
  number: string;
  title: string;
  sectionId: { current: string };
  category: string;
  description: string;
  color: string;
  mediaLayout: "carousel" | "heroSplit" | "none";
  carouselMedia?: SanityMediaItem[];
  heroSplitMedia?: SanityMediaItem[];
  heroSplitReverse?: boolean;
  hasSubImages?: boolean;
  subImages?: SanityMediaItem[];
  reverseSubImages?: boolean;
  hideCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
  externalLink?: boolean;
}

export interface SanityNarrative {
  bio: string;
  bioLine2?: string;
  profileImage?: { asset: { _ref: string } };
  profileImageUrl?: string;
  name?: string;
  role?: string;
}

export interface SanitySocialLink {
  platform: string;
  url: string;
  label: string;
  displayText?: string;
}

export interface SanitySettings {
  tools: string[];
  contactEmail: string;
  socialLinks: SanitySocialLink[];
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const MEDIA_ITEM_FRAGMENT = groq`{
  mediaType,
  image { asset->{ _ref, url }, hotspot },
  imageUrl,
  videoFile { asset->{ _ref, url } },
  videoUrl,
  caption,
  description,
  objectFit,
  objectPosition,
  className,
  containerClassName
}`;

export const projectsQuery = groq`
  *[_type == "project"] | order(orderRank asc) {
    _id,
    orderRank,
    number,
    title,
    sectionId,
    category,
    description,
    color,
    mediaLayout,
    carouselMedia[] ${MEDIA_ITEM_FRAGMENT},
    heroSplitMedia[] ${MEDIA_ITEM_FRAGMENT},
    heroSplitReverse,
    hasSubImages,
    subImages[] ${MEDIA_ITEM_FRAGMENT},
    reverseSubImages,
    hideCta,
    ctaText,
    ctaLink,
    externalLink
  }
`;

export const narrativeQuery = groq`
  *[_type == "narrative"][0] {
    bio,
    bioLine2,
    profileImage { asset->{ _ref, url } },
    profileImageUrl,
    name,
    role
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    tools,
    contactEmail,
    socialLinks[] { platform, url, label, displayText }
  }
`;

// ─── Fetch helpers ────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<SanityProject[]> {
  try {
    return await client.fetch(projectsQuery);
  } catch {
    return [];
  }
}

export async function fetchNarrative(): Promise<SanityNarrative | null> {
  try {
    return await client.fetch(narrativeQuery);
  } catch {
    return null;
  }
}

export async function fetchSiteSettings(): Promise<SanitySettings | null> {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

// ─── Media item converters ────────────────────────────────────────────────────

/**
 * Resolves a SanityMediaItem to a src URL string.
 * Priority: Sanity-hosted asset → explicit URL field
 */
function resolveMediaSrc(item: SanityMediaItem): string {
  if (item.mediaType === "image") {
    if (item.image?.asset) return urlFor(item.image).url();
    return item.imageUrl ?? "";
  }
  if (item.mediaType === "video") {
    if (item.videoFile?.asset?.url) return item.videoFile.asset.url;
    return item.videoUrl ?? "";
  }
  return "";
}

/** Converts a Sanity media item to the MediaType shape used by MediaCarousel */
export function toCarouselItem(item: SanityMediaItem): MediaType {
  return {
    src: resolveMediaSrc(item),
    type: item.mediaType,
    description: item.description,
    caption: item.caption,
  };
}

/** Converts a Sanity media item to the MediaContent shape used by CaseStudy split layouts */
export function toMediaContent(item: SanityMediaItem): MediaContent {
  return {
    src: resolveMediaSrc(item),
    type: item.mediaType,
    caption: item.caption,
    description: item.description,
    objectFit: item.objectFit,
    objectPosition: item.objectPosition,
    className: item.className,
    containerClassName: item.containerClassName,
  };
}

// ─── Narrative image resolver ─────────────────────────────────────────────────

export function resolveNarrativeImageSrc(narrative: SanityNarrative): string {
  if (narrative.profileImage?.asset) {
    return urlFor(narrative.profileImage).width(800).url();
  }
  return narrative.profileImageUrl ?? "/Images/Me/jag.png";
}
