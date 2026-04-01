import { recuperationMissionLocalesPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function ListMissionLocalesPage() {
  return <CataloguePage doc={recuperationMissionLocalesPageDoc} page={PAGES.static.recuperationMissionLocales} />;
}
