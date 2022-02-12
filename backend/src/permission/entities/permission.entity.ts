import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
//import { Users } from "../../users/entities/users.entity";
import { PermissionUser } from "./permission_user.entity";


@Entity()
export class Permission {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    module: string

    @Column()
    submodule: string

    @Column()
    permission: string

    @Column({ nullable : true })
    description: string

    @ManyToMany(() => PermissionUser, PermissionUser => PermissionUser.Permission)
    PermissionUser: PermissionUser[];
  
    

    //@ManyToMany(() => Users, Users => Users.Permissions)
    //@JoinTable()
    //users: Users[];
}