import { ObjectId } from "bson";

import type { ISourceKitCommunsNumeriques } from "../source/kitCommunsNumeriques/source.kit_communs_numeriques.model.js";

export function generateKitCommunsNumeriquesFixture(
  data?: Partial<ISourceKitCommunsNumeriques>
): ISourceKitCommunsNumeriques {
  return {
    _id: new ObjectId(),
    cfd: "code",
    rncp: "fiche",
    ...data,
  };
}
