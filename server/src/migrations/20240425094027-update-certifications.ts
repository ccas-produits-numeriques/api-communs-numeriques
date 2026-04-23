import { addJob } from "job-processor";

export const up = async () => {
  // Certification import pipeline has been decommissioned.
  await addJob({ name: "indexes:recreate", queued: false });
};
