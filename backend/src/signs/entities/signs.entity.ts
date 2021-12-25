import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Conversion } from "../../conversion/entities/conversion.entity";


@Entity()
export class Signs {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    sign: string;

    @OneToMany(() => Conversion, Conversion => Conversion.Signs)
    Conversion: Conversion[];
}