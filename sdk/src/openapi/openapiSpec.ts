import { certificationModelOpenapi } from "../models/certification/certification.model.openapi.js";
import { formationModelOpenapi } from "../models/formation/formation.model.openapi.js";
import { communeModelOpenapi } from "../models/geographie/commune.model.openapi.js";
import { departementModelOpenapi } from "../models/geographie/departement.model.openapi.js";
import {
  adresseModelOpenapi,
  geoJsonPointModelOpenapi,
  geoJsonPolygonModelOpenapi,
} from "../models/geographie/geoJson.model.openapi.js";
import { missionLocaleModelOpenapi } from "../models/geographie/mission-locale.model.openapi.js";
import { offerExportModelOpenapi } from "../models/job/job.export.model.openapi.js";
import {
  applicationWriteModelOpenapi,
  offerReadModelOpenapi,
  recruiterModelOpenapi,
} from "../models/job/job.model.openapi.js";
import { offerPublishingModelOpenapi } from "../models/job/job.publishing.model.openapi.js";
import { organismeModelOpenapi } from "../models/organisme/organisme.model.openapi.js";
import { paginationModelOpenapi } from "../models/pagination/pagination.model.openapi.js";
import { certificationsRoutesOpenapi } from "../routes/certification/certification.routes.openapi.js";
import { formationRoutesOpenapi } from "../routes/formation/formation.routes.openapi.js";
import { geographieRoutesOpenapi } from "../routes/geographie/geographie.routes.openapi.js";
import { jobRoutesOpenapi } from "../routes/jobs/job.routes.openapi.js";
import { organismeRoutesOpenapi } from "../routes/organisme/organisme.routes.openapi.js";
import { tagsOpenapi } from "./tags.openapi.js";
import type { OpenapiSpec } from "./types.js";

export const openapiSpec: OpenapiSpec = {
  models: {
    [certificationModelOpenapi.name]: certificationModelOpenapi,
    [communeModelOpenapi.name]: communeModelOpenapi,
    [departementModelOpenapi.name]: departementModelOpenapi,
    [missionLocaleModelOpenapi.name]: missionLocaleModelOpenapi,
    [recruiterModelOpenapi.name]: recruiterModelOpenapi,
    [offerReadModelOpenapi.name]: offerReadModelOpenapi,
    [offerPublishingModelOpenapi.name]: offerPublishingModelOpenapi,
    [offerExportModelOpenapi.name]: offerExportModelOpenapi,
    [applicationWriteModelOpenapi.name]: applicationWriteModelOpenapi,
    [formationModelOpenapi.name]: formationModelOpenapi,
    [organismeModelOpenapi.name]: organismeModelOpenapi,
    [geoJsonPointModelOpenapi.name]: geoJsonPointModelOpenapi,
    [geoJsonPolygonModelOpenapi.name]: geoJsonPolygonModelOpenapi,
    [adresseModelOpenapi.name]: adresseModelOpenapi,
    [paginationModelOpenapi.name]: paginationModelOpenapi,
  },
  routes: {
    ...jobRoutesOpenapi,
    ...certificationsRoutesOpenapi,
    ...geographieRoutesOpenapi,
    ...organismeRoutesOpenapi,
    ...formationRoutesOpenapi,
  },
  tags: tagsOpenapi,
  demandeHabilitations: {
    "applications:write": {
      subject: {
        en: "Request for authorization to send applications to apprenticeship job opportunities",
        fr: "Demande d'habilitation pour l'envoi de candidatures aux opportunités d'emploi",
      },
      body: {
        en: "Hello, I would like to obtain authorization to send applications to job opportunities published through the Cour de cassation platform.",
        fr: "Bonjour, je souhaite obtenir une habilitation pour envoyer des candidatures à des offres d'emploi publiées via la plateforme de la Cour de cassation.",
      },
    },
    "appointments:write": {
      subject: {
        en: "Request for authorization to generate appointment links with training centers",
        fr: "Demande d'habilitation pour la génération de lien de rendez-vous avec les centres de formation",
      },
      body: {
        en: "Hello, I would like to obtain authorization to generate appointment links with training centers on the Cour de cassation platform.",
        fr: "Bonjour, je souhaite obtenir une habilitation pour générer des liens de rendez-vous avec les centres de formation sur la plateforme de la Cour de cassation.",
      },
    },
  },
};
