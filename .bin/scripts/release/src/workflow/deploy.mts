import { spawn } from "child_process";
import { ensureGitClean, getCurrentGitSha, isCurrentCommitFromMain } from "../utils/git.mjs";
import { getLatestRelease, getPrerelease } from "../utils/release.mjs";
import { generateReleaseNotes } from "../utils/releaseNotes.mjs";
import { spawnAsync } from "../utils/spawnAsync.mjs";
import { getOctokitClient } from "../utils/client.mjs";
import { owner, repo } from "../utils/context.mjs";
import { sendTchapNotification } from "../utils/tchap.mjs";
import { getCurrentVersion, getHotfixTag, getShaVersion } from "../utils/version.mjs";
import { ensureImageTagExists, getProductImages } from "../utils/docker.mjs";

async function preDeployReleaseRecette(sha: string) {
  const version = getShaVersion(sha);
  const recettePackages = getProductImages("recette", version);
  const preproductionPackages = getProductImages("preproduction", version);

  await Promise.all([
    ensureImageTagExists(recettePackages.server.name, recettePackages.server.tag),
    ensureImageTagExists(recettePackages.ui.name, recettePackages.ui.tag),
    ensureImageTagExists(preproductionPackages.server.name, preproductionPackages.server.tag),
    ensureImageTagExists(preproductionPackages.ui.name, preproductionPackages.ui.tag),
  ]);

  const latestStable = await getLatestRelease({ stableOnly: true });

  if (latestStable) {
    const releaseRef = await getOctokitClient().rest.git.getRef({
      owner,
      repo,
      ref: `tags/${latestStable.tag_name}`,
    });

    const latestStableSha = releaseRef.data.object.sha;
    const { stdout: mergeBase } = await spawnAsync("git", ["merge-base", latestStableSha, sha]);
    if (mergeBase.trim() !== latestStableSha) {
      throw new Error(
        `Current commit ${sha} is older than latest stable release ${latestStable.tag_name} (${latestStableSha}).`
      );
    }
  }

  if (latestStable) {
    const latestStableChangelog = await generateReleaseNotes({ sha, previousRelease: latestStable });
    await sendTchapNotification(
      [
        `**Début du déploiement** : ${version} sur **recette**`,
        `Dernière release stable : ${latestStable.tag_name}`,
        "Changements inclus dans ce déploiement :",
        latestStableChangelog,
      ].join("\n\n")
    );
  } else {
    await sendTchapNotification(
      [`Début du déploiement : ${version} sur **recette**`, "Aucune release stable."].join("\n\n")
    );
  }

  return { version, sha };
}

async function preDeployReleasePreproduction(sha: string) {
  const hotfixTag = getHotfixTag();

  let version: string;
  let changelog: string;

  if (hotfixTag) {
    version = getShaVersion(sha);
    const prId = parseInt(hotfixTag.replace("hotfix-", ""), 10);
    const pr = await getOctokitClient().rest.pulls.get({ owner, repo, pull_number: prId });
    if (pr.data.merged || pr.data.state === "closed") {
      throw new Error(
        `PR #${prId} is merged or closed: this hotfix is finished. Any further deployment must go through the normal release cycle.`
      );
    }
    changelog = `Validation du hotfix PR #${prId} — ${pr.data.title}`;
    await sendTchapNotification(
      `**Déploiement préproduction du hotfix PR #${prId} lancé.** Une fois le hotfix validé, merger la PR pour réintégrer le correctif dans main — sans merge, il disparaîtra à la prochaine release.`
    );
  } else {
    const preRelease = await getPrerelease(sha);

    if (!preRelease) {
      throw new Error(
        `No prerelease found for commit ${sha}. Please publish the "latest-build" release on GitHub to create a release candidate first.`
      );
    }

    version = preRelease.tag_name;
    changelog = preRelease.body ?? "";
  }

  const recettePackages = getProductImages("recette", version);
  const preproductionPackages = getProductImages("preproduction", version);

  await Promise.all([
    ensureImageTagExists(recettePackages.server.name, recettePackages.server.tag),
    ensureImageTagExists(recettePackages.ui.name, recettePackages.ui.tag),
    ensureImageTagExists(preproductionPackages.server.name, preproductionPackages.server.tag),
    ensureImageTagExists(preproductionPackages.ui.name, preproductionPackages.ui.tag),
  ]);

  const latestStable = await getLatestRelease({ stableOnly: true });

  await sendTchapNotification(
    [
      `**Début du déploiement** : ${version} sur **préproduction**`,
      `Dernière release stable : ${latestStable ? latestStable.tag_name : "Aucune release stable n'existe encore."}`,
      "Changements inclus dans ce déploiement :",
      changelog,
    ].join("\n\n")
  );

  return { version, sha };
}

export async function preDeployRelease(env_type: "recette" | "preproduction") {
  await ensureGitClean();
  const [sha, isFromMain] = await Promise.all([getCurrentGitSha(), isCurrentCommitFromMain()]);
  if (!isFromMain) {
    throw new Error("Current commit is not from 'main' branch.");
  }

  if (env_type === "recette") {
    return preDeployReleaseRecette(sha);
  }
  return preDeployReleasePreproduction(sha);
}

export async function deployRelease(env: "recette" | "preproduction", force: boolean = false) {
  const sha = await getCurrentGitSha();
  const version: string = await getCurrentVersion(env, sha, force);
  let deployment_id = 0;

  try {
    const deployment = await getOctokitClient().rest.repos.createDeployment({
      repo,
      owner,
      ref: sha,
      required_contexts: [],
      payload: JSON.stringify({ env, version }),
      environment: env,
      production_environment: false,
      auto_merge: false,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    deployment_id = (deployment.data as any).id;
    await getOctokitClient().rest.repos.createDeploymentStatus({
      repo,
      owner,
      deployment_id,
      state: "in_progress",
    });

    const deployProcess = spawn(".bin/product", ["app:deploy", env, version], { stdio: "inherit" });
    await new Promise((resolve, reject) => {
      deployProcess.on("error", reject);
      deployProcess.on("close", (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          reject(new Error(`Deployment process failed with exit code ${code}`));
        }
      });
    });

    await getOctokitClient().rest.repos.createDeploymentStatus({
      repo,
      owner,
      deployment_id,
      state: "success",
    });
  } catch (error) {
    if (deployment_id > 0) {
      await getOctokitClient().rest.repos.createDeploymentStatus({
        repo,
        owner,
        deployment_id,
        state: "failure",
      });
    }
    throw error;
  }
}

export async function postDeployRelease(env_type: "recette" | "preproduction", status: "success" | "failure") {
  const sha = await getCurrentGitSha();
  const version = await getCurrentVersion(env_type, sha, true);
  await sendTchapNotification(
    `Déploiement ${status === "success" ? "terminé avec succès" : "échoué"} de la version ${version} sur **${env_type}**.`
  );
}

export async function deployReleaseFromLocal(env: "recette" | "preproduction") {
  try {
    await preDeployRelease(env);
    await deployRelease(env);
    await postDeployRelease(env, "success");
  } catch (error) {
    await postDeployRelease(env, "failure");
    throw error;
  }
}
