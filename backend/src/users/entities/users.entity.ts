import { Entity, Column, PrimaryGeneratedColumn, Unique, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { Person } from "../../person/entities/person.entity";
import { PermissionUser } from "../../permission/entities/permission_user.entity";

@Entity()
@Unique("idx_users", ["email", "code"])
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

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


  @OneToOne(() => Person, Person => Person.Users )
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column()
  person_id: number

  @Column({ default: true })
  actived : boolean

  @ManyToMany(() => PermissionUser, PermissionUser => PermissionUser.user)
  PermissionUser: PermissionUser[];

  


}