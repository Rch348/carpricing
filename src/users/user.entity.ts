import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Création de l'entité et de ses propriétés.
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}