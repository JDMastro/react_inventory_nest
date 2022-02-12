import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { Permission } from "../entities/permission.entity";
import { Users } from "../../users/entities/users.entity";
import { UsersService } from "../../users/service/users.service";
import { PermissionUser } from "../entities/permission_user.entity";
import { IsNull } from "typeorm";

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private _permissionRepo: Repository<Permission>,
        @InjectRepository(PermissionUser) private _permissionUserRepo: Repository<PermissionUser>,
        private _usersService: UsersService
    ) { }

    async findAll(user_id: number, page: number, perPage: number) {
        /*const data = await getManager().createQueryBuilder("permission", "p")
            .select(["puu.user_id as user_id",
                "case when puu.user_id is null then false else true end checking",
                "p.id  as id",
                "p.module",
                "p.submodule",
                "p.permission"])
            .leftJoin(PermissionUser, "puu", "p.id = puu.permission_id")
            .leftJoin(Users, "u", "puu.user_id = u.id")
            .where('puu.user_id = :user_id', { user_id })
            .andWhere("puu.user_id = :user", { user : null })
            .orderBy("p.module, p.submodule", "ASC")
            .offset((page - 1) * perPage)
            .limit(perPage)*/

        const data = await getManager().createQueryBuilder("permission", "p")
            .select(["p.description as description", "p.id as id", "concat(p.module,'/', p.submodule,'/' ,p.permission) as fullmodule",
                "pu.user_id", "case when  pu.user_id is null then false else true end checking"])
            .distinct(true)
            .leftJoin(PermissionUser, "pu", `pu.permission_id = p.id and pu.user_id = ${user_id}`)
            .orderBy("fullmodule", "ASC")
            .offset((page - 1) * perPage)
            .limit(perPage)


        const total = await data.getCount()
        return {
            data: await data.getRawMany(),
            total,
            page_count: perPage,
            current_page: page,
            last_page: Math.ceil(total / perPage)
        }

    }

    async getLastUpdated(permission_id: number, user_id) {


        /*return await getManager().createQueryBuilder("permission", "p")
            .select(["puu.user_id as user_id",
                "case when puu.user_id is null then false else true end checking",
                "p.id  as id",
                "p.module",
                "p.submodule",
                "p.permission"])
            .leftJoin(PermissionUser, "puu", "p.id = puu.permission_id")
            .leftJoin(Users, "u", "puu.user_id = u.id ")
            .where("p.id = :permission_id", { permission_id })
            .orWhere("p.id = :id", { id: null })
            .andWhere("puu.user_id  = :user_id", { user_id })
            .getRawOne()*/

            return await getManager().createQueryBuilder("permission", "p")
            .select(["p.id as id", "concat(p.module,'/', p.submodule,'/' ,p.permission) as fullmodule",
                "pu.user_id", "case when  pu.user_id is null then false else true end checking"])
            .distinct(true)
            .leftJoin(PermissionUser, "pu", `pu.permission_id = p.id and pu.user_id = ${user_id}`)
            .where("p.id = :permission_id", {permission_id})
            .getRawOne()

        //return 
    }

    async createOrDeletePermission({ checking, user_id, permission_id }: any) {
        //const user = await this._usersService.findUserById(user_id)
        //const permission = await this._permissionRepo.findOne({ where :{ id: permission_id } })

        if (!checking) {
            await this._permissionUserRepo.save({ user_id, permission_id })

        } else {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(PermissionUser)
                .where("user_id = :user_id", { user_id })
                .andWhere("permission_id = :permission_id", { permission_id })
                .execute()
        }

        return { data: await this.getLastUpdated(permission_id, user_id) }
    }


}
