import { addJob } from "job-processor";

import { getDbCollection } from "@/services/mongodb/mongodbService.js";

export const up = async () => {
  await getDbCollection("source.kit_communs_numeriques").deleteMany({});
  await addJob({ name: "import:kit_communs_numeriques", queued: false });
  await addJob({ name: "import:certifications", queued: false });
};
