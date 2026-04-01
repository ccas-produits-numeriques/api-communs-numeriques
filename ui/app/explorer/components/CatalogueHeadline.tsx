import { fr } from "@codegouvfr/react-dsfr";
import { Tag as TagDsfr } from "@codegouvfr/react-dsfr/Tag";
import { Box, Typography } from "@mui/material";
import type { DocPage } from "api-communs-numerique-sdk/internal";
import { getTextOpenAPI } from "api-communs-numerique-sdk/internal";

import { BesoinDesDonnes } from "./BesoinDesDonnees";
import { HabilitationRequise } from "./HabilitationRequise";
import { DsfrMarkdown } from "@/components/markdown/DsfrMarkdown";
import { Tag } from "@/components/tag/Tag";

const threeColumns = {
  md: "1fr",
  lg: "1fr 1fr 1fr",
  gap: fr.spacing("9w"),
};

const spanTwoColumns = {
  md: "span 1",
  lg: "span 2",
};

type Props = {
  title: string;
  doc: DocPage;
};

export function CatalogueHeadline({ doc, title }: Props) {
  return (
    <>
      <Box sx={{ marginBottom: fr.spacing("2w") }}>
        <TagDsfr>{doc.type === "outil" ? "Outil" : "Jeu de données"}</TagDsfr>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: threeColumns,
          marginBottom: fr.spacing("6w"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: fr.spacing("2w"),
            gridColumn: spanTwoColumns,
          }}
        >
          <Typography variant="h1" sx={{ color: fr.colors.decisions.text.label.blueEcume.default }}>
            {title}
          </Typography>

          {doc.frequenceMiseAJour && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: fr.spacing("2w"),
              }}
            >
              <Typography component="span" variant="body1">
                <strong>Fréquence de mise à jour :</strong>{" "}
                <Tag color="blueEcume">
                  {doc.frequenceMiseAJour === "daily" ? "TOUS LES JOURS" : doc.frequenceMiseAJour}
                </Tag>
              </Typography>
            </Box>
          )}

          {doc.description.map((description, index) => (
            <DsfrMarkdown key={index}>{getTextOpenAPI(description, "fr")}</DsfrMarkdown>
          ))}

          <HabilitationRequise habilitation={doc.habilitation} />
        </Box>
        <BesoinDesDonnes doc={doc} habilitation={doc.habilitation} />
      </Box>
    </>
  );
}
