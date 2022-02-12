import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entities/users.entity";
import { Permission } from "./permission.entity";


/* Relacion mucho a muchos permission - user */

@Entity()
export class PermissionUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(()=> Users, user => user.PermissionUser)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column()
    user_id: number


    @ManyToOne(()=> Permission, Permission => Permission.PermissionUser)
    @JoinColumn({ name: 'permission_id' })
    Permission: Permission;

    @Column()
    permission_id: number
}