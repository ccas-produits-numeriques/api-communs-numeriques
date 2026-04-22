import { z } from "zod/v4-mini";

import { zCabinetAvocat } from "../../models/cabinet_avocat/cabinet_avocat.model.js";
import { zSiret } from "../../models/organisme/organismes.primitives.js";
import type { IApiRoutesDef } from "../common.routes.js";

export const zApiCabinetAvocatRoutes = {
  get: {
    "/cabinet-avocat/v1/recherche": {
      method: "get",
      path: "/cabinet-avocat/v1/recherche",
      querystring: z.object({
        siret: z.optional(zSiret),
        nom: z.optional(z.string()),
        ville: z.optional(z.string()),
        limit: z._default(z.coerce.number().check(z.gte(1), z.lte(100)), 20),
      }),
      response: {
        "200": z.array(zCabinetAvocat),
      },
      securityScheme: {
        auth: "api-key",
        access: null,
        ressources: {},
      },
    },
  },
} as const satisfies IApiRoutesDef;
