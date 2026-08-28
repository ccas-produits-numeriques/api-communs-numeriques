import { RequestError } from "octokit";
import { getOctokitClient } from "../utils/client.mjs";
import { owner, repo } from "../utils/context.mjs";
import { getLatestRelease } from "../utils/release.mjs";
import { generateReleaseNotes } from "../utils/releaseNotes.mjs";

async function getWipRelease() {
  const firstPage = await getOctokitClient().rest.repos.listReleases({
    owner,
    repo,
    per_page: 100,
    page: 1,
  });

  if (firstPage.data.length === 0) return null;

  const firstRelease = firstPage.data[0];
  if (firstRelease && firstRelease.tag_name === "latest-build" && firstRelease.draft) {
    return firstRelease;
  }

  return null;
}

async function updateWipRelease(sha: string) {
  const latest = await getLatestRelease();
  if (!latest) {
    return;
  }

  const notes = await generateReleaseNotes({ sha, previousRelease: latest });
  const existing = await getWipRelease();

  if (existing) {
    await getOctokitClient().rest.repos.updateRelease({
      owner,
      repo,
      release_id: existing.id,
      tag_name: "latest-build",
      name: `WIP Release - ${new Date().toDateString()}`,
      body: notes,
      draft: true,
      prerelease: true,
      make_latest: "false",
    });
  } else {
    await getOctokitClient().rest.repos.createRelease({
      owner,
      repo,
      tag_name: "latest-build",
      name: `WIP Release - ${new Date().toDateString()}`,
      body: notes,
      draft: true,
      prerelease: true,
      make_latest: "false",
    });
  }
}

async function updateLatestBuildTag(sha: string) {
  try {
    await getOctokitClient().rest.git.updateRef({
      owner,
      repo,
      ref: "tags/latest-build",
      sha: sha,
      force: true,
    });
  } catch (error) {
    if (error instanceof RequestError && error.status === 422) {
      await getOctokitClient().rest.git.createRef({
        owner,
        repo,
        ref: "refs/tags/latest-build",
        sha: sha,
      });
      return;
    }
    throw new Error("Failed to update latest-build tag");
  }
}

export async function postBuild(sha: string) {
  await updateLatestBuildTag(sha);
  await updateWipRelease(sha);
}
