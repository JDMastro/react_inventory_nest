import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassificationKindMovement } from "../entities/classificationkindmovement.entity";

@Injectable()
export class ClassificationKindMovementService {
    constructor(
        @InjectRepository(ClassificationKindMovement) private _classificationKindMovementRepo: Repository<ClassificationKindMovement>,
    ) { }

    async findAll()
    {
        return await this._classificationKindMovementRepo.find()
    }
}
