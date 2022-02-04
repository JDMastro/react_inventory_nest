import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { rolesDto } from "../dto/roles.dto";
import { RolesService } from "../service/roles.service";

@Controller('api/roles')
export class RolesController {
    constructor(
        private _rolesService: RolesService
    ) { }

    @Get()
    async findAll(@Query() req) {
        return await this._rolesService.findAll(req._page, req._limit)
    }

    @Post()
    async create(@Body() body: rolesDto) {
        const { name } = body
        const errors: any = []

        const check_rol = await this._rolesService.checkName(name)

        if (check_rol)
            errors.push({ field: "name", msg: "Este rol esta registrado" })

        return errors.length > 0 ?
        { success: false, data: null, errors } :
        { success: true, data: await this._rolesService.create({ name }), errors: null }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: rolesDto)
    {
        const { name } = body
        try {
            return { success: true, data: await this._rolesService.update(id, { name }), error: null }
        } catch (error) {
            return { success : false, data : null, error:{ field : "name", msg : "Este campo ya esta registrado" } }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._rolesService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los usuarios que tengan este rol" }
        }
    }

}
