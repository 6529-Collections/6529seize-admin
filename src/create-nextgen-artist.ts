import { DataSource } from "typeorm";
import { uploadPfp } from "./s3";
import { NextGenArtist } from "./entities/INextGenArtist";

export async function createNextGenArtist(
  source: DataSource,
  name: string,
  collectionId: number,
  bio: string,
  pfp: any,
  xLink: string,
  igLink: string,
  discordHandle: string
): Promise<{ success: boolean; error?: any; artist?: NextGenArtist }> {
  try {
    return await source.manager.transaction(async (manager) => {
      console.log("Uploading distribution...");
      const mypfp = await uploadPfp(pfp);

      const artistRepo = manager.getRepository(NextGenArtist);
      const artist = new NextGenArtist();
      artist.name = name;
      artist.collections = [collectionId];
      artist.bio = bio;
      artist.pfp = mypfp;
      artist.x_link = xLink;
      artist.instagram_link = igLink;
      artist.discord_handle = discordHandle;
      const createdArtist = await artistRepo.save(artist);
      return { success: true, artist: createdArtist };
    });
  } catch (err: any) {
    console.log("Something went wrong while creating nextgen artist", err);
    return { success: false, error: err };
  }
}
