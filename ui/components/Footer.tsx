"use client";
import { Footer as DSFRFooter, FooterBottomItem } from "@codegouvfr/react-dsfr/Footer";
import Link from "next/link";

// import { usePlausible } from "next-plausible";
import { publicConfig } from "@/config.public";
import { PAGES } from "@/utils/routes.utils";

export default function Footer() {
  return (
    <DSFRFooter
      accessibility="partially compliant"
      contentDescription={
        <span>
          API Communs numériques est un service porté par la{" "}
          <Link href="https://www.courdecassation.fr/">Cour de cassation</Link>.
        </span>
      }
      operatorLogo={{
        alt: "Logo République française",
        imgUrl: "/images/logo_gouvernement.svg",
        orientation: "vertical",
      }}
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
