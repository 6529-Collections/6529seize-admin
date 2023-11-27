import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ValidationError } from "adminjs";
import { CARD_ROYALTIES } from "./card_royalties";

@Entity({ name: "meme_lab_royalties" })
export class MemeLabRoyalty extends BaseEntity {
  @PrimaryColumn({ type: "int" })
  token_id!: number;

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

export function getSplitForCard(id: number): {
  primary_split: number;
  secondary_split: number;
} {
  const cardEntry = CARD_ROYALTIES.find((c) => c.id === id);
  return {
    primary_split: cardEntry?.primary_royalty ?? 0,
    secondary_split: cardEntry?.secondary_royalty ?? 0,
  };
}
