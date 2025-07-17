import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
  Index,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "distribution" })
@Index(["wallet", "phase", "card_id", "contract"], { unique: true })
export class Distribution extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  card_id!: number;

  @Column({ type: "varchar", length: 50 })
  contract!: string;

  @Column({ type: "varchar", length: 50 })
  phase!: string;

  @Column({ type: "varchar", length: 50 })
  wallet!: string;

  @Column({ type: "int", default: 0 })
  wallet_tdh!: number;

  @Column({ type: "int", default: 0 })
  wallet_balance!: number;

  @Column({ type: "int", default: 0 })
  wallet_unique_balance!: number;

  @Column({ type: "int" })
  count!: number;
}

@Entity({ name: "distribution_photo" })
export class DistributionPhoto extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  card_id!: number;

  @Column({ type: "varchar", length: 50 })
  contract!: string;

  @Column({ type: "text" })
  link!: string;
}

export interface AllowlistNormalizedEntry {
  phase: string;
  spots: number;
}

@Entity({ name: "distribution_normalized" })
@Index("idx_wallet_contract_cardid", ["wallet", "contract", "card_id"])
@Index("idx_cardname", ["card_name", "contract", "card_id"])
@Index("idx_mintdate", ["mint_date", "contract", "card_id"])
@Index("idx_contract_cardid", ["contract", "card_id"])
@Index("idx_missing_info", ["is_missing_info", "contract", "card_id"])
export class DistributionNormalized {
  @PrimaryColumn({ type: "bigint" })
  card_id!: number;

  @PrimaryColumn({ type: "varchar", length: 50 })
  contract!: string;

  @PrimaryColumn({ type: "varchar", length: 50 })
  wallet!: string;

  @Column({ type: "text" })
  wallet_display!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  card_name!: string;

  @Column({ type: "timestamp", nullable: true })
  mint_date!: Date;

  @Column({ type: "int" })
  airdrops!: number;

  @Column({ type: "int" })
  total_spots!: number;

  @Column({ type: "int" })
  total_count!: number;

  @Column({ type: "int" })
  minted!: number;

  @Column({ type: "json", nullable: true })
  allowlist!: AllowlistNormalizedEntry[];

  @Column({ type: "json", nullable: true })
  phases!: string[];

  @Column({
    type: "tinyint",
    name: "is_missing_info",
    insert: false,
    update: false,
  })
  is_missing_info!: boolean;
}
