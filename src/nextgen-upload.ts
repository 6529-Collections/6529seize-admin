import { DataSource, EntityManager } from "typeorm";
import { NextGenAllowlist, NextGenCollection } from "./entities/INextGen";
const { keccak256 } = require("@ethersproject/keccak256");
const { MerkleTree } = require("merkletreejs");

const fs = require("fs");
const csv = require("csv-parser");

interface UploadAllowlist {
  address: string;
  spots: number;
  info: string;
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
      info: data[2],
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

function stringToHex(s: string) {
  let hexString = "";
  for (let i = 0; i < s.length; i++) {
    const hex = s.charCodeAt(i).toString(16);
    hexString += hex;
  }
  return hexString;
}

async function computeMerkle(allowlist: UploadAllowlist[]): Promise<any> {
  const processedAllowlist = allowlist.map((al) => {
    const parsedAddress = al.address.startsWith("0x")
      ? al.address.slice(2)
      : al.address;
    const spots = al.spots;
    const parsedSpots = spots.toString().padStart(64, "0");
    const info = al.info;
    const parsedInfo = stringToHex(info);
    const concatenatedData = `${parsedAddress}${parsedSpots}${parsedInfo}`;
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
    merkle_root: merkleTree.getHexRoot(),
    merkle_tree: merkleTree,
    allowlist: processedAllowlist,
  };
}

async function persistAllowlist(
  transactionalEntityManager: EntityManager,
  merkle: {
    merkle_root: string;
    merkle_tree: any;
    allowlist: any[];
  }
): Promise<void> {
  const allowlistData: NextGenAllowlist[] = merkle.allowlist.map((entry) => {
    const al = new NextGenAllowlist();
    al.address = entry.address;
    al.spots = entry.spots;
    al.info = entry.info;
    al.keccak = entry.keccak;
    al.merkle_root = merkle.merkle_root;
    return al;
  });

  const collection = new NextGenCollection();
  collection.merkle_root = merkle.merkle_root;
  collection.merkle_tree = JSON.stringify(merkle.merkle_tree);

  await transactionalEntityManager.save(allowlistData);
  await transactionalEntityManager.save(collection);

  console.log(
    `[NEXTGEN ALLOWLIST]`,
    `[Allowlist persisted]`,
    `[MERKLE ROOT ${merkle.merkle_root}]`
  );
}

export async function uploadNextGenAllowlist(
  source: DataSource,
  allowlistFile: any
): Promise<{ success: boolean; merkle_root?: string; error?: any }> {
  try {
    return await source.manager.transaction(
      async (transactionalEntityManager) => {
        const allowlist = await readAllowlist(allowlistFile);
        console.log(
          `[NEXTGEN ALLOWLIST]`,
          `[Uploading ${allowlist.length} items]`
        );
        const merkle = await computeMerkle(allowlist);
        await persistAllowlist(transactionalEntityManager, merkle);

        return { success: true, merkle_root: merkle.merkle_root };
      }
    );
  } catch (err: any) {
    console.log(`[NEXTGEN ALLOWLIST]`, `[Something went wrong ${err}]`);
    return { success: false, error: err };
  }
}
