import { Injectable } from '@nestjs/common';
import { Consecutive } from "../entities/consecutive.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsecutiveDto } from "../dto/consecitive.dto";

@Injectable()
export class ConsecutiveService {
    constructor(
        @InjectRepository(Consecutive) private _consecutiveRepo: Repository<Consecutive>,
    ) { }

    async findAll() {
        return  await this._consecutiveRepo.find({ order : { name : 'ASC' } })
    }

    async findAllWithPagination(page : number, perPage : number)
    {
        const data = await this._consecutiveRepo.find({ skip : (page - 1) * perPage, take : perPage })

        const total = await this._consecutiveRepo.count()

        return {
            data : data,
            total,
            page_count : perPage,
            current_page : page,
            last_page : Math.ceil(total/perPage)
          }
                                        
    }

    async findById(id : number)
    {
        return await this._consecutiveRepo.findOne(id)
    }

    async findByPrefix(prefix : string){
        return await this._consecutiveRepo.findOne({ where:{ prefix } })
    }

    async create(body: ConsecutiveDto) {
        const { description, name, prefix } = body
        return await this._consecutiveRepo.save({ description, name, prefix  })
    }

    async update(id: number, body: ConsecutiveDto) {
        const { description, name, prefix, last_inserted } = body
        const consecutive = await this._consecutiveRepo.findOne(id)

        await this._consecutiveRepo.merge(consecutive, {
            description, name, prefix, last_inserted
        })

        return await this._consecutiveRepo.save(consecutive)
    }

    async delete(id: number) {
        await this._consecutiveRepo.delete(id)
        return true
    }
}
