import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from "../entities/status.entity";
import { StatusDto } from "../dto/status.dto";

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status) private _statusRepo: Repository<Status>,
    ) { }

    async findAll() {
        return await this._statusRepo.find();
    }

    async findByCode (code:string)
    {
        return await this._statusRepo.findOne({ code })
    }

    async create(body : StatusDto){
        const { description, code, name } = body
        return await this._statusRepo.save({ code, description, name })
    }

    async update(id: number, body: StatusDto)
    {
        const { description, code, name } = body
        const statu = await this._statusRepo.findOne(id)

        await this._statusRepo.merge(statu,{
            code,
            description,
            name
        })

        return await this._statusRepo.save(statu)
    }

    async delete(id : number)
    {
        await this._statusRepo.delete(id)
        return true
    }
}
