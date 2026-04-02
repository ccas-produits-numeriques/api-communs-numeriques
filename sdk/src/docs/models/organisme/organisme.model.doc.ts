import type { DocTechnicalField } from "../../types.js";
export const organismeModelDoc = {
  descriptions: null,
  properties: {
    contacts: {
      descriptions: [{ fr: "Contacts de l'organisme", en: null }],
      items: {
        descriptions: null,
        properties: {
          confirmation_referentiel: {
            descriptions: [
              {
                fr: 'Indique si le contact a un statut "confirmé" sur le référentiel des organismes de formation',
                en: null,
              },
            ],
          },
          email: {
            descriptions: [{ fr: "Email du contact", en: null }],
          },
          sources: {
            descriptions: [{ fr: "Sources du contact", en: null }],
            items: {
              descriptions: null,
            },
          },
        },
      },
    },
    etablissement: {
      descriptions: [{ fr: "Etablissement de l'organisme", en: null }],
      properties: {
        adresse: {
          descriptions: [{ fr: "Adresse de l'établissement", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        geopoint: {
          descriptions: [{ fr: "Coordonnées GPS de l'établissement", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        creation: {
          descriptions: [{ fr: "Date de création de l'établissement", en: null }],
        },
        enseigne: {
          descriptions: [{ fr: "Enseigne de l'établissement", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        fermeture: {
          descriptions: [{ fr: "Date de fermeture de l'établissement", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        ouvert: {
          descriptions: [{ fr: "Etablissement ouvert", en: null }],
        },
        siret: {
          descriptions: [{ fr: "Numéro SIRET de l'établissement", en: null }],
        },
      },
    },
    identifiant: {
      descriptions: [{ fr: "Identifiant de l'organisme", en: null }],
      properties: {
        siret: {
          descriptions: [{ fr: "Numéro SIRET de l'organisme", en: null }],
        },
        uai: {
          descriptions: [{ fr: "Numéro UAI de l'organisme", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    renseignements_specifiques: {
      descriptions: [{ fr: "Renseignements spécifiques", en: null }],
      properties: {
        numero_activite: {
          descriptions: [{ fr: "Numéro d'activité", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        qualiopi: {
          descriptions: [{ fr: "Qualiopi", en: null }],
        },
      },
    },
    statut: {
      descriptions: [{ fr: "Statut de l'organisme", en: null }],
      properties: {
        referentiel: {
          descriptions: [
            {
              fr: "Statut de l'organisme dans le réferentiel des organismes en apprentissage",
              en: null,
            },
          ],
        },
      },
    },
    unite_legale: {
      descriptions: [{ fr: "Unité légale de l'organisme", en: null }],
      properties: {
        actif: {
          descriptions: [{ fr: "Unité légale active", en: null }],
        },
        cessation: {
          descriptions: [{ fr: "Date de cessation de l'unité légale", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        creation: {
          descriptions: [{ fr: "Date de création de l'unité légale", en: null }],
        },
        raison_sociale: {
          descriptions: [{ fr: "Raison sociale de l'unité légale", en: null }],
        },
        siren: {
          descriptions: [{ fr: "Numéro SIREN de l'unité légale", en: null }],
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
