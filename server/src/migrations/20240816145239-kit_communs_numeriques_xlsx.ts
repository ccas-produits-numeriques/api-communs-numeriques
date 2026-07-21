import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("source.kit_communs_numeriques").deleteMany({});
};
