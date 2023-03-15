import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  Index,
  BaseEntity,
} from "typeorm";

@Entity()
@Index(["date", "contract", "token_id"], { unique: true })
export class Royalties extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at?: Date;

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "date" })
  date!: Date;

  @Column({ type: "varchar", length: 50 })
  contract!: string;

  @Column({ type: "int" })
  token_id!: number;

  @Column({ type: "text" })
  artist!: string;

  @Column({ type: "double" })
  received_royalties!: number;
}
