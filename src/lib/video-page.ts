export const VIDEO_SLUG_MAX_LENGTH = 96;

// Keep in sync with top-level application routes and public directories.
const reservedSlugs = new Set(["studio", "api", "images", "_next", "_vercel"]);

export function validateVideoSlug(slug: string | undefined): true | string {
  if (!slug) return "Ange ett sidnamn, till exempel min-film.";
  if (reservedSlugs.has(slug.toLowerCase())) {
    return "Det här namnet används av webbplatsen. Välj ett annat sidnamn.";
  }
  if (slug.length > VIDEO_SLUG_MAX_LENGTH) {
    return `Sidnamnet får vara högst ${VIDEO_SLUG_MAX_LENGTH} tecken.`;
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return "Använd små bokstäver a–z, siffror och bindestreck, utan / eller mellanslag.";
  }
  return true;
}

export function createVideoSlug(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, VIDEO_SLUG_MAX_LENGTH)
    .replace(/-+$/g, "");
}
