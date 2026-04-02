import type { OpenApiBuilder, OperationObject, ResponseObject } from "openapi3-ts/oas31";

const descriptions = {
  data: "Données contextuelles liées à l'erreur" as string,
  message: "Un message explicatif de l'erreur" as string,
  name: "Le type générique de l'erreur" as string,
  statusCode: "Le status code retourné" as string,
  badRequestResponse: "Requête invalide" as string,
  unauthorizedResponse: "Clé d’API manquante ou invalide" as string,
  forbiddenResponse: "Habilitations insuffisantes pour accéder à la ressource" as string,
  notFoundResponse: "Ressource non trouvée" as string,
  conflictResponse: "Conflit de ressource" as string,
  tooManyRequestsResponse: "Limite de volumétrie atteinte pour la clé d’API" as string,
  internalServerErrorResponse: "Une erreur inattendue s'est produite sur le serveur." as string,
  badGatewayResponse: "Le service est indisponible." as string,
  serviceUnavailableResponse: "Le service est en maintenance" as string,
} as const;

export function registerOpenApiErrorsSchema(builder: OpenApiBuilder): OpenApiBuilder {
  const badRequestResponse: ResponseObject = {
    description: descriptions.badRequestResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              examples: ["Request validation failed"],
            },
            name: {
              type: "string",
              description: descriptions.name,
              examples: ["Bad Request"],
            },
            statusCode: {
              type: "number",
              enum: [400],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.badRequestResponse,
        },
      },
    },
  };

  const unauthorizedResponse: ResponseObject = {
    description: descriptions.unauthorizedResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "Vous devez être connecté pour accéder à cette ressource",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Unauthorized",
            },
            statusCode: {
              type: "number",
              enum: [401],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.unauthorizedResponse,
        },
      },
    },
  };

  const forbiddenResponse: ResponseObject = {
    description: descriptions.forbiddenResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "Le jeton d'accès est invalide",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Forbidden",
            },
            statusCode: {
              type: "number",
              enum: [403],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.forbiddenResponse,
        },
      },
    },
  };

  const notFoundResponse: ResponseObject = {
    description: descriptions.notFoundResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "Resource non trouvée",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Not Found",
            },
            statusCode: {
              type: "number",
              enum: [404],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.notFoundResponse,
        },
      },
    },
  };

  const conflictResponse: ResponseObject = {
    description: descriptions.conflictResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "La ressource exite déjà",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Conflict",
            },
            statusCode: {
              type: "number",
              enum: [409],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.conflictResponse,
        },
      },
    },
  };

  const tooManyRequestsResponse: ResponseObject = {
    description: descriptions.tooManyRequestsResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "Limite de requêtes atteinte",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Too Many Requests",
            },
            statusCode: {
              type: "number",
              enum: [419],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.tooManyRequestsResponse,
        },
      },
    },
  };

  const internalServerErrorResponse: ResponseObject = {
    description: descriptions.internalServerErrorResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "The server was unable to complete your request",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Internal Server Error",
            },
            statusCode: {
              type: "number",
              enum: [500],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.internalServerErrorResponse,
        },
      },
    },
  };

  const badGatewayResponse: ResponseObject = {
    description: descriptions.badGatewayResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "The server was unable to complete your request",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Bad Gateway",
            },
            statusCode: {
              type: "number",
              enum: [502],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.badGatewayResponse,
        },
      },
    },
  };

  const serviceUnavailableResponse: ResponseObject = {
    description: descriptions.serviceUnavailableResponse,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            data: { description: descriptions.data },
            message: {
              type: "string",
              description: descriptions.message,
              example: "The server was unable to complete your request",
            },
            name: {
              type: "string",
              description: descriptions.name,
              example: "Service Unavailable",
            },
            statusCode: {
              type: "number",
              enum: [502],
              description: descriptions.statusCode,
            },
          },
          required: ["message", "name", "statusCode"],
          additionalProperties: false,
          description: descriptions.serviceUnavailableResponse,
        },
      },
    },
  };

  return builder
    .addResponse("BadRequest", badRequestResponse)
    .addResponse("Unauthorized", unauthorizedResponse)
    .addResponse("Forbidden", forbiddenResponse)
    .addResponse("Conflict", conflictResponse)
    .addResponse("NotFound", notFoundResponse)
    .addResponse("TooManyRequests", tooManyRequestsResponse)
    .addResponse("InternalServerError", internalServerErrorResponse)
    .addResponse("BadGateway", badGatewayResponse)
    .addResponse("ServiceUnavailable", serviceUnavailableResponse);
}

export function addErrorResponseOpenApi(schema: OperationObject): OperationObject {
  return {
    ...schema,
    responses: {
      ...schema.responses,
      "400": { $ref: "#/components/responses/BadRequest" },
      "401": { $ref: "#/components/responses/Unauthorized" },
      "403": { $ref: "#/components/responses/Forbidden" },
      "404": { $ref: "#/components/responses/NotFound" },
      "409": { $ref: "#/components/responses/Conflict" },
      "419": { $ref: "#/components/responses/TooManyRequests" },
      "500": { $ref: "#/components/responses/InternalServerError" },
      "502": { $ref: "#/components/responses/BadGateway" },
      "503": { $ref: "#/components/responses/ServiceUnavailable" },
    },
  };
}
