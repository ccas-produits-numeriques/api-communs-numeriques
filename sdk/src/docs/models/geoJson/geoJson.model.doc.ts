import type { DocTechnicalField } from "../../types.js";
export const geoJsonPointModelDoc = {
  descriptions: null,
  properties: {
    type: {
      descriptions: null,
    },
    coordinates: {
      descriptions: null,
      prefixItems: [
        { descriptions: [{ en: null, fr: "Longitude" }], examples: [48.850699] },
        { descriptions: [{ en: null, fr: "Latitude" }], examples: [2.308628] },
      ],
    },
  },
} as const satisfies DocTechnicalField;
export const geoJsonPolygonModelDoc = {
  descriptions: null,
  properties: {
    type: {
      descriptions: null,
    },
    coordinates: {
      descriptions: null,
      items: {
        descriptions: null,
        items: {
          descriptions: null,
          prefixItems: [
            { descriptions: [{ en: null, fr: "Longitude" }], examples: [48.850699] },
            { descriptions: [{ en: null, fr: "Latitude" }], examples: [2.308628] },
          ],
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
export const adresseModelDoc = {
  descriptions: [{ fr: "Adresse", en: null }],
  properties: {
    academie: {
      descriptions: [{ fr: "Académie", en: null }],
      properties: {
        code: {
          descriptions: [
            {
              fr: "Code de l'académie",
              en: null,
            },
          ],
          examples: ["A1"],
        },
        id: {
          descriptions: [
            {
              fr: "Identifiant de l'académie",
              en: null,
            },
          ],
          examples: ["1"],
        },
        nom: {
          descriptions: [
            {
              fr: "Nom de l'académie",
              en: null,
            },
          ],
          examples: ["Académie de Paris"],
        },
      },
    },
    code_postal: {
      descriptions: [{ fr: "Code postal", en: null }],
      anyOf: [{ descriptions: null }, { descriptions: null }],
    },
    commune: {
      descriptions: [{ fr: "Ville", en: null }],
      properties: {
        code_insee: {
          descriptions: [
            {
              fr: "Code INSEE de la ville",
              en: null,
            },
          ],
        },
        nom: {
          descriptions: [{ fr: "Nom de la ville", en: null }],
        },
      },
    },
    departement: {
      descriptions: [{ fr: "Département", en: null }],
      properties: {
        code_insee: {
          descriptions: [
            {
              fr: "Code INSEE du département",
              en: null,
            },
          ],
        },
        nom: {
          descriptions: [
            {
              fr: "Nom du département",
              en: null,
            },
          ],
        },
      },
    },
    label: {
      descriptions: [{ fr: "Libellé de l'adresse", en: null }],
      anyOf: [{ descriptions: null }, { descriptions: null }],
    },
    region: {
      descriptions: [{ fr: "Région", en: null }],
      properties: {
        code_insee: {
          descriptions: [
            {
              fr: "Code INSEE de la région",
              en: null,
            },
          ],
        },
        nom: {
          descriptions: [{ fr: "Nom de la région", en: null }],
        },
      },
    },
  },
};
