import type { DocRoute } from "../../types.js";

export const searchCabinetAvocatRouteDoc = {
  summary: {
    fr: "Recherche de cabinets d'avocats",
    en: null,
  },
  description: {
    fr: "Retourne les cabinets d'avocats filtres par SIRET, nom ou ville.",
    en: null,
  },
  parameters: {
    siret: {
      descriptions: [{ fr: "SIRET du cabinet", en: null }],
    },
    nom: {
      descriptions: [{ fr: "Nom du cabinet", en: null }],
    },
    ville: {
      descriptions: [{ fr: "Ville du cabinet", en: null }],
    },
    limit: {
      descriptions: [{ fr: "Nombre maximal de resultats", en: null }],
    },
  },
  response: {
    description: { fr: "Succes", en: null },
    content: {
      descriptions: [{ fr: "Liste des cabinets", en: null }],
      items: { descriptions: null },
    },
  },
} as const satisfies DocRoute;
