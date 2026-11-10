import assert from "node:assert/strict";
import { test } from "node:test";
import { evaluate, parse } from "groq-js";
import { createVideoSlug, validateVideoSlug } from "../src/lib/video-page";
import { videoPageQuery } from "../src/sanity/videoPageQuery";

test("sidnamn tillåter delbara adresser men inte sökvägar eller systemnamn", () => {
  for (const slug of ["min-film", "film2026", "a", "123"]) {
    assert.equal(validateVideoSlug(slug), true);
  }
  for (const slug of [undefined, "", "studio", "Studio", "api", "images", "_next", "_vercel", "min/film", "/film", "Film", "film.mp4", "film?x=1", "film#x", "min film", "åäö", "film--1", "-film", "film-", "x".repeat(97)]) {
    assert.notEqual(validateVideoSlug(slug), true, String(slug));
  }
});

test("Generate gör svenska titlar till användbara sidnamn", () => {
  assert.equal(createVideoSlug("  Årets film: Äventyr på Öland!  "), "arets-film-aventyr-pa-oland");
  assert.equal(validateVideoSlug(createVideoSlug("Lång titel ".repeat(20))), true);
  assert.equal(createVideoSlug("🎬"), "");
});

const asset = { _id: "file-test-mp4", _type: "sanity.fileAsset", url: "https://cdn.sanity.io/files/test/production/test.mp4" };
const video = {
  _id: "published-video",
  _type: "videoPage",
  title: "Min film",
  slug: { current: "min-film" },
  videoFile: { asset: { _ref: asset._id } },
};

async function lookup(slug: string, dataset: object[]) {
  const result = await evaluate(parse(videoPageQuery), { dataset, params: { slug } });
  return result.get();
}

test("hämtar enbart rätt publicerad videosida och löser filens URL", async () => {
  const result = await lookup("min-film", [
    asset,
    { ...video, _id: "project", _type: "project", title: "Startsidesprojekt" },
    { ...video, _id: "other", slug: { current: "annan-film" } },
    video,
  ]);
  assert.equal(result._id, video._id);
  assert.equal(result.videoUrl, asset.url);
  assert.equal(result.title, "Min film");
});

test("utkast och releaseversioner exponeras aldrig även om en lästoken finns", async () => {
  for (const id of ["drafts.published-video", "versions.release.published-video"]) {
    assert.equal(await lookup("min-film", [asset, { ...video, _id: id }]), null);
  }
  const result = await lookup("min-film", [
    asset,
    { ...video, _id: "drafts.published-video", title: "Opublicerad ändring" },
    video,
  ]);
  assert.equal(result.title, "Min film");
});

test("okänd adress, saknad fil och avpublicerad sida ger ingen träff", async () => {
  assert.equal(await lookup("saknas", [asset, video]), null);
  assert.equal(await lookup("min-film", [video]), null);
  assert.equal(await lookup("min-film", [asset, { ...video, videoFile: null }]), null);
  assert.equal(await lookup("min-film", [asset]), null);
});

test("ändrat sidnamn flyttar sidan utan att lämna en gammal adress", async () => {
  const renamed = { ...video, slug: { current: "ny-film" } };
  assert.equal(await lookup("min-film", [asset, renamed]), null);
  assert.equal((await lookup("ny-film", [asset, renamed]))._id, video._id);
});
