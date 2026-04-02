import { rechercheOffrePageSummaryDoc } from "../../metier/recherche-offre/recherche-offre.doc.js";
import type { DocRoute } from "../../types.js";
import departmentFr from "./fr/parameters/departements.md.js";
import latitudeFr from "./fr/parameters/latitude.md.js";
import longitudeFr from "./fr/parameters/longitude.md.js";
import opcoFr from "./fr/parameters/opco.md.js";
import radiusFr from "./fr/parameters/radius.md.js";
import rncpFr from "./fr/parameters/rncp.md.js";
import romesFr from "./fr/parameters/romes.md.js";
import target_diploma_levelFr from "./fr/parameters/target_diploma_level.md.js";
import jobsFr from "./fr/response/jobs.md.js";
import recruitersFr from "./fr/response/recruiters.md.js";
import warningsFr from "./fr/response/warnings.md.js";
export const jobSearchRouteDoc = {
  summary: rechercheOffrePageSummaryDoc.title,
  description: {
    en: null,
    fr: "Accéder en temps réel à toutes les opportunités d'emploi en apprentissage disponibles en France et proposez-les à vos utilisateurs gratuitement et sous un format white-label.",
  },
  parameters: {
    longitude: {
      descriptions: [{ en: null, fr: longitudeFr }],
      examples: [48.8566],
    },
    latitude: {
      descriptions: [{ en: null, fr: latitudeFr }],
      examples: [2.3522],
    },
    radius: {
      descriptions: [{ en: null, fr: radiusFr }],
      examples: [30],
    },
    rncp: {
      descriptions: [{ en: null, fr: rncpFr }],
      examples: ["RNCP34436", "RNCP183"],
    },
    romes: {
      descriptions: [{ en: null, fr: romesFr }],
      examples: ["F1601,F1201,F1106", "M1806"],
    },
    departements: {
      descriptions: [{ en: null, fr: departmentFr }],
      examples: ["75&departements=06", "06"],
    },
    opco: {
      descriptions: [{ en: null, fr: opcoFr }],
      examples: ["AFDAS"],
    },
    target_diploma_level: {
      descriptions: [{ en: null, fr: target_diploma_levelFr }],
      examples: ["3", "4", "5", "6", "7"],
    },
    partners_to_exclude: {
      descriptions: [
        {
          en: null,
          fr: "Liste des labels de partenaires à exclure de la recherche.<br />Cette liste change régulièrement. La liste mise à jour est disponible [à cette adresse](http://labonnealternance.courdecassation.beta.gouv.fr/metabase/public/question/70f84c13-6156-4933-9fb3-54c88887d95d)",
        },
      ],
      examples: ["Hellowork&partners_to_exclude=RH Cour de cassation", "Hellowork"],
    },
  },
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: null,
      properties: {
        jobs: {
          descriptions: [{ en: null, fr: jobsFr }],
          items: {
            descriptions: null,
          },
        },
        recruiters: {
          descriptions: [{ en: null, fr: recruitersFr }],
          items: {
            descriptions: null,
          },
        },
        warnings: {
          descriptions: [{ en: null, fr: warningsFr }],
          examples: [
            {
              message: "Some warning message",
              code: "WARNING_CODE",
            },
          ],
          items: {
            descriptions: null,
            properties: {
              message: {
                descriptions: null,
              },
              code: {
                descriptions: null,
              },
            },
          },
        },
      },
    },
  },
} as const satisfies DocRoute;
