import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import type { Octokit } from "octokit";
import { owner, repo } from "./context.mjs";
import { getOctokitClient } from "./client.mjs";

type ReleaseLike = Pick<GetResponseDataTypeFromEndpointMethod<Octokit["rest"]["repos"]["getRelease"]>, "tag_name">;

function formatReleaseNotes(notes: string) {
  if (!notes) return "";

  const lines = notes.split("\n");
  const PR_TITLE_RE = /^\* (?<type>fix|feat|chore)(\((?<scope>[^)]+)\))?:\s+(?<odoo>(#\d+\s+)*)(?<name>\S.+)$/;

  return lines
    .map((line) => {
      const match = PR_TITLE_RE.exec(line);
      if (!match?.groups) return line;

      const { scope, odoo, name } = match.groups;
      const odooIds = Array.from((odoo ?? "").matchAll(/#(\d+)/g), (m) => m[1]);

      const scopeStr = scope ? `**${scope}**: ` : "";
      const odooStr =
        odooIds.length === 0
          ? ""
          : odooIds
              .map((id) => `[#ODOO-${id}](https://cour-de-cassation.odoo.com/odoo/all-tasks/${id})`)
              .join(" ")
              .concat(" ");

      return `* ${scopeStr}${odooStr}${name}`;
    })
    .join("\n");
}

export async function generateReleaseNotes({
  sha,
  previousRelease,
  tag_name,
}: {
  sha: string;
  previousRelease?: ReleaseLike | null;
  tag_name?: string;
}) {
  const genReq: Parameters<Octokit["rest"]["repos"]["generateReleaseNotes"]>[0] = {
    owner,
    repo,
    tag_name: tag_name ?? `release-notes-${sha.slice(0, 12)}`,
    target_commitish: sha,
  };

  if (previousRelease) {
    genReq.previous_tag_name = previousRelease.tag_name;
  }

  const gen = await getOctokitClient().rest.repos.generateReleaseNotes(genReq);
  return formatReleaseNotes(gen.data.body ?? "");
}
