import type { DocPage, OpenApiText } from "../../types.js";
import applyDescFr from "./fr/apply.description.md.js";
import contractDescFr from "./fr/contract.description.md.js";
import descriptionFr from "./fr/description.md.js";
import identifierDescFr from "./fr/identifier.description.md.js";
import offerDescFr from "./fr/offer.description.md.js";
import offerPublicationDescFr from "./fr/offer.publication.description.md.js";
import workplaceDescFr from "./fr/workplace.description.md.js";
import workplaceDomainDescFr from "./fr/workplace.domain.description.md.js";
import workplaceLocationDescFr from "./fr/workplace.location.description.md.js";
const recruiterSections = {
  workplace: {
    name: { en: null, fr: "Lieu de travail" },
    rows: {
      workplace: {
        description: { en: null, fr: workplaceDescFr },
        tags: [".siret", ".name", ".description", ".brand", ".legal_name", ".size", ".website"],
      },
      location: {
        description: { en: null, fr: workplaceLocationDescFr },
        tags: [".address", ".geopoint"],
      },
      domain: {
        description: { en: null, fr: workplaceDomainDescFr },
        tags: [".idcc", ".naf", ".opco"],
      },
    },
  },
  apply: {
    name: { en: null, fr: "Postuler" },
    rows: {
      apply: {
        description: { en: null, fr: applyDescFr },
        tags: [".recipient_id", ".phone", ".url"],
      },
    },
  },
};
export const recuperationDetailOffrePageSummaryDoc = {
  title: {
    en: null,
    fr: "Consulter une opportunité d'emploi",
  },
  headline: {
    en: null,
    fr: "Accéder au détail d'une opportunité d'emploi à partir de son identifiant",
  },
} as const satisfies {
  title: OpenApiText;
  headline: OpenApiText;
};
export const recuperationDetailOffrePageDoc = {
  tag: "job",
  operationIds: ["jobSearch"],
  habilitation: null,
  description: [
    {
      en: null,
      fr: descriptionFr,
    },
  ],
  frequenceMiseAJour: "daily",
  type: "data",
  sources: [
    {
      name: "Cour de cassation",
      logo: { href: "/asset/logo/la_bonne_alternance.png" },
      providers: ["Cour de cassation"],
      href: "https://labonnealternance.courdecassation.beta.gouv.fr/",
    },
  ],
  data: [
    {
      name: { en: null, fr: "Offre d'emploi" },
      sections: {
        identifier: {
          name: { en: null, fr: "Identifiant" },
          rows: {
            identifier: {
              description: { en: null, fr: identifierDescFr },
              tags: [".id", ".partner_job_id", ".partner_label"],
            },
          },
        },
        contract: {
          name: { en: null, fr: "Contrat" },
          rows: {
            contract: {
              description: { en: null, fr: contractDescFr },
              tags: [".duration", ".start", ".type", ".remote"],
            },
          },
        },
        offer: {
          name: { en: null, fr: "Offre" },
          rows: {
            offer: {
              description: { en: null, fr: offerDescFr },
              information: {
                en: null,
                fr: "Le ROME correspond au Référentiel Opérationnel des Métiers et des Emplois. Conçu par France Travail (anciennement Pôle Emploi), ce référentiel présente l'ensemble des métiers regroupés par fiches, organisées par domaines professionnels.",
              },
              tags: [
                ".access_conditions",
                ".description",
                ".desired_skills",
                ".opening_count",
                ".rome_codes",
                ".status",
                ".target_diploma",
                ".title",
                ".to_be_acquired_skills",
              ],
            },
            publication: {
              description: { en: null, fr: offerPublicationDescFr },
              tags: [".creation", ".expiration"],
            },
          },
        },
        workplace: recruiterSections.workplace,
        apply: recruiterSections.apply,
      },
    },
  ],
} as const satisfies DocPage;
