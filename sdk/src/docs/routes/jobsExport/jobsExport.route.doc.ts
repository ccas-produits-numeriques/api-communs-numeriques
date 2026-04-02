import type { DocRoute } from "../../types.js";
export const jobsExportRouteDoc = {
  summary: { fr: "Export des offres d'emploi", en: null },
  description: {
    en: null,
    fr: `Expose la totalité des opportunités d'emploi (offres et entreprises auprès desquelles adresser des candidatures spontanées).
<br/>Les opportunités sont mises à jour une fois par jour à 3h du matin heure de Paris.`,
  },
  response: {
    description: { en: null, fr: "Succès" },
    content: {
      descriptions: [
        {
          en: null,
          fr: "Lien vers les offres.",
        },
      ],
    },
  },
} as const satisfies DocRoute;
