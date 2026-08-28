if (!process.env.GITHUB_ORGANIZATION) {
  throw new Error(
    "GITHUB_ORGANIZATION environment variable is not set. Please set it to the name of your GitHub organization."
  );
}

if (!process.env.REPO_NAME) {
  throw new Error("REPO_NAME environment variable is not set. Please set it to the name of your GitHub repository.");
}

export const owner = process.env.GITHUB_ORGANIZATION;
export const repo = process.env.REPO_NAME;
