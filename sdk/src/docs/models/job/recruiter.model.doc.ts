import applyDescFr from "../../metier/recherche-offre/fr/apply.description.md.js";
import identifierDescFr from "../../metier/recherche-offre/fr/identifier.description.md.js";
import workplaceDescFr from "../../metier/recherche-offre/fr/workplace.description.md.js";
import workplaceDomainDescFr from "../../metier/recherche-offre/fr/workplace.domain.description.md.js";
import workplaceLocationDescFr from "../../metier/recherche-offre/fr/workplace.location.description.md.js";
import type { DocTechnicalField } from "../../types.js";
export const recruiterModelDoc = {
  descriptions: [{ fr: "Recruteur", en: null }],
  properties: {
    identifier: {
      descriptions: [{ en: null, fr: identifierDescFr }],
      properties: {
        id: {
          descriptions: [{ fr: "Identifiant unique du recruteur", en: null }],
          examples: ["6687165396d52b5e01b409545"],
        },
      },
    },
    workplace: {
      descriptions: [{ en: null, fr: workplaceDescFr }],
      properties: {
        siret: {
          descriptions: [
            {
              en: null,
              fr: "SIRET du lieu d'exécution du contrat ou du CFA si is_delegated = true",
            },
          ],
          examples: ["13002526500013"],
        },
        name: {
          descriptions: [
            {
              en: null,
              fr: "Nom de l'établissement (enseigne ou, à défaut, nom légal) ou nom légal du CFA si is_delegated = true",
            },
            {
              en: null,
              fr: "Dans le cas de la publication d'une offre d'emploi, il est possible d'utiliser un nom personnalisé ; sinon, il prendra la valeur de l'enseigne, ou à défaut, du nom légal.",
            },
          ],
          examples: ["DIRECTION INTERMINISTERIELLE DU NUMERIQUE (DINUM)"],
        },
        description: {
          descriptions: [
            {
              en: null,
              fr: "Description de l'employeur et/ou du département où sera exécuté le contrat.",
            },
          ],
          examples: [
            "Service du Premier ministre, placé sous l’autorité du ministre de la Transformation et de la Fonction publiques, la direction interministérielle du numérique (DINUM) a pour mission d’élaborer la stratégie numérique de l’État et de piloter sa mise en œuvre. Notre objectif : un État plus efficace, plus simple et plus souverain grâce au numérique.",
          ],
        },
        brand: {
          descriptions: [{ en: null, fr: "Enseigne de l'établissement" }],
          examples: ["Enseigne (todo)"],
        },
        legal_name: {
          descriptions: [
            {
              en: null,
              fr: "Raison sociale de l'entreprise ou raison sociale du CFA si is_delegated = true",
            },
          ],
        },
        size: {
          descriptions: [
            {
              en: null,
              fr: "Effectif de l'entreprise, en nombre d'employés",
            },
          ],
          examples: ["100-199"],
        },
        website: {
          descriptions: [{ en: null, fr: "Site web de l'entreprise" }],
          examples: ["https://beta.gouv.fr/startups/"],
        },
        location: {
          descriptions: [{ en: null, fr: workplaceLocationDescFr }],
          properties: {
            address: {
              descriptions: [
                {
                  en: null,
                  fr: "Adresse postale du lieu de l'offre d'emploi ou du CFA si is_delegated = true.",
                },
              ],
              examples: ["20 AVENUE DE SEGUR 75007 PARIS"],
            },
            geopoint: {
              descriptions: [
                { en: null, fr: "Localisation géographique liée à l'adresse" },
                { en: null, fr: "Déduite de l'adresse." },
              ],
            },
          },
        },
        domain: {
          descriptions: [{ en: null, fr: workplaceDomainDescFr }],
          properties: {
            idcc: {
              descriptions: [
                {
                  en: null,
                  fr: "Numéro de convention collective associé au SIRET",
                },
              ],
              examples: [1979],
            },
            naf: {
              descriptions: [
                {
                  en: null,
                  fr: "Code NAF (secteur d'activité) associé au SIRET",
                },
              ],
              properties: {
                code: {
                  descriptions: [
                    {
                      en: null,
                      fr: "Code NAF (secteur d'activité) associé au SIRET",
                    },
                  ],
                  examples: ["8411Z"],
                },
                label: {
                  descriptions: [
                    {
                      en: null,
                      fr: "Libellé du code NAF (secteur d'activité) associé au SIRET",
                    },
                  ],
                  examples: ["Administration publique générale"],
                },
              },
            },
            opco: {
              descriptions: [
                {
                  en: null,
                  fr: "OPérateur de Compétences (OPCO) associé au SIRET",
                },
              ],
              examples: ["OPCO 2i"],
            },
          },
        },
      },
    },
    apply: {
      descriptions: [{ en: null, fr: applyDescFr }],
      properties: {
        recipient_id: {
          descriptions: [
            {
              en: null,
              fr: "Identifiant à utiliser pour postuler à l'offre d'emploi via la route /v3/jobs/apply ou pour afficher le widget postuler. Si null, la candidature n'est pas disponible pour cette offre par la route apply_route ni par le widget /postuler.",
            },
          ],
        },
        phone: {
          descriptions: [
            {
              en: null,
              fr: "Numéro de téléphone du recruteur ou du CFA si is_delegated = true",
            },
            {
              en: null,
              fr: "Seuls les numéros de téléphone européens sont autorisés. Il y a également une vérification sur la nature du numéro : seuls les téléphones mobiles et fixes sont autorisés.",
            },
          ],
          examples: ["0199000000"],
        },
        url: {
          descriptions: [{ en: null, fr: "URL de redirection vers le formulaire de candidature" }],
          examples: [
            "https://labonnealternance.courdecassation.beta.gouv.fr/recherche-apprentissage?display=list&page=fiche&type=matcha&itemId=664752a2ebe24062b758c641",
          ],
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
