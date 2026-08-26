export async function validatePrTitle({ github, context, core, pr_title }) {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = context.issue.number;
  const re = /^(?<type>fix|feat|chore)(\((?<scope>[^)]+)\))?:\s+(?<odoo>(#\d+\s+)*)(?<name>\S.+)$/;
  const match = pr_title.match(re);

  if (!match) {
    core.setFailed(
      [
        `Titre de PR invalide: "${pr_title}"`,
        ``,
        `Format attendu:`,
        `  fix(scope): #182 #2093 titre de la PR`,
        ``,
        `Règles:`,
        `  - type: fix | feat | chore`,
        `  - (scope) optionnel`,
        `  - tags Odoo optionnels: #182 #2093 (multiples possibles)`,
      ].join("\n")
    );
  } else {
    core.info(`OK: "${pr_title}"`);
  }

  const { type, scope, odoo, name } = match.groups;

  // Extract odoo tickets
  const odooIds = Array.from((odoo ?? "").matchAll(/#(\d+)/g), (m) => m[1]);
  await github.rest.issues.setLabels({ owner, repo, issue_number, labels: [type] });

  // ----------------------------------
  // ✅ Prepare summary comment
  // ----------------------------------

  const marker = "<!-- pr-parser-summary -->";

  const body = `${marker}
### 🤖 PR title parsing summary

| Field | Value |
|------|------|
| Type | \`${type}\` |
| Scope | \`${scope ?? "-"}\` |
| Name | ${name} |
| Odoo tickets | ${odooIds.length ? odooIds.map((id) => `[${id}](https://cour-de-cassation.odoo.com/odoo/all-tasks/${id})`).join(", ") : "-"} |
`;

  // ----------------------------------
  // ✅ Find existing bot comment
  // ----------------------------------

  const comments = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });

  const existing = comments.data.find((c) => c.body && c.body.includes(marker));

  if (existing) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existing.id,
      body,
    });
    core.info("Updated existing summary comment");
  } else {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
    core.info("Created summary comment");
  }
}
