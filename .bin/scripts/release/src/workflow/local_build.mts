import { spawn } from "child_process";
import { ensureGitClean, getCurrentGitSha, isCurrentCommitFromMain } from "../utils/git.mjs";
import { getShaVersion } from "../utils/version.mjs";
import { dockerLogin } from "../utils/docker.mjs";
import { postBuild } from "./on_build.mjs";

export async function buildFromLocal() {
  if (process.env.CI) {
    throw new Error("This command is meant to be run locally, not in a CI environment");
  }

  const isFromMain = await isCurrentCommitFromMain();
  if (!isFromMain) {
    throw new Error(`Current commit is not from 'main' branch.`);
  }

  await ensureGitClean();
  await dockerLogin();

  const sha = await getCurrentGitSha();
  const version = getShaVersion(sha);
  const dockerBuild = spawn(".bin/product", ["build:image", version, "push", "recette", "preproduction"], {
    stdio: "inherit",
  });

  await new Promise((resolve, reject) => {
    dockerBuild.on("error", reject);
    dockerBuild.on("close", (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`Build process failed with exit code ${code}`));
      }
    });
  });

  await postBuild(sha);
}
