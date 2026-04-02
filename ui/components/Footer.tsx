"use client";
import { Footer as DSFRFooter, FooterBottomItem } from "@codegouvfr/react-dsfr/Footer";
import Link from "next/link";

// import { usePlausible } from "next-plausible";
import { styled } from "@mui/material";
import { publicConfig } from "@/config.public";
import { PAGES } from "@/utils/routes.utils";

const StyledDSFRFooter = styled(DSFRFooter)({
  "& .operator-logo-footer": {
    width: "185px",
    height: "75px",
  },
});

export default function Footer() {
  return (
    <StyledDSFRFooter
      accessibility="partially compliant"
      contentDescription={
        <span>
          API Communs numériques est sponsorisé par la Cour de cassation <br />
          Le portail de services est porté par{" "}
          <Link href="https://beta.gouv.fr/incubateurs/justice">l'Incubateur de la Justice</Link>.
        </span>
      }
      operatorLogo={{
        alt: "Logo Cour de cassation",
        imgUrl: "/images/logo_courdecassation_vertical.svg",
        orientation: "horizontal",
      }}
      classes={{ operatorLogo: "operator-logo-footer" }}
      websiteMapLinkProps={{
        href: "/sitemap.xml",
      }}
      termsLinkProps={{
        href: PAGES.static.mentionsLegales.getPath(),
      }}
      accessibilityLinkProps={{
        href: PAGES.static.accessibilite.getPath(),
      }}
      bottomItems={[
        <FooterBottomItem
          key="cgu"
          bottomItem={{
            text: PAGES.static.cgu.getTitle(),
            linkProps: {
              href: PAGES.static.cgu.getPath(),
            },
          }}
        />,
        <FooterBottomItem
          key="politique-confidentialite"
          bottomItem={{
            text: PAGES.static.politiqueConfidentialite.getTitle(),
            linkProps: {
              href: PAGES.static.politiqueConfidentialite.getPath(),
            },
          }}
        />,
        <FooterBottomItem
          key="code-source"
          bottomItem={{
            text: "Code source",
            linkProps: {
              href: publicConfig.repositoryUrl,
            },
          }}
        />,
      ]}
    />
  );
}
