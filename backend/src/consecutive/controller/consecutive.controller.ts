import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConsecutiveDto } from "../dto/consecitive.dto";
import { ConsecutiveService } from "../service/consecutive.service";

@Controller('api/consecutive')
export class ConsecutiveController {
    constructor(
        private _consecutiveService: ConsecutiveService
    ) { }


    @Get()
    async findAll() {
        return await this._consecutiveService.findAll()
    }

    @Get('withpagination')
    async findAllWithPagination(@Query() req)
    {
        return await this._consecutiveService.findAllWithPagination(req._page, req._limit)
    }

    @Post()
    async create(@Body() body: ConsecutiveDto) {
        const { description, name, prefix } = body

        const check_prefix = await this._consecutiveService.findByPrefix(prefix)

        return check_prefix ? {
            success: false,
            data: null,
            errors: { field: "prefix", msg: "Este prefijo ya esta registrado" }
        } : {
            success: true,
            data: await this._consecutiveService.create({ description, name, prefix }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: ConsecutiveDto) {
        const { name, description, prefix } = body
        try {
            // await this._kindidentityService.update(id, body)
            return { success: true, data: await this._consecutiveService.update(id, { name, description, prefix }), errors: null }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;
            var error = regExp.exec(err.detail)[1]
            //var res = { field : error, msg : error === "code" ? "Este código esta registrado" : "Este correo esta registrado" }
            var res = { field: error, msg: "Este prefijo ya esta registrado" }
            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._consecutiveService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registros que tengan este consecutivo" }
        }
    }
}
