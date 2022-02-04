import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from "../entities/roles.entity";
import { rolesDto } from "../dto/roles.dto";


@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles) private _rolesRepo: Repository<Roles>,
    ) { }

    async findAll(page : number, perPage : number) {
        const data = await this._rolesRepo.find({ skip : (page - 1) * perPage, take : perPage })

        const total = await this._rolesRepo.count()

        return {
            data : data,
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async getLastInserted(id: number){
        return await this._rolesRepo.findOne(id)
    }

    async checkName(name : string)
    {
        return await this._rolesRepo.findOne({ where : { name } })
    }

    async create(body : rolesDto){
        const { name } = body

        const save = await this._rolesRepo.save({ name })

        return await this.getLastInserted(save.id)
    }

    async update(id: number, body: rolesDto)
    {
        const { name } = body
        const rol = await this._rolesRepo.findOne(id)
        await this._rolesRepo.merge(rol,{ name })
        const saved = await this._rolesRepo.save(rol)
        return await this.getLastInserted(saved.id)
    }

    async delete(id : number)
    {
        await this._rolesRepo.delete(id)
        return true
    }
}
