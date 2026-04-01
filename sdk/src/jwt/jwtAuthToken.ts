import { createPrivateKey } from "crypto";
import { importSPKI, jwtVerify, SignJWT } from "jose";
import { JWSSignatureVerificationFailed, JWTExpired } from "jose/errors";
import { z } from "zod/v4-mini";

export const zApiCommunsNumeriqueTokenData = z.object({
  email: z.string().check(z.email()),
  organisation: z.nullable(z.string()),
  habilitations: z.record(z.string(), z.boolean()),
});

export type IApiCommunsNumeriqueTokenData = z.output<typeof zApiCommunsNumeriqueTokenData>;

type IParseApiCommunsNumeriqueTokenParams = {
  token: string;
  publicKey: string;
};

type IParseApiCommunsNumeriqueTokenResult =
  | {
      success: true;
      data: IApiCommunsNumeriqueTokenData;
    }
  | {
      success: false;
      reason: "token-expired" | "invalid-signature" | "invalid-format" | "missing-bearer";
    };

const bearerRegex = /^bearer\s+(\S+)$/i;
function extractBearerToken(authorization: string): null | string {
  const matches = authorization.match(bearerRegex);
  return matches === null ? null : matches[1];
}

export async function parseApiCommunsNumeriqueToken(
  params: IParseApiCommunsNumeriqueTokenParams
): Promise<IParseApiCommunsNumeriqueTokenResult> {
  try {
    const token = extractBearerToken(params.token);

    if (!token) {
      return {
        success: false,
        reason: "missing-bearer",
      };
    }

    const publicKey = await importSPKI(params.publicKey, "ES512");
    const { payload } = await jwtVerify(token, publicKey);

    const parseResult = zApiCommunsNumeriqueTokenData.safeParse(payload);
    if (!parseResult.success) {
      return {
        success: false,
        reason: "invalid-format",
      };
    }

    return {
      success: true,
      data: parseResult.data,
    };
  } catch (err: unknown) {
    if (err instanceof JWTExpired) {
      return {
        success: false,
        reason: "token-expired",
      };
    }

    if (err instanceof JWSSignatureVerificationFailed) {
      return {
        success: false,
        reason: "invalid-signature",
      };
    }

    throw err;
  }
}

type ICreateApiCommunsNumeriqueTokenParams = {
  data: IApiCommunsNumeriqueTokenData;
  privateKey: string;
  expiresIn?: string | null;
};

export async function createApiCommunsNumeriqueToken({
  data,
  privateKey,
  expiresIn,
}: ICreateApiCommunsNumeriqueTokenParams): Promise<string> {
  const key = createPrivateKey(privateKey);
  return new SignJWT(JSON.parse(JSON.stringify(data)))
    .setProtectedHeader({ alg: "ES512" })
    .setExpirationTime(expiresIn || "1h")
    .setIssuedAt()
    .sign(key);
}
