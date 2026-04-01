import { Container } from "@mui/material";

import Accessibilite from "./components/Accessibilite";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function AccessibilitePage() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb pages={[PAGES.static.accessibilite]} />
      <Accessibilite />
    </Container>
  );
}
