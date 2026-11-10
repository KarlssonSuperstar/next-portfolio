import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchVideoPage } from "@/sanity/videoPages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await fetchVideoPage(slug);

  return {
    title: video ? `${video.title} — Erik Karlsson` : "Video not found",
    description: video?.description ?? "Video by Erik Karlsson.",
    robots: { index: false, follow: false, noarchive: true },
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;
  const video = await fetchVideoPage(slug);

  if (!video) notFound();

  return (
    <article className="flex min-h-dvh flex-col justify-center bg-[#050505] px-4 py-10 text-white sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 sm:mb-10">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Erik Karlsson
          </p>
          <h1 className="break-words text-3xl font-semibold tracking-tight sm:text-5xl">
            {video.title}
          </h1>
        </header>
        <video
          src={video.videoUrl}
          poster={video.posterUrl ?? undefined}
          controls
          playsInline
          preload="metadata"
          aria-label={video.title}
          aria-describedby={video.description ? "video-description" : undefined}
          className="max-h-[75dvh] w-full rounded-lg bg-black object-contain ring-1 ring-white/10"
        >
          Your browser does not support video playback.
        </video>
        {video.description && (
          <p
            id="video-description"
            className="mt-6 max-w-3xl whitespace-pre-line text-base leading-relaxed text-white/70 sm:text-lg"
          >
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
}
