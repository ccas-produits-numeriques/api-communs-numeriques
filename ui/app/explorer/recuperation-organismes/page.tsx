import { recuperationOrganismesPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function ListMissionLocalesPage() {
  return <CataloguePage doc={recuperationOrganismesPageDoc} page={PAGES.static.recuperationOrganismes} />;
}
