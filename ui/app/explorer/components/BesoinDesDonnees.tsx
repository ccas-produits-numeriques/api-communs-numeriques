"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Box, Typography } from "@mui/material";
import type { DocPage, OpenapiSpec } from "api-communs-numerique-sdk/internal";
import { getTextOpenAPI, openapiSpec } from "api-communs-numerique-sdk/internal";

import { SwaggerLink } from "./SwaggerLink";
import { Artwork } from "@/components/artwork/Artwork";
import { DsfrLink } from "@/components/link/DsfrLink";
import { publicConfig } from "@/config.public";
import { useAuth } from "@/context/AuthContext";
import { PAGES } from "@/utils/routes.utils";

export function BesoinDesDonnes({
  doc,
  habilitation,
}: {
  doc: DocPage;
  habilitation: null | keyof OpenapiSpec["demandeHabilitations"];
}) {
  const { session } = useAuth();
  const hasHabilitation = habilitation === null || session?.organisation?.habilitations.includes(habilitation);

  const habilitationRequest = hasHabilitation ? null : openapiSpec.demandeHabilitations[habilitation];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{}}>
        <Artwork name="designer" />
        <Box sx={{ mx: fr.spacing("3w"), display: "flex", flexDirection: "column", gap: fr.spacing("1w") }}>
          <Typography className={fr.cx("fr-text--lead", "fr-text--bold")}>
            Besoin de ces données pour votre projet ?
          </Typography>
          <Typography>
            <SwaggerLink doc={doc} />
          </Typography>
          {hasHabilitation && (
            <Typography>
              <DsfrLink href={PAGES.static.compteProfil.getPath()} size="lg">
                Obtenir un jeton d’accès
              </DsfrLink>
            </Typography>
          )}
          {habilitationRequest && (
            <Typography>
              <DsfrLink
                href={`mailto:${publicConfig.contactEmail}?subject=${encodeURIComponent(getTextOpenAPI(habilitationRequest.subject, "fr"))}&body=${getTextOpenAPI(habilitationRequest.body, "fr")}`}
                size="lg"
              >
                Demander une habilitation
              </DsfrLink>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
