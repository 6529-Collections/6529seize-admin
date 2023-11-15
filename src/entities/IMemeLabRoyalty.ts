import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Min, Max } from "class-validator";
import { ValidationError } from "adminjs";

@Entity({ name: "meme_lab_royalties" })
export class MemeLabRoyalty extends BaseEntity {
  @PrimaryColumn({ type: "int" })
  token_id!: number;

  @Column({ type: "float" })
  royalty!: number;
}

export function validateRoyalty(royalty: number) {
  if (royalty < 0 || royalty > 1) {
    throw new ValidationError(
      {
        royalty: {
          message: "Royalty must be between 0 and 1.",
        },
      },
      {
        message: "Invalid royalty value",
      }
    );
  }
}
