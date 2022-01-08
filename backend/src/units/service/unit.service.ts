import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Units } from "../entities/units.entity";
import { UnitsDto } from "../dto/units.dto";

@Injectable()
export class UnitsService {
    constructor(
        @InjectRepository(Units) private _unitsRepo: Repository<Units>,
    ) { }

    async findAll() {
        return await this._unitsRepo.find({ order : { code : 'ASC' } });
    }

    async findByCode(code : string)
    {
        return await this._unitsRepo.findOne({ where : { code } })
    }

    async create(body : UnitsDto){
        const { description, code } = body
        return await this._unitsRepo.save({ code, description })
    }

    async update(id: number, body: UnitsDto)
    {
        const { description, code } = body
        const unit = await this._unitsRepo.findOne(id)

        await this._unitsRepo.merge(unit,{
            code,
            description
        })

        return await this._unitsRepo.save(unit)
    }

    async delete(id : number)
    {
        await this._unitsRepo.delete(id)
        return true
    }
}
