import { depotOffrePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function DepotOffrePage() {
  return <CataloguePage doc={depotOffrePageDoc} page={PAGES.static.depotOffre} />;
}
