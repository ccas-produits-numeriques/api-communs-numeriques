import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("organisme").updateMany(
    {
      contacts: { $exists: false },
    },
    { $set: { contacts: [] } },
    { bypassDocumentValidation: true }
  );
};

export const requireShutdown: boolean = true;
