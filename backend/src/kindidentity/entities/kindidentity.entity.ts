import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Person } from "../../person/entities/person.entity";

@Entity()
@Unique("idx_des_kind",["code"])
export class Kindidentity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  code: string;

  @OneToMany(() => Person, Person => Person.Kindidentity )
  Person: Person[];
 
}