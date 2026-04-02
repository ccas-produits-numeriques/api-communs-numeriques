import type { DocTechnicalField } from "../../types.js";
export const formationModelDoc = {
  descriptions: [{ en: null, fr: "Formation" }],
  properties: {
    certification: {
      descriptions: [{ fr: "Certification de la formation", en: null }],
      properties: {
        connue: {
          descriptions: [
            {
              fr: "Lorsque la certification est connue, alors la certification est disponible dans l'API certifications",
              en: null,
            },
            {
              fr: "Dans le cas contraire, la certification est construite à partir des informations issue du RNCP et du CFD indépendemment.",
              en: null,
            },
          ],
        },
        valeur: {
          descriptions: [
            {
              fr: "Valeur de la certification",
              en: null,
            },
          ],
        },
      },
    },
    contact: {
      descriptions: [
        {
          fr: "Coordonnées à utiliser pour contacter l'organisme",
          en: null,
        },
      ],
      properties: {
        email: {
          descriptions: [{ fr: "Email de contact de la formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        telephone: {
          descriptions: [{ fr: "Téléphone de contact de la formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    contenu_educatif: {
      descriptions: [{ fr: "Contenu éducatif de la formation", en: null }],
      properties: {
        contenu: {
          descriptions: [{ fr: "Contenu de la formation", en: null }],
        },
        objectif: {
          descriptions: [{ fr: "Objectif de la formation", en: null }],
        },
      },
    },
    formateur: {
      descriptions: [
        { fr: "Formateur de la formation", en: null },
        {
          fr: "L'organisme formateur a pour mission de dispenser la formation",
          en: null,
        },
      ],
      properties: {
        connu: {
          descriptions: [
            {
              fr: "Indique si le formateur est connu de l'API",
              en: null,
            },
            {
              fr: "L'organisme est connu lorsqu'il est présent dans [le référentiel des organismes de formation](https://referentiel.apprentissage.onisep.fr/organismes) ou s'il l'a été dans le passé.",
              en: null,
            },
            {
              fr: "Il peut s'agir d'un organisme qui n'est plus sur le référentiel des organismes de formation. Veuillez vérifier le statut de l'organisme.",
              en: null,
            },
          ],
        },
        organisme: {
          descriptions: [{ fr: "L'organisme de formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    identifiant: {
      descriptions: [{ fr: "Identifiant de la formation", en: null }],
      properties: {
        cle_ministere_educatif: {
          descriptions: [
            {
              fr: "Identifiant unique de la formation sur [le catalogue des formations en apprentissage](https://catalogue-apprentissage.intercariforef.org/recherche/formations)",
              en: null,
            },
          ],
        },
      },
    },
    lieu: {
      descriptions: [{ fr: "Lieu où la formation est dispensée", en: null }],
      properties: {
        adresse: {
          descriptions: [{ fr: "Adresse du lieu de formation", en: null }],
        },
        geolocalisation: {
          descriptions: [{ fr: "Coordonnées GPS du lieu de formation", en: null }],
        },
        precision: {
          descriptions: [
            {
              fr: "Précision de la géolocalisation du lieu de formation en mètres.",
              en: null,
            },
            {
              fr: "Il s'agit de la distance entre le point géolocalisé et la locasation déduite de l'adresse",
              en: null,
            },
          ],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        siret: {
          descriptions: [{ fr: "Numéro SIRET du lieu de formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        uai: {
          descriptions: [{ fr: "Numéro UAI du lieu de formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    modalite: {
      descriptions: [{ fr: "Modalité de la formation", en: null }],
      properties: {
        annee_cycle: {
          descriptions: [
            {
              fr: "- L'année de démarrage de la session de formation.",
              en: null,
            },
          ],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
        duree_indicative: {
          descriptions: [{ fr: "Durée indicative de la formation", en: null }],
        },
        entierement_a_distance: {
          descriptions: [
            {
              fr: "Indique si la formation est entièrement à distance",
              en: null,
            },
          ],
        },
        mef_10: {
          descriptions: [{ fr: "Code MEF 10 de la formation", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    onisep: {
      descriptions: [
        {
          fr: "Informations lié à la formation issues de l'ONISEP",
          en: null,
        },
      ],
      properties: {
        discipline: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
        domaine_sousdomaine: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
        intitule: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
        libelle_poursuite: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
        lien_site_onisepfr: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
        url: { descriptions: null, anyOf: [{ descriptions: null }, { descriptions: null }] },
      },
    },
    responsable: {
      descriptions: [
        {
          fr: "Responsable de la formation",
          en: null,
        },
        {
          fr: "Le responsable de la formation est l'organisme qui a la responsabilité administrative de la formation",
          en: null,
        },
        {
          fr: "Il peut s'agir d'un organisme qui n'est plus sur le référentiel des organismes de formation. Veuillez vérifier le statut de l'organisme.",
          en: null,
        },
      ],
      properties: {
        connu: {
          descriptions: [
            {
              fr: "Indique si le responsable est connu de l'API",
              en: null,
            },
            {
              fr: "L'organisme est connu lorsqu'il est présent dans [le référentiel des organismes de formation](https://referentiel.apprentissage.onisep.fr/organismes) ou s'il l'a été dans le passé.",
              en: null,
            },
          ],
        },
        organisme: {
          descriptions: [{ fr: "L'organisme responsable", en: null }],
          anyOf: [{ descriptions: null }, { descriptions: null }],
        },
      },
    },
    sessions: {
      descriptions: [{ fr: "Liste des sessions de formation", en: null }],
      items: {
        descriptions: [{ fr: "Session de formation", en: null }],
        properties: {
          capacite: {
            descriptions: [{ fr: "Capacité de la session", en: null }],
            anyOf: [{ descriptions: null }, { descriptions: null }],
          },
          debut: {
            descriptions: [{ fr: "Date de début de la session", en: null }],
          },
          fin: {
            descriptions: [{ fr: "Date de fin de la session", en: null }],
          },
        },
      },
    },
    statut: {
      descriptions: [{ fr: "Statut de la formation", en: null }],
      properties: {
        catalogue: {
          descriptions: [{ fr: "Statut de la formation sur le catalogue", en: null }],
        },
      },
    },
  },
} as const satisfies DocTechnicalField;
