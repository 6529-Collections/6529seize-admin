import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
  Index,
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

  @Column({ type: "int" })
  count!: number;

  @Column({ type: "int", default: 0 })
  mint_count!: number;
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
