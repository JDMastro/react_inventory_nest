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
}
