import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique("idx_settings", ["key"])
export class Settings {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    description: string

    @Column()
    key: string

    @Column()
    value: string
}