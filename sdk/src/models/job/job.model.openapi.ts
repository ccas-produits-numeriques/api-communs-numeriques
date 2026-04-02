import type { SchemaObject } from "openapi3-ts/oas31";

import { z } from "zod/v4-mini";
import { offerReadModelDoc } from "../../docs/models/job/offer_read.model.doc.js";
import { recruiterModelDoc } from "../../docs/models/job/recruiter.model.doc.js";
import type { OpenapiModel } from "../../openapi/types.js";

const recruiterSchema = {
  type: "object",
  properties: {
    identifier: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
      required: ["id"],
    },
    workplace: {
      type: "object",
      properties: {
        name: {
          type: ["string", "null"],
        },
        description: {
          type: ["string", "null"],
        },
        website: {
          type: ["string", "null"],
          format: "uri",
        },
        siret: {
          type: ["string", "null"],
          pattern: "^\\d{14}$",
        },
        location: {
          type: "object",
          properties: {
            address: {
              type: "string",
            },
            geopoint: {
              $ref: "#/components/schemas/GeoJsonPoint",
            },
          },
          required: ["address", "geopoint"],
        },
        brand: {
          type: ["string", "null"],
        },
        legal_name: {
          type: ["string", "null"],
        },
        size: {
          type: ["string", "null"],
        },
        domain: {
          type: "object",
          properties: {
            idcc: {
              type: ["number", "null"],
            },
            opco: {
              type: ["string", "null"],
            },
            naf: {
              type: ["object", "null"],
              properties: {
                code: {
                  type: "string",
                },
                label: {
                  type: ["string", "null"],
                },
              },
              required: ["code", "label"],
            },
          },
          required: ["idcc", "opco", "naf"],
        },
      },
      required: ["name", "description", "website", "siret", "location", "brand", "legal_name", "size", "domain"],
    },
    apply: {
      type: "object",
      properties: {
        phone: {
          type: ["string", "null"],
        },
        url: {
          type: "string",
          format: "uri",
        },
        recipient_id: {
          type: ["string", "null"],
        },
      },
      required: ["phone", "url"],
    },
  },
  required: ["identifier", "workplace", "apply"],
} as const satisfies SchemaObject;

const offerReadSchema = {
  type: "object",
  properties: {
    identifier: {
      type: "object",
      properties: {
        partner_job_id: {
          type: "string",
        },
        id: {
          type: ["string", "null"],
        },
        partner_label: {
          type: "string",
        },
      },
      required: ["partner_job_id", "id", "partner_label"],
    },
    workplace: recruiterSchema.properties.workplace,
    apply: recruiterSchema.properties.apply,
    contract: {
      type: "object",
      properties: {
        start: {
          type: ["string", "null"],
          format: "date-time",
        },
        duration: {
          type: ["integer", "null"],
          minimum: 0,
        },
        type: {
          type: "array",
          items: {
            type: "string",
            enum: ["Apprentissage", "Professionnalisation"],
          },
        },
        remote: {
          type: ["string", "null"],
          enum: ["onsite", "remote", "hybrid"],
        },
      },
      required: ["start", "duration", "type", "remote"],
    },
    offer: {
      type: "object",
      properties: {
        title: {
          type: "string",
          minLength: 3,
        },
        desired_skills: {
          type: "array",
          items: {
            type: "string",
          },
        },
        to_be_acquired_skills: {
          type: "array",
          items: {
            type: "string",
          },
        },
        access_conditions: {
          type: "array",
          items: {
            type: "string",
          },
        },
        opening_count: {
          type: "number",
        },
        publication: {
          type: "object",
          properties: {
            creation: {
              type: ["string", "null"],
              format: "date-time",
            },
            expiration: {
              type: ["string", "null"],
              format: "date-time",
            },
          },
          required: ["creation", "expiration"],
        },
        rome_codes: {
          type: "array",
          items: {
            type: "string",
            pattern: "^[A-Z]\\d{4}$",
          },
        },
        description: {
          type: "string",
        },
        target_diploma: {
          type: ["object", "null"],
          properties: {
            european: {
              type: "string",
              enum: ["3", "4", "5", "6", "7"],
            },
            label: {
              type: "string",
            },
          },
          required: ["european", "label"],
        },
        status: {
          type: "string",
          enum: ["Active", "Filled", "Cancelled"],
        },
      },
      required: [
        "title",
        "desired_skills",
        "to_be_acquired_skills",
        "access_conditions",
        "opening_count",
        "publication",
        "rome_codes",
        "description",
        "target_diploma",
        "status",
      ],
    },
    is_delegated: {
      type: "boolean",
      description: "Indicates if the job offer management is delegated to a partner school",
      default: false,
    },
  },
  required: ["identifier", "workplace", "apply", "contract", "offer", "is_delegated"],
} as const satisfies SchemaObject;

export const recruiterModelOpenapi: OpenapiModel<"JobRecruiter"> = {
  name: "JobRecruiter",
  schema: recruiterSchema,
  doc: recruiterModelDoc,
  zod: z.unknown(),
};

export const offerReadModelOpenapi: OpenapiModel<"JobOfferRead"> = {
  name: "JobOfferRead",
  schema: offerReadSchema,
  doc: offerReadModelDoc,
  zod: z.unknown(),
};
