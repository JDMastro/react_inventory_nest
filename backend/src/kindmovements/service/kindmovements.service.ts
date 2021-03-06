import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KindMovements } from "../entities/kindmovements.entity";
import { kindmovementsDto } from "../dto/kindmovements.dto";
import { Not } from "typeorm";

@Injectable()
export class kindmovementsService {
    constructor(
        @InjectRepository(KindMovements) private _kindMovementsRepo: Repository<KindMovements>,
    ) { }

    async findKindMovClientOrProvider()
    {
        return await this._kindMovementsRepo.find({ where : { classificationpeople_id : Not(3) } })
    }

    /*async getAllForReports()
    {
        return await this._kindMovementsRepo.find()
    }*/

    async findById(id:number)
    {
        return await this._kindMovementsRepo.findOne(id)
    }

    async findAllWithoutProduction() {
        return await this._kindMovementsRepo.find({ where : { classification_kindmovement_id : Not('3') }, order : { name : 'ASC' } });
    }

    async findWithOnlyProduction() {
        return await this._kindMovementsRepo.find({ where : { classification_kindmovement_id : 3 }, order : { name : 'ASC' } });
    }

    async findAll(page : number, perPage : number) {
        const data = await this._kindMovementsRepo.find({ skip : (page - 1) * perPage, take : perPage });
        const total = await this._kindMovementsRepo.count()
        return {
            data : data,
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
    }

    async create(body: kindmovementsDto) {
        const { consecutive_id, description, classificationpeople_id, name, user_id, status_id, require_consecutive, classification_kindmovement_id } = body
        return await this._kindMovementsRepo.save({ consecutive_id, require_consecutive ,description, classificationpeople_id, name, user_id, status_id, classification_kindmovement_id })
    }

    async update(id: number, body: kindmovementsDto) {
        const { consecutive_id, description, classificationpeople_id, name, user_id, status_id, require_consecutive, classification_kindmovement_id } = body
        const kind_movement = await this._kindMovementsRepo.findOne(id)

        await this._kindMovementsRepo.merge(kind_movement, {
            consecutive_id, description, classificationpeople_id ,name, user_id, status_id, require_consecutive, classification_kindmovement_id
        })

        return await this._kindMovementsRepo.save(kind_movement)
    }

    async delete(id: number) {
        await this._kindMovementsRepo.delete(id)
        return true
    }
}
