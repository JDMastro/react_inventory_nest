import { Controller, Get } from '@nestjs/common';
import { ClassificationKindMovementService } from "../service/classificationkindmovement.service";

@Controller('api/classificationkindmovement')
export class ClassificationKindMovementController {
    constructor(
        private _classificationKindMovementService: ClassificationKindMovementService
    ) { }

    @Get()
    async findAll() {
        return await this._classificationKindMovementService.findAll()
    }
}
