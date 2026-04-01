import { Container } from "@mui/material";

import PolitiqueConfidentialite from "./components/PolitiqueConfidentialite";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { PAGES } from "@/utils/routes.utils";

export default async function PolitiqueConfidentialitePage() {
  return (
    <Container maxWidth="xl">
      <Breadcrumb pages={[PAGES.static.politiqueConfidentialite]} />
      <PolitiqueConfidentialite />
    </Container>
  );
}
