import "react-notion-x/src/styles.css";

import { fr } from "@codegouvfr/react-dsfr";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createGetHtmlAttributes, DsfrHeadBase } from "@codegouvfr/react-dsfr/next-app-router/server-only-index";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { captureException } from "@sentry/nextjs";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import type { ISessionJson } from "shared/routes/_private/auth.routes";

import { cookies } from "next/headers";
import { DsfrProvider, StartDsfrOnHydration } from "./DsfrProvider";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { AuthContextProvider } from "@/context/AuthContext";
import { defaultColorScheme } from "@/theme/defaultColorScheme";
import type { ApiError } from "@/utils/api.utils";
import { apiGet } from "@/utils/api.utils";

const { getHtmlAttributes } = createGetHtmlAttributes({ defaultColorScheme });

async function getSession(): Promise<ISessionJson | null> {
  try {
    const cookiesStore = await cookies();
    const sessionCookie = cookiesStore.get("api_session");
    if (!sessionCookie) {
      return null;
    }

    const session = await apiGet(`/_private/auth/session`, { headers: {} }, { cache: "no-store" });
    return session;
  } catch (error) {
    if ((error as ApiError).context?.statusCode !== 401) {
      captureException(error);
    }

    return null;
  }
}
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.svg" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  title: "API Communs numériques",
  description: "Un service de la Cour de cassation",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const lang = "fr" as const;
  const session = await getSession();

  return (
    <html {...getHtmlAttributes({ lang })} dir="ltr">
      <head>
        <DsfrHeadBase
          Link={Link}
          preloadFonts={[
            //"Marianne-Light",
            //"Marianne-Light_Italic",
            "Marianne-Regular",
            //"Marianne-Regular_Italic",
            "Marianne-Medium",
            //"Marianne-Medium_Italic",
            "Marianne-Bold",
            //"Marianne-Bold_Italic",
            //"Spectral-Regular",
            //"Spectral-ExtraBold"
          ]}
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <AuthContextProvider initialSession={session ?? null}>
            <DsfrProvider lang={lang}>
              <StartDsfrOnHydration />
              <MuiDsfrThemeProvider>
                <Header />
                <Box
                  sx={{
                    minHeight: "60vh",
                    color: fr.colors.decisions.text.default.grey.default,
                  }}
                >
                  {children}
                </Box>
                <Footer />
              </MuiDsfrThemeProvider>
            </DsfrProvider>
          </AuthContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
