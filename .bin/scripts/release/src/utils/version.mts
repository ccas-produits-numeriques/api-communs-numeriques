import { getPrerelease } from "./release.mjs";

export function getShaVersion(sha: string) {
  return `sha-${sha.substring(0, 7)}`;
}

export function getHotfixTag() {
  const tag = process.env.CI_COMMIT_TAG ?? "";
  return /^hotfix-\d+$/.test(tag) ? tag : null;
}

export function getReleaseVersion(release_id: number) {
  return `rc-${release_id}`;
}

export async function getCurrentVersion(env_type: "recette" | "preproduction", sha: string, force: boolean) {
  if (env_type === "recette") {
    return getShaVersion(sha);
  }

  if (getHotfixTag()) {
    return getShaVersion(sha);
  }

  const prerelease = await getPrerelease(sha);

  if (prerelease) {
    return prerelease.tag_name;
  }

  if (!force) {
    throw new Error(`No prerelease found for commit ${sha}.`);
  }
  return getShaVersion(sha);
}
