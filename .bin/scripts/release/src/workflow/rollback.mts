import { ensureImageTagExists, getProductImages } from "../utils/docker.mjs";
import { ensureGitClean, getCurrentGitSha, isCurrentCommitFromMain } from "../utils/git.mjs";
import { sendTchapNotification } from "../utils/tchap.mjs";
import { getCurrentVersion } from "../utils/version.mjs";
import { deployRelease } from "./deploy.mjs";

export async function preRollback(env_type: "recette" | "preproduction", force: boolean = false) {
  await ensureGitClean();

  const [sha, isFromMain] = await Promise.all([getCurrentGitSha(), isCurrentCommitFromMain()]);
  if (!isFromMain && !force) {
    throw new Error("Current commit is not from 'main' branch.");
  }

  const version = await getCurrentVersion(env_type, sha, force);
  const images = getProductImages(env_type, version);

  await Promise.all([
    ensureImageTagExists(images.server.name, images.server.tag),
    ensureImageTagExists(images.ui.name, images.ui.tag),
  ]);

  await sendTchapNotification(`**Début du ROLLBACK** : ${version} sur **${env_type}**`);
}

export async function postRollback(env_type: "recette" | "preproduction", status: "success" | "failure") {
  const sha = await getCurrentGitSha();
  const version = await getCurrentVersion(env_type, sha, true);

  await sendTchapNotification(
    `Rollback **${status === "success" ? "terminé avec succès" : "échoué"}** de la version ${version} sur **${env_type}**.`
  );
}

export async function rollbackFromLocal(env: "recette" | "preproduction", force: boolean = false) {
  try {
    await preRollback(env, force);
    await deployRelease(env, force);
    await postRollback(env, "success");
  } catch (error) {
    await postRollback(env, "failure");
    throw error;
  }
}
