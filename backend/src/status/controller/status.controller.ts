import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StatusDto } from "../dto/status.dto";
import { StatusService } from "../service/status.service";

@Controller('api/status')
export class StatusController {
    constructor(
        private _statusService: StatusService
    ) { }

    @Get()
    async findAll() {
        return await this._statusService.findAll()
    }

    @Post()
    async create(@Body() body: StatusDto) {
        const { code, description, name } = body

        const check_code = await this._statusService.findByCode(code)

        return check_code ? {
            success: false,
            data: null,
            errors: { field: "code", msg: "Esta código ya esta registrado" }
        } : {
            success: true,
            data: await this._statusService.create({ code, description, name }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: StatusDto) {
        const { code, description, name } = body
        try {
            // await this._unitsService.update(id, body)
            return { success: true, data: await this._statusService.update(id, { description, code, name }), errors: null }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;
            var error = regExp.exec(err.detail)[1]
            //var res = { field : error, msg : error === "code" ? "Este código esta registrado" : "Este correo esta registrado" }
            var res = { field: error, msg: "Esta código ya esta registrado" }
            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._statusService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registros que tengan este estado" }
        }
    }

}
