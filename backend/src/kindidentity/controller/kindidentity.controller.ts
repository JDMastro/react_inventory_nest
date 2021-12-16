import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { kindidentityDto } from "../dto/kindidentity.dto";
import { kindidentityService } from "../service/kindidentity.service";


@Controller('api/kindidentity')
export class kindidentityController {
    constructor(
        private _kindidentityService: kindidentityService
    ) { }

    @Get()
    async findAll() {
        return await this._kindidentityService.findAll()
    }

    @Post()
    async create(@Body() body: kindidentityDto) {
        const { code, description } = body

        const check_unit_code = await this._kindidentityService.findByCode(code)

        return check_unit_code ? {
            success: false,
            data: null,
            errors: { field: "code", msg: "Esta sigla ya esta registrada" }
        } : {
            success: true,
            data: await this._kindidentityService.create({ code, description }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: kindidentityDto) {
        const { code, description } = body
        try {
            // await this._kindidentityService.update(id, body)
            return { success: true, data: await this._kindidentityService.update(id, { description, code }), errors: null }
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
            return { success: await this._kindidentityService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los productos que tengan esta unidad" }
        }
    }
}
