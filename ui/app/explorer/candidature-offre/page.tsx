import { candidatureOffrePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function CandidatureOffrePage() {
  return <CataloguePage doc={candidatureOffrePageDoc} page={PAGES.static.candidatureOffre} />;
}
