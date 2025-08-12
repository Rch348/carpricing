import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Création de l'entité et de ses propriétés.
// @Entity() : dit à au typeORM de regarder cette classe et de créer une nouvelle table si nécessaire pour modéliser cette classe ou plutôt une collection d'instances de Users.
@Entity()
export class User {
  // Après @Entity, @PrimaryGeneratedColumn est lu par typeORM, lui permettant d'ajouter une nouvelle colonne dans la table Users (id).
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
}
