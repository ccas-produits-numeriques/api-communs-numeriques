import { registry } from "zod/v4-mini";
import type { PathItemObject, SchemaObject } from "openapi3-ts/oas31";
import { OpenApiBuilder } from "openapi3-ts/oas31";
import { zParisLocalDate } from "../../utils/date.primitives.js";
import { zSiret, zUai } from "../../models/organisme/organismes.primitives.js";
import { zTransformNullIfEmptyString } from "../../models/primitives/primitives.model.js";
import { registerOpenApiErrorsSchema } from "../../models/errors/errors.model.openapi.js";
import { openapiSpec } from "../openapiSpec.js";
import { addOperationDoc, addSchemaDoc, getTextOpenAPI } from "../utils/zodWithOpenApi.js";
import type { IApiRoutesDef } from "../../routes/index.js";
import { zApiRoutes } from "../../routes/index.js";
import { generateComponents, generateOpenApiOperationObjectFromZod } from "../utils/openapi.uils.js";

type RegistryMeta = { id?: string | undefined; openapi?: Partial<SchemaObject> };

function getTitle(): string {
  return "Documentation technique";
}

function getContactName(): string {
  return "Équipe API Communs numériques";
}

function getSecuritySchemeDescription(): string {
  return "Clé d'API à fournir dans le header `Authorization`. Si la route nécessite une habilitation particulière veuillez contacter le support pour en faire la demande à [api-communs-numeriques@courdecassation.fr](mailto:api-communs-numeriques@courdecassation.fr)";
}

export function buildOpenApiSchema(version: string, env: string, publicUrl: string): OpenApiBuilder {
  const zodRegistry = registry<RegistryMeta>();

  for (const [, model] of Object.entries(openapiSpec.models)) {
    zodRegistry.add(model.zod, {
      id: `#/components/schemas/${model.name}`,
    });
  }

  zodRegistry.add(zParisLocalDate, { openapi: { type: "string", format: "date-time" } });
  zodRegistry.add(zTransformNullIfEmptyString, {
    openapi: { anyOf: [{ type: "string", minLength: 1 }, { type: "null" }] },
  });
  zodRegistry.add(zSiret, { openapi: { type: "string", pattern: "^\\d{14}$" } });
  zodRegistry.add(zUai, { openapi: { type: "string", pattern: "^\\d{7}[A-Z]$" } });

  const components = generateComponents(zodRegistry, "output");

  const builder = new OpenApiBuilder({
    openapi: "3.1.0",
    info: {
      title: getTitle(),
      version,
      license: {
        name: "Etalab-2.0",
        url: "https://github.com/etalab/licence-ouverte/blob/master/LO.md",
      },
      termsOfService: "https://api.courdecassation.beta.gouv.fr/cgu",
      contact: {
        name: getContactName(),
        email: "api-communs-numeriques@courdecassation.fr",
      },
    },
    servers: [
      {
        url: publicUrl,
        description: env,
      },
    ],
    tags: Object.values(openapiSpec.tags).map(({ name, description }) => ({
      name: getTextOpenAPI(name),
      description: getTextOpenAPI(description),
    })),
  });

  builder.addSecurityScheme("api-key", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "Bearer",
    description: getSecuritySchemeDescription(),
  });

  for (const [name, s] of Object.entries(openapiSpec.models)) {
    builder.addSchema(
      name,
      addSchemaDoc("schema" in s ? s.schema : components.schemas[`#/components/schemas/${name}`], s.doc, [
        "models",
        name,
      ])
    );
  }

  for (const [path, operations] of Object.entries(openapiSpec.routes)) {
    builder.addPath(
      path.replaceAll(/:([^:/]+)/g, "{$1}"),
      Object.entries(operations).reduce<PathItemObject>((acc, [method, operation]) => {
        const r: IApiRoutesDef = zApiRoutes;
        const m = method as "get" | "put" | "post" | "delete";
        acc[m] = addOperationDoc(
          operation,
          operation.schema ??
            generateOpenApiOperationObjectFromZod(r?.[m]?.[path], zodRegistry, path, method, operation.tag)
        );
        return acc;
      }, {})
    );
  }

  builder.addPath("/healthcheck", {
    get: addOperationDoc(
      {
        tag: "system",
        doc: null,
      },
      generateOpenApiOperationObjectFromZod(
        zApiRoutes.get["/healthcheck"],
        zodRegistry,
        "/healthcheck",
        "get",
        "system"
      )
    ),
  });

  registerOpenApiErrorsSchema(builder);

  return builder;
}
