import { recuperationFormationPageSummaryDoc } from "../../internal.js";
import type { DocRoute } from "../../types.js";
export const searchFormationByIdRouteDoc = {
  summary: recuperationFormationPageSummaryDoc.title,
  description: recuperationFormationPageSummaryDoc.headline,
  parameters: {
    id: {
      descriptions: [{ fr: "Identifiant unique de la formation - clé ME", en: null }],
      examples: ["049510P01118838776490001178615112600012-49099#L01"],
    },
  },
  response: {
    description: {
      en: null,
      fr: "Succès",
    },
    content: {
      descriptions: [
        {
          en: null,
          fr: "Formations correspondant à l'identifiant de recherche (clé ME)",
        },
      ],
    },
  },
} as const satisfies DocRoute;
