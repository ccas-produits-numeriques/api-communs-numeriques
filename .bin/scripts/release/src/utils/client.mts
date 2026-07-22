import * as semver from "semver";
import { App, Octokit } from "octokit";
import { fetchWithProxy } from "./fetch.mjs";
import { spawnAsync } from "./spawnAsync.mjs";

let octokit: Octokit;
let authToken: string;

export async function initGithubCli() {
  const result = await spawnAsync("gh", ["auth", "token"]);
  authToken = result.stdout.toString().trim();
  octokit = new Octokit({
    auth: authToken,
    request: {
      fetch: fetchWithProxy,
    },
  });

  const { stdout } = await spawnAsync("gh", ["--version"]);
  const version = stdout.trim().split("\n")[0].split(" ")[2];
  if (!semver.valid(version) || semver.lt(version, "2.86.0")) {
    throw new Error(`gh CLI version 2.86.0 or higher is required. Detected version: ${version}`);
  }

  const status = await spawnAsync("gh", ["auth", "status", "--json", "hosts"]);
  const authStatus = JSON.parse(status.stdout);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const githubAuth = authStatus.hosts["github.com"]?.filter((h: any) => h.active) ?? [];
  if (githubAuth.length === 0) {
    throw new Error("Not authenticated to GitHub. Please run 'gh auth login' to authenticate and try again.");
  }
}

async function initGithubApp() {
  const installationId = process.env.GH_RELEASE_INSTALLATION_ID || "109860396";
  const appId = process.env.GH_RELEASE_APP_ID || "2856679";

  if (!process.env.GH_RELEASE_APP_PRIVATE_KEY_B64) {
    throw new Error(
      "GH_RELEASE_APP_PRIVATE_KEY_B64 environment variable is not set. Please set it to the base64-encoded private key of the GitHub App."
    );
  }

  const app = new App({
    appId,
    privateKey: Buffer.from(process.env.GH_RELEASE_APP_PRIVATE_KEY_B64, "base64").toString("utf-8"),
    Octokit: Octokit.defaults({
      request: {
        fetch: fetchWithProxy,
      },
    }),
  });

  octokit = await app.getInstallationOctokit(Number(installationId));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auth: any = await octokit.auth({ type: "installation" });
  authToken = auth.token;
}

export async function initOctokitClient() {
  if (process.env.CI && !process.env.GITHUB_ACTIONS) {
    await initGithubApp();
  } else {
    await initGithubCli();
  }
}

export function getOctokitClient(): Octokit {
  if (!octokit) {
    throw new Error("Octokit client not initialized. Please call initOctokitClient() first.");
  }
  return octokit;
}

export function getAuthToken(): string {
  if (!authToken) {
    throw new Error("Auth token not available. Please call initOctokitClient() first.");
  }
  return authToken;
}

export function getOctokitClientListPackages(): Octokit {
  if (process.env.GITHUB_ACTIONS) {
    return getOctokitClient();
  }

  if (!process.env.GH_PAT_PACKAGE_READONLY) {
    throw new Error(
      "GH_PAT_PACKAGE_READONLY environment variable is not set. Please set it to a GitHub token with read-only access to packages."
    );
  }

  return new Octokit({
    auth: process.env.GH_PAT_PACKAGE_READONLY,
    request: {
      fetch: fetchWithProxy,
    },
  });
}
