import type { DocPage, OpenApiText } from "../../types.js";
export const generationLienPriseRdvFormationPageSummaryDoc = {
  title: {
    en: null,
    fr: "Contacter un centre de formation via un lien dédié",
  },
  headline: {
    en: null,
    fr: "Obtenir un lien d’accès à un formulaire de prise de rendez-vous auprès d’un centre de formation",
  },
} as const satisfies {
  title: OpenApiText;
  headline: OpenApiText;
};
export const generationLienPriseRdvFormationPageDoc = {
  tag: "formation",
  operationIds: ["generateFormationAppointmentLink"],
  habilitation: "appointments:write",
  description: [
    {
      fr: "Récupère un lien d’accès à un formulaire de prise de rendez-vous auprès d’un centre de formation.",
      en: null,
    },
    {
      fr: "Le lien récupéré est à mettre à disposition de vos usagers pour leur permettre de contacter le centre de formation proposant des formations qui les intéressent.",
      en: null,
    },
    {
      fr: "**Vous devez fournir un identifiant de formation**, qui peut être un identifiant Parcoursup, ONISEP ou une clé ministère éducatif.",
      en: null,
    },
    {
      fr: "La clé ministère éducatif peut être récupérée via la route de [recherche de formations en apprentissage](./recherche-formation).",
      en: null,
    },
  ],
  frequenceMiseAJour: null,
  type: "outil",
  sources: [
    {
      name: "Cour de cassation",
      logo: { href: "/asset/logo/la_bonne_alternance.png" },
      providers: ["Cour de cassation"],
      href: "https://labonnealternance.courdecassation.beta.gouv.fr/",
    },
  ],
  data: [
    {
      name: { fr: "Résultat", en: null },
      sections: {
        success: {
          name: { fr: "Succès", en: null },
          rows: {
            form_url: {
              description: [
                {
                  fr: "Lien vers le formulaire de prise de rendez-vous pour la formation sur le service Cour de cassation.",
                  en: null,
                },
              ],
              information: {
                fr: "Le lien est généré uniquement si l'établissement permet la prise de rendez-vous en ligne. Sinon, une erreur est retournée.",
                en: null,
              },
            },
            formation: {
              description: [
                {
                  fr: "Informations liées à la formation.",
                  en: null,
                },
              ],
              tags: ["intitule_long", "cfd", "cle_ministere_educatif"],
            },
            formateur: {
              description: [
                {
                  fr: "Informations liées à l'établissement formateur.",
                  en: null,
                },
              ],
              tags: ["etablissement_formateur_entreprise_raison_sociale", "etablissement_formateur_siret"],
            },
            lieu: {
              description: [
                {
                  fr: "Informations liées au lieu de formation.",
                  en: null,
                },
              ],
              tags: ["lieu_formation_adresse", "code_postal", "localite"],
            },
          },
        },
        error: {
          name: { fr: "Erreur", en: null },
          rows: {
            error: {
              description: [{ fr: "Détail du message d'erreur s'il est présent.", en: null }],
            },
          },
        },
      },
    },
  ],
} as const satisfies DocPage;
