import "server-only";
import { cache } from "react";
import { validateVideoSlug } from "../lib/video-page";
import { client } from "./client";
import { videoPageQuery, type SanityVideoPage } from "./videoPageQuery";

// React cache deduplicates metadata/page reads within a request, not across visits.
export const fetchVideoPage = cache(async (slug: string) => {
  if (validateVideoSlug(slug) !== true) return null;

  return client.fetch<SanityVideoPage | null>(
    videoPageQuery,
    { slug },
    { perspective: "published", useCdn: false, cache: "no-store" },
  );
});
