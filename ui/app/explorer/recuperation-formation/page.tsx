import { recuperationFormationPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function RecuperationFormationPage() {
  return <CataloguePage doc={recuperationFormationPageDoc} page={PAGES.static.recuperationFormation} />;
}
