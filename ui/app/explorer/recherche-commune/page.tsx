import { rechercheCommunePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function RechecheCommunePage() {
  return <CataloguePage doc={rechercheCommunePageDoc} page={PAGES.static.rechercheCommune} />;
}
