import { z } from "zod/v4-mini";

import { zSiret } from "../organisme/organismes.primitives.js";

export const zCabinetAvocat = z.object({
  id: z.string(),
  siret: zSiret,
  nom: z.string(),
  ville: z.string(),
  barreau: z.string(),
  adresse: z.nullable(z.string()),
});

export type ICabinetAvocat = z.output<typeof zCabinetAvocat>;
