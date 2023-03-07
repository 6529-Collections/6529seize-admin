import { DataSource, EntityManager } from "typeorm";
import { MANIFOLD } from "./constans";
import { Distribution, DistributionPhoto } from "./entities/IDistribution";
import { uploadPhotos } from "./s3";

const mysql = require("mysql");
const fs = require("fs");
const csv = require("csv-parser");

async function uploadDistributionFile(
  transactionalEntityManager: EntityManager,
  contract: string,
  cardId: number,
  distributionFile: any
): Promise<void> {
  const distributions: Distribution[] = [];
  const csvStream = fs
    .createReadStream(distributionFile.path)
    .pipe(csv({ headers: false }));

  csvStream.on("data", (data: any) => {
    const d = new Distribution();
    d.card_id = cardId;
    d.contract = contract;
    d.phase = data[0];
    d.wallet = data[1];
    d.count = parseInt(data[2]);
    distributions.push(d);
  });

  await new Promise((resolve, reject) => {
    csvStream.on("end", () => {
      resolve(true);
    });
    csvStream.on("error", (err: any) => {
      reject(err);
    });
  });

  const wallets = [...distributions].map((d) => d.wallet);

  const mintedCounts: { to_address: string; mint_count: number }[] =
    await transactionalEntityManager.query(`
      SELECT to_address, SUM(token_count) AS mint_count
      FROM transactions
      WHERE from_address = ${mysql.escape(MANIFOLD)}
      AND to_address IN (${mysql.escape(wallets)}) 
      AND contract = ${mysql.escape(contract)}
      AND token_id = ${mysql.escape(cardId)}
      GROUP BY to_address;
  `);

  mintedCounts.map((mc) => {
    const distr = distributions.find(
      (d) => d.wallet.toUpperCase() == mc.to_address.toUpperCase()
    );
    if (distr) {
      distr.mint_count = mc.mint_count;
    }
  });

  await transactionalEntityManager
    .createQueryBuilder()
    .delete()
    .from(Distribution)
    .where("card_id = :id AND contract = :contract", {
      id: cardId,
      contract: contract,
    })
    .execute();
  await transactionalEntityManager.save(distributions);
}

export async function uploadDistribution(
  source: DataSource,
  contract: string,
  cardId: number,
  distribution: any,
  photos: any[]
): Promise<{ success: boolean; error?: any }> {
  try {
    return await source.manager.transaction(
      async (transactionalEntityManager) => {
        if (distribution) {
          console.log("Uploading distribution...");
          await uploadDistributionFile(
            transactionalEntityManager,
            contract,
            cardId,
            distribution
          );
          console.log("Uploading distribution...Done");
        }
        if (photos.length > 0) {
          console.log("Uploading photos...");
          let myphotos: string[] = [];
          try {
            myphotos = await uploadPhotos(contract, cardId, photos);
          } catch (err) {
            console.log("Error uploading photos:", err);
            return { success: false, error: err };
          }
          const distributionPhotos: DistributionPhoto[] = [];
          myphotos
            .sort((a, b) => a.localeCompare(b))
            .forEach((p) => {
              const dp = new DistributionPhoto();
              dp.link = p;
              dp.contract = contract;
              dp.card_id = cardId;
              distributionPhotos.push(dp);
            });
          await transactionalEntityManager
            .getRepository(DistributionPhoto)
            .createQueryBuilder()
            .delete()
            .where("card_id = :id AND contract = :contract", {
              id: cardId,
              contract: contract,
            })
            .execute();
          await transactionalEntityManager
            .getRepository(DistributionPhoto)
            .save(distributionPhotos);
          console.log("Uploading photos...Done");
        }
        return { success: true };
      }
    );
  } catch (err: any) {
    console.log("Something went wrong", err);
    return { success: false, error: err };
  }
}
