import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from "../entities/status.entity";
import { StatusDto } from "../dto/status.dto";
import { Header } from "../../header/entities/header.entity";
import { Person } from "../../person/entities/person.entity";
import { Products } from "../../products/entities/products.entity";

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

    async getAllNumberOrdersbyStatus(status_id : number, person_id : number)
    {
      return await getManager().createQueryBuilder("movements","m")
      .select(["h.number_order","ps.fullname","sum(m.quantity) as mquantity","h.creation_at"])
          .innerJoin(Header, "h","h.id = m.header_id")
          .innerJoin(Person, "ps","ps.id = h.person_id")
          .innerJoin(Status, "sta","sta.id = m.status_id")
          .where("sta.id = :status_id",{ status_id: status_id })
          .andWhere("ps.id = :person_id",{ person_id :  person_id})
          .groupBy("h.number_order")
          .addGroupBy("ps.fullname")
          .addGroupBy("h.creation_at")
          .getRawMany()
    }

    async getAllnumberOrders(number_orders : number)
    {
      return await getManager().createQueryBuilder("movements","m")
      .select(["h.number_order", "p.name", "m.quantity", "h.creation_at"])
          .innerJoin(Header, "h","h.id = m.header_id")
          .innerJoin(Products, "p","p.id = m.product_id ")
          .where("h.number_order = :number_orders",{ number_orders: number_orders})
          .getRawMany()
    }
}
