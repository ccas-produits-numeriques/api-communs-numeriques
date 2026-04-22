import type { OpenapiModel } from "../../openapi/types.js";
import { cabinetAvocatModelDoc } from "../../docs/models/cabinet_avocat/cabinet_avocat.model.doc.js";
import { zCabinetAvocat } from "./cabinet_avocat.model.js";

export const cabinetAvocatModelOpenapi: OpenapiModel<"CabinetAvocat"> = {
  name: "CabinetAvocat",
  doc: cabinetAvocatModelDoc,
  zod: zCabinetAvocat,
};
