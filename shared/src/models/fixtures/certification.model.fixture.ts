import type { ICertificationFixtureInput } from "api-communs-numerique-sdk/fixtures";
import { generateCertificationFixture } from "api-communs-numerique-sdk/fixtures";
import { ObjectId } from "bson";

import type { ICertificationInternal } from "../certification.model.js";

export type ICertificationInternalFixtureInput = ICertificationFixtureInput &
  Partial<Pick<ICertificationInternal, "_id" | "created_at" | "updated_at">>;

export function generateCertificationInternalFixture(
  data?: ICertificationInternalFixtureInput
): ICertificationInternal {
  return {
    _id: new ObjectId(),
    created_at: new Date("2021-08-31T22:00:00.000Z"),
    updated_at: new Date("2021-08-31T22:00:00.000Z"),
    ...data,
    ...generateCertificationFixture(data),
  };
}
