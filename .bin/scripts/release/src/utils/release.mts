import { getOctokitClient } from "./client.mjs";
import { owner, repo } from "./context.mjs";

export async function getLatestRelease(options: { stableOnly?: boolean } = {}) {
  const octokit = getOctokitClient();
  const iterator = octokit.paginate.iterator(octokit.rest.repos.listReleases, {
    owner,
    repo,
    per_page: 100,
  });

  for await (const { data: releases } of iterator) {
    const latest = releases.find((release) => {
      if (release.draft) return false;
      if (options.stableOnly && release.prerelease) return false;
      return true;
    });

    if (latest) return latest;
  }

  return null;
}

export async function getPrerelease(sha: string) {
  const octokit = getOctokitClient();

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listReleases, {
    owner,
    repo,
    per_page: 100,
  });

  for await (const { data: releases } of iterator) {
    const found = releases.find((release) => {
      if (release.draft) return false;
      if (!release.prerelease) return false;
      return release.target_commitish === sha;
    });

    if (found) return found;
  }

  return null;
}

export async function getStableRelease(sha: string) {
  const octokit = getOctokitClient();

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listReleases, {
    owner,
    repo,
    per_page: 100,
  });

  for await (const { data: releases } of iterator) {
    const found = releases.find((release) => {
      if (release.draft) return false;
      if (release.prerelease) return false;
      return release.target_commitish === sha;
    });

    if (found) return found;
  }

  return null;
}
