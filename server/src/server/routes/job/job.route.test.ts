import { parseApiCommunsNumeriqueToken } from "api-communs-numerique-sdk";
import nock, { cleanAll, disableNetConnect, enableNetConnect } from "nock";
import { generateOrganisationFixture, generateUserFixture } from "shared/models/fixtures/index";
import type { IUser } from "shared/models/user.model";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { useMongo } from "@tests/mongo.test.utils.js";

import { generateApiKey } from "@/actions/users.actions.js";
import config from "@/config.js";
import type { Server } from "@/server/server.js";
import createServer from "@/server/server.js";
import { getDbCollection } from "@/services/mongodb/mongodbService.js";

useMongo();

beforeEach(() => {
  disableNetConnect();

  return () => {
    cleanAll();
    enableNetConnect();
  };
});

let app: Server;

beforeAll(async () => {
  app = await createServer();
  await app.ready();

  return () => app.close();
}, 15_000);

const organisations = {
  read: generateOrganisationFixture({
    nom: "Org Read",
    slug: "org-read",
    habilitations: [],
  }),
  appointmentsWrite: generateOrganisationFixture({
    nom: "Org appointments Write",
    slug: "org-appointments-write",
    habilitations: ["appointments:write"],
  }),
};

const users = {
  basic: generateUserFixture({
    email: "basic@exemple.fr",
    is_admin: false,
    organisation: null,
  }),
  read: generateUserFixture({
    email: "ro@exemple.fr",
    is_admin: false,
    organisation: organisations.read.nom,
  }),
  appointmentsWrite: generateUserFixture({
    email: "appointments-write@exemple.fr",
    is_admin: false,
    organisation: organisations.appointmentsWrite.nom,
  }),
};

const tokens = {
  basic: "",
  read: "",
  appointmentsWrite: "",
};

const nockMatchUserAuthorization = (u: IUser, habilitations: string[]) => {
  let token: string = "";

  return {
    matchHeader: (t: string) => {
      token = t;
      return true;
    },
    expectAuth: async () => {
      return expect
        .soft(
          parseApiCommunsNumeriqueToken({
            token,
            publicKey: config.api.cour_de_cassation.public_cert,
          })
        )
        .resolves.toEqual({
          data: {
            email: u.email,
            habilitations: habilitations.reduce((acc, h) => ({ ...acc, [h]: true }), {
              "appointments:write": false,
            }),
            organisation: u.organisation,
          },
          success: true,
        });
      return true;
    },
  };
};

beforeEach(async () => {
  await getDbCollection("users").insertMany(Object.values(users));
  await getDbCollection("organisations").insertMany(Object.values(organisations));
  tokens.basic = (await generateApiKey("", users.basic)).value;
  tokens.read = (await generateApiKey("", users.read)).value;
  tokens.appointmentsWrite = (await generateApiKey("", users.appointmentsWrite)).value;
});

describe("GET /job/v1/search", () => {
  it("should returns 401 if api key is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/job/v1/search",
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({
      statusCode: 401,
      name: "Unauthorized",
      message: "Vous devez fournir une clé d'API valide pour accéder à cette ressource",
    });
  });

  it("should returns 401 if api key is invalid", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/job/v1/search",
      headers: {
        Authorization: `Bearer ${tokens.basic}invalid`,
      },
    });
    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({
      statusCode: 401,
      name: "Unauthorized",
      message: "Impossible de déchiffrer la clé d'API",
    });
  });

  it("should return result from SIJ-API search", async () => {
    const data = {
      jobs: [
        {
          identifier: {
            id: "1",
            partner_label: "SIJ-API",
            partner_job_id: null,
          },
        },
      ],
      recruiters: [
        {
          identifier: {
            id: "42",
          },
        },
      ],
      warnings: [
        {
          code: "FRANCE_TRAVAIL_API_ERROR",
          message: "Unable to retrieve job offers from France Travail API",
        },
      ],
    };

    const { matchHeader, expectAuth } = nockMatchUserAuthorization(users.basic, []);

    nock(config.api.sij_api.endpoint)
      .get("/v3/jobs/search")
      .query({
        longitude: -4.6,
        latitude: 42.85,
        radius: 60,
        target_diploma_level: "3",
        romes: "I1401,I1306",
        rncp: "RNCP38654",
      })
      .matchHeader("authorization", matchHeader)
      .reply(200, data);

    const response = await app.inject({
      method: "GET",
      url: `/api/job/v1/search?longitude=-4.6&latitude=42.85&radius=60&target_diploma_level=3&romes=I1401,I1306&rncp=RNCP38654`,
      headers: {
        Authorization: `Bearer ${tokens.basic}`,
      },
    });

    await expectAuth();
    expect.soft(response.statusCode).toBe(200);
    const result = response.json();
    expect(result).toEqual(data);
  });
});

describe("GET /job/v1/offer/:id", () => {
  it("should returns 401 if api key is not provided", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/job/v1/offer/44",
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({
      statusCode: 401,
      name: "Unauthorized",
      message: "Vous devez fournir une clé d'API valide pour accéder à cette ressource",
    });
  });

  it("should returns 401 if api key is invalid", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/job/v1/offer/44",
      headers: {
        Authorization: `Bearer ${tokens.basic}invalid`,
      },
    });
    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({
      statusCode: 401,
      name: "Unauthorized",
      message: "Impossible de déchiffrer la clé d'API",
    });
  });

  it("should return result from SIJ-API get job", async () => {
    const data = {
      jobs: [
        {
          identifier: {
            id: "1",
            partner_label: "SIJ-API",
            partner_job_id: null,
          },
        },
      ],
      recruiters: [],
      warnings: [],
    };

    const { matchHeader, expectAuth } = nockMatchUserAuthorization(users.basic, []);

    nock(config.api.sij_api.endpoint).get("/v3/jobs/44").matchHeader("authorization", matchHeader).reply(200, data);

    const response = await app.inject({
      method: "GET",
      url: `/api/job/v1/offer/44`,
      headers: {
        Authorization: `Bearer ${tokens.basic}`,
      },
    });

    await expectAuth();
    expect.soft(response.statusCode).toBe(200);
    const result = response.json();
    expect(result).toEqual(data);
  });
});
