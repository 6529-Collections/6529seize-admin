import { DataSource, EntityManager } from "typeorm";
import { GenMemesAllowlist, GenMemesCollection } from "./entities/IGenMeme";
const { keccak256 } = require("@ethersproject/keccak256");
const { MerkleTree } = require("merkletreejs");

const fs = require("fs");
const csv = require("csv-parser");

interface UploadAllowlist {
  address: string;
  spots: number;
}

async function readAllowlist(allowlistFile: any): Promise<UploadAllowlist[]> {
  const allowlist: UploadAllowlist[] = [];

  const csvStream = fs
    .createReadStream(allowlistFile.path)
    .pipe(csv({ headers: false }));

  csvStream.on("data", (data: any) => {
    allowlist.push({
      address: data[0],
      spots: parseInt(data[1]),
    });
  });

  await new Promise((resolve, reject) => {
    csvStream.on("end", () => {
      resolve(true);
    });
    csvStream.on("error", (err: any) => {
      reject(err);
    });
  });

  return allowlist;
}

async function computeMerkle(allowlist: UploadAllowlist[]): Promise<any> {
  const processedAllowlist = allowlist.map((al) => {
    const parsedAddress = al.address.startsWith("0x")
      ? al.address.slice(2)
      : al.address;
    const spots = al.spots;
    const parsedSpots = spots.toString().padStart(64, "0");
    const concatenatedData = `${parsedAddress}${parsedSpots}`;
    const bufferData = Buffer.from(concatenatedData, "hex");
    const result = keccak256(bufferData).slice(2);

    return {
      ...al,
      keccak: result,
    };
  });

  const leaves = processedAllowlist.map((al) => al.keccak);
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  return {
    root: merkleTree.getHexRoot(),
    tree: merkleTree,
    allowlist: processedAllowlist,
  };
}

async function persistAllowlist(
  transactionalEntityManager: EntityManager,
  merkle: {
    root: string;
    tree: any;
    allowlist: any[];
  }
): Promise<void> {
  const allowlistData: GenMemesAllowlist[] = merkle.allowlist.map((entry) => {
    const al = new GenMemesAllowlist();
    al.address = entry.address;
    al.spots = entry.spots;
    al.keccak = entry.keccak;
    al.merkle_root = merkle.root;
    return al;
  });

  const collection = new GenMemesCollection();
  collection.merkle_root = merkle.root;
  collection.merkle_tree = JSON.stringify(merkle.tree);

  await transactionalEntityManager.save(allowlistData);
  await transactionalEntityManager.save(collection);

  console.log(
    `[GENMEMES ALLOWLIST]`,
    `[Allowlist persisted]`,
    `[MERKLE ROOT ${merkle.root}]`
  );
}

export async function uploadGenMemesAllowlist(
  source: DataSource,
  allowlistFile: any
): Promise<{ success: boolean; merkle_root?: string; error?: any }> {
  try {
    return await source.manager.transaction(
      async (transactionalEntityManager) => {
        const allowlist = await readAllowlist(allowlistFile);
        console.log(
          `[GENMEMES ALLOWLIST]`,
          `[Uploading ${allowlist.length} items]`
        );
        const merkle = await computeMerkle(allowlist);
        await persistAllowlist(transactionalEntityManager, merkle);

        return { success: true, merkle_root: merkle.root };
      }
    );
  } catch (err: any) {
    console.log(`[GENMEMES ALLOWLIST]`, `[Something went wrong ${err}]`);
    return { success: false, error: err };
  }
}
