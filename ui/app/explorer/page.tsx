import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import school from "@codegouvfr/react-dsfr/dsfr/artwork/pictograms/buildings/school.svg";
import { Tag as TagDsfr } from "@codegouvfr/react-dsfr/Tag";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { Box, Container, Typography } from "@mui/material";
import { getTextOpenAPI, recuperationOrganismesPageSummaryDoc } from "api-communs-numerique-sdk/internal";

import { Artwork } from "@/components/artwork/Artwork";
import { DsfrLink } from "@/components/link/DsfrLink";
import { publicConfig } from "@/config.public";
import { PAGES } from "@/utils/routes.utils";

export default async function ExplorerApiPage() {
  return (
    <Container maxWidth="xl" style={{ marginTop: fr.spacing("2w"), marginBottom: fr.spacing("9w") }}>
      <Box>
        <Breadcrumb
          currentPageLabel={PAGES.static.explorerApi.getTitle()}
          homeLinkProps={{
            href: "/",
          }}
          segments={[]}
        />
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          gap={fr.spacing("3w")}
        >
          <Typography variant="h1" align="center" sx={{ color: fr.colors.decisions.text.label.blueEcume.default }}>
            {PAGES.static.explorerApi.getTitle()}
          </Typography>
          <Box
            component="h4"
            sx={{
              color: fr.colors.decisions.artwork.minor.blueEcume.default,
              fontWeight: "normal",
              textWrap: "balance",
              textAlign: "center",
            }}
            dangerouslySetInnerHTML={{
              __html:
                "<strong>API Communs numériques centralise, enrichit</strong> et <strong>met à disposition</strong> des jeux de données et des outils numériques documentés",
            }}
          ></Box>
        </Box>
      </Box>
      <Box
        my={fr.spacing("5w")}
        display="grid"
        gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr"]}
        gap={fr.spacing("2w")}
      >
        <Tile
          title={getTextOpenAPI(recuperationOrganismesPageSummaryDoc.title, "fr")}
          desc={getTextOpenAPI(recuperationOrganismesPageSummaryDoc.headline, "fr")}
          imageSvg
          imageUrl={school.src}
          enlargeLinkOrButton
          linkProps={{ href: PAGES.static.recuperationOrganismes.getPath() }}
          start={<TagDsfr>Jeu de données</TagDsfr>}
        />
      </Box>
      <Box sx={{ background: fr.colors.decisions.background.alt.beigeGrisGalet.default }}>
        <Container maxWidth="xl" disableGutters>
          <Box display="grid" gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr"]} padding={{ md: fr.spacing("6w") }}>
            <Box display="flex" alignItems="center" justifyContent="center" position="relative">
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Artwork name="not-found-solid-iii-0" />
              </Box>
            </Box>
            <Box
              display="grid"
              gap={fr.spacing("3w")}
              padding={fr.spacing("3w")}
              gridColumn={["span 1", "span 1", "span 2"]}
            >
              <Typography variant="h3" sx={{ color: fr.colors.decisions.text.label.blueEcume.default }}>
                Il vous manque des données, outils, etc. pour répondre à vos besoins ?
              </Typography>
              <Box display="grid" gap={fr.spacing("2v")}>
                <Typography>
                  <DsfrLink href={`mailto:${publicConfig.contactEmail}`}>Dites-le nous</DsfrLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
