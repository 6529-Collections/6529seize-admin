import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ValidationError } from "adminjs";
import { ARTIST_ROYALTIES } from "./artist_royalties";

@Entity({ name: "meme_lab_royalties" })
export class MemeLabRoyalty extends BaseEntity {
  @PrimaryColumn({ type: "int" })
  token_id!: number;

  @Column({ type: "float" })
  primary_royalty_split!: number;

  @Column({ type: "float" })
  secondary_royalty_split!: number;
}

@Entity({ name: "meme_lab_artist_royalties" })
export class MemeLabArtistRoyalty extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 100 })
  artist!: string;

  @Column({ type: "float" })
  primary_royalty_split!: number;

  @Column({ type: "float" })
  secondary_royalty_split!: number;
}

export function validateRoyalty(primarySplit: number, secondarySplit: number) {
  if (primarySplit < 0 || primarySplit > 1) {
    throw new ValidationError(
      {
        primary_royalty_split: {
          message: "Primary Royalty split must be between 0 and 1.",
        },
      },
      {
        message: "Invalid primary royalty split value",
      }
    );
  }
  if (secondarySplit < 0 || secondarySplit > 1) {
    throw new ValidationError(
      {
        secondary_royalty_split: {
          message: "Secondary Royalty split must be between 0 and 1.",
        },
      },
      {
        message: "Invalid secondary royalty split value",
      }
    );
  }
}

export function getSplitForArtist(artistName: string) {
  const artistEntry = ARTIST_ROYALTIES.find((artist) =>
    artistName.includes(artist.artist)
  );
  return artistEntry
    ? {
        primary_split: artistEntry.primary_royalty,
        secondary_split: artistEntry.secondary_royalty,
      }
    : null;
}
