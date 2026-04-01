import { ObjectId } from "mongodb";
import {
  generateSourceBcn_N_FormationDiplomeFixture,
  generateSourceBcn_N_NiveauFormationDiplomeFixtureList,
  generateSourceBcn_V_FormationDiplomeFixture,
} from "shared/models/fixtures/source.bcn.model.fixture";
import { generateSourceFranceCompetenceFixture } from "shared/models/fixtures/source.france_competence.model.fixture";
import { generateKitCommunsNumeriquesFixture } from "shared/models/fixtures/source.kit_communs_numeriques.model.fixture";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { updateKitCommunsNumeriquesIndicateurSource } from "./kitCommunsNumeriques.source.indicateur.js";
import { getDbCollection } from "@/services/mongodb/mongodbService.js";

import { useMongo } from "@tests/mongo.test.utils.js";

describe("updateKitCommunsNumeriquesIndicateurSource", () => {
  useMongo();

  const now = new Date("2024-03-07T10:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);

    return () => {
      vi.useRealTimers();
    };
  });

  const kitCommunsNumeriquesData = [
    generateKitCommunsNumeriquesFixture({
      cfd: "10000001",
      rncp: "RNCP00100",
    }),
    generateKitCommunsNumeriquesFixture({
      cfd: "10000001",
      rncp: "RNCP00000", // missing RNCP
    }),
    generateKitCommunsNumeriquesFixture({
      cfd: "20000001",
      rncp: "RNCP00000", // missing RNCP
    }),
    generateKitCommunsNumeriquesFixture({
      cfd: "20000001",
      rncp: "RNCP00001", // missing RNCP
    }),

    generateKitCommunsNumeriquesFixture({
      cfd: "00000000", // Missing CFD
      rncp: "RNCP00100",
    }),
    generateKitCommunsNumeriquesFixture({
      cfd: "20000001",
      rncp: "RNCP00200",
    }),
    generateKitCommunsNumeriquesFixture({
      cfd: "00000000", // Missing CFD
      rncp: "RNCP00201",
    }),

    generateKitCommunsNumeriquesFixture({
      cfd: "30000001",
      rncp: "RNCP00300",
    }),
  ];

  const generateBcnData = (code: string) => {
    return [
      generateSourceBcn_V_FormationDiplomeFixture({
        data: {
          FORMATION_DIPLOME: code,
        },
      }),
      generateSourceBcn_N_FormationDiplomeFixture({
        data: {
          FORMATION_DIPLOME: `${code}`,
        },
      }),
    ];
  };

  const bcnData = [
    ...generateBcnData("10000001"),
    ...generateBcnData("20000001"),
    ...generateBcnData("30000001"),
    ...generateSourceBcn_N_NiveauFormationDiplomeFixtureList(),
  ];

  const generateFcData = (code: string) => {
    return generateSourceFranceCompetenceFixture({
      numero_fiche: code,
    });
  };

  const franceCompetenceData = [
    generateFcData("RNCP00100"),
    generateFcData("RNCP00200"),
    generateFcData("RNCP00201"),
    generateFcData("RNCP00300"),
  ];

  beforeEach(async () => {
    await Promise.all([
      getDbCollection("source.bcn").insertMany(bcnData),
      getDbCollection("source.france_competence").insertMany(franceCompetenceData),
      getDbCollection("source.kit_communs_numeriques").insertMany(kitCommunsNumeriquesData),
    ]);
  });

  it("should update indicateur", async () => {
    await expect(updateKitCommunsNumeriquesIndicateurSource()).resolves.toBeUndefined();

    const indicateurs = await getDbCollection("indicateurs.source_kit_communs_numeriques")
      .find(
        {},
        {
          sort: {
            version: 1,
          },
        }
      )
      .toArray();

    expect(indicateurs).toEqual([
      {
        _id: expect.any(ObjectId),
        date: new Date("2024-03-07T00:00:00.000Z"),
        missingCfd: 1,
        missingRncp: 2,
      },
    ]);
  });

  it("should update today indicateurs only", async () => {
    const previousIndicateurs = [
      {
        _id: new ObjectId(),
        date: new Date("2024-03-06T00:00:00.000Z"),
        missingCfd: 42,
        missingRncp: 6,
      },
      {
        _id: new ObjectId(),
        date: new Date("2024-03-07T00:00:00.000Z"),
        missingCfd: 100,
        missingRncp: 100,
      },
    ];

    await getDbCollection("indicateurs.source_kit_communs_numeriques").insertMany(previousIndicateurs);

    await expect(updateKitCommunsNumeriquesIndicateurSource()).resolves.toBeUndefined();

    const indicateurs = await getDbCollection("indicateurs.source_kit_communs_numeriques")
      .find(
        {},
        {
          sort: {
            date: 1,
          },
        }
      )
      .toArray();

    expect(indicateurs).toEqual([
      previousIndicateurs[0],
      {
        ...previousIndicateurs[1],
        missingCfd: 1,
        missingRncp: 2,
      },
    ]);
  });
});
