import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "distribution" })
export class Distribution extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at!: Date;

  @PrimaryColumn({ type: "int" })
  card_id!: number;

  @PrimaryColumn({ type: "varchar", length: 50 })
  contract!: string;

  @PrimaryColumn({ type: "varchar", length: 50 })
  phase!: string;

  @PrimaryColumn({ type: "varchar", length: 50 })
  wallet!: string;

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

  @Column("text")
  link!: string;
}
