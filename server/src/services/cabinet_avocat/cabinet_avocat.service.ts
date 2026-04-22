import type { ICabinetAvocat } from "api-communs-numerique-sdk";
import type { Filter } from "mongodb";

import { getDbCollection } from "@/services/mongodb/mongodbService.js";

type CabinetAvocatSearchQuery = {
  siret?: string;
  nom?: string;
  ville?: string;
  limit: number;
};

export async function searchCabinetAvocat(query: CabinetAvocatSearchQuery): Promise<ICabinetAvocat[]> {
  const filters: Filter<Record<string, unknown>>[] = [];

  if (query.siret) {
    filters.push({ siret: query.siret });
  }

  if (query.nom) {
    filters.push({ nom: { $regex: query.nom, $options: "i" } });
  }

  if (query.ville) {
    filters.push({ ville: { $regex: query.ville, $options: "i" } });
  }

  const mongoFilter = filters.length > 0 ? { $and: filters } : {};

  const rows = await getDbCollection("cabinet_avocat").find(mongoFilter).limit(query.limit).toArray();

  return rows.map(({ _id, created_at, updated_at, ...row }) => row);
}
