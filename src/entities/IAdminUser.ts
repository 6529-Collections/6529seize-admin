import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

const bcrypt = require("bcrypt");

@Entity({ name: "admin_user" })
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50, unique: true })
  email!: string;

  @Column({ type: "text" })
  password!: string;

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
