import { ObjectId } from "mongodb";
import { generateUserFixture } from "shared/models/fixtures/index";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { useMongo } from "@tests/mongo.test.utils.js";

import { generateApiKey } from "@/actions/users.actions.js";
import type { Server } from "@/server/server.js";
import createServer from "@/server/server.js";
import { getDbCollection } from "@/services/mongodb/mongodbService.js";

useMongo();

describe("GET /cabinet-avocat/v1/recherche", () => {
  let app: Server;
  let token: string;

  beforeAll(async () => {
    app = await createServer();
    await app.ready();

    return () => app.close();
  }, 15_000);

  beforeEach(async () => {
    const user = generateUserFixture({
      email: "user@exemple.fr",
      is_admin: false,
    });
    await getDbCollection("users").insertOne(user);
    token = (await generateApiKey("", user)).value;

    await getDbCollection("cabinet_avocat").insertMany([
      {
        _id: new ObjectId(),
        id: "cab-1",
        siret: "73282932000074",
        nom: "Cabinet Dupont",
        ville: "Paris",
        barreau: "Paris",
        adresse: "1 rue de Rivoli, Paris",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId(),
        id: "cab-2",
        siret: "55210055400013",
        nom: "Cabinet Martin",
        ville: "Lyon",
        barreau: "Lyon",
        adresse: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  });

  it("should returns 401 if api key is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/cabinet-avocat/v1/recherche",
    });

    expect(response.statusCode).toBe(401);
  });

  it("should filter by ville", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/cabinet-avocat/v1/recherche?ville=paris",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([
      expect.objectContaining({
        id: "cab-1",
        nom: "Cabinet Dupont",
        ville: "Paris",
      }),
    ]);
  });
});
