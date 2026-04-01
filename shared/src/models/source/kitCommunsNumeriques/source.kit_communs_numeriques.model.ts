import { z } from "zod/v4-mini";

import type { IModelDescriptorGeneric } from "../../common.js";
import { zObjectIdMini } from "../../common.js";

const collectionName = "source.kit_communs_numeriques" as const;

const indexes: IModelDescriptorGeneric["indexes"] = [
  [{ cfd: 1, rncp: 1 }, { unique: true }],
  [{ rncp: 1, cfd: 1 }, {}],
];

export const zKitCommunsNumeriques = z.object({
  _id: zObjectIdMini,
  rncp: z.string(),
  cfd: z.string(),
});

export const sourceKitCommunsNumeriquesModelDescriptor = {
  zod: zKitCommunsNumeriques,
  indexes,
  collectionName,
};

export type ISourceKitCommunsNumeriques = z.output<typeof zKitCommunsNumeriques>;
