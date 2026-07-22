import { spawnAsync } from "./spawnAsync.mjs";

export async function ensureGitClean() {
  if (process.env.ALLOW_DIRTY_GIT === "true" || process.env.CI) {
    return;
  }
  const { stdout } = await spawnAsync("git", ["status", "--porcelain"]);
  if (stdout.trim() !== "") {
    throw new Error(
      `Git working directory is not clean. Please commit or stash your changes before running this command.\n${stdout}`
    );
  }
}

export async function getCurrentGitSha() {
  const { stdout } = await spawnAsync("git", ["rev-parse", "HEAD"]);
  return stdout.trim();
}

export async function isCurrentCommitFromMain() {
  if (process.env.CI) {
    return true;
  }

  const { stdout } = await spawnAsync("git", ["branch", "--contains", "HEAD"]);
  const branches = stdout
    .trim()
    .split("\n")
    .map((branch) => branch.replace("*", "").trim());
  return branches.includes("main");
}
