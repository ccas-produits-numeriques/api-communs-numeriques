import { rechercheFormationPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function RechercheFormationPage() {
  return <CataloguePage doc={rechercheFormationPageDoc} page={PAGES.static.rechercheFormation} />;
}
