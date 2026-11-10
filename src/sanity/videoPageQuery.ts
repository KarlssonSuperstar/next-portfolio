// Separate from projectsQuery: video pages must never enter the home page's lists.
export const videoPageQuery = `
  *[
    _type == "videoPage" && slug.current == $slug &&
    !(_id in path("drafts.**")) && !(_id in path("versions.**")) &&
    defined(videoFile.asset->url)
  ][0] {
    _id,
    title,
    description,
    "videoUrl": videoFile.asset->url,
    "posterUrl": poster.asset->url
  }
`;

export interface SanityVideoPage {
  _id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  posterUrl?: string | null;
}
