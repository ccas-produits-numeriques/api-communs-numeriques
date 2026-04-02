import type { OpenApiText } from "../docs/types.js";
export const tagsOpenapi = {
  try: {
    name: { fr: "Essayer l'API", en: null },
    description: {
      fr: "Pour essayer l'API [vous pouvez utiliser le swagger UI](/documentation-technique/try)",
      en: null,
    },
  },
  job: {
    name: { fr: "Offre Emploi", en: null },
    description: { fr: "Opportunités d'emploi", en: null },
  },
  formation: {
    name: { fr: "Formation", en: null },
    description: {
      fr: "Liste des opérations sur les formations",
      en: null,
    },
  },
  certifications: {
    name: { fr: "Certifications", en: null },
    description: { fr: "Liste des opérations sur les certifications.", en: null },
  },
  organismes: {
    name: { fr: "Organismes", en: null },
    description: { fr: "Liste des organismes", en: null },
  },
  geographie: {
    name: { fr: "Géographie", en: null },
    description: { fr: "Référentiel Géographique", en: null },
  },
  exprimental: {
    name: { fr: "Expérimental", en: null },
    description: {
      fr: "Liste des routes expérimentales. Attention: ces routes peuvent changer sans préavis.",
      en: null,
    },
  },
  system: {
    name: { fr: "Système", en: null },
    description: { fr: "Routes système", en: null },
  },
} as const satisfies Record<
  string,
  {
    name: OpenApiText;
    description: OpenApiText;
  }
>;
export type TagOpenapi = keyof typeof tagsOpenapi;
