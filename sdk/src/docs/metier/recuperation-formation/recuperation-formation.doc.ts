import type { DocPage, OpenApiText } from "../../types.js";
import { certificationsPageDoc } from "../certifications/certifications.doc.js";
import { rechercheCommunePageDoc } from "../recherche-commune/recherche-commune.doc.js";
import { recuperationOrganismesPageDoc } from "../recuperation-organismes/recuperation-organismes.doc.js";
export const recuperationFormationPageSummaryDoc = {
  title: {
    en: null,
    fr: "Consulter le détail d'une formation",
  },
  headline: {
    en: null,
    fr: "Accéder au détail d'une formation en apprentissage à partir de son identifiant",
  },
} as const satisfies {
  title: OpenApiText;
  headline: OpenApiText;
};
export const recuperationFormationPageDoc = {
  tag: "formation",
  operationIds: ["get_formation_v1_search"],
  habilitation: null,
  description: [
    {
      fr: "**Accédez gratuitement et en temps réel au détail d'une formation en apprentissage.** ",
      en: null,
    },
    {
      fr: "Les formations retournées sont celles collectées par [le catalogue des formations en apprentissage](https://catalogue-apprentissage.intercariforef.org/recherche/formations) **du réseau des Carif-Oref.**",
      en: null,
    },
    {
      fr: "**💡 Cette API est utilisée en complément de la [route d'API de recherche de formations en apprentissage](https://api.courdecassation.beta.gouv.fr/fr/explorer/recherche-formation). Elle permet de récupérer une formation à partir de son identifiant (fourni par la route d'API de recherche).**",
      en: null,
    },
  ],
  frequenceMiseAJour: "daily",
  type: "data",
  sources: [
    {
      name: "Catalogue des offres de formations en apprentissage",
      logo: { href: "/asset/logo/carif-oref.png" },
      providers: ["Réseau des CARIF OREF"],
      href: "https://catalogue-apprentissage.intercariforef.org/",
    },
    ...recuperationOrganismesPageDoc.sources,
    ...certificationsPageDoc.sources,
    ...rechercheCommunePageDoc.sources,
  ],
  data: [
    {
      name: { en: null, fr: "Formation" },
      sections: {
        global: {
          name: null,
          rows: {
            identifiant: {
              description: [
                {
                  fr: "Identifiant unique de la formation sur [le catalogue des formations en apprentissage](https://catalogue-apprentissage.intercariforef.org/recherche/formations).",
                  en: null,
                },
              ],
              information: {
                en: null,
                fr: "Ce catalogue est produit par RCO (le réseau des Carif-Oref), qui se charge de collecter au niveau national l'offre de formation collectée régionalement par les Carif-Oref.",
              },
              tags: ["cle_ministere_educatif"],
            },
            statut: {
              description: [
                { fr: "Statut de la formation.", en: null },
                { fr: "Les valeurs possibles sont : ", en: null },
                {
                  fr: "- `publié` pour les formations publiées sur le catalogue.",
                  en: null,
                },
                {
                  fr: "- `archivé` pour les anciennes formations du catalogue.",
                  en: null,
                },
                {
                  fr: "- `supprimé` pour les formations supprimées du catalogue.",
                  en: null,
                },
              ],
            },
            contact: {
              description: [
                {
                  fr: "Coordonnées de contact du lieu de formation.",
                  en: null,
                },
              ],
              tags: ["email", "telephone"],
            },
            contenu_educatif: {
              description: {
                fr: "Descriptif de la formation à destination des potentiels apprenants.",
                en: null,
              },
              tags: ["contenu", "objectif"],
            },
            modalite: {
              description: [
                { fr: "Modalités de la formation composées de :", en: null },
                { fr: "- L'année du cycle de la formation.", en: null },
                { fr: "- La durée indicative de la formation.", en: null },
                { fr: "- Si la formation est entièrement à distance.", en: null },
                { fr: "- Le code MEF 10 de la formation.", en: null },
              ],
              tags: ["annee_cycle", "duree_indicative", "entierement_a_distance", "mef_10"],
            },
            onisep: {
              description: {
                fr: "Informations liées à la formation issues de l'ONISEP.",
                en: null,
              },
              tags: ["discipline", "domaine_sousdomaine", "intitule", "libelle_poursuite", "lien_site_onisepfr", "url"],
            },
          },
        },
        certification: {
          name: { en: null, fr: "Certification" },
          rows: {
            connue: {
              description: [
                {
                  fr: "Indique si la certification est connue de l'API Liste des Certifications Professionnelles [https://api.courdecassation.beta.gouv.fr/fr/explorer/certifications].",
                  en: null,
                },
                {
                  fr: "Dans le cas contraire, la certification est construite à partir des informations issues du RNCP et du CFD indépendamment.",
                  en: null,
                },
              ],
            },
            valeur: {
              description: [
                {
                  fr: "Certification associée à la formation.",
                  en: null,
                },
                {
                  fr: "Pour plus de détails sur la certification, consulter l'onglet ``Certification``.",
                  en: null,
                },
              ],
            },
          },
        },
        session: {
          name: { fr: "Sessions de formation", en: null },
          rows: {
            session: {
              description: [
                {
                  fr: "Une session est caractérisée par une date de début, une date de fin, ainsi qu’une capacité d’accueil en nombre d’élèves.",
                  en: null,
                },
              ],
              information: {
                fr: "La formation peut contenir des sessions passées, en cours ou à venir.",
                en: null,
              },
              tags: ["session.debut", "session.fin", "session.capacite"],
            },
          },
        },
        lieu: {
          name: {
            fr: "Lieu de formation",
            en: null,
          },
          rows: {
            adresse: {
              description: [{ fr: "Adresse du lieu de formation.", en: null }],
            },
            geolocalisation: {
              description: [{ fr: "Coordonnées GPS du lieu de formation.", en: null }],
            },
            precision: {
              description: [
                {
                  fr: "Précision de la géolocalisation du lieu de formation en mètres.",
                  en: null,
                },
                {
                  fr: "Il s'agit de la distance entre le point géolocalisé et la localisation déduite de l'adresse.",
                  en: null,
                },
              ],
            },
            siret: {
              description: [{ fr: "Numéro SIRET du lieu de formation.", en: null }],
            },
            uai: {
              description: [{ fr: "Numéro UAI du lieu de formation", en: null }],
            },
          },
        },
        formateur: {
          name: { fr: "Organisme formateur", en: null },
          rows: {
            connu: {
              description: [
                {
                  fr: "Vaut TRUE lorsqu'il est présent dans [le référentiel des organismes de formation](https://referentiel.apprentissage.onisep.fr/organismes) ou s'il l'a été dans le passé.",
                  en: null,
                },
                {
                  fr: "Il peut s'agir d'un organisme qui n'est plus sur le référentiel des organismes de formation. Veuillez vérifier le statut de l'organisme.",
                  en: null,
                },
              ],
            },
            organisme: {
              description: [
                {
                  fr: "Informations relatives à l’organisme formateur, en charge du suivi éducatif.",
                  en: null,
                },
                {
                  fr: "Lorsque l'organisme est inconnu, les informations sont récupérées depuis [l'API Entreprise](https://entreprise.api.gouv.fr/). Lorsque le SIRET associé n'est pas retrouvé, est invalide ou non diffusible alors la valeur sera `null`.",
                  en: null,
                },
                {
                  fr: "Pour plus de détails sur l'organisme, consulter l'onglet ``Organisme``.",
                  en: null,
                },
              ],
            },
          },
        },
        responsable: {
          name: { fr: "Organisme responsable", en: null },
          rows: {
            connu: {
              description: [
                {
                  fr: "Vaut TRUE si présent dans [le référentiel des organismes de formation](https://referentiel.apprentissage.onisep.fr/organismes) ou s'il l'a été dans le passé.",
                  en: null,
                },
                {
                  fr: "Il peut s'agir d'un organisme qui n'est plus sur le référentiel des organismes de formation. Veuillez vérifier le statut de l'organisme.",
                  en: null,
                },
              ],
            },
            organisme: {
              description: [
                {
                  fr: "Informations relatives à l’organisme responsable administrativement de la formation.",
                  en: null,
                },
                {
                  fr: "Lorsque l'organisme est inconnu, les informations sont récupérées depuis [l'API Entreprise](https://entreprise.api.gouv.fr/). Lorsque le SIRET associé n'est pas retrouvé, est invalide ou non diffusible alors la valeur sera `null`.",
                  en: null,
                },
                {
                  fr: "Pour le détail de l'organisme, consulter l'onglet `Organisme`.",
                  en: null,
                },
              ],
            },
          },
        },
      },
    },
  ],
} as const satisfies DocPage;
