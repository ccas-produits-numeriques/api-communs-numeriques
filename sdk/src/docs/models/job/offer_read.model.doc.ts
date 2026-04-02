import contractDescFr from "../../metier/recherche-offre/fr/contract.description.md.js";
import offerDescFr from "../../metier/recherche-offre/fr/offer.description.md.js";
import offerPublicationDescFr from "../../metier/recherche-offre/fr/offer.publication.description.md.js";
import offerStatusDescFr from "../../metier/recherche-offre/fr/offer.status.description.md.js";
import type { DocTechnicalField } from "../../types.js";
import { recruiterModelDoc } from "./recruiter.model.doc.js";
export const offerReadModelDoc = {
  descriptions: [{ fr: "Offre d'emploi", en: null }],
  properties: {
    identifier: {
      ...recruiterModelDoc.properties.identifier,
      properties: {
        id: {
          descriptions: [
            {
              en: null,
              fr: "Identifiant de l'offre d'emploi dans la base de données Cour de cassation.",
            },
            {
              en: null,
              fr: "Les offres France Travail ne sont pas stockées dans la base de données Cour de cassation mais sont récupérées à la volée. Elles n'ont pas d'identifiant dans la base de données.",
            },
          ],
          examples: ["6687165396d52b5e01b409545"],
        },
        partner_job_id: {
          descriptions: [
            {
              en: null,
              fr: "Identifiant de l'offre dans le système d'information du partenaire.",
            },
          ],
          examples: ["b16a546a-e61f-4028-b5a3-1a7bbfaa4e3d"],
        },
        partner_label: {
          descriptions: [
            { en: null, fr: "Partenaire à l'origine de l'offre d'emploi." },
            {
              en: null,
              fr: 'Dans le cas des offres collectées par Cour de cassation, le partner_label est : "offres_emploi_lba".<br />Dans le cas des entreprises identifiées comme ayant un fort potentiel d’embauche, le partner_label est : "recruteurs_lba".',
            },
          ],
          examples: ["France Travail", "offres_emploi_lba"],
        },
      },
    },
    contract: {
      descriptions: [{ en: null, fr: contractDescFr }],
      properties: {
        duration: {
          descriptions: [{ en: null, fr: "Durée du contrat en mois." }],
          examples: [12],
        },
        start: {
          descriptions: [{ fr: "Date de début du contrat.", en: null }],
          examples: ["2024-09-23T10:00:00.000Z"],
        },
        type: {
          descriptions: [
            {
              en: null,
              fr: "Type de contrat (apprentissage et/ou professionnalisation)",
            },
          ],
          items: {
            descriptions: [
              {
                en: null,
                fr: "Type de contrat (apprentissage et/ou professionnalisation)",
              },
            ],
            examples: ["Apprentissage", "Professionnalisation"],
          },
        },
        remote: {
          descriptions: [{ en: null, fr: "Mode de travail (sur site, à distance ou hybride)" }],
          examples: ["onsite", "remote", "hybrid"],
        },
      },
    },
    offer: {
      descriptions: [{ en: null, fr: offerDescFr }],
      properties: {
        access_conditions: {
          descriptions: [{ en: null, fr: "Les conditions d'accès au métier" }],
          items: {
            descriptions: [{ en: null, fr: "Les conditions d'accès au métier" }],
            examples: [
              "Ce métier est accessible avec un diplôme de niveau Bac+2 (BTS, DUT) à Master (MIAGE, diplôme d'ingénieur, Master professionnel, ...) en informatique.",
              "Il est également accessible avec une expérience professionnelle en informatique, système d'exploitation ou dans un domaine applicatif.",
              "La pratique de l'anglais (vocabulaire technique) est requise.",
            ],
          },
        },
        description: {
          descriptions: [{ en: null, fr: "Description de l'offre d'emploi." }],
          examples: [
            "Conçoit, développe et met au point un projet d'application informatique, de la phase d'étude à son intégration, pour un client ou une entreprise selon des besoins fonctionnels et un cahier des charges. Peut conduire des projets de développement. Peut coordonner une équipe.",
          ],
        },
        desired_skills: {
          descriptions: [
            {
              en: null,
              fr: "Les compétences ou qualités attendues pour le poste.",
            },
          ],
          items: {
            descriptions: [
              {
                en: null,
                fr: "Les compétences ou qualités attendues pour le poste.",
              },
            ],
            examples: [
              "Faire preuve d'autonomie",
              "Faire preuve de créativité, d'inventivité",
              "Faire preuve de rigueur et de précision",
              "Travailler en équipe",
            ],
          },
        },
        opening_count: {
          descriptions: [
            {
              en: null,
              fr: "Nombre de postes disponibles pour cette offre d'emploi",
            },
          ],
          examples: [1, 3],
        },
        rome_codes: {
          descriptions: [{ en: null, fr: "Code(s) ROME de l'offre" }],
          items: {
            descriptions: [{ en: null, fr: "Code ROME" }],
            examples: ["A1401"],
          },
        },
        status: {
          descriptions: [
            { en: null, fr: offerStatusDescFr },
            {
              en: null,
              fr: "Seules les offres actives sont retournées par la recherche.",
            },
          ],
          examples: ["Active"],
        },
        target_diploma: {
          descriptions: [{ en: null, fr: "Diplôme visé à l'issue des études." }],
          properties: {
            european: {
              descriptions: [{ en: null, fr: "Diplôme visé à l'issue des études." }],
              examples: ["3"],
            },
            label: {
              descriptions: [
                {
                  en: null,
                  fr: "Le nom du diplôme visé à l'issue des études.",
                },
              ],
              examples: ["BP, Bac, autres formations niveau (Bac)"],
            },
          },
        },
        title: {
          descriptions: [{ en: null, fr: "Intitulé de l'offre d'emploi." }],
          examples: ["Développeur / Développeuse web"],
        },
        to_be_acquired_skills: {
          descriptions: [
            {
              en: null,
              fr: "Les compétences ou qualités à acquérir durant l'apprentissage.",
            },
          ],
          items: {
            descriptions: [
              {
                en: null,
                fr: "Les compétences ou qualités à acquérir durant l'apprentissage.",
              },
            ],
            examples: [
              "Recherche, Innovation : Analyser les indicateurs pertinents sur les tendances et les usages des clients",
              "Recherche, Innovation : Concevoir et développer une solution digitale",
              "Nouvelles technologies : Assembler des composants logiciels",
            ],
          },
        },
        publication: {
          descriptions: [{ en: null, fr: offerPublicationDescFr }],
          properties: {
            creation: {
              descriptions: [{ en: null, fr: "Date de création de l'opportunité d'emploi." }],
              examples: ["2024-07-23T13:23:01.000Z"],
            },
            expiration: {
              descriptions: [{ en: null, fr: "Date d'expiration de l'opportunité d'emploi." }],
              examples: ["2027-05-14T00:00:00Z"],
            },
          },
        },
      },
    },
    workplace: recruiterModelDoc.properties.workplace,
    apply: recruiterModelDoc.properties.apply,
    is_delegated: {
      descriptions: [
        {
          en: null,
          fr: "Indique si la gestion de l'offre est déléguée à un CFA partenaire. valeurs true | false",
        },
      ],
      examples: [true],
    },
  },
} as const satisfies DocTechnicalField;
