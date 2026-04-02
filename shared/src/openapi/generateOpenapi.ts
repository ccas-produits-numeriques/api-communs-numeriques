import { buildOpenApiSchema } from "api-communs-numerique-sdk/internal";

export function generateOpenApiSchema(version: string, env: string, publicUrl: string) {
  const builder = buildOpenApiSchema(version, env, publicUrl);

  return builder.getSpec();
}
