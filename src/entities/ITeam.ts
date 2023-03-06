import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  Column,
} from "typeorm";

@Entity({ name: "team" })
export class Team extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @PrimaryColumn({ type: "varchar", length: 50 })
  wallet!: string;

  @Column({ type: "text" })
  collection!: string;

  @Column({ type: "text" })
  name!: string;
}
