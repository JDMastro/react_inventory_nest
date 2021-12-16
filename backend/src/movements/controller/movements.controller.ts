import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MovementsRequest } from "../dto/movements.request";
import { ConsecutiveService } from "../../consecutive/service/consecutive.service";
import { HeaderService } from "../../header/service/header.service";
import { MovementsService } from "../service/movements.service";

@Controller('api/movements')
export class MovementsController {
    constructor(
        private _consecutiveService: ConsecutiveService,
        private _headerService: HeaderService,
        private _movementsService: MovementsService
    ) { }

    @Post('provider')
    async createProvider(@Body() body: MovementsRequest)
    {
        const { classification_kindmovement_id, consecutive_id, kind_movements_id, number_order, observation,
                   person_id, product_id, quantity, quantity_returned, require_consecutive, status_id,
                   total_purchasePrice, unit_price } = body

        console.log(body)

    }
}
