import { recuperationDepartementsPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function ListeDepartementsPage() {
  return <CataloguePage doc={recuperationDepartementsPageDoc} page={PAGES.static.recuperationDepartements} />;
}
