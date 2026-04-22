import { zCabinetAvocat } from "api-communs-numerique-sdk";
import { z } from "zod/v4-mini";

import type { IModelDescriptorGeneric } from "./common.js";
import { zObjectIdMini } from "./common.js";

const collectionName = "cabinet_avocat" as const;

const indexes: IModelDescriptorGeneric["indexes"] = [
  [{ siret: 1 }, {}],
  [{ nom: 1 }, {}],
  [{ ville: 1 }, {}],
];

export const zCabinetAvocatInternal = z.extend(zCabinetAvocat, {
  _id: zObjectIdMini,
  created_at: z.date(),
  updated_at: z.date(),
});

export type ICabinetAvocatInternal = z.output<typeof zCabinetAvocatInternal>;

export const cabinetAvocatModelDescriptor = {
  zod: zCabinetAvocatInternal,
  indexes,
  collectionName,
};
