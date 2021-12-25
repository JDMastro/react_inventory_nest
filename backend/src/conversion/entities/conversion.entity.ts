import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { Units } from "../../units/entities/units.entity";
import { Signs } from "../../signs/entities/signs.entity";

@Entity()
@Unique("idx_conversion", ["conversion_from","conversion_to"])
export class Conversion {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Units, Units => Units.Conversion)
    @JoinColumn({ name: 'conversion_from' })
    Units: Units;

    @Column()
    conversion_from: number

    @ManyToOne(() => Units, Units => Units.Conversion)
    @JoinColumn({ name: 'conversion_to' })
    Units_: Units;

    @Column()
    conversion_to: number


    @Column()
    conversion_quatity: number

    @ManyToOne(() => Signs, Signs => Signs.Conversion)
    @JoinColumn({ name: 'signs_id' })
    Signs: Signs;

    @Column()
    signs_id: number






}