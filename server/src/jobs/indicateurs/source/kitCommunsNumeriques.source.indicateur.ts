import { ObjectId } from "mongodb";

import { getDbCollection } from "@/services/mongodb/mongodbService.js";

function getToday(): Date {
  // We group by day
  const now = new Date();
  now.setUTCMilliseconds(0);
  now.setUTCSeconds(0);
  now.setUTCMinutes(0);
  now.setUTCHours(0);
  return now;
}

async function updateKitCommunsNumeriquesIndicateurSourceCfd() {
  const indicateurs = await getDbCollection("source.kit_communs_numeriques")
    .aggregate<{ count: number }>([
      {
        $match: { cfd: { $ne: null } },
      },
      {
        $group: { _id: "$cfd" },
      },
      {
        $lookup: {
          from: "source.bcn",
          localField: "_id",
          foreignField: "data.FORMATION_DIPLOME",
          as: "bcn",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $cond: {
                if: {
                  $eq: [{ $size: "$bcn" }, 0],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ])
    .toArray();

  const today = getToday();

  await Promise.all(
    indicateurs.map(({ count }) => {
      return getDbCollection("indicateurs.source_kit_communs_numeriques").updateOne(
        {
          date: today,
        },
        {
          $set: { missingCfd: count },
          $setOnInsert: { _id: new ObjectId(), date: today, missingRncp: 0 },
        },
        { upsert: true }
      );
    })
  );
}

async function updateKitCommunsNumeriquesIndicateurSourceRncp() {
  const indicateurs = await getDbCollection("source.kit_communs_numeriques")
    .aggregate<{ count: number }>([
      {
        $match: { rncp: { $ne: null } },
      },
      {
        $group: { _id: "$rncp" },
      },
      {
        $lookup: {
          from: "source.france_competence",
          localField: "_id",
          foreignField: "numero_fiche",
          as: "france_competence",
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: {
              $cond: {
                if: {
                  $eq: [{ $size: "$france_competence" }, 0],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
      },
    ])
    .toArray();

  const today = getToday();

  await Promise.all(
    indicateurs.map(({ count }) => {
      return getDbCollection("indicateurs.source_kit_communs_numeriques").updateOne(
        {
          date: today,
        },
        {
          $set: { missingRncp: count },
          $setOnInsert: { _id: new ObjectId(), date: today, missingCfd: 0 },
        },
        { upsert: true }
      );
    })
  );
}

export async function updateKitCommunsNumeriquesIndicateurSource(): Promise<void> {
  await Promise.all([
    updateKitCommunsNumeriquesIndicateurSourceCfd(),
    updateKitCommunsNumeriquesIndicateurSourceRncp(),
  ]);
}
