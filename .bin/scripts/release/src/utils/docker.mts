import { spawn } from "child_process";
import { RequestError } from "octokit";
import { getAuthToken, getOctokitClientListPackages } from "./client.mjs";
import { spawnAsync } from "./spawnAsync.mjs";
import { owner, repo } from "./context.mjs";

type ImageSpec = {
  name: string;
  tag: string;
  url: string;
};

const environments = ["recette", "preproduction"] as const;

export function getProductImages(
  env: (typeof environments)[number],
  version: string
): { server: ImageSpec; ui: ImageSpec } {
  return {
    server: {
      name: `ccas_${repo}_server`,
      tag: version,
      url: `ghcr.io/${owner}/ccas_${repo}_server:${version}`,
    },
    ui: {
      name: `ccas_${repo}_ui`,
      tag: `${version}-${env}`,
      url: `ghcr.io/${owner}/ccas_${repo}_ui:${version}-${env}`,
    },
  };
}

async function addOneImageAliasRegistry(imageName: string, sourceTag: string, targetTag: string) {
  if (process.env.CI && !process.env.GITHUB_ACTIONS) {
    await spawnAsync("skopeo", [
      "copy",
      `docker://ghcr.io/${owner}/${imageName}:${sourceTag}`,
      `docker://ghcr.io/${owner}/${imageName}:${targetTag}`,
    ]);
    return;
  }

  await spawnAsync("docker", [
    "buildx",
    "imagetools",
    "create",
    "--tag",
    `ghcr.io/${owner}/${imageName}:${targetTag}`,
    `ghcr.io/${owner}/${imageName}:${sourceTag}`,
  ]);
}

export async function addImageAliasRegistry(sourceTag: string, targetTag: string) {
  await Promise.all(
    environments.map(async (env) => {
      const sourcePackages = getProductImages(env, sourceTag);
      const targetPackages = getProductImages(env, targetTag);
      return Promise.all([
        addOneImageAliasRegistry(sourcePackages.server.name, sourcePackages.server.tag, targetPackages.server.tag),
        addOneImageAliasRegistry(sourcePackages.ui.name, sourcePackages.ui.tag, targetPackages.ui.tag),
      ]);
    })
  );
}

export async function dockerLogin() {
  if (process.env.CI) {
    return;
  }

  const token = getAuthToken();
  const dockerLogin = spawn("docker", ["login", "ghcr.io", "-u", "USERNAME", "--password-stdin"], {
    stdio: ["pipe", "inherit", "inherit"],
  });
  dockerLogin.stdin.write(token);
  dockerLogin.stdin.end();
  await new Promise((resolve, reject) => {
    dockerLogin.on("error", reject);
    dockerLogin.on("close", (code) => {
      if (code === 0) {
        resolve(null);
      } else {
        reject(new Error(`Docker login failed with exit code ${code}`));
      }
    });
  });
}

export async function ensureImageTagExists(packageName: string, tag: string, retryCount = 3) {
  try {
    const octokit = getOctokitClientListPackages();
    const iterator = octokit.paginate.iterator(octokit.rest.packages.getAllPackageVersionsForPackageOwnedByOrg, {
      org: owner,
      package_type: "container",
      package_name: packageName,
    });

    for await (const { data } of iterator) {
      const tagFound = data.some((pkg) => pkg.metadata?.container?.tags?.includes(tag));
      if (tagFound) {
        return;
      }
    }

    throw new Error(`Tag ${tag} not found in GHCR packages for ghcr.io/${owner}/${packageName}`);
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      if (retryCount > 0) {
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        return ensureImageTagExists(packageName, tag, retryCount - 1);
      }
      throw new Error(`GHCR package not found: ghcr.io/${owner}/${packageName}:${tag}`);
    }
    throw error;
  }
}
