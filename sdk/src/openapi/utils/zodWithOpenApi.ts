import type { ContentObject, OperationObject, ParameterObject, ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

import type { DocTechnicalField, OpenApiText } from "../../docs/types.js";
import { addErrorResponseOpenApi } from "../../models/errors/errors.model.openapi.js";
import { tagsOpenapi } from "../tags.openapi.js";
import type { OpenapiRoute } from "../types.js";

function getTextOpenAPI<T extends OpenApiText | null | undefined>(
  value: T,
  lang: "fr" | null = "fr"
): T extends null | undefined ? null : string {
  if (value == null) {
    return null as T extends null | undefined ? null : string;
  }

  if (lang && value[lang]) {
    return value[lang].trim() as T extends null | undefined ? null : string;
  }

  if (value.fr) {
    return value.fr.trim() as T extends null | undefined ? null : string;
  }

  const text = Object.values(value).find((v) => v !== null);

  if (!text) {
    throw new Error("No text value found in " + JSON.stringify(value));
  }

  return text.trim() as T extends null | undefined ? null : string;
}

function getTextOpenAPIArray<T extends OpenApiText[] | null | undefined>(
  value: T,
  lang: "fr" | null = "fr"
): T extends null | undefined ? null : string {
  if (Array.isArray(value)) {
    return value
      .map((v) => getTextOpenAPI(v, lang))
      .join("\n\n")
      .trim() as T extends null | undefined ? null : string;
  }

  return null as T extends null | undefined ? null : string;
}

function getDocOpenAPIAttributes(field: DocTechnicalField | undefined): { description?: string; examples?: unknown[] } {
  if (!field) {
    return {};
  }

  const r: { description?: string; examples?: unknown[] } = {};

  if (field.descriptions && field.descriptions.length > 0) {
    const description = getTextOpenAPIArray(field.descriptions);
    if (description) {
      r.description = description;
    }
  }

  if (field.examples) {
    r.examples = [...field.examples] as unknown[];
  }

  return r;
}

function pickPropertiesOpenAPI<T extends Record<string, SchemaObject>, K extends keyof T>(
  source: T,
  props: K[]
): Record<K, SchemaObject> {
  return props.reduce(
    (acc, prop) => {
      acc[prop] = source[prop];

      return acc;
    },
    {} as Record<K, SchemaObject>
  );
}

function addSchemaDocList<T extends SchemaObject | ReferenceObject>(
  schemas: ReadonlyArray<T>,
  docs: DocTechnicalField[],
  path: string[]
): T[] {
  if (schemas.length !== docs.length) {
    throw new Error(`La documentation de tableau prefixe est plus longue que le tableau source: ${path.join(".")}`);
  }

  return schemas.map((schema, index) => {
    return addSchemaDoc(schema, docs[index], [...path, `[${index}]`]);
  });
}

function addSchemaDoc<T extends SchemaObject | ReferenceObject | undefined>(
  schema: T,
  doc: DocTechnicalField | undefined,
  path: string[]
): T {
  if (!schema || "$ref" in schema || !doc) {
    return schema;
  }

  if (typeof schema === "boolean") {
    return schema;
  }

  const output: SchemaObject = { ...schema, ...getDocOpenAPIAttributes(doc) };

  const docProperties = doc.properties;

  if (output.properties && docProperties) {
    const schemaProps = new Set(Object.keys(output.properties));
    const docProps = new Set(Object.keys(docProperties));

    const missingProps = [...docProps].filter((p) => !schemaProps.has(p));

    if (missingProps.length > 0) {
      throw new Error(
        `Propriété de documentation inconnu: ${missingProps.map((p) => `${path.join(".")}.${p}`).join(", ")}`
      );
    }

    output.properties = Object.entries(output.properties).reduce(
      (acc, [prop, propSchema]) => {
        if (prop in docProperties) {
          acc[prop] = addSchemaDoc(propSchema, docProperties[prop], [...path, "properties", prop]);
        } else {
          acc[prop] = propSchema;
        }

        return acc;
      },
      {} as Record<string, SchemaObject | ReferenceObject>
    );
  }

  if (output.items && doc.items) {
    output.items = addSchemaDoc(output.items, doc.items, [...path, "items"]);
  }

  if (output.allOf && doc.allOf) {
    output.allOf =
      typeof output.allOf === "boolean" ? output.allOf : addSchemaDocList(output.allOf, doc.allOf, [...path, "allOf"]);
  }
  if (output.oneOf && doc.oneOf) {
    output.oneOf =
      typeof output.oneOf === "boolean" ? output.oneOf : addSchemaDocList(output.oneOf, doc.oneOf, [...path, "oneOf"]);
  }
  if (output.anyOf && doc.anyOf) {
    output.anyOf =
      typeof output.anyOf === "boolean" ? output.anyOf : addSchemaDocList(output.anyOf, doc.anyOf, [...path, "anyOf"]);
  }
  if (output.not && doc.not) {
    output.not = addSchemaDoc(output.not, doc.not, [...path, "not"]);
  }
  if (typeof output.additionalProperties === "object" && doc.additionalProperties) {
    output.additionalProperties = addSchemaDoc(output.additionalProperties, doc.additionalProperties, [
      ...path,
      "additionalProperties",
    ]);
  }
  if (output.propertyNames && doc.propertyNames) {
    output.propertyNames = addSchemaDoc(output.propertyNames, doc.propertyNames, [...path, "propertyNames"]);
  }
  if (output.prefixItems && doc.prefixItems) {
    output.prefixItems =
      typeof output.prefixItems === "boolean"
        ? output.prefixItems
        : addSchemaDocList(output.prefixItems, doc.prefixItems, [...path, "prefixItems"]);
  }

  return output as T;
}

function addContentObjectDoc(content: ContentObject, doc: DocTechnicalField | undefined): ContentObject {
  if (!doc) {
    return content;
  }

  return Object.entries(content).reduce((acc, [mediaType, media]) => {
    if (mediaType !== "application/json") {
      acc[mediaType] = media;
      return acc;
    }

    acc[mediaType] = {
      ...media,
      schema: addSchemaDoc(media.schema, doc, ["schema"]),
    };

    return acc;
  }, {} as ContentObject);
}

function addOperationDoc(route: OpenapiRoute, schema: OperationObject): OperationObject {
  const { doc, tag } = route;
  const output = structuredClone(schema);

  output.tags = [getTextOpenAPI(tagsOpenapi[tag].name)];

  if (!doc) {
    return output;
  }

  const summary = getTextOpenAPI(doc.summary);
  if (summary) {
    output.summary = summary;
  }
  const description = getTextOpenAPI(doc.description);
  if (description) {
    output.description = description;
  }

  if (doc.parameters) {
    if (!output.parameters) {
      throw new Error("Operation parameters are not defined for " + schema.operationId);
    }

    const docParams = doc.parameters;

    output.parameters = output.parameters.map((param): ReferenceObject | ParameterObject => {
      if ("$ref" in param) {
        return param;
      }

      if (!docParams[param.name]) {
        return param;
      }

      return {
        ...param,
        schema: addSchemaDoc(param.schema, docParams[param.name], [param.name]),
      };
    });
  }

  if (doc.body) {
    if (!output.requestBody) {
      throw new Error("Operation requestBody is not defined for " + schema.operationId);
    }

    if (!("$ref" in output.requestBody)) {
      output.requestBody = {
        ...output.requestBody,
        content: addContentObjectDoc(output.requestBody.content, doc.body.content),
      };

      const description = getTextOpenAPI(doc.body.description);
      if (description) {
        output.requestBody.description = description;
      }
    }
  }

  if (doc.response) {
    if (!output.responses) {
      throw new Error("Operation responses are not defined for " + schema.operationId);
    }

    const docResponse = doc.response;

    output.responses = Object.entries(output.responses).reduce(
      (acc, [code, response]) => {
        if (!code.startsWith("2")) {
          acc[code] = response;
          return acc;
        }

        const description = getTextOpenAPI(docResponse.description);

        if (response.content) {
          acc[code] = {
            ...response,
            description,
            content: addContentObjectDoc(response.content, docResponse.content),
          };
        } else {
          acc[code] = {
            ...response,
            description,
          };
        }

        return acc;
      },
      {} as Record<string, SchemaObject>
    );
  }

  return addErrorResponseOpenApi(output);
}

export { addSchemaDoc, getTextOpenAPIArray, addOperationDoc, pickPropertiesOpenAPI, getTextOpenAPI };
