import { Container } from "@mui/material";

import MentionsLegales from "./components/MentionLegales";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function MentionsLegalesPage() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb pages={[PAGES.static.mentionsLegales]} />
      <MentionsLegales />
    </Container>
  );
}
