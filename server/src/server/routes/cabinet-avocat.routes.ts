import { zRoutes } from "shared";

import type { Server } from "@/server/server.js";
import { searchCabinetAvocat } from "@/services/cabinet_avocat/cabinet_avocat.service.js";

export const cabinetAvocatRoutes = ({ server }: { server: Server }) => {
  server.get(
    "/cabinet-avocat/v1/recherche",
    {
      schema: zRoutes.get["/cabinet-avocat/v1/recherche"],
      onRequest: [server.auth(zRoutes.get["/cabinet-avocat/v1/recherche"])],
    },
    async (request, response) => {
      const result = await searchCabinetAvocat(request.query);
      return response.status(200).send(result);
    }
  );
};
