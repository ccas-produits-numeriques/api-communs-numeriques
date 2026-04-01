import { Notice } from "@codegouvfr/react-dsfr/Notice";

import { useApiKeysStatut } from "@/app/compte/profil/hooks/useApiKeys";

export function ManageApiKeysBanner() {
  const statut = useApiKeysStatut();

  if (statut !== "actif-ready") {
    return null;
  }

  return <Notice title={<>Votre jeton a bien été créé.&nbsp;</>} />;
}
