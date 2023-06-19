import { DataSource, EntityManager } from "typeorm";
import { Distribution, DistributionPhoto } from "./entities/IDistribution";
import { uploadPhotos } from "./s3";

const fs = require("fs");
const csv = require("csv-parser");

async function uploadDistributionFile(
  transactionalEntityManager: EntityManager,
  contract: string,
  cardId: number,
  snapshotBlock: number,
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

  const tdhBlockResult = await transactionalEntityManager.query(
    `SELECT block_number FROM tdh_blocks WHERE block_number < ${snapshotBlock} ORDER BY block_number DESC LIMIT 1;`
  );
  const tdhBlock = tdhBlockResult[0].block_number;

  const tdhResult: {
    wallet: string;
    boosted_tdh: number;
    memes_balance: number;
    unique_memes: number;
    gradients_balance: number;
  }[] = await transactionalEntityManager.query(
    `SELECT wallet, boosted_tdh, memes_balance, unique_memes, gradients_balance FROM tdh WHERE block = ${tdhBlock};`
  );

  distributions.map((d) => {
    const tdh = tdhResult.find(
      (r) => d.wallet.toUpperCase() == r.wallet.toUpperCase()
    );
    if (tdh) {
      d.wallet_tdh = tdh.boosted_tdh;
      d.wallet_balance = tdh.memes_balance + tdh.gradients_balance;
      d.wallet_unique_balance = tdh.unique_memes + tdh.gradients_balance;
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
  snapshotBlock: number,
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
            snapshotBlock,
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
