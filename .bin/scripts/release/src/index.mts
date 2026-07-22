import { program } from "commander";
import { postBuild } from "./workflow/on_build.mjs";
import { buildFromLocal } from "./workflow/local_build.mjs";
import { deployRelease, deployReleaseFromLocal, postDeployRelease, preDeployRelease } from "./workflow/deploy.mjs";
import { initOctokitClient } from "./utils/client.mjs";
import { onPublish } from "./workflow/on_publish.mjs";
import { postRollback, preRollback, rollbackFromLocal } from "./workflow/rollback.mjs";

program.hook("preAction", async () => {
  await initOctokitClient();

  if (!process.env.ROOT_DIR) {
    throw new Error("ROOT_DIR environment variable is not set.");
  }

  process.chdir(process.env.ROOT_DIR);
});

program
  .command("post-build <sha>")
  .description("Update the work-in-progress release")
  .action(async (sha: string) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    await postBuild(sha);
  });

program
  .command("build-from-local")
  .description("Build the release from the local environment")
  .action(async () => {
    if (process.env.CI) {
      throw new Error("This command is meant to be run locally, not in a CI environment.");
    }

    await buildFromLocal();
  });

program
  .command("pre-deploy <env_type>")
  .description("Prepare for deployment to the specified environment (recette or preproduction)")
  .action(async (env_type: string) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env_type !== "recette" && env_type !== "preproduction") {
      throw new Error(`Invalid environment type: ${env_type}.`);
    }

    await preDeployRelease(env_type);
  });

program
  .command("deploy <env>")
  .description("Deploy to the specified environment (recette or preproduction)")
  .action(async (env: string) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env !== "recette" && env !== "preproduction") {
      throw new Error(`Invalid environment: ${env}.`);
    }

    await deployRelease(env);
  });

program
  .command("post-deploy <env_type> <status>")
  .description("Send post deployment notifications")
  .action(async (env_type: string, status: string) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env_type !== "recette" && env_type !== "preproduction") {
      throw new Error(`Invalid environment type: ${env_type}.`);
    }

    if (status !== "success" && status !== "failure") {
      throw new Error(`Invalid status: ${status}.`);
    }

    await postDeployRelease(env_type, status);
  });

program
  .command("deploy:local <env>")
  .description("Deploy from local environment")
  .action(async (env: string) => {
    if (process.env.CI) {
      throw new Error("This command is meant to be run locally, not in a CI environment.");
    }

    if (env !== "recette" && env !== "preproduction") {
      throw new Error(`Invalid environment: ${env}.`);
    }

    await deployReleaseFromLocal(env);
  });

program
  .command("post-publish <release_id>")
  .description("Perform post-publish actions for the specified release ID")
  .action(async (release_id: string) => {
    await onPublish(parseInt(release_id, 10));
  });

program
  .command("pre-rollback <env_type>")
  .option("--force", "Force rollback checks")
  .description("Prepare rollback")
  .action(async (env_type: string, options: { force: boolean }) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env_type !== "recette" && env_type !== "preproduction") {
      throw new Error(`Invalid environment type: ${env_type}.`);
    }

    await preRollback(env_type, options.force);
  });

program
  .command("rollback <env>")
  .option("--force", "Force rollback checks")
  .description("Rollback environment")
  .action(async (env: string, options: { force: boolean }) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env !== "recette" && env !== "preproduction") {
      throw new Error(`Invalid environment: ${env}.`);
    }

    await deployRelease(env, options.force);
  });

program
  .command("post-rollback <env_type> <status>")
  .description("Perform post-rollback actions")
  .action(async (env_type: string, status: string) => {
    if (!process.env.CI) {
      throw new Error("This command is meant to be run in a CI environment.");
    }

    if (env_type !== "recette" && env_type !== "preproduction") {
      throw new Error(`Invalid environment type: ${env_type}.`);
    }

    if (status !== "success" && status !== "failure") {
      throw new Error(`Invalid status: ${status}.`);
    }

    await postRollback(env_type, status);
  });

program
  .command("rollback:local <env>")
  .option("--force", "Force rollback checks")
  .description("Rollback from local environment")
  .action(async (env: string, options: { force: boolean }) => {
    if (process.env.CI) {
      throw new Error("This command is meant to be run locally, not in a CI environment.");
    }

    if (env !== "recette" && env !== "preproduction") {
      throw new Error(`Invalid environment: ${env}.`);
    }

    await rollbackFromLocal(env, options.force);
  });

await program.parseAsync(process.argv);
