

import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
@Unique("idx_roles_", ["name"])
export class Roles {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
}