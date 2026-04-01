import { certificationsPageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/explorer/components/CataloguePage";
import { PAGES } from "@/utils/routes.utils";

export default async function CatalogueCertificationPage() {
  return <CataloguePage doc={certificationsPageDoc} page={PAGES.static.catalogueDesDonneesCertification} />;
}
