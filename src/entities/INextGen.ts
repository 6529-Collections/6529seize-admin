import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  PrimaryColumn,
  Column,
} from "typeorm";

@Entity({ name: "next_gen_allowlist" })
export class NextGenAllowlist extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @PrimaryColumn({ type: "varchar", length: 100 })
  merkle_root!: string;

  @PrimaryColumn({ type: "varchar", length: 100 })
  address!: string;

  @Column({ type: "int" })
  spots!: number;

  @Column({ type: "text" })
  info!: string;

  @Column({ type: "text" })
  keccak!: string;
}

@Entity({ name: "next_gen_collections" })
export class NextGenCollection extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @PrimaryColumn({ type: "varchar", length: 100 })
  merkle_root!: string;

  @Column({ type: "json" })
  merkle_tree!: string;

  @Column({ type: "int", default: -1 })
  collection_id!: number;

  @Column({ type: "text", nullable: true })
  phase!: string;
}
