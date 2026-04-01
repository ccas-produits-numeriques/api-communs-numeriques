"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Box, Typography } from "@mui/material";
import type { OpenapiSpec } from "api-communs-numerique-sdk/internal";
import { getTextOpenAPI, openapiSpec } from "api-communs-numerique-sdk/internal";

import { Artwork } from "@/components/artwork/Artwork";
import { DsfrLink } from "@/components/link/DsfrLink";
import { publicConfig } from "@/config.public";
import { useAuth } from "@/context/AuthContext";

type Props = {
  habilitation: null | keyof OpenapiSpec["demandeHabilitations"];
};

export function HabilitationRequise({ habilitation }: Props) {
  const { session } = useAuth();

  if (habilitation === null || session?.organisation?.habilitations.includes(habilitation)) {
    return null;
  }

  const { subject, body } = openapiSpec.demandeHabilitations[habilitation];

  return (
    <Box
      sx={{
        paddingX: fr.spacing("4w"),
        paddingY: fr.spacing("3w"),
        borderColor: "#dddddd",
        borderWidth: "1px",
        borderStyle: "solid",
        gap: fr.spacing("3w"),
        display: "flex",
        marginTop: fr.spacing("5w"),
      }}
    >
      <Artwork name="padlock" />
      <Box sx={{ display: "flex", gap: fr.spacing("1w"), flexDirection: "column" }}>
        <Typography
          sx={{
            textWrap: "balance",
          }}
          className={fr.cx("fr-text--bold")}
        >
          L’utilisation de cet outil nécessite une habilitation
        </Typography>
        <DsfrLink
          href={`mailto:${publicConfig.contactEmail}?subject=${encodeURIComponent(getTextOpenAPI(subject, "fr"))}&body=${getTextOpenAPI(body, "fr")}`}
          arrow="none"
          external={false}
        >
          <Button priority="secondary" size="small">
            Faire une demande
          </Button>
        </DsfrLink>
      </Box>
    </Box>
  );
}
