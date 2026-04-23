import { internal, isBoom } from "@hapi/boom";
import type { AxiosInstance } from "axios";
import axios, { isAxiosError } from "axios";
import { z } from "zod/v4-mini";

import logger from "../../logger.js";
import { sleep } from "../../../utils/asyncUtils.js";
import config from "@/config.js";
import { withCause } from "@/services/errors/withCause.js";
import { apiRateLimiter } from "@/utils/apiUtils.js";

const kitClient = apiRateLimiter("kit_communs_numeriques", {
  nbRequests: 5,
  durationInSeconds: 10,
  client: axios.create({
    baseURL: config.api.kit_communs_numeriques.endpoint,
    timeout: 120_000,
    proxy: false,
  }),
  timeout: 900_000, // 15 minutes
  maxQueueSize: 100,
});

const zKitCommunsNumeriquesResponse = z.object({
  total: z.number(),
  data: z.array(
    z.object({
      cfd: z.nullable(z.string()),
      rncp: z.nullable(z.string()),
    })
  ),
});

type IKitCommunsNumeriquesResponse = z.infer<typeof zKitCommunsNumeriquesResponse>;

const PAGE_SIZE = 100;

async function getKitCommunsNumeriquesPage(page: number): Promise<IKitCommunsNumeriquesResponse> {
  return kitClient(async (client: AxiosInstance) => {
    const maxRetries = 2;
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await client.get(`/cfd_rncp_intitule?page_num=${page}&page_size=${PAGE_SIZE}`, {
          headers: {
            "token-connexion": config.api.kit_communs_numeriques.token,
          },
        });

        return zKitCommunsNumeriquesResponse.parse(response.data);
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          await sleep(1000); // Wait 1s between retries
          continue;
        }
      }
    }

    throw lastError;
  });
}

export async function* getKitCommunsNumeriquesData(): AsyncGenerator<
  { cfd: string | null; rncp: string | null },
  void,
  void
> {
  try {
    logger.info("getKitCommunsNumeriquesData: fetching data from Kit Communs numeriques API");
    const firstPage = await getKitCommunsNumeriquesPage(1);
    const totalPages = Math.ceil(firstPage.total / PAGE_SIZE);

    yield* firstPage.data;

    logger.info("getKitCommunsNumeriquesData: total pages to fetch: " + totalPages);
    for (let page = 2; page <= totalPages; page++) {
      logger.info(`getKitCommunsNumeriquesData: fetching page ${page} of ${totalPages}`);
      const response = await getKitCommunsNumeriquesPage(page);
      yield* response.data;
    }
  } catch (error) {
    if (isBoom(error)) {
      throw error;
    }

    if (isAxiosError(error)) {
      throw internal("api.kit_communs_numeriques: unable to getKitCommunsNumeriquesData", { data: error.toJSON() });
    }
    throw withCause(internal("api.kit_communs_numeriques: unable to getKitCommunsNumeriquesData"), error);
  }
}
