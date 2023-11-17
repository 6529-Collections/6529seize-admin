import { Entity, BaseEntity, PrimaryColumn, Column } from "typeorm";
import { ValidationError } from "adminjs";

@Entity({ name: "meme_lab_royalties" })
export class MemeLabRoyalty extends BaseEntity {
  @PrimaryColumn({ type: "int" })
  token_id!: number;

  @Column({ type: "float" })
  royalty_split!: number;
}

export function validateRoyalty(royaltySplit: number) {
  if (royaltySplit < 0 || royaltySplit > 1) {
    throw new ValidationError(
      {
        royalty_split: {
          message: "Royalty split must be between 0 and 1.",
        },
      },
      {
        message: "Invalid royalty split value",
      }
    );
  }
}
