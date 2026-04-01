import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("import.meta").updateMany(
    { type: "kit_communs_numeriques", status: "pending" },
    { $set: { status: "done" } }
  );
};
