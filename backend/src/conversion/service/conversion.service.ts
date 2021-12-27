import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversion } from "../entities/conversion.entity";
import { ConversionDto } from "../dto/conversion.dto";
import { Signs } from "../../signs/entities/signs.entity";
import { Units } from "../../units/entities/units.entity";

@Injectable()
export class ConversionService {
    constructor(
        @InjectRepository(Conversion) private _conversionRepo: Repository<Conversion>,
    ) { }

    async findAll() {
        return  await getManager().createQueryBuilder("conversion","c")
        .select(["c.id", "c.conversion_from", "u.code as code_from", "c.conversion_to", "u2.code as code_to", "c.conversion_quatity", "c.signs_id", "s.sign"])
          .innerJoin(Signs, "s", "s.id = c.signs_id")
          .innerJoin(Units, "u", "c.conversion_from = u.id")
          .innerJoin(Units, "u2", "c.conversion_to = u2.id")
          .getRawMany()
    }

    async getOperation(from : number, to : number){
        return await getManager().createQueryBuilder("conversion","c")
                   .select(["c.conversion_quatity", "s.sign"])
                   .innerJoin(Signs, "s", "c.signs_id = s.id")
                   .where("c.conversion_from = :from and c.conversion_to = :to", { from, to })
                   .getRawOne()
    }

    async create(body : ConversionDto){
        const { conversion_from, conversion_quatity, conversion_to, signs_id } = body
        return await this._conversionRepo.save({ conversion_from, conversion_quatity, conversion_to, signs_id })
    }

    async update(id: number, body: ConversionDto)
    {
        const { conversion_from, conversion_quatity, conversion_to, signs_id } = body
        const conversion = await this._conversionRepo.findOne(id)

        await this._conversionRepo.merge(conversion,{
            conversion_from, 
            conversion_quatity, 
            conversion_to, 
            signs_id
        })

        return await this._conversionRepo.save(conversion)
    }

    async delete(id : number)
    {
        await this._conversionRepo.delete(id)
        return true
    }


}