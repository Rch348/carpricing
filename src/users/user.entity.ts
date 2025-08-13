import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

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
  // @Exclude() // Décorateur pour exclure une propriété d'une entité > pas nécessaire avec un intercepteur personnalisé.
  password: string;

  // Hook decorator : ici, sont exécutés après un certain événement.
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }

  @AfterUpdate()
  logUpdte() {
    console.log('Updated User with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id: ', this.id);
  }
}
