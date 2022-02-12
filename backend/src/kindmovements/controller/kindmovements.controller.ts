import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { kindmovementsDto } from "../dto/kindmovements.dto";
import { kindmovementsService } from "../service/kindmovements.service";


@Controller('api/kindmovements')
export class kindmovementsController {
    constructor(
        private _kindmovementsService: kindmovementsService
    ) { }

    @Get('findKindMovClientOrProvider')
    async findKindMovClientOrProvider()
    {
        return await this._kindmovementsService.findKindMovClientOrProvider()
    }

    /*@Get('getAllForReports')
    async getAllForReports()
    {
        return await this._kindmovementsService.getAllForReports()
    }*/

    @Get()
    async findAll(@Query() req) {
        return await this._kindmovementsService.findAll(req._page, req._limit)
    }

    @Get('findAllWithoutProduction')
    async findAllWithoutProduction() {
        return await this._kindmovementsService.findAllWithoutProduction()
    }

    @Get('findWithOnlyProduction')
    async findWithOnlyProduction() {
        return await this._kindmovementsService.findWithOnlyProduction()
    }

    @Post()
    async create(@Body() body: kindmovementsDto) {
        const { consecutive_id, description, name, classificationpeople_id, user_id, status_id, require_consecutive, classification_kindmovement_id } = body

        return {
            success: true,
            data: await this._kindmovementsService.create({ consecutive_id, description, name, classificationpeople_id, user_id, status_id, require_consecutive, classification_kindmovement_id }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: kindmovementsDto) {
        const { consecutive_id, description, name, classificationpeople_id, user_id, status_id, require_consecutive, classification_kindmovement_id } = body

        return { success: true, data: await this._kindmovementsService.update(id, { consecutive_id, description, classificationpeople_id, name, user_id, status_id, require_consecutive, classification_kindmovement_id }), errors: null }

    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._kindmovementsService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registro que tengan este tipo de movimiento" }
        }
    }
}
