import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientManufacturer } from "../entities/clientManufacturer.entity";
import { Person } from "../../person/entities/person.entity";

@Injectable()
export class ClientManufacturerService {
    constructor(
        @InjectRepository(ClientManufacturer) private _clientManufacturer: Repository<ClientManufacturer>,
    ) { }

    async findByManufactureId(manufacurer_id : number, page: number, perPage: number)
    {

        const data = await getManager().createQueryBuilder("person", "p")
        .select(['p.fullname', 'case when  aux.cm_client_id is null then false else true end checking', 'p.id as id'])
        .distinct(true)
        .leftJoinAndSelect(
            subQuery => {
                return subQuery.from("client_manufacturer","cm")
                    .select(["cm.client_id", "cm.id"])
                    .innerJoin(Person,'p1',`cm.client_id = p1.id and cm.manufacturer_id = ${manufacurer_id}`)
        },'aux','aux.cm_client_id = p.id')
        .where("p.classificationpeople_id =2")
        .andWhere("p.actived")
        .offset((page - 1) * perPage)
        .limit(perPage)

        const total = await data.getCount()
        return {
            data: await data.getRawMany(),
            total,
            page_count: perPage,
            current_page: page,
            last_page: Math.ceil(total / perPage)
        }
    }

    async getLastInserted(clientmanufacturer_id : number, manufacurer_id : number)
    {
       return await getManager().createQueryBuilder("person", "p")
       .select(['p.fullname', 'case when  aux.cm_client_id is null then false else true end checking', 'p.id as id'])
       .distinct(true)
       .leftJoinAndSelect(
           subQuery => {
               return subQuery.from("client_manufacturer","cm")
                   .select(["cm.client_id", "cm.id"])
                   .innerJoin(Person,'p1',`cm.client_id = p1.id and cm.manufacturer_id = ${manufacurer_id}`)
       },'aux','aux.cm_client_id = p.id')
       .where("p.classificationpeople_id =2")
       .andWhere("p.id = :clientmanufacturer_id",{ clientmanufacturer_id })
       .getRawOne()
    }

    async createdOrDelete(id: any, client_id : number, manufacturer_id: number)
    {
        if(id){
          await this._clientManufacturer.delete(id)
          return { success : true, data : await this.getLastInserted(client_id, manufacturer_id) }
        }
        else{
           await this._clientManufacturer.save({ client_id, manufacturer_id })
           return { success : true, data : await this.getLastInserted(client_id, manufacturer_id) }
         }
        
    }

    async findUsersByClientManufacture(id : number){
        return await getManager().createQueryBuilder("client_manufacturer", "cm")
              .select(["p.id as id", "p.fullname"])
              .innerJoin(Person, "p", "p.id = cm.client_id")
              .where("cm.manufacturer_id = :id", { id })
              .andWhere("p.actived = true")
              .getRawMany()
    }
}
