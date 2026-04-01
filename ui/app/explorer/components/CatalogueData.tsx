import { fr } from "@codegouvfr/react-dsfr";
import { Tabs } from "@codegouvfr/react-dsfr/Tabs";
import { Box, Container, Typography } from "@mui/material";
import type { DocDatum, DocModelRow, DocModelSection, DocPage, OpenApiText } from "api-communs-numerique-sdk/internal";
import { getTextOpenAPI, getTextOpenAPIArray } from "api-communs-numerique-sdk/internal";

import { GoodToKnow } from "./GoodToKnow";
import { SwaggerLink } from "./SwaggerLink";
import { Artwork } from "@/components/artwork/Artwork";
import { DsfrLink } from "@/components/link/DsfrLink";
import { publicConfig } from "@/config.public";
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

type Props = { doc: DocPage };

function InformationBox({ information }: Pick<DocModelRow, "information">) {
  if (!information) return null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: fr.spacing("1w"),
          flexWrap: "wrap",
          backgroundColor: fr.colors.decisions.background.alt.blueEcume.default,
          padding: fr.spacing("2w"),
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: fr.spacing("3v"),
            alignItems: "center",
          }}
        >
          <Artwork name="avatar" />
          <Typography
            sx={{
              color: fr.colors.decisions.artwork.major.blueEcume.active,
            }}
          >
            <strong>Information</strong>
          </Typography>
        </Box>
        <DsfrMarkdown>{getTextOpenAPI(information, "fr")}</DsfrMarkdown>
      </Box>
    </Box>
  );
}

function DataField({ name, row, noHr }: { name: string; row: DocModelRow; noHr: boolean }) {
  const description = Array.isArray(row.description)
    ? getTextOpenAPIArray(row.description, "fr")
    : getTextOpenAPI(row.description as OpenApiText | null, "fr");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: threeColumns,
        gap: { md: fr.spacing("2w"), lg: fr.spacing("9w") },
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridColumn: spanTwoColumns,
          gridTemplateColumns: { sm: "1fr", md: "repeat(4, 1fr)" },
          gap: fr.spacing("2w"),
        }}
      >
        <Box>
          <Tag color="beigeGrisGalet">{name}</Tag>
        </Box>
        <Box sx={{ gridColumn: "span 3", display: "flex", gap: fr.spacing("1w"), flexDirection: "column" }}>
          {row.sample !== null && (
            <Typography
              sx={{
                color: fr.colors.decisions.text.mention.grey.default,
              }}
            >
              {getTextOpenAPI(row.sample, "fr")}
            </Typography>
          )}
          <DsfrMarkdown>{description}</DsfrMarkdown>
          {row.tags != null ? (
            <Box sx={{ display: "flex", gap: fr.spacing("1w"), flexWrap: "wrap" }}>
              {row.tags.map((tag) => (
                <Tag color="beigeGrisGalet" key={tag}>
                  {tag}
                </Tag>
              ))}
            </Box>
          ) : null}
        </Box>
        <GoodToKnow tip={row.tip} />
        {noHr ? null : <Box component="hr" sx={{ gridColumn: "1/-1", padding: 0, height: "1px" }} />}
      </Box>
      <InformationBox information={row.information} />
    </Box>
  );
}

function DataRows({ rows, noHr }: { rows: Record<string, DocModelRow>; noHr: boolean }) {
  const rowList: [string, DocModelRow][] = Object.entries(rows);

  return (
    <>
      {rowList.map(([key, row], i) => (
        <DataField key={key} name={key} row={row} noHr={noHr && i === rowList.length - 1} />
      ))}
    </>
  );
}

function DataTypologie({ section, noHr }: { section: DocModelSection; noHr: boolean }) {
  return (
    <Box sx={{ display: "flex", gap: fr.spacing("1w"), flexDirection: "column" }}>
      {section.name !== null && (
        <>
          <Typography variant="h6">{getTextOpenAPI(section.name, "fr")}</Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: threeColumns,
              gap: fr.spacing("9w"),
              flexDirection: "column",
            }}
          >
            <Box component="hr" sx={{ gridColumn: "1/3", padding: 0, height: "1px" }} />
          </Box>
        </>
      )}
      <DataRows rows={section.rows} noHr={noHr} />
    </Box>
  );
}

function DataModelVariant({ datum, tab }: { datum: DocDatum; tab: boolean }) {
  const entries = Object.entries(datum.sections);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("4w"),
      }}
    >
      {entries.map(([key, section], i) => (
        <DataTypologie key={key} section={section} noHr={tab && i === entries.length - 1} />
      ))}
    </Box>
  );
}

function DataSection({ doc }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("4w"),
        marginY: fr.spacing("6w"),
      }}
    >
      <Typography variant="h2" sx={{ color: fr.colors.decisions.artwork.minor.blueEcume.default }}>
        Détail des données
      </Typography>
      {doc.data.length === 1 ? (
        <DataModelVariant datum={doc.data[0]} tab={false} />
      ) : (
        <Tabs
          tabs={doc.data.map((datum, i) => {
            return {
              isDefault: i === 0,
              label: getTextOpenAPI(datum.name, "fr"),
              content: <DataModelVariant datum={datum} tab />,
            };
          })}
        />
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: threeColumns,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gridColumn: spanTwoColumns,
            gap: fr.spacing("2w"),
            alignItems: "center",
          }}
        >
          <Artwork name="designer" height={80} />
          <Typography sx={{ textWrap: "balance" }} className={fr.cx("fr-text--lead")}>
            <strong>Besoin de ces données pour votre projet ?</strong>
          </Typography>
          <SwaggerLink doc={doc} />
        </Box>
      </Box>
    </Box>
  );
}

function ContactSection() {
  return (
    <Box sx={{ background: fr.colors.decisions.background.alt.beigeGrisGalet.default }}>
      <Container maxWidth="xl" disableGutters>
        <Box display="grid" gridTemplateColumns={threeColumns} padding={{ md: fr.spacing("6w") }}>
          <Box
            sx={{
              display: "grid",
              gap: fr.spacing("3w"),
              padding: fr.spacing("3w"),
              gridColumn: spanTwoColumns,
            }}
          >
            <Typography
              variant="h3"
              sx={{ color: fr.colors.decisions.text.label.blueEcume.default, textWrap: "balance" }}
            >
              Il vous manque une ou plusieurs donnée(s) pour répondre à vos besoins ?
            </Typography>
            <Box display="grid" gap={fr.spacing("2v")}>
              <Typography>
                <DsfrLink href={`mailto:${publicConfig.contactEmail}`}>Dites-le nous</DsfrLink>
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" position="relative">
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Artwork name="not-found-solid-iii-0" />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export function CatalogueData({ doc }: Props) {
  return (
    <>
      <DataSection doc={doc} />
      <ContactSection />
    </>
  );
}
