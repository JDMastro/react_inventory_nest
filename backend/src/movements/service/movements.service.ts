import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Movements } from "../entities/movements.entity";
import { MovementsDto } from "../dto/movements.dto";
import { Header } from "../../header/entities/header.entity";
import { Products } from "../../products/entities/products.entity";


import { KindMovements } from "../../kindmovements/entities/kindmovements.entity";
import { ClassificationKindMovement } from "../../classificationkindmovement/entities/classificationkindmovement.entity";
import { Person } from 'src/person/entities/person.entity';
import { SettingsService } from "../../settings/service/settings.service";

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movements) private _movementsRepo: Repository<Movements>,
        private _settingsService: SettingsService
    ) { }

    async create(body: MovementsDto) {
        const {  observation, person_id, product_id, quantity, total_purchasePrice, unit_price, header_id, quantity_returned, status_id, amount_used, suggest_units, waste_quantity, suggest_generated } = body
        const movement = await this._movementsRepo.save({
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
            suggest_generated,
            person_id,
            observation,
        })

        return await this.getLastCreated(movement.id)
    }

    async getLastCreated(id: number) {
        /*return await getManager().createQueryBuilder("movements", "m")
            .select(["h.number_order", "m.id", "ckm.name", "p.name", "m.quantity", "m.total_purchasePrice", "m.unit_price"])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(KindMovements, "km", "km.id = h.kind_movements_id")
            .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .where('m.id = :id', { id })
            .getRawOne()*/
            return await getManager().createQueryBuilder("movements", "m")
            .select([
                "m.waste_quantity",
                "h.number_order",
                "m.id",
                "ckm.name",
                "p.name",
                "m.quantity",
                "m.total_purchasePrice",
                "m.unit_price",
                "h.creation_at",
                `case 
                when ( 
                    exists (
                        select value from settings s where s.key='ESTADOS_MOV_RECHAZADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'RECHAZADO' 
                when (exists (
                        select value from settings s where s.key='ESTADOS_MOV_ACEPTADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'ACEPTADO' 
                    else 'PENDIENTE' end as type_icon`
            ])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(KindMovements, "km", "km.id = h.kind_movements_id")
            .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .where('m.id = :id', { id })
            .getRawOne()

    }

    async findById(id: number) {
        return await this._movementsRepo.findOne(id)
    }


    async findByheaderId(header_id: number) {
        return await this._movementsRepo.findOne({ header_id })
    }

    async findAll(page : number, perPage : number) {

        const data = await getManager().createQueryBuilder("movements", "m")
            .select([
                "m.waste_quantity",
                "h.number_order",
                "m.id",
                "ckm.name",
                "p.name",
                "m.quantity",
                "m.total_purchasePrice",
                "m.unit_price",
                "m.updateAt as h_creation_at",
                `case 
                when ( 
                    exists (
                        select value from settings s where s.key='ESTADOS_MOV_RECHAZADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'RECHAZADO' 
                when (exists (
                        select value from settings s where s.key='ESTADOS_MOV_ACEPTADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'ACEPTADO' 
                    else 'PENDIENTE' end as type_icon`
            ])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(KindMovements, "km", "km.id = h.kind_movements_id")
            .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .orderBy("cast (m.updateAt as Date)", "DESC")
            .orderBy("m.id", 'DESC')
            .orderBy("h.number_order", 'DESC')
            //.getRawMany()
            .offset((page - 1) * perPage)
          .limit(perPage)

          const total = await data.getCount()

          return {
            data : await data.getRawMany(),
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }

        /* return await getManager().createQueryBuilder("movements","m")
             .select(["m.waste_quantity","h.number_order","m.id", "ckm.name", "p.name", "m.quantity", "m.total_purchasePrice", "m.unit_price"])
             .innerJoin(Header, "h","h.id = m.header_id")
             .innerJoin(KindMovements, "km","km.id = h.kind_movements_id")
             .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
             .innerJoin(Products, "p","p.id = m.product_id")
             .orderBy("cast (m.updateAt as Date)","DESC")
             .orderBy("m.id", 'DESC')
             
             .getRawMany()*/
    }

    async findAllReports(page : number, perPage : number, startDate : any, finishDate : any, status_id: number) {

        const data = await getManager().createQueryBuilder("movements", "m")
            .select([
                "m.waste_quantity",
                "h.number_order",
                "m.id",
                "ckm.name",
                "p.name",
                "m.quantity",
                "m.total_purchasePrice",
                "m.unit_price",
                "m.updateAt as h_creation_at",
                `case 
                when ( 
                    exists (
                        select value from settings s where s.key='ESTADOS_MOV_RECHAZADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'RECHAZADO' 
                when (exists (
                        select value from settings s where s.key='ESTADOS_MOV_ACEPTADOS' and position(CAST(m.status_id as varchar) in value) > 0) 
                        ) then 'ACEPTADO' 
                    else 'PENDIENTE' end as type_icon`
            ])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(KindMovements, "km", "km.id = h.kind_movements_id")
            .innerJoin(ClassificationKindMovement, "ckm", "ckm.id = km.classification_kindmovement_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .where('m.status_id = :status_id', { status_id })
            .andWhere(`DATE(m.updateAt) between '${startDate}' and '${finishDate}'`)
            .orderBy("cast (m.updateAt as Date)", "DESC")
            .orderBy("m.id", 'DESC')
            .orderBy("h.number_order", 'DESC')
            //.getRawMany()
            .offset((page - 1) * perPage)
          .limit(perPage)

          const total = await data.getCount()

          return {
            data : await data.getRawMany(),
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async findMovementByNumberOrder(order_number: string) {
        return await getManager().createQueryBuilder("movements", "m")
            .select(["m.suggest_units", "m.suggest_generated", "m.amount_used", "m.waste_quantity", "m.id", "p.name", "m.quantity", "m.total_purchasePrice", "m.unit_price"])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(Products, "p", "p.id = m.product_id")
            .where("h.number_order = :order_number", { order_number })
            .orderBy("p.name", 'ASC')
            .getRawMany()
    }



    async delete(id: number) {
        await this._movementsRepo.delete(id)
        return true
    }

    async updateProductionRejeted(id: number, body: any) {
        const setting = await this._settingsService.findByKey("PROD_RECHAZADA")
        const movement = await this._movementsRepo.findOne(id)

        await this._movementsRepo.merge(movement, {
            observation: body.observation,
            status_id: parseInt(setting.value),
            quantity: movement.quantity,
            total_purchasePrice: movement.total_purchasePrice,
            unit_price: movement.unit_price,
            header_id: movement.header_id,
            quantity_returned: movement.quantity_returned,
            amount_used: 0
        })

        return await this._movementsRepo.save(movement)
    }

    async changeStatusMovement(id: number, status_id: number) {
        const movement = await this._movementsRepo.findOne(id)

        await this._movementsRepo.merge(movement, {
            status_id
        })

        return await this._movementsRepo.save(movement)
    }

    async findStartedMovements(product_parent_id: number) {
        const status_id = await this._settingsService.findByKey("ESTADO_SUGERIDO")
        return await getManager().createQueryBuilder("movements", "m")
            .select(["p.fullname", "sum(m.amount_used) as total_amount_used"])
            .innerJoin(Header, "h", "h.id = m.header_id")
            .innerJoin(Person, "p", "p.id = h.person_id")
            .innerJoin(Products, "p2", `m.product_id  = p2.id and p2.product_parent_id = ${product_parent_id}`)
            .where("m.status_id = :status_id", { status_id: parseInt(status_id.value) })
            .orderBy("p.fullname", 'ASC')
            .groupBy("p.fullname")
            .getRawMany()
    }

    async updateMovement(id: number, body: any) {
        const { header_id, product_id, quantity, quantity_returned, total_purchasePrice,
            unit_price, status_id, amount_used, suggest_generated, suggest_units,
            waste_quantity, person_id, observation } = body

        const movement = await this._movementsRepo.findOne(id)
        await this._movementsRepo.merge(movement, {
            header_id,
            product_id,
            quantity,
            quantity_returned,
            total_purchasePrice,
            unit_price,
            status_id,
            amount_used,
            suggest_generated,
            suggest_units,
            waste_quantity,
            person_id,
            observation
        })
        return this._movementsRepo.save(movement)
    }
}
