import type { DocPage, OpenApiText } from "../../types.js";
import { rechercheCommunePageDoc } from "../recherche-commune/recherche-commune.doc.js";
export const recuperationMissionLocalePageSummaryDoc = {
  title: {
    en: null,
    fr: "Récupération des Mission Locales",
  },
  headline: {
    en: null,
    fr: "Consulter le référentiel des Missions Locales",
  },
} as const satisfies {
  title: OpenApiText;
  headline: OpenApiText;
};
export const recuperationMissionLocalesPageDoc = {
  tag: "geographie",
  operationIds: ["get_geographie_v1_mission_locale"],
  habilitation: null,
  description: [{ en: null, fr: "Récupération des Missions Locales" }],
  frequenceMiseAJour: "daily",
  type: "data",
  sources: [
    {
      name: "Union Nationale des Missions Locales",
      logo: { href: "/asset/logo/unml.svg" },
      providers: ["Union Nationale des Missions Locales"],
      href: "https://www.unml.info/",
    },
  ],
  data: [
    {
      name: { en: null, fr: "Mission locale" },
      sections: {
        mission_locale: rechercheCommunePageDoc.data[0].sections.mission_locale,
      },
    },
  ],
} as const satisfies DocPage;
