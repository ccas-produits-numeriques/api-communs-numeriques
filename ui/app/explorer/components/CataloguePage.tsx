import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Box, Container } from "@mui/material";
import type { DocPage } from "api-communs-numerique-sdk/internal";

import { CatalogueData } from "./CatalogueData";
import { CatalogueHeadline } from "./CatalogueHeadline";
import { DataSources } from "./DataSources";
import { DsfrLink } from "@/components/link/DsfrLink";
import type { IPage } from "@/utils/routes.utils";
import { PAGES } from "@/utils/routes.utils";

type Props = {
  page: IPage;
  doc: DocPage;
};

export function CataloguePage({ page, doc }: Props) {
  return (
    <Container maxWidth="xl" sx={{ marginTop: fr.spacing("2w"), marginBottom: fr.spacing("9w") }}>
      <Breadcrumb
        currentPageLabel={page.getTitle()}
        homeLinkProps={{ href: "/" }}
        segments={[
          {
            label: PAGES.static.explorerApi.getTitle(),
            linkProps: { href: PAGES.static.explorerApi.getPath() },
          },
        ]}
        style={{ marginBottom: fr.spacing("3w") }}
      />

      <Box sx={{ mb: fr.spacing("6w") }}>
        <DsfrLink href={PAGES.static.explorerApi.getPath()} arrow="left" size="lg">
          Revenir à la liste
        </DsfrLink>
      </Box>

      <CatalogueHeadline doc={doc} title={page.getTitle()} />
      <CatalogueData doc={doc} />
      <DataSources sources={doc.sources} />
    </Container>
  );
}
