import { appendFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseFiles(value) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseBoolean(value) {
  return /^(1|true|yes)$/i.test(value ?? "");
}

function setOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  appendFileSync(outputPath, `${name}=${value}\n`);
}

async function githubRequest(apiBaseUrl, token, requestPath, { method = "GET", body } = {}) {
  const response = await fetch(`${apiBaseUrl}${requestPath}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(data?.message ?? `GitHub API request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function createBlobForFile(apiBaseUrl, token, owner, repo, relativePath) {
  const absolutePath = path.join(process.env.GITHUB_WORKSPACE, relativePath);

  if (!existsSync(absolutePath)) {
    return {
      path: relativePath,
      sha: null,
    };
  }

  const content = readFileSync(absolutePath, "utf8");
  const blob = await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/blobs`, {
    method: "POST",
    body: {
      content,
      encoding: "utf-8",
    },
  });

  return {
    path: relativePath,
    mode: "100644",
    type: "blob",
    sha: blob.sha,
  };
}

async function main() {
  const token = getRequiredEnv("APP_COMMIT_TOKEN");
  const branch = getRequiredEnv("APP_COMMIT_BRANCH");
  const commitMessage = getRequiredEnv("APP_COMMIT_MESSAGE");
  const files = parseFiles(process.env.APP_COMMIT_FILES);
  const baseBranch = process.env.APP_COMMIT_BASE_BRANCH?.trim();
  const forceUpdate = parseBoolean(process.env.APP_COMMIT_FORCE_UPDATE);
  const repository = getRequiredEnv("GITHUB_REPOSITORY");
  const workspace = getRequiredEnv("GITHUB_WORKSPACE");
  const apiBaseUrl = (process.env.GITHUB_API_URL ?? "https://api.github.com").replace(/\/$/, "");

  if (!workspace) {
    throw new Error("GITHUB_WORKSPACE is required");
  }

  if (files.length === 0) {
    setOutput("changed", "false");
    return;
  }

  const [owner, repo] = repository.split("/");
  const parentBranch = baseBranch || branch;
  const parentRef = await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/ref/heads/${parentBranch}`);
  const parentCommit = await githubRequest(
    apiBaseUrl,
    token,
    `/repos/${owner}/${repo}/git/commits/${parentRef.object.sha}`
  );

  const tree = [];
  for (const relativePath of files) {
    tree.push(await createBlobForFile(apiBaseUrl, token, owner, repo, relativePath));
  }

  const newTree = await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/trees`, {
    method: "POST",
    body: {
      base_tree: parentCommit.tree.sha,
      tree,
    },
  });

  const commit = await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/commits`, {
    method: "POST",
    body: {
      message: commitMessage,
      tree: newTree.sha,
      parents: [parentCommit.sha],
    },
  });

  try {
    await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/refs/heads/${branch}`, {
      method: "PATCH",
      body: {
        sha: commit.sha,
        force: forceUpdate,
      },
    });
  } catch (error) {
    const isMissingRef =
      error.status === 404 || (error.status === 422 && error.data?.message === "Reference does not exist");

    if (!isMissingRef) {
      throw error;
    }

    await githubRequest(apiBaseUrl, token, `/repos/${owner}/${repo}/git/refs`, {
      method: "POST",
      body: {
        ref: `refs/heads/${branch}`,
        sha: commit.sha,
      },
    });
  }

  setOutput("changed", "true");
}

main().catch((error) => {
  console.error(error.message, error.stack);
  if (error.data) {
    console.error(JSON.stringify(error.data, null, 2));
  }
  process.exitCode = 1;
});
