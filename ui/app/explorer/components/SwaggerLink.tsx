"use client";

import type { DocPage } from "api-communs-numerique-sdk/internal";
import { getTextOpenAPI, openapiSpec } from "api-communs-numerique-sdk/internal";
import { safeSlugify } from "redoc";

import { DsfrLink } from "@/components/link/DsfrLink";
import { PAGES } from "@/utils/routes.utils";

export function SwaggerLink({ doc }: { doc: DocPage }) {
  return (
    <DsfrLink
      href={{
        pathname: PAGES.static.documentationTechnique.getPath(),
        hash: `tag/${safeSlugify(getTextOpenAPI(openapiSpec.tags[doc.tag].name, "fr"))}/operation/${doc.operationIds[0]}`,
      }}
      size="lg"
    >
      Consulter le swagger
    </DsfrLink>
  );
}
