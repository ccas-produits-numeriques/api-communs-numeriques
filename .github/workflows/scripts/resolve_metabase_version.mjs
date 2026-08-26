import { appendFileSync, readFileSync } from "node:fs";

function setOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  appendFileSync(outputPath, `${name}=${value}\n`);
}

function fail(message) {
  throw new Error(message);
}

function main() {
  const eventName = process.env.GITHUB_EVENT_NAME;

  if (eventName !== "registry_package") {
    const version = (process.env.WORKFLOW_INPUT_VERSION ?? "").trim();
    if (!version) {
      fail('Input "version" is required for workflow_dispatch/workflow_call but was empty.');
    }

    console.log(`Using Metabase version from ${eventName} input: ${version}`);
    setOutput("version", version);
    return;
  }

  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) {
    fail("GITHUB_EVENT_PATH is not available.");
  }

  const payload = JSON.parse(readFileSync(eventPath, "utf8"));
  const payloadTags = [
    ...(payload.registry_package?.package_version?.docker_metadata?.tags ?? []),
    ...(payload.registry_package?.package_version?.metadata?.container?.tags ?? []),
    payload.registry_package?.package_version?.container_metadata?.tag?.name,
  ].filter((tag) => tag && tag !== "latest");

  const payloadTag = [...new Set(payloadTags)][0];

  if (!payloadTag) {
    fail("No concrete non-latest Metabase tag found in registry_package payload.");
  }

  console.log(`Using Metabase tag from registry_package payload: ${payloadTag}`);
  setOutput("version", payloadTag);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
