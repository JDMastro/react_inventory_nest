import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { Person } from "../../person/entities/person.entity";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string


    @OneToMany(() => KindMovements, KindMovements => KindMovements.Roles)
    KindMovement: KindMovements[];

    @OneToMany(() => Person, Person => Person.Roles)
    persons: Person[];
}