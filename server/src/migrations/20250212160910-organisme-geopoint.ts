import { addJob } from "job-processor";

import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("cache.entreprise").deleteMany({});
  await addJob({
    name: "import:organismes",
    payload: { force: true },
    queued: true,
  });

  await getDbCollection("source.kit_communs_numeriques").deleteMany({
    // @ts-expect-error
    cfd: null,
  });
  await getDbCollection("source.kit_communs_numeriques").deleteMany({
    // @ts-expect-error
    rncp: null,
  });
};

export const requireShutdown: boolean = true;
