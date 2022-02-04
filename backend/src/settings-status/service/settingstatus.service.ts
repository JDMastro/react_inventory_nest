import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { SettingStatus } from "../entities/settingStatus.entity";
import { Status } from "../../status/entities/status.entity";

@Injectable()
export class SettingStatusService {
    constructor(
        @InjectRepository(SettingStatus) private _settingStatusRepo: Repository<SettingStatus>,
    ) { }

    async findAll(page: number, perPage: number) {

        const data = await getManager().createQueryBuilder("setting_status", "ss")
            .select(["sp.name", "sc.name", "ss.id as id", "sp.id as status_parent_id", "sc.id as status_child_id"])
            .innerJoin(Status, "sp", "ss.status_parent_id = sp.id")
            .innerJoin(Status, "sc", "ss.status_child_id = sc.id")
            .offset((page - 1) * perPage)
            .limit(perPage)
        const total = await data.getCount()

        return {
            data : await data.getRawMany(),
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async getLastInserted(id : number)
    {
        return await getManager().createQueryBuilder("setting_status", "ss")
        .select(["sp.name", "sc.name", "ss.id as id", "sp.id as status_parent_id", "sc.id as status_child_id"])
        .innerJoin(Status, "sp", "ss.status_parent_id = sp.id")
        .innerJoin(Status, "sc", "ss.status_child_id = sc.id")
        .where("ss.id = :id",{ id })
        .getRawOne()
    }

    async findBystatusParentChild(status_parent_id:number, status_child_id:number)
    {
        return await this._settingStatusRepo.findOne({ where : { status_parent_id, status_child_id } })
    }

    async create(body : any)
    {
        const saved = await this._settingStatusRepo.save({ 
            status_parent_id : body.status_parent_id, 
            status_child_id : body.status_child_id 
        })

        return this.getLastInserted(saved.id)
    }

    async update(id:number, body : any)
    {
        const settingstatu = await this._settingStatusRepo.findOne(id)
        await this._settingStatusRepo.merge(settingstatu,{
            status_parent_id : body.status_parent_id, 
            status_child_id : body.status_child_id 
        })
        const saved = await this._settingStatusRepo.save(settingstatu)
        return this.getLastInserted(saved.id)
    }

    async delete(id: number)
    {
        await this._settingStatusRepo.delete(id)
        return true
    }

    async findStatusbysetting(status_parent_id : number)
    {
        return await getManager().createQueryBuilder("setting_status", "ss")
        .select(["s.name as name", "s.id as id"])
        .innerJoin(Status, "s", "s.id = ss.status_child_id")
        .where("ss.status_parent_id = :status_parent_id",{ status_parent_id })
        .getRawMany()
    }

}
