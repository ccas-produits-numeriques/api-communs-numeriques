import { getBcnImporterStatus, runBcnImporter } from "./bcn/bcn.importer.js";
import { getDaresCcnImporterStatus, runDaresConventionCollectivesImporter } from "./dares/ccn/dares.ccn.importer.js";
import { getFranceCompetencesImporterStatus, runRncpImporter } from "./france_competence/france_competence.importer.js";
import { getKaliImporterStatus, runKaliConventionCollectivesImporter } from "./kali/kali.ccn.importer.js";
import { getReferentielImporterStatus, runReferentielImporter } from "./referentiel/referentiel.js";
import type { Importer } from "./types.js";

const timings = {
  import_source: "0 4 * * *",
  import_source_main: "0 */4 * * *",
  import_compute_step_1: "0 1,5,9,13,17,21 * * *",
  import_compute_step_2: "0 2,6,10,14,18,22 * * *",
};

export const importers: Record<string, Importer> = {
  "Import des données BCN": {
    cron_string: timings.import_source_main,
    handler: runBcnImporter,
    resumable: true,
    getStatus: getBcnImporterStatus,
    checkinMargin: 60, // 1h
    maxRuntimeInMinutes: 30,
  },
  "Import des données Referentiel": {
    cron_string: timings.import_source_main,
    handler: runReferentielImporter,
    resumable: true,
    getStatus: getReferentielImporterStatus,
    checkinMargin: 60, // 1h
    maxRuntimeInMinutes: 30,
  },
  "Import des données France Compétences": {
    cron_string: timings.import_source,
    handler: runRncpImporter,
    resumable: true,
    getStatus: getFranceCompetencesImporterStatus,
    checkinMargin: 60, // 1h
    maxRuntimeInMinutes: 30,
  },
  "Import des Conventions Collective Kali": {
    cron_string: timings.import_source,
    handler: runKaliConventionCollectivesImporter,
    resumable: true,
    getStatus: getKaliImporterStatus,
    checkinMargin: 60, // 1h
    maxRuntimeInMinutes: 30,
  },
  "Import des Conventions Collective Dares": {
    cron_string: timings.import_source,
    handler: runDaresConventionCollectivesImporter,
    resumable: true,
    getStatus: getDaresCcnImporterStatus,
    checkinMargin: 60, // 1h
    maxRuntimeInMinutes: 30,
  },
  // "Import des APE-IDCC Dares": {
  //   cron_string: timings.import_source,
  //   handler: runDaresApeIdccImporter,
  //   resumable: true,
  //   getStatus: getDaresApiIdccImporterStatus,
  //   checkinMargin: 60, // 1h
  //   maxRuntimeInMinutes: 30,
  // },
};
