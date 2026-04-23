import { cabinetAvocatModelOpenapi } from "../models/cabinet_avocat/cabinet_avocat.model.openapi.js";
import {
  adresseModelOpenapi,
  geoJsonPointModelOpenapi,
  geoJsonPolygonModelOpenapi,
} from "../models/geographie/geoJson.model.openapi.js";
import { organismeModelOpenapi } from "../models/organisme/organisme.model.openapi.js";
import { paginationModelOpenapi } from "../models/pagination/pagination.model.openapi.js";
import { cabinetAvocatRoutesOpenapi } from "../routes/cabinet_avocat/cabinet_avocat.routes.openapi.js";
import { organismeRoutesOpenapi } from "../routes/organisme/organisme.routes.openapi.js";
import { tagsOpenapi } from "./tags.openapi.js";
import type { OpenapiSpec } from "./types.js";
export const openapiSpec: OpenapiSpec = {
  models: {
    [cabinetAvocatModelOpenapi.name]: cabinetAvocatModelOpenapi,
    [organismeModelOpenapi.name]: organismeModelOpenapi,
    [geoJsonPointModelOpenapi.name]: geoJsonPointModelOpenapi,
    [geoJsonPolygonModelOpenapi.name]: geoJsonPolygonModelOpenapi,
    [adresseModelOpenapi.name]: adresseModelOpenapi,
    [paginationModelOpenapi.name]: paginationModelOpenapi,
  },
  routes: {
    ...cabinetAvocatRoutesOpenapi,
    ...organismeRoutesOpenapi,
  },
  tags: tagsOpenapi,
  demandeHabilitations: {
    "appointments:write": {
      subject: {
        en: null,
        fr: "Demande d'habilitation pour la génération de lien de rendez-vous avec les centres de formation",
      },
      body: {
        en: null,
        fr: "Bonjour, je souhaite obtenir une habilitation pour générer des liens de rendez-vous avec les centres de formation sur la plateforme de la Cour de cassation.",
      },
    },
  },
};
