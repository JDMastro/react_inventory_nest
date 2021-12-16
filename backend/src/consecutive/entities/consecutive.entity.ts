import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";


@Entity()
@Unique("idx_consecutive",["prefix"])
export class Consecutive {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name : string

    @Column()
    description : string

    @Column()
    prefix : string

    @Column({ default : 1 })
    last_inserted : number


    @OneToMany(() => KindMovements, KindMovements => KindMovements.Consecutive)
    KindMovements: KindMovements[];
}