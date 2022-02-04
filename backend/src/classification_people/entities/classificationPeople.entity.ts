import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { Person } from "../../person/entities/person.entity";

@Entity({ name :"classification_people" })
export class classificationPeople {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string


    @OneToMany(() => KindMovements, KindMovements => KindMovements.classificationPeople)
    KindMovement: KindMovements[];

    @OneToMany(() => Person, Person => Person.classificationPeople)
    persons: Person[];
}