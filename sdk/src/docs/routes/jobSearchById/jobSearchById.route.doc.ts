import { recuperationDetailOffrePageSummaryDoc } from "../../internal.js";
import type { DocRoute } from "../../types.js";
export const jobSearchByIdRouteDoc = {
  summary: recuperationDetailOffrePageSummaryDoc.title,
  description: {
    en: null,
    fr: "Accéder au détail d'une opportunité d'emploi à partir de son identifiant.",
  },
  parameters: {
    id: {
      descriptions: [{ en: null, fr: "Identifiant unique de l’opportunité d’emploi" }],
      examples: ["6687165396d52b5e01b409545"],
    },
  },
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: [
        {
          en: null,
          fr: "Détail de l'offre correspondant à l'identifiant fourni",
        },
      ],
    },
  },
} as const satisfies DocRoute;
export const jobSearchByIdPublishingRouteDoc = {
  summary: { fr: "Etat de la dernière publication de l'offre", en: null },
  description: {
    en: null,
    fr: "Cette route donne des informations sur l'état de la dernière publication de l'offre. En effet, la publication d'une offre peut prendre jusqu'à 10 minutes.",
  },
  parameters: {
    id: {
      descriptions: [{ en: null, fr: "Identifiant unique de l’opportunité d’emploi" }],
      examples: ["6687165396d52b5e01b409545"],
    },
  },
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: [
        {
          en: null,
          fr: "Informations de la dernière publication de l'offre",
        },
      ],
    },
  },
} as const satisfies DocRoute;
