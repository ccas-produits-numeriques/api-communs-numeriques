import { recuperationOrganismesPageSummaryDoc } from "../../metier/recuperation-organismes/recuperation-organismes.doc.js";
import { paginationQueryParameterDoc } from "../../models/pagination/pagination.model.doc.js";
import type { DocRoute } from "../../types.js";
export const exportOrganismesRouteDoc = {
  summary: recuperationOrganismesPageSummaryDoc.title,
  description: recuperationOrganismesPageSummaryDoc.headline,
  parameters: paginationQueryParameterDoc,
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: null,
      properties: {
        data: {
          descriptions: [{ en: null, fr: "Liste des organismes" }],
          items: {
            descriptions: null,
          },
        },
        pagination: {
          descriptions: null,
        },
      },
    },
  },
} as const satisfies DocRoute;
