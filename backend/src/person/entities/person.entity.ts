import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Kindidentity } from "../../kindidentity/entities/kindidentity.entity";
import { Users } from "../../users/entities/users.entity";
import { Header } from "../../header/entities/header.entity";
import { Roles } from "../../roles/entities/roles.entity";

@Entity()
@Unique("idx_person", ["phone", "idnumber"])
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Kindidentity, Kindidentity => Kindidentity.Person)
  @JoinColumn({ name: 'kind_id' })
  Kindidentity: Kindidentity;

  @Column({ width: 15, type: "numeric" })
  @Column()
  kind_id: number

  @Column()
  idnumber: string

  @Column()
  name: string

  @Column({ nullable: true })
  second_name: string

  @Column()
  first_surname: string

  @Column({ nullable: true })
  second_surname: string

  @Column()
  fullname: string

  @Column()
  address: string

  @Column()
  phone: string

  @Column()
  contact: string

  //@Column({ default: false })
  //provider: boolean

  @Column({ default: true })
  status: boolean

  @Column()
  user_id: number

  //@Column({ default: false })
 // is_employee: boolean

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

  @OneToOne(() => Users, Users => Users.person)
  Users: Users;

  @OneToMany(() => Header, Header => Header.Person)
  Headers: Header[];


  @ManyToOne(() => Roles, Roles => Roles.persons)
  @JoinColumn({ name: 'roles_id' })
  Roles: Roles;

  @Column()
  roles_id: number

}