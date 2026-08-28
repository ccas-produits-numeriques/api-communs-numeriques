import { getProxyUrl } from "./fetch.mjs";

export async function sendTchapNotification(message: string) {
  if (process.env.SKIP_TCHAP_NOTIFICATION) {
    console.log("Skipping Tchap notification due to SKIP_TCHAP_NOTIFICATION environment variable");
    return;
  }

  const tchapWebhookPath = process.env.TCHAP_BOT_PATH_MD;
  if (!tchapWebhookPath || tchapWebhookPath === "null") {
    throw new Error("TCHAP_BOT_PATH_MD environment variable is not set");
  }

  const urlDomain =
    getProxyUrl() === null ? "tools.courdecassation.beta.gouv.fr" : "sij-ops-cass.sij.cour-de-cassation.justice.fr";
  const tchapWebhookUrl = `https://${urlDomain}${tchapWebhookPath}`;

  const response = await fetch(tchapWebhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: message }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send Tchap notification. Status: ${response.status} ${response.statusText}`);
  } else {
    console.log("Tchap notification sent successfully");
  }
}
