import { recuperationMissionLocalePageSummaryDoc } from "../../metier/recuperation-mission-locales/recuperation-mission-locales.doc.js";
import type { DocRoute } from "../../types.js";
import { jobSearchRouteDoc } from "../jobSearch/jobSearch.route.doc.js";
export const listMissionLocalesRouteDoc = {
  summary: recuperationMissionLocalePageSummaryDoc.title,
  description: {
    fr: "Récupération de la liste des missions locales",
    en: null,
  },
  parameters: {
    longitude: jobSearchRouteDoc.parameters.longitude,
    latitude: jobSearchRouteDoc.parameters.latitude,
    radius: jobSearchRouteDoc.parameters.radius,
  },
  response: {
    description: {
      en: null,
      fr: "Succès",
    },
    content: {
      descriptions: [
        {
          fr: "Liste des missions locales",
          en: null,
        },
      ],
      items: {
        descriptions: null,
      },
    },
  },
} as const satisfies DocRoute;
