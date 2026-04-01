"use client";
import { Footer as DSFRFooter, FooterBottomItem } from "@codegouvfr/react-dsfr/Footer";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import type { WithLang } from "@/app/i18n/settings";
// import { usePlausible } from "next-plausible";
import { publicConfig } from "@/config.public";
import { PAGES } from "@/utils/routes.utils";

export default function Footer({ lang }: WithLang) {
  const { t } = useTranslation("global", { lng: lang });

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
        href: PAGES.static.mentionsLegales.getPath(lang),
      }}
      accessibilityLinkProps={{
        href: PAGES.static.accessibilite.getPath(lang),
      }}
      bottomItems={[
        <FooterBottomItem
          key="cgu"
          bottomItem={{
            text: PAGES.static.cgu.getTitle(lang, t),
            linkProps: {
              href: PAGES.static.cgu.getPath(lang),
            },
          }}
        />,
        <FooterBottomItem
          key="politique-confidentialite"
          bottomItem={{
            text: PAGES.static.politiqueConfidentialite.getTitle(lang, t),
            linkProps: {
              href: PAGES.static.politiqueConfidentialite.getPath(lang),
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
