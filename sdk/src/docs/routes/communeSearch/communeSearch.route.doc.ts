import { rechercheCommunePageSummaryDoc } from "../../metier/recherche-commune/recherche-commune.doc.js";
import type { DocRoute } from "../../types.js";
export const communeSearchRouteDoc = {
  summary: rechercheCommunePageSummaryDoc.title,
  description: {
    fr: "Recherche de communes par code insee ou postal. La recherche par code INSEE, recherche également parmis les anciennes communes fusionnées (déléguées ou associées) et parmis les arrondissements municipaux. Attention, un meme code postal peut-etre associé à plusieurs communes et une commune peut avoir plusieurs code postaux.",
    en: null,
  },
  parameters: {
    code: {
      descriptions: [{ fr: "Code INSEE ou postal recherché", en: null }],
      examples: ["75056", "75000"],
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
          fr: "Liste des communes correspondant au code INSEE ou postal recherché",
          en: null,
        },
      ],
      items: {
        descriptions: null,
      },
    },
  },
} as const satisfies DocRoute;
