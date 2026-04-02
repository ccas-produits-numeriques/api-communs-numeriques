import localisationDescriptionFr from "../../metier/recherche-commune/fr/localisation.description.md.js";
import type { DocTechnicalField } from "../../types.js";
export const communeModelDoc = {
  descriptions: [{ fr: "Commune", en: null }],
  properties: {
    nom: {
      descriptions: [{ fr: "Nom de la commune", en: null }],
    },
    code: {
      descriptions: [
        {
          fr: "Code INSEE et postaux de la commune",
          en: null,
        },
        {
          fr: "Une commune peut avoir plusieurs code postaux, et un code postal peut correspondre à plusieurs communes. Le code INSEE lui est unique pour chaque commune.",
          en: null,
        },
      ],
      properties: {
        insee: {
          descriptions: [{ fr: "Code INSEE de la commune", en: null }],
        },
        postaux: {
          descriptions: [{ fr: "Liste des codes postaux de la commune", en: null }],
          items: {
            descriptions: null,
          },
        },
      },
    },
    anciennes: {
      descriptions: [{ fr: "Anciennes communes fusionnées", en: null }],
      items: {
        descriptions: null,
        properties: {
          nom: {
            descriptions: [{ fr: "Nom de l'ancienne commune", en: null }],
          },
          codeInsee: {
            descriptions: [{ fr: "Code INSEE de l'ancienne commune", en: null }],
          },
        },
      },
    },
    arrondissements: {
      descriptions: [{ fr: "Arrondissements de la commune", en: null }],
      items: {
        descriptions: null,
        properties: {
          nom: {
            descriptions: [{ fr: "Nom de l'arrondissement", en: null }],
          },
          code: {
            descriptions: [{ fr: "Code INSEE de l'arrondissement", en: null }],
          },
        },
      },
    },
    region: {
      descriptions: [{ fr: "Région de la commune", en: null }],
      properties: {
        codeInsee: {
          descriptions: [{ fr: "Code INSEE de la région", en: null }],
        },
        nom: {
          descriptions: [{ fr: "Nom de la région", en: null }],
        },
      },
    },
    departement: {
      descriptions: [{ fr: "Département de la commune", en: null }],
      properties: {
        nom: {
          descriptions: [{ fr: "Nom du département", en: null }],
        },
        codeInsee: {
          descriptions: [
            {
              fr: "Code INSEE du département",
              en: null,
            },
          ],
        },
      },
    },
    academie: {
      descriptions: [{ fr: "Académie de la commune", en: null }],
      properties: {
        id: {
          descriptions: [{ fr: "Identifiant de l'académie", en: null }],
        },
        code: {
          descriptions: [{ fr: "Code de l'académie", en: null }],
        },
        nom: {
          descriptions: [{ fr: "Nom de l'académie", en: null }],
        },
      },
    },
    localisation: {
      descriptions: [{ en: null, fr: localisationDescriptionFr }],
      properties: {
        centre: {
          descriptions: [
            {
              fr: 'Coordonnées du centre de la commune au format GeoJSON "Point"',
              en: null,
            },
          ],
        },
        bbox: {
          descriptions: [
            {
              fr: 'Coordonnées de la boîte englobante de la commune au format GeoJSON "Polygon"',
              en: null,
            },
          ],
        },
      },
    },
    mission_locale: {
      descriptions: [{ fr: "Mission locale dont relève la commune", en: null }],
      anyOf: [{ descriptions: null }, { descriptions: null }],
    },
  },
} as const satisfies DocTechnicalField;
