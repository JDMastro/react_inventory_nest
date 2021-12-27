import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Movements } from "../entities/movements.entity";
import { MovementsDto } from "../dto/movements.dto";
import { Header } from "../../header/entities/header.entity";
import { Products } from "../../products/entities/products.entity";


import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { ClassificationKindMovement } from "../../classificationkindmovement/entities/classificationkindmovement.entity";

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movements) private _movementsRepo: Repository<Movements>,
    ) { }

    async create(body : MovementsDto)
    {
        const { product_id, quantity, total_purchasePrice, unit_price, header_id, quantity_returned, status_id, amount_used, suggest_units, waste_quantity, suggest_generated  } = body
        return await this._movementsRepo.save({ 
            product_id, 
            quantity, 
            total_purchasePrice, 
            unit_price, 
            header_id, 
            quantity_returned, 
            status_id,
            amount_used,
            suggest_units, 
            waste_quantity, 
            suggest_generated
         })
    }

    async findById(id:number){
        return await this._movementsRepo.findOne(id)
    }


    async findByheaderId(header_id : number)
    {
        return await this._movementsRepo.findOne({ header_id })
    }

    async findAll()
    {
        return await getManager().createQueryBuilder("movements","m")
            .select(["h.number_order","m.id", "ckm.name", "p.name", "m.quantity", "m.total_purchasePrice", "m.unit_price"])
            .innerJoin(Header, "h","h.id = m.header_id")
            .innerJoin(KindMovements, "km","km.id = h.kind_movements_id")
            .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
            .innerJoin(Products, "p","p.id = m.product_id")
            .getRawMany()
    }

    async findMovementByNumberOrder(order_number : string)
    {
        return await getManager().createQueryBuilder("movements","m")
            .select(["m.id", "p.name", "m.quantity", "m.total_purchasePrice", "m.unit_price"])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .where("h.number_order = :order_number",{ order_number })
            .getRawMany()
    }

   

    async delete(id: number) {
        await this._movementsRepo.delete(id)
        return true
    }
}
