"use client";

import { Header as DSFRHeader, HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { styled } from "@mui/material";
import { Notice } from "@codegouvfr/react-dsfr/Notice";
import { useNavigationItems } from "./header.utils";
import { MonCompteQuickAccess } from "./MonCompteQuickAccess";
import { publicConfig } from "@/config.public";
import { useAuth } from "@/context/AuthContext";

const StyledDSFRHeader = styled(DSFRHeader)({
  "& .fr-header__logo": {
    display: "none",
  },
  "& .fr-nav__item": {
    marginLeft: "0 !important",
  },
});

export const Header = () => {
  // Force light mode
  const { isDark, setIsDark } = useIsDark();
  useEffect(() => {
    if (isDark) {
      setIsDark(false);
    }
  }, [isDark, setIsDark]);

  const pathname = usePathname();

  const { session } = useAuth();

  const navigation = useNavigationItems({ user: session?.user ?? null, pathname });

  return (
    <>
      <Notice
        severity="info"
        title={`Ce site est en version beta, des ajustements sont en cours. Merci de votre compréhension.`}
      />
      <StyledDSFRHeader
        brandTop={
          <>
            République
            <br />
            Française
          </>
        }
        homeLinkProps={{
          href: "/",
          title: `Accueil - ${publicConfig.productMeta.brandName}`,
        }}
        quickAccessItems={[
          <HeaderQuickAccessItem
            key="status-page"
            quickAccessItem={{
              iconId: "fr-icon-sun-fill",
              text: "Status",
              linkProps: {
                href: publicConfig.statusUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              },
            }}
          />,
          <MonCompteQuickAccess key="mon-compte-quick-access" />,
        ]}
        operatorLogo={{
          alt: "Logo Cour de cassation",
          imgUrl: "/images/logo_courdecassation_vertical.svg",
          orientation: "horizontal",
          linkProps: {
            href: "/",
            title: `Accueil - ${publicConfig.productMeta.brandName} - République Française`,
          },
        }}
        serviceTitle={
          <>
            API Communs numériques{" "}
            <Badge as="span" noIcon severity="new">
              Beta
            </Badge>
          </>
        }
        serviceTagline="Données de référence et communs numériques"
        navigation={navigation}
      />
    </>
  );
};
