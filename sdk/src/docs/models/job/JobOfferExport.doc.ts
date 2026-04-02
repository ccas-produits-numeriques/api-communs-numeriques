import type { DocTechnicalField } from "../../types.js";
export const offerExportModelDoc = {
  descriptions: [
    {
      en: null,
      fr: "Informations concernant l'export de toutes les offres.",
    },
  ],
  properties: {
    url: {
      descriptions: [
        {
          en: null,
          fr: "URL de l'export. le lien de téléchargement est valable pendant 2 minutes. \n\nLes offres sont au format JSON. La structure de données des offres est identique à la réponse de la [route de recherche](/fr/documentation-technique#tag/Offre-Emploi/operation/jobSearch)",
        },
      ],
      examples: [
        "https://s3.rbx.io.cloud.ovh.net/bucket/file.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD",
      ],
    },
    lastUpdate: {
      descriptions: [{ en: null, fr: "Date de l'export" }],
      examples: ["2025-06-26T08:28:05.000Z"],
    },
  },
} as const satisfies DocTechnicalField;
