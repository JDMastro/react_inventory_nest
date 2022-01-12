import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Header } from "../entities/header.entity";
import { HeaderDto } from "../dto/header.dto";
import { Person } from "../../person/entities/person.entity";
import { Movements } from "../../movements/entities/movements.entity";

@Injectable()
export class HeaderService {
    constructor(
        @InjectRepository(Header) private _headerRepo: Repository<Header>,
    ) { }


    async findById(id:number)
    {
        return await this._headerRepo.findOne(id)
    }


    async findByOrderNumber(order_number)
    {
        return await this._headerRepo.findOne({ number_order : order_number })
    }

    async findByPersonId(person_id : number)
    {
        return await getManager().createQueryBuilder("header",'h')
                .select(["h.number_order", "h.id"])
                .innerJoin(Person, "p","h.person_id = p.id ")
                .innerJoin(Movements, "m","m.header_id = h.id")
                .where("p.id = :person_id", { person_id })
                .groupBy("h.id")
                .addGroupBy("h.number_order")
                .getRawMany()
                
    }


    async create(body : HeaderDto){
        const { kind_movements_id, number_order, observation, person_id } = body
        return await this._headerRepo.save({ kind_movements_id, number_order, observation, person_id  })
    }

    

}
