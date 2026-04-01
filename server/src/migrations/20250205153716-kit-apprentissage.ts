import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("import.meta").deleteMany({ type: "kit_communs_numeriques" });
  await getDbCollection("source.kit_communs_numeriques").deleteMany({});
  await getDbCollection("indicateurs.source_kit_communs_numeriques").deleteMany({});
};

export const requireShutdown: boolean = true;
