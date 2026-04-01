import { Container } from "@mui/material";

import Cgu from "./components/Cgu";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function CGUPage() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb pages={[PAGES.static.cgu]} />
      <Cgu />
    </Container>
  );
}
