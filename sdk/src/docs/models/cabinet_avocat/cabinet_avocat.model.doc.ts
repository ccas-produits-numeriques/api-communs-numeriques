import type { DocTechnicalField } from "../../types.js";

export const cabinetAvocatModelDoc = {
  descriptions: null,
  properties: {
    id: {
      descriptions: [{ fr: "Identifiant technique du cabinet", en: null }],
    },
    siret: {
      descriptions: [{ fr: "Numero SIRET du cabinet", en: null }],
    },
    nom: {
      descriptions: [{ fr: "Nom du cabinet", en: null }],
    },
    ville: {
      descriptions: [{ fr: "Ville du cabinet", en: null }],
    },
    barreau: {
      descriptions: [{ fr: "Barreau de rattachement", en: null }],
    },
    adresse: {
      descriptions: [{ fr: "Adresse postale du cabinet", en: null }],
      anyOf: [{ descriptions: null }, { descriptions: null }],
    },
  },
} as const satisfies DocTechnicalField;
