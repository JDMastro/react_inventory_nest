import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Person } from "../../person/entities/person.entity";
import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { Movements } from "../../movements/entities/movements.entity";



@Entity()
export class Header {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Person, Person => Person.Headers)
    @JoinColumn({ name: 'person_id' })
    Person: Person;

    @Column()
    person_id: number

    @Column()
    number_order: string

    @ManyToOne(() => KindMovements, KindMovements => KindMovements.Header)
    @JoinColumn({ name: 'kind_movements_id' })
    KindMovements: KindMovements;

    @Column()
    kind_movements_id: number

    @Column()
    observation: string

    @Column({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAt: Date;

    @Column("timestamp", { precision: 3, default: () => "CURRENT_TIMESTAMP(3)", onUpdate: "CURRENT_TIMESTAMP(3)" })
    updateAt: Date;

    @Column({ name: 'delete_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    deleteAt: Date;


    @OneToMany(() => Movements, Movements => Movements.Header)
    Movements: Movements[];

}