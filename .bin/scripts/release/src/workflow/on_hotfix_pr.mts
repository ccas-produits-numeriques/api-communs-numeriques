import { RequestError } from "octokit";
import { getOctokitClient } from "../utils/client.mjs";
import { owner, repo } from "../utils/context.mjs";

function getHotfixTagName(prId: number) {
  return `hotfix-${prId}`;
}

async function getHotfixDraftRelease(prId: number) {
  const tagName = getHotfixTagName(prId);
  const iterator = getOctokitClient().paginate.iterator(getOctokitClient().rest.repos.listReleases, {
    owner,
    repo,
    per_page: 100,
  });

  for await (const { data: releases } of iterator) {
    const found = releases.find((r) => r.tag_name === tagName && r.draft);
    if (found) return found;
  }

  return null;
}

async function upsertHotfixTag(prId: number, sha: string) {
  const ref = `tags/${getHotfixTagName(prId)}`;
  try {
    await getOctokitClient().rest.git.updateRef({
      owner,
      repo,
      ref,
      sha,
      force: true,
    });
    console.info(`Updated tag ${ref} to ${sha}`);
  } catch (error) {
    if (error instanceof RequestError && error.status === 422) {
      await getOctokitClient().rest.git.createRef({
        owner,
        repo,
        ref: `refs/${ref}`,
        sha,
      });
      console.info(`Created tag ${ref} pointing to ${sha}`);
      return;
    }
    throw error;
  }
}

export async function hotfixOnOpen(prId: number, sha: string) {
  const prTitle = process.env.PR_TITLE;
  if (!prTitle) throw new Error("PR_TITLE environment variable is required");
  const releaseBody = process.env.PR_BODY ? `${prTitle}\n\n${process.env.PR_BODY}` : prTitle;

  await upsertHotfixTag(prId, sha);

  const existing = await getHotfixDraftRelease(prId);
  const tagName = getHotfixTagName(prId);

  if (existing) {
    console.info(`Updating existing hotfix draft release for PR #${prId}`);
    await getOctokitClient().rest.repos.updateRelease({
      owner,
      repo,
      release_id: existing.id,
      tag_name: tagName,
      name: prTitle,
      body: releaseBody,
      target_commitish: sha,
    });
  } else {
    console.info(`Creating hotfix draft release for PR #${prId}`);
    await getOctokitClient().rest.repos.createRelease({
      owner,
      repo,
      tag_name: tagName,
      name: prTitle,
      body: releaseBody,
      draft: true,
      prerelease: true,
      target_commitish: sha,
      make_latest: "false",
    });
  }
}

export async function hotfixOnCommit(prId: number, sha: string) {
  await upsertHotfixTag(prId, sha);

  const existing = await getHotfixDraftRelease(prId);
  if (!existing) {
    console.warn(`No draft release found for hotfix PR #${prId}, skipping release update`);
    return;
  }

  await getOctokitClient().rest.repos.updateRelease({
    owner,
    repo,
    release_id: existing.id,
    tag_name: getHotfixTagName(prId),
    target_commitish: sha,
  });
  console.info(`Updated hotfix draft release target_commitish to ${sha}`);
}

export async function hotfixOnTitleChange(prId: number) {
  const prTitle = process.env.PR_TITLE;
  if (!prTitle) throw new Error("PR_TITLE environment variable is required");
  const releaseBody = process.env.PR_BODY ? `${prTitle}\n\n${process.env.PR_BODY}` : prTitle;

  const existing = await getHotfixDraftRelease(prId);
  if (!existing) {
    console.warn(`No draft release found for hotfix PR #${prId}, skipping title update`);
    return;
  }

  await getOctokitClient().rest.repos.updateRelease({
    owner,
    repo,
    release_id: existing.id,
    tag_name: getHotfixTagName(prId),
    name: prTitle,
    body: releaseBody,
  });
  console.info(`Updated hotfix draft release title to: ${prTitle}`);
}
