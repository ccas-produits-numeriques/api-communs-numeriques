import { Typography } from "@mui/material";

import UserList from "./components/UserList";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function AdminUsersPage() {
  return (
    <>
      <Breadcrumb pages={[PAGES.static.adminUsers]} />
      <Typography variant="h2" gutterBottom>
        {PAGES.static.adminUsers.getTitle()}
      </Typography>
      <UserList />
    </>
  );
}
