import type { DocTechnicalField } from "../../types.js";
export const paginationModelDoc = {
  descriptions: [{ en: null, fr: "Informations de pagination" }],
  properties: {
    page_index: {
      descriptions: [{ en: null, fr: "Numéro de la page actuelle" }],
    },
    page_size: {
      descriptions: [{ en: null, fr: "Nombre d'éléments par page" }],
    },
    page_count: {
      descriptions: [{ en: null, fr: "Nombre total de pages" }],
    },
  },
} as const satisfies DocTechnicalField;
export const paginationQueryParameterDoc = {
  page_size: {
    descriptions: [
      {
        fr: "Nombre d'éléments par page",
        en: null,
      },
    ],
    examples: [10],
  },
  page_index: {
    descriptions: [
      {
        fr: "Numéro de la page actuelle (commence à 0)",
        en: null,
      },
    ],
    examples: [12],
  },
};
