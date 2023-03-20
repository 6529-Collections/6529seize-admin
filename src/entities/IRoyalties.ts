import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class RoyaltiesUpload extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at?: Date;

  @PrimaryColumn({ type: "date" })
  date!: Date;

  @Column({ type: "text" })
  url!: string;
}
