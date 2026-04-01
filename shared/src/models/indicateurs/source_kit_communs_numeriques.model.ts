import { z } from "zod/v4-mini";

import type { IModelDescriptorGeneric } from "../common.js";
import { zObjectIdMini } from "../common.js";

const collectionName = "indicateurs.source_kit_communs_numeriques" as const;

const indexes: IModelDescriptorGeneric["indexes"] = [[{ date: 1 }, { unique: true }]];

export const zIndicateurSourceKitCommunsNumeriques = z.object({
  _id: zObjectIdMini,
  date: z.date(),
  missingRncp: z.number(),
  missingCfd: z.number(),
});

export type IIndicateurSourceKitCommunsNumeriques = z.output<typeof zIndicateurSourceKitCommunsNumeriques>;

export const indicateurSourceKitCommunsNumeriquesModelDescriptor = {
  zod: zIndicateurSourceKitCommunsNumeriques,
  indexes,
  collectionName,
};
