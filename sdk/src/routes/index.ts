import type { ConditionalExcept, EmptyObject, Jsonify } from "type-fest";
import type { z } from "zod/v4-mini";

import type { $ZodType } from "zod/v4/core";
import { zApiCabinetAvocatRoutes } from "./cabinet_avocat/cabinet_avocat.routes.js";
import type { IApiRouteSchema, IApiRouteSchemaWrite } from "./common.routes.js";
import { zApiOrganismesRoutes } from "./organisme/organisme.routes.js";
import { zCoreRoutes } from "./healthcheck.routes.js";

export * from "./common.routes.js";
export * from "./cabinet_avocat/cabinet_avocat.routes.js";
export * from "./organisme/organisme.routes.js";

export const zApiRoutesGet = {
  ...zApiOrganismesRoutes.get,
  ...zApiCabinetAvocatRoutes.get,
  ...zCoreRoutes.get,
} as const;

export const zApiRoutesPost = {} as const;

export const zApiRoutesPut = {} as const;

export const zApiRoutesDelete = {} as const;

export const zApiRoutes = {
  get: zApiRoutesGet,
  post: zApiRoutesPost,
  put: zApiRoutesPut,
  delete: zApiRoutesDelete,
} as const;

export type IApiGetRoutes = typeof zApiRoutesGet;
export type IApiPostRoutes = typeof zApiRoutesPost;
export type IApiPutRoutes = typeof zApiRoutesPut;
export type IApiDeleteRoutes = typeof zApiRoutesDelete;

export type IApiResponse<S extends IApiRouteSchema> = S["response"][`200`] extends $ZodType
  ? Jsonify<z.output<S["response"][`200`]>>
  : S["response"][`2${string}`] extends $ZodType
    ? Jsonify<z.output<S["response"][`2${string}`]>>
    : never;

export type IApiBody<S extends IApiRouteSchemaWrite> = S["body"] extends $ZodType ? z.input<S["body"]> : never;

export type IApiQuery<S extends IApiRouteSchema> = S["querystring"] extends $ZodType
  ? z.input<S["querystring"]>
  : never;

export type IApiParam<S extends IApiRouteSchema> = S["params"] extends $ZodType ? z.input<S["params"]> : never;

export type IApiHeaders<S extends IApiRouteSchema> = S["headers"] extends $ZodType
  ? Omit<z.input<S["headers"]>, "referrer">
  : object;

type IRequestRaw<S extends IApiRouteSchema> = {
  params: IApiParam<S>;
  querystring: IApiQuery<S>;
  headers: IApiHeaders<S> extends EmptyObject ? never : IApiHeaders<S>;
  body: S extends IApiRouteSchemaWrite ? IApiBody<S> : never;
  signal?: AbortSignal;
};

export type IApiRequest<S extends IApiRouteSchema> =
  ConditionalExcept<IRequestRaw<S>, never> extends EmptyObject ? EmptyObject : ConditionalExcept<IRequestRaw<S>, never>;
