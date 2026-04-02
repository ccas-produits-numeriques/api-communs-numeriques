import type { DocTechnicalField } from "../../types.js";
export const offerPublishingModelDoc = {
  descriptions: [{ en: null, fr: "Informations sur la publication de l'offre d'emploi" }],
  properties: {
    publishing: {
      descriptions: [{ en: null, fr: "Informations sur la publication de l'offre d'emploi" }],
      properties: {
        status: {
          descriptions: [
            {
              en: null,
              fr: "Etat de la publication. Si la valeur vaut WILL_NOT_BE_PUBLISHED, l'offre ne sera pas publiée.",
            },
          ],
          examples: ["WILL_BE_PUBLISHED", "PUBLISHED", "WILL_NOT_BE_PUBLISHED"],
        },
        error: {
          descriptions: [
            {
              en: null,
              fr: "Objet contenant l'erreur",
            },
          ],
          properties: {
            code: {
              descriptions: [
                {
                  en: null,
                  fr: "Code de l'erreur. Ce code ne changera pas.",
                },
              ],
              examples: [
                "CLOSED_COMPANY",
                "DUPLICATE",
                "STAGE",
                "EXPIRED",
                "CFA",
                "ROME_BLACKLISTED",
                "WRONG_DATA",
                "NON_DIFFUSIBLE",
              ],
            },
            label: {
              descriptions: [{ en: null, fr: "Description de l'erreur" }],
              examples: ["WILL_BE_PUBLISHED", "PUBLISHED", "WILL_NOT_BE_PUBLISHED"],
            },
          },
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
