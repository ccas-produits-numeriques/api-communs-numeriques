import { organismeModelDoc } from "../../models/organisme/organisme.model.doc.js";
import type { DocRoute, DocTechnicalField } from "../../types.js";
const resultItemDoc: DocTechnicalField = {
  descriptions: null,
  properties: {
    correspondances: {
      descriptions: [
        {
          fr: "Informations sur les correspondances avec les critères de recherche",
          en: null,
        },
      ],
      properties: {
        siret: {
          descriptions: [
            {
              fr: "Informations sur les correspondances SIRET",
              en: null,
            },
          ],
          anyOf: [
            {
              descriptions: null,
              properties: {
                lui_meme: {
                  descriptions: [
                    {
                      fr: "Le SIRET de l'organisme correspond exactement à celui recherché",
                      en: null,
                    },
                  ],
                },
                son_formateur: {
                  descriptions: [
                    {
                      fr: "Le SIRET d'un de ces formateurs correspond à celui recherché",
                      en: null,
                    },
                  ],
                },
                son_responsable: {
                  descriptions: [
                    {
                      fr: "Le SIRET du responsable de l'organisme correspond à celui recherché",
                      en: null,
                    },
                  ],
                },
              },
            },
            {
              descriptions: [
                {
                  fr: "Aucune recherche par SIRET n'a été effectuée",
                  en: null,
                },
              ],
            },
          ],
        },
        uai: {
          descriptions: [
            {
              fr: "Informations sur les correspondances UAI",
              en: null,
            },
          ],
          anyOf: [
            {
              descriptions: null,
              properties: {
                lui_meme: {
                  descriptions: [
                    {
                      fr: "L'UAI de l'organisme correspond exactement à celui recherché",
                      en: null,
                    },
                  ],
                },
                son_lieu: {
                  descriptions: [
                    {
                      fr: "L'UAI d'un de ces lieux correspond à celui recherché",
                      en: null,
                    },
                  ],
                },
              },
            },
            {
              descriptions: [
                {
                  fr: "Aucune recherche par UAI n'a été effectuée",
                  en: null,
                },
              ],
            },
          ],
        },
      },
    },
    organisme: {
      descriptions: [
        {
          fr: "Référence de l'organisme",
          en: null,
        },
      ],
      properties: {
        identifiant: organismeModelDoc.properties.identifiant,
      },
    },
    status: {
      descriptions: [
        {
          fr: "Statut référencementiel de l'organisme",
          en: null,
        },
      ],
      properties: {
        declaration_catalogue: {
          descriptions: [
            {
              fr: 'Indique si l\'organisme est présent dans le "Catalogue des formations en apprentissage"',
              en: null,
            },
          ],
        },
        ouvert: {
          descriptions: [
            {
              fr: "Indique si l'organisme est ouvert (état administratif actif)",
              en: null,
            },
          ],
        },
        validation_uai: {
          descriptions: [
            {
              fr: "Indique si l'UAI de l'organisme est validée par le Référentiel des Organismes de Formation",
              en: null,
            },
          ],
        },
      },
    },
  },
};
export const searchOrganismeRouteDoc = {
  summary: {
    fr: "Recherche d'organismes par UAI et/ou SIRET",
    en: null,
  },
  description: {
    fr: "Récupère la liste des organismes, filtrée par UAI et/ou SIRET fournis",
    en: null,
  },
  parameters: {
    uai: {
      descriptions: [
        {
          fr: "UAI de l'organisme à rechercher",
          en: null,
        },
      ],
    },
    siret: {
      descriptions: [
        {
          fr: "SIRET de l'organisme à rechercher",
          en: null,
        },
      ],
    },
  },
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: null,
      properties: {
        candidats: {
          descriptions: [
            {
              fr: "Liste des organismes candidats correspondant aux critères de recherche",
              en: null,
            },
          ],
          items: resultItemDoc,
        },
        metadata: {
          descriptions: [
            {
              fr: "Métadonnées sur les critères de recherche effectuée",
              en: null,
            },
          ],
          properties: {
            siret: {
              descriptions: [
                {
                  fr: "Metadata sur le SIRET de recherche",
                  en: null,
                },
              ],
              anyOf: [
                {
                  descriptions: null,
                  properties: {
                    status: {
                      descriptions: null,
                    },
                  },
                },
                {
                  descriptions: null,
                },
              ],
            },
            uai: {
              descriptions: [
                {
                  fr: "Metadata sur l'UAI de recherche",
                  en: null,
                },
              ],
              anyOf: [
                {
                  descriptions: null,
                  properties: {
                    status: {
                      descriptions: null,
                    },
                  },
                },
                {
                  descriptions: null,
                },
              ],
            },
          },
        },
        resultat: {
          descriptions: [
            {
              fr: "Meilleur résultat correspondant aux critères de recherche. Peut être null si aucun résultat sastisfaisant n'est trouvé.",
              en: null,
            },
          ],
          anyOf: [
            resultItemDoc,
            {
              descriptions: null,
            },
          ],
        },
      },
    },
  },
} as const satisfies DocRoute;
