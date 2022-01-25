import { Injectable } from '@nestjs/common';
import { Settings } from "../entities/settings.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings) private _settingsRepo: Repository<Settings>,
    ) { }

    async findByKey(key : string)
    {
        return await this._settingsRepo.findOne({ key })
    }

    async findAll()
    {
        return await this._settingsRepo.find({ order : { key : "ASC" } })
    }

    async update(id: number, body : any)
    {
        const { value, description } = body
        const settings = await this._settingsRepo.findOne(id)
        await this._settingsRepo.merge(settings,{
            value,
            description
        })
        return await this._settingsRepo.save(settings)
    }
}
