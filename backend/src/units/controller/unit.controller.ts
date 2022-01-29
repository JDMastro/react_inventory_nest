import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UnitsDto } from "../dto/units.dto";
import { UnitsService } from "../service/unit.service";

@Controller('api/units')
export class UnitsController {
    constructor(
        private _unitsService: UnitsService
    ) { }

    @Get()
    async findAll() {
        return await this._unitsService.findAll()
    }

    @Get('withpagination')
    async findAllWithPagination(@Query() req)
    {
        return await this._unitsService.findAllWithPagination(req._page, req._limit)
    }

    @Post()
    async create(@Body() body: UnitsDto) {
        const { code, description } = body

        const check_unit_code = await this._unitsService.findByCode(code)

        return check_unit_code ? {
            success: false,
            data: null,
            errors: { field: "code", msg: "Esta sigla ya esta registrada" }
        } : {
            success: true,
            data: await this._unitsService.create({ code, description }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UnitsDto) {
        const { code, description } = body
        try {
            // await this._unitsService.update(id, body)
            return { success: true, data: await this._unitsService.update(id, { description, code }), errors: null }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;
            var error = regExp.exec(err.detail)[1]
            //var res = { field : error, msg : error === "code" ? "Este código esta registrado" : "Este correo esta registrado" }
            var res = { field: error, msg: "Esta sigla ya esta registrada" }
            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._unitsService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los productos que tengan esta unidad" }
        }
    }
}
