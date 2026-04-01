import { rechercheOffrePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function RechercheOffrePage() {
  return <CataloguePage doc={rechercheOffrePageDoc} page={PAGES.static.rechercheOffre} />;
}
