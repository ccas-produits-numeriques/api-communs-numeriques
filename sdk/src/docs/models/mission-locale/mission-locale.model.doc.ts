import type { DocTechnicalField } from "../../types.js";
export const missionLocaleModelDoc = {
  descriptions: [{ fr: "Mission Locale", en: null }],
  properties: {
    id: {
      descriptions: [{ fr: "Identifiant de la Mission Locale", en: null }],
    },
    code: {
      descriptions: [{ fr: "Code de la mission locale", en: null }],
    },
    nom: {
      descriptions: [{ fr: "Nom de la mission locale", en: null }],
    },
    siret: {
      descriptions: [{ fr: "Numéro SIRET de la mission locale", en: null }],
    },
    localisation: {
      descriptions: [
        {
          fr: "Localisation de la mission locale",
          en: null,
        },
      ],
      properties: {
        geopoint: {
          descriptions: [{ fr: 'Coordonnés GPS au format GeoJSON "Point"', en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        adresse: {
          descriptions: [{ fr: "Adresse de la Mission Locale", en: null }],
        },
        cp: {
          descriptions: [{ fr: "Code postal de la Mission Locale", en: null }],
        },
        ville: {
          descriptions: [{ fr: "Ville de la Mission Locale", en: null }],
        },
      },
    },
    contact: {
      descriptions: [{ fr: "Contact de la mission locale", en: null }],
      properties: {
        email: {
          descriptions: [{ fr: "Email de contact de la mission locale", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        telephone: {
          descriptions: [{ fr: "Téléphone de contact de la mission locale", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        siteWeb: {
          descriptions: [{ fr: "Site web de la mission locale", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
