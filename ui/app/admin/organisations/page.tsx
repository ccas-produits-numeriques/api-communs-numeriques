import { Typography } from "@mui/material";

import OrganisationList from "./components/OrganisationList";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function AdminOrganisationPage() {
  return (
    <>
      <Breadcrumb pages={[PAGES.static.adminOrganisations]} />
      <Typography variant="h2" gutterBottom>
        {PAGES.static.adminOrganisations.getTitle()}
      </Typography>
      <OrganisationList />
    </>
  );
}
