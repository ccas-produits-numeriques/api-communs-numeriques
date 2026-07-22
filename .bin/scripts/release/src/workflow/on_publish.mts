import { getOctokitClient } from "../utils/client.mjs";
import { owner, repo } from "../utils/context.mjs";
import { addImageAliasRegistry, dockerLogin, ensureImageTagExists, getProductImages } from "../utils/docker.mjs";
import { getLatestRelease } from "../utils/release.mjs";
import { generateReleaseNotes } from "../utils/releaseNotes.mjs";
import { sendTchapNotification } from "../utils/tchap.mjs";
import { getReleaseVersion, getShaVersion } from "../utils/version.mjs";

export async function onPublish(release_id: number) {
  const release = await getOctokitClient().rest.repos.getRelease({
    owner,
    repo,
    release_id,
  });

  if (!release.data || release.data.draft || !release.data.prerelease || release.data.tag_name !== "latest-build") {
    return;
  }

  const commit = await getOctokitClient().rest.repos.getCommit({
    owner,
    repo,
    ref: release.data.tag_name,
  });

  const sha = commit.data.sha;
  const shaVersion = getShaVersion(sha);
  const releaseVersion = getReleaseVersion(release_id);
  const latestRelease = await getLatestRelease({ stableOnly: true });

  await dockerLogin();

  const recettePackages = getProductImages("recette", shaVersion);
  const preproductionPackages = getProductImages("preproduction", shaVersion);

  await Promise.all([
    ensureImageTagExists(recettePackages.server.name, recettePackages.server.tag),
    ensureImageTagExists(recettePackages.ui.name, recettePackages.ui.tag),
    ensureImageTagExists(preproductionPackages.server.name, preproductionPackages.server.tag),
    ensureImageTagExists(preproductionPackages.ui.name, preproductionPackages.ui.tag),
  ]);

  await addImageAliasRegistry(shaVersion, releaseVersion);

  const updatedRelease = await getOctokitClient().rest.repos.updateRelease({
    owner,
    repo,
    release_id,
    tag_name: releaseVersion,
    name: `Release candidate ${release_id} (${shaVersion})`,
    target_commitish: sha,
    immutable: true,
  });

  const notes = await generateReleaseNotes({
    sha,
    previousRelease: latestRelease,
    tag_name: updatedRelease.data.tag_name,
  });

  await getOctokitClient().rest.repos.updateRelease({
    owner,
    repo,
    release_id,
    body: notes,
  });

  await sendTchapNotification(
    [
      `**La release est prête à etre déployée en préproduction** : ${releaseVersion}`,
      latestRelease ? `Dernière release : ${latestRelease.tag_name}` : "Aucune release n'existe encore.",
      "Changements inclus dans cette release :",
      notes,
    ].join("\n\n")
  );
}
