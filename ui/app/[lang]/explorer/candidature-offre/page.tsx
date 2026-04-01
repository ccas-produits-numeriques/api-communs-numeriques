import { candidatureOffrePageDoc } from "api-communs-numerique-sdk/internal";

import { CataloguePage } from "@/app/[lang]/explorer/components/CataloguePage";
import { getServerTranslation } from "@/app/i18n";
import type { PropsWithLangParams } from "@/app/i18n/settings";
import { PAGES } from "@/utils/routes.utils";

export default async function CandidatureOffrePage({ params }: PropsWithLangParams) {
  const { lang } = await params;
  const { t } = await getServerTranslation(lang, "explorer");

  return <CataloguePage doc={candidatureOffrePageDoc} lang={lang} t={t} page={PAGES.static.candidatureOffre} />;
}
