import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Kindidentity } from "../entities/kindidentity.entity";
import { kindidentityDto } from "../dto/kindidentity.dto";

@Injectable()
export class kindidentityService {
    constructor(
        @InjectRepository(Kindidentity) private _kindidentityRepo: Repository<Kindidentity>,
    ) { }

    async findAll() {
        return await this._kindidentityRepo.find({ order : { code : 'ASC' } });
    }

    async findAllWithPagination(page : number, perPage : number)
    {
        const data = await this._kindidentityRepo.find({ skip : (page - 1) * perPage, take : perPage })

        const total = await this._kindidentityRepo.count()

        return {
            data : data,
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
                                        
    }

    async findByCode(code : string)
    {
        return await this._kindidentityRepo.findOne({ where : { code } })
    }

    async create(body : kindidentityDto){
        const { description, code } = body
        return await this._kindidentityRepo.save({ code, description })
    }

    async update(id: number, body: kindidentityDto)
    {
        const { description, code } = body
        const unit = await this._kindidentityRepo.findOne(id)

        await this._kindidentityRepo.merge(unit,{
            code,
            description
        })

        return await this._kindidentityRepo.save(unit)
    }

    async delete(id : number)
    {
        await this._kindidentityRepo.delete(id)
        return true
    }
}
