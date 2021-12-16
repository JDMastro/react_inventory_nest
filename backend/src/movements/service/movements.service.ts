import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movements } from "../entities/movements.entity";
import { MovementsDto } from "../dto/movements.dto";

@Injectable()
export class MovementsService {
    constructor(
        @InjectRepository(Movements) private _movementsRepo: Repository<Movements>,
    ) { }

    async create(body : MovementsDto)
    {
        const { product_id, quantity, total_purchasePrice, unit_price, header_id, quantity_returned  } = body
        return await this._movementsRepo.save({ product_id, quantity, total_purchasePrice, unit_price, header_id, quantity_returned })
    }
}
