import { importerAdminRoutes } from "./_private/admin/importer.routes.js";
import { organisationAdminRoutes } from "./_private/admin/organisations.routes.js";
import { processorAdminRoutes } from "./_private/admin/processor.admin.routes.js";
import { userAdminRoutes } from "./_private/admin/user.routes.js";
import { authRoutes } from "./_private/auth.routes.js";
import { emailsRoutes } from "./_private/emails.routes.js";
import { simulateurRoutes } from "./_private/simulateur/simulateur.routes.js";
import { userRoutes } from "./_private/user.routes.js";
import { cabinetAvocatRoutes } from "./cabinet-avocat.routes.js";
import { sourceAcceRoutes } from "./experimental/sources/acce.routes.js";
import { healthcheckRoutes } from "./healthcheck.routes.js";
import type { Server } from "@/server/server.js";

type RegisterRoutes = (opts: { server: Server }) => void;

export const registerRoutes: RegisterRoutes = ({ server }) => {
  healthcheckRoutes({ server });
  authRoutes({ server });
  userRoutes({ server });
  emailsRoutes({ server });
  userAdminRoutes({ server });
  organisationAdminRoutes({ server });
  processorAdminRoutes({ server });
  cabinetAvocatRoutes({ server });
  sourceAcceRoutes({ server });
  simulateurRoutes({ server });
  importerAdminRoutes({ server });
};
