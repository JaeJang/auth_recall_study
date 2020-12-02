import { compare } from "bcrypt";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("user")
export default class User {
  @PrimaryGeneratedColumn() id!: number;

  @Column("text", { nullable: false, unique: true }) email!: string;

  @Column("text", { nullable: false }) password!: string;

  @Column("text", { nullable: false }) salt!: string;

  @Column("text", { nullable: true }) name!: string;

  @CreateDateColumn({ type: "timestamp" }) createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" }) updatedAt!: Date;

  matchesPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
