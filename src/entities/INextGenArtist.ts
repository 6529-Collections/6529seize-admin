import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "nextgen_artists" })
export class NextGenArtist extends BaseEntity {
  @CreateDateColumn({ type: "datetime" })
  created_at?: Date;

  @UpdateDateColumn({ type: "datetime" })
  updated_at?: Date;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name!: string;

  @Column("json")
  collections!: number[];

  @Column({ type: "text" })
  bio!: string;

  @Column({ type: "text" })
  pfp!: string;

  @Column({ type: "text", nullable: true })
  x_link?: string;

  @Column({ type: "text", nullable: true })
  instagram_link?: string;

  @Column({ type: "text", nullable: true })
  discord_handle?: string;
}
