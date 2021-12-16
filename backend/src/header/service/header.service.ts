import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from "../entities/header.entity";
import { HeaderDto } from "../dto/header.dto";

@Injectable()
export class HeaderService {
    constructor(
        @InjectRepository(Header) private _headerRepo: Repository<Header>,
    ) { }


    async create(body : HeaderDto){
        const { kind_movements_id, number_order, observation, person_id } = body
        return await this._headerRepo.save({ kind_movements_id, number_order, observation, person_id  })
    }

}
