import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";

@Entity()
export class ClassificationKindMovement {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string

    @OneToMany(() => KindMovements, KindMovements => KindMovements.ClassificationKindMovement)
    KindMovements: KindMovements[];
}