"use client";

/**
 * Embedded Sanity Studio route at /studio
 * Access at: http://localhost:3000/studio (local) or https://yoursite.com/studio (production)
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
