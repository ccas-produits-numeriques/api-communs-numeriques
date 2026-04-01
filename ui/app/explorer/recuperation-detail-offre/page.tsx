import { recuperationDetailOffrePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function RecuperationDetailOffrePage() {
  return <CataloguePage doc={recuperationDetailOffrePageDoc} page={PAGES.static.recuperationDetailOffre} />;
}
