"use client";

import { Header as DSFRHeader, HeaderQuickAccessItem } from "@codegouvfr/react-dsfr/Header";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { useNavigationItems } from "./header.utils";
import { MonCompteQuickAccess } from "./MonCompteQuickAccess";
import { publicConfig } from "@/config.public";
import { useAuth } from "@/context/AuthContext";

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
      <DSFRHeader
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
          alt: "Retour à l'accueil",
          imgUrl: "/images/logo_gouvernement.svg",
          orientation: "horizontal",
        }}
        serviceTitle={<>API Communs numériques</>}
        navigation={navigation}
      />
    </>
  );
};
