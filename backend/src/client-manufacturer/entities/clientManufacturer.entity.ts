import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from "../../person/entities/person.entity";

@Entity()
export class ClientManufacturer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Person, Person => Person.ClientManufacturer)
    @JoinColumn({ name: 'manufacturer_id' })
    Manufacturer: Person;

    @Column()
    manufacturer_id: number

    @ManyToOne(() => Person, Person => Person.ClientManufacturer)
    @JoinColumn({ name: 'client_id' })
    Client: Person;

    @Column()
    client_id: number
}