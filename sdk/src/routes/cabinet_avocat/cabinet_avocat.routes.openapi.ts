import type { OpenapiRoutes } from "../../openapi/types.js";
import { searchCabinetAvocatRouteDoc } from "../../docs/routes/searchCabinetAvocat/searchCabinetAvocat.route.doc.js";

export const cabinetAvocatRoutesOpenapi: OpenapiRoutes = {
  "/cabinet-avocat/v1/recherche": {
    get: {
      tag: "cabinet_avocat",
      doc: searchCabinetAvocatRouteDoc,
    },
  },
};
