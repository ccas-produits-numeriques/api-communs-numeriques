import type { DocPage, OpenApiText } from "../../types.js";
export const recuperationOrganismesPageSummaryDoc = {
  title: {
    fr: "Récupération des organismes de formation en apprentissage",
    en: null,
  },
  headline: {
    en: null,
    fr: "Récupérer la liste de tous les organismes issus du référentiel Onisep historisé",
  },
} as const satisfies {
  title: OpenApiText;
  headline: OpenApiText;
};
export const recuperationOrganismesPageDoc = {
  tag: "organismes",
  operationIds: ["get_organisme_v1_export"],
  habilitation: null,
  description: [recuperationOrganismesPageSummaryDoc.headline],
  frequenceMiseAJour: "daily",
  type: "data",
  sources: [
    {
      name: "Référentiel UAI-SIRET des OFA-CFA",
      logo: { href: "/asset/logo/onisep.png" },
      providers: ["ONISEP"],
      href: "https://referentiel.apprentissage.onisep.fr/organismes",
    },
    {
      name: "API Entreprise",
      logo: { href: "/images/logo_gouvernement.svg" },
      providers: ["Direction interministérielle du numérique (DINUM)"],
      href: "https://entreprise.api.gouv.fr",
    },
  ],
  data: [
    {
      name: { fr: "Organisme", en: null },
      sections: {
        global: {
          name: null,
          rows: {
            identifiant: {
              description: [
                {
                  fr: "L'identifiant unique d'un organisme de formation est constitué du couple UAI-SIRET.",
                  en: null,
                },
                {
                  fr: "Un UAI peut être associé à plusieurs SIRET.",
                  en: null,
                },
                {
                  fr: "Un SIRET peut être associé à plusieurs UAI. Mais à un instant donné un SIRET est associé à un seul UAI dans le référentiel.",
                  en: null,
                },
              ],
              information: {
                fr: "Bien que les organismes soient uniques par SIRET dans le [référentiel](https://referentiel.apprentissage.onisep.fr/organismes), l'historisation peut conduire à des situations où un SIRET est associé à plusieurs UAI. **L'unicité d'un organisme est ainsi garantie par le couple UAI-SIRET.**",
                en: null,
              },
              tags: ["uai", "siret"],
            },
            statut: {
              description: [
                {
                  fr: "Statut de l'organisme dans le référentiel des organismes de formation.",
                  en: null,
                },
                { fr: "Les valeurs possibles sont : ", en: null },
                {
                  fr: "- `présent` pour les organismes présents dans le référentiel.",
                  en: null,
                },
                {
                  fr: "- `supprimé` pour les organismes supprimés du référentiel.",
                  en: null,
                },
              ],
              tags: ["referentiel"],
            },
            renseignements_specifiques: {
              description: [
                { fr: "Renseignements spécifiques de l'organisme.", en: null },
                {
                  fr: "Les informations spécifiques sont des informations propres à l'organisme de formation.",
                  en: null,
                },
              ],
              tags: ["qualiopi", "numero_activite"],
            },
            contacts: {
              description: [
                {
                  fr: "Liste des e-mails de contact de l'organisme de formation.",
                  en: null,
                },
              ],
              information: {
                fr: "Les contacts sont issus de différentes sources, nous ne sommes pas en mesure de garantir la validité des e-mails.",
                en: null,
              },
              tags: ["email", "sources", "confirmation_referentiel"],
            },
          },
        },
        etablissement: {
          name: { fr: "Établissement", en: null },
          rows: {
            siret: {
              description: [{ fr: "Numéro SIRET de l'établissement.", en: null }],
            },
            adresse: {
              description: [
                { fr: "Adresse de l'établissement.", en: null },
                {
                  fr: "En plus de l'adresse postale, le découpage géographique est également fourni (département, région, académie).",
                  en: null,
                },
              ],
              tags: ["label", "code_postal", "commune", "departement", "region", "academie"],
            },
            geopoint: {
              description: [{ fr: "Coordonnées GPS de l'établissement.", en: null }],
            },
            ouvert: {
              description: [
                {
                  fr: "Indique si l'établissement est ouvert ou fermé.",
                  en: null,
                },
              ],
            },
            creation: {
              description: { fr: "Date de création de l'établissement.", en: null },
            },
            fermeture: {
              description: [{ fr: "Date de fermeture de l'établissement.", en: null }],
            },
          },
        },
        unite_legale: {
          name: { fr: "Unité légale", en: null },
          rows: {
            siren: {
              description: [{ fr: "Numéro SIREN de l'unité légale.", en: null }],
            },
            actif: {
              description: [{ fr: "Indique si l'unité légale est active.", en: null }],
            },
            raison_sociale: {
              description: [{ fr: "Raison sociale de l'entreprise.", en: null }],
            },
            creation: {
              description: [{ fr: "Date de création de l'entreprise.", en: null }],
            },
            cessation: {
              description: [{ fr: "Date de cessation de l'entreprise.", en: null }],
            },
          },
        },
      },
    },
  ],
} as const satisfies DocPage;
