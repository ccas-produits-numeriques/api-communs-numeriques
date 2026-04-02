import { generationLienPriseRdvFormationPageSummaryDoc } from "../../metier/generation-lien-prise-rdv-formation/generation-lien-prise-rdv-formation.doc.js";
import type { DocRoute } from "../../types.js";
export const generateFormationAppointmentLinkRouteDoc = {
  summary: generationLienPriseRdvFormationPageSummaryDoc.title,
  description: generationLienPriseRdvFormationPageSummaryDoc.headline,
  body: {
    description: {
      fr: "Identifiant de la formation, permettant de générer un lien de prise de rendez-vous pour la formation. Possibilité de fournir 1 paramètre parmi 3 types possibles : cle_ministere_educatif, parcoursup_id, onisep_id",
      en: null,
    },
    content: {
      descriptions: null,
      anyOf: [
        {
          descriptions: [{ fr: "Identifiant Parcoursup de la formation", en: null }],
          properties: {
            parcoursup_id: {
              descriptions: [{ fr: "Identifiant Parcoursup de la formation", en: null }],
            },
          },
        },
        {
          descriptions: [{ fr: "Identifiant ONISEP de la formation", en: null }],
          properties: {
            onisep_id: {
              descriptions: [
                {
                  en: null,
                  fr: "Identifiant ONISEP utilisé avec le mapping de la collection referentielonisep",
                },
              ],
            },
          },
        },
        {
          descriptions: [
            {
              fr: "Identifiant unique de la formation au sein du ministère de l'éducation",
              en: null,
            },
          ],
          properties: {
            cle_ministere_educatif: {
              descriptions: [
                {
                  fr: "Identifiant unique de la formation au sein du ministère de l'éducation",
                  en: null,
                },
              ],
            },
          },
        },
      ],
    },
  },
  response: {
    description: {
      en: null,
      fr: "Réponse",
    },
    content: {
      descriptions: null,
      anyOf: [
        {
          descriptions: [{ fr: "Résultat en cas de succès", en: null }],
          properties: {
            etablissement_formateur_entreprise_raison_sociale: {
              descriptions: [
                {
                  en: null,
                  fr: "Raison social de l'établissement formateur",
                },
              ],
            },
            intitule_long: {
              descriptions: [
                {
                  en: null,
                  fr: "Intitulé long de la formation",
                },
              ],
            },
            lieu_formation_adresse: {
              descriptions: [
                {
                  en: null,
                  fr: "Adresse du lieu de formation",
                },
              ],
            },
            code_postal: {
              descriptions: [
                {
                  en: null,
                  fr: "Code postal du lieu de formation",
                },
              ],
            },
            etablissement_formateur_siret: {
              descriptions: [
                {
                  en: null,
                  fr: "Le numéro de SIRET de l'établissement",
                },
              ],
              examples: ["78424186100011"],
            },
            cfd: {
              descriptions: [
                {
                  en: null,
                  fr: "Code formation diplôme de la formation",
                },
              ],
            },
            localite: {
              descriptions: [
                {
                  en: null,
                  fr: "Localité du lieu de formation",
                },
              ],
            },
            cle_ministere_educatif: {
              descriptions: [
                {
                  en: null,
                  fr: "Identifiant unique de la formation au sein du ministère de l'éducation",
                },
              ],
            },
            form_url: {
              descriptions: [
                {
                  en: null,
                  fr: "Lien de prise de rendez-vous Cour de cassation",
                },
              ],
            },
          },
        },
        {
          descriptions: [
            {
              fr: "Résultat en cas d'erreur",
              en: null,
            },
          ],
          properties: {
            error: {
              descriptions: null,
            },
          },
        },
      ],
    },
  },
} as const satisfies DocRoute;
