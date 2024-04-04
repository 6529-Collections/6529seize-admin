import { DataSource, EntityManager } from "typeorm";
import {
  Distribution,
  DistributionNormalized,
  AllowlistNormalizedEntry,
  DistributionPhoto,
} from "./entities/IDistribution";
import { uploadPhotos } from "./s3";
import { MEMELAB_CONTRACT } from "./constans";

const fs = require("fs");
const csv = require("csv-parser");

async function uploadDistributionFile(
  manager: EntityManager,
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

  const tdhResult: {
    wallets: string[];
    boosted_tdh: number;
    memes_balance: number;
    unique_memes: number;
    gradients_balance: number;
  }[] = await manager.query(
    `SELECT wallets, boosted_tdh, memes_balance, unique_memes, gradients_balance FROM tdh_consolidation;`
  );

  const distributionsNormalized = new Map<string, DistributionNormalized>();

  for (const d of distributions) {
    const tdh = tdhResult.find((r) =>
      JSON.parse(r.wallets as any).some(
        (w: string) => d.wallet.toUpperCase() == w.toUpperCase()
      )
    );

    if (tdh) {
      d.wallet_tdh = tdh.boosted_tdh;
      d.wallet_balance = tdh.memes_balance + tdh.gradients_balance;
      d.wallet_unique_balance = tdh.unique_memes + tdh.gradients_balance;
    }

    const key = d.wallet.toLowerCase();
    let dn = distributionsNormalized.get(key);
    if (!dn) {
      const ens = await manager.query(
        `SELECT display FROM ens WHERE wallet = '${d.wallet}'`
      );
      const nftsTable =
        d.contract.toLowerCase() === MEMELAB_CONTRACT.toLowerCase()
          ? "nfts_meme_lab"
          : "nfts";
      const nft = await manager.query(
        `SELECT * FROM ${nftsTable} WHERE id = '${d.card_id}'`
      );
      dn = new DistributionNormalized();
      dn.contract = contract;
      dn.card_id = cardId;
      dn.card_name = nft[0]?.name ?? null;
      dn.mint_date = nft[0]?.mint_date ?? null;
      dn.wallet = d.wallet;
      dn.wallet_display = ens[0]?.display ?? d.wallet;
      dn.allowlist = [];
      dn.phases = [];
      dn.minted = 0;
      dn.airdrops = 0;
      dn.total_spots = 0;
      dn.total_count = 0;
    }

    if (d.phase === "Airdrop") {
      dn.airdrops += d.count;
      dn.total_count += d.count;
    } else {
      const dPhase: AllowlistNormalizedEntry = {
        phase: d.phase,
        spots: d.count,
      };
      dn.allowlist.push(dPhase);
      dn.total_spots += d.count;
    }
    dn.phases.push(d.phase);
    distributionsNormalized.set(key, dn);
  }

  await manager
    .createQueryBuilder()
    .delete()
    .from(Distribution)
    .where("card_id = :id AND contract = :contract", {
      id: cardId,
      contract: contract,
    })
    .execute();

  await manager
    .createQueryBuilder()
    .delete()
    .from(DistributionNormalized)
    .where("card_id = :id AND contract = :contract", {
      id: cardId,
      contract: contract,
    })
    .execute();

  await manager.save(distributions);
  await manager.save(Array.from(distributionsNormalized.values()));
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
    return await source.manager.transaction(async (manager) => {
      if (distribution) {
        console.log("Uploading distribution...");
        await uploadDistributionFile(
          manager,
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
        myphotos.sort((a, b) => a.localeCompare(b));
        myphotos.forEach((p) => {
          const dp = new DistributionPhoto();
          dp.link = p;
          dp.contract = contract;
          dp.card_id = cardId;
          distributionPhotos.push(dp);
        });
        await manager
          .getRepository(DistributionPhoto)
          .createQueryBuilder()
          .delete()
          .where("card_id = :id AND contract = :contract", {
            id: cardId,
            contract: contract,
          })
          .execute();
        await manager.getRepository(DistributionPhoto).save(distributionPhotos);
        console.log("Uploading photos...Done");
      }
      return { success: true };
    });
  } catch (err: any) {
    console.log("Something went wrong", err);
    return { success: false, error: err };
  }
}
