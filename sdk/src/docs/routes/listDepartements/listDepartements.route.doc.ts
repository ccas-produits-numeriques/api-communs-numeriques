import { recuperationDepartementsPageSummaryDoc } from "../../metier/recuperation-departements/recuperation-departements.doc.js";
import type { DocRoute } from "../../types.js";
export const listDepartementsRouteDoc = {
  summary: recuperationDepartementsPageSummaryDoc.title,
  description: {
    fr: "Récupération des départements français, pour des raisons pratiques les collectivités et territoires d'outre-mer sont inclus et assimilés à des départements",
    en: null,
  },
  response: {
    description: {
      en: null,
      fr: "Succès",
    },
    content: {
      descriptions: [
        {
          fr: "Liste des départements français",
          en: null,
        },
      ],
      items: {
        descriptions: null,
      },
    },
  },
} as const satisfies DocRoute;
