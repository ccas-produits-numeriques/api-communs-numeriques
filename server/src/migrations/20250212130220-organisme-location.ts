import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("cache.entreprise").deleteMany({});

  await getDbCollection("organisme").updateMany(
    { "etablissement.geopoint": { $exists: false } },
    { $set: { "etablissement.geopoint": null } },
    { bypassDocumentValidation: true }
  );
};

export const requireShutdown: boolean = true;
