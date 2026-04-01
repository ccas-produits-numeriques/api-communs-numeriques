import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { addJob } from "job-processor";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { runKitCommunsNumeriquesImporter } from "./kitCommunsNumeriques.importer.js";
import { useMongo } from "@tests/mongo.test.utils.js";

import { getKitCommunsNumeriquesData } from "@/services/apis/kit_communs_numeriques/kit_communs_numeriques.api.js";
import { getDbCollection } from "@/services/mongodb/mongodbService.js";
import { getStaticFilePath } from "@/utils/getStaticFilePath.js";

vi.mock("@/utils/getStaticFilePath", () => ({
  getStaticFilePath: vi.fn(),
}));

vi.mock("@/services/apis/kit_communs_numeriques/kit_communs_numeriques.api.js");

vi.mock("job-processor", async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = (await importOriginal()) as any;
  return {
    ...mod,
    addJob: vi.fn().mockResolvedValue(undefined),
  };
});

describe("runKitCommunsNumeriquesImporter", () => {
  useMongo();

  beforeEach(async () => {
    vi.useFakeTimers();

    return () => vi.useRealTimers();
  });

  describe("Legacy files", () => {
    beforeEach(() => {
      vi.mocked(getKitCommunsNumeriquesData).mockImplementation(async function* () {});
    });

    it("should import Kit Communs numeriques single_file source", async () => {
      const date = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/single_file`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();

      expect(result).toBe(10);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const data = await coll.find({}).toArray();
      expect(data.map((datum) => ({ ...datum, _id: "ObjectId" }))).toMatchSnapshot();

      expect(addJob).toHaveBeenCalledTimes(1);
      expect(addJob).toHaveBeenCalledWith({ name: "indicateurs:source_kit_communs_numeriques:update" });

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });

    it("should import XLSX file", async () => {
      const date = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/xlsx`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();

      expect(result).toBe(10);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const data = await coll.find({}).toArray();
      expect(data.map((datum) => ({ ...datum, _id: "ObjectId" }))).toMatchSnapshot();

      expect(addJob).toHaveBeenCalledTimes(1);
      expect(addJob).toHaveBeenCalledWith({ name: "indicateurs:source_kit_communs_numeriques:update" });

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });

    it("should support consecutive import", async () => {
      const date1 = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date1);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/single_file`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();
      expect(result).toBe(10);

      const date2 = new Date("2023-04-09T22:00:00.000Z");
      vi.setSystemTime(date2);

      const result2 = await runKitCommunsNumeriquesImporter();
      expect(result2).toBe(10);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const data = await coll.find({ date: date1 }).toArray();
      expect(data).toEqual([]);

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date1,
          status: "done",
          type: "kit_communs_numeriques",
        },
        {
          _id: expect.any(Object),
          import_date: date2,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });

    it("should throw an error if importKitCommunsNumeriquesSource fails", async () => {
      const now = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(now);

      const dataFixture = join(dirname(fileURLToPath(import.meta.url)), `fixtures/non-existing-file.csv`);
      vi.mocked(getStaticFilePath).mockReturnValue(dataFixture);

      await expect(runKitCommunsNumeriquesImporter()).rejects.toThrowError(
        "import.kit_communs_numeriques: unable to runKitCommunsNumeriquesImporter"
      );

      expect(addJob).toHaveBeenCalledTimes(0);
      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: now,
          status: "failed",
          type: "kit_communs_numeriques",
        },
      ]);
    });

    it("should import Kit Communs numeriques multiple_files source", async () => {
      const date = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/multiple_files`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();

      expect(result).toBe(7);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const stats = await coll.find({}, { projection: { _id: 0 }, sort: { cfd: 1, rncp: 1 } }).toArray();

      expect(stats).toEqual([
        {
          cfd: "17021006",
          rncp: "RNCP11532",
        },
        {
          cfd: "17021006",
          rncp: "RNCP1997",
        },
        {
          cfd: "17021006",
          rncp: "RNCP5912",
        },
        {
          cfd: "46X33608",
          rncp: "RNCP36906",
        },
        {
          cfd: "46X33608",
          rncp: "RNCP38447",
        },
        {
          cfd: "56T23207",
          rncp: "RNCP25720",
        },
        {
          cfd: "56T23207",
          rncp: "RNCP35507",
        },
      ]);

      const data = await coll.find({}).toArray();
      expect(data.map((datum) => ({ ...datum, _id: "ObjectId" }))).toMatchSnapshot();

      expect(addJob).toHaveBeenCalledTimes(1);
      expect(addJob).toHaveBeenCalledWith({ name: "indicateurs:source_kit_communs_numeriques:update" });

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });

    it("should support june 2024 new sheets", async () => {
      const date = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/juin_2024`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();

      expect(result).toBe(1);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const data = await coll.find({}).toArray();
      expect(data.map((datum) => ({ ...datum, _id: "ObjectId" }))).toMatchSnapshot();

      expect(addJob).toHaveBeenCalledTimes(1);
      expect(addJob).toHaveBeenCalledWith({ name: "indicateurs:source_kit_communs_numeriques:update" });

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });
  });

  describe("API source", () => {
    const apiData = [
      {
        cfd: "17021006",
        rncp: "RNCP1997",
      },
      {
        cfd: "25031012",
        rncp: "RNCP30111",
      },
      {
        cfd: "46X33608",
        rncp: null,
      },
      {
        cfd: null,
        rncp: "RNCP30111",
      },
    ];

    beforeEach(() => {
      vi.mocked(getKitCommunsNumeriquesData).mockImplementation(async function* () {
        for (const item of apiData) {
          yield item;
        }
      });
    });

    it("should import API source", async () => {
      const date = new Date("2023-04-08T22:00:00.000Z");
      vi.setSystemTime(date);

      vi.mocked(getStaticFilePath).mockImplementation((path) =>
        join(dirname(fileURLToPath(import.meta.url)), `fixtures/empty`, path)
      );

      const result = await runKitCommunsNumeriquesImporter();

      expect(result).toBe(2);

      const coll = getDbCollection("source.kit_communs_numeriques");
      const data = await coll.find({}, { projection: { _id: 0 } }).toArray();
      expect(data).toEqual([apiData[0], apiData[1]]);

      expect(addJob).toHaveBeenCalledTimes(1);
      expect(addJob).toHaveBeenCalledWith({ name: "indicateurs:source_kit_communs_numeriques:update" });

      expect(await getDbCollection("import.meta").find({}).toArray()).toEqual([
        {
          _id: expect.any(Object),
          import_date: date,
          status: "done",
          type: "kit_communs_numeriques",
        },
      ]);
    });
  });
});
