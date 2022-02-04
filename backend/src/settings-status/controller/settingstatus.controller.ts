import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SettingStatusService } from "../service/settingstatus.service";

@Controller('api/settingstatus')
export class SettingStatusController {

    constructor(
        private _settingStatusService: SettingStatusService,
    ) { }

    @Get()
    async findAll(@Query() req) {
        return await this._settingStatusService.findAll(req._page, req._limit)
    }

    @Post()
    async create(@Body() body: any) {
        const check = await this._settingStatusService.findBystatusParentChild(body.status_parent_id, body.status_child_id)

        if (!check)
            return {
                success: true, data: await this._settingStatusService.create({
                    status_parent_id: body.status_parent_id,
                    status_child_id: body.status_child_id
                }), message: "Guardado"
            }
        else
            return {
                success: false, data: null, errors: [
                    {
                        field: "status_parent_id",
                        msg: "Esta combinación ya esta registrada"
                    },
                    {
                        field: "status_child_id",
                        msg: "Esta combinación ya esta registrada"
                    }]
            }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any)
    {
        const check = await this._settingStatusService.findBystatusParentChild(body.status_parent_id, body.status_child_id)

        if (!check)
            return {
                success: true, data: await this._settingStatusService.update(id,{
                    status_parent_id: body.status_parent_id,
                    status_child_id: body.status_child_id
                }), message: "Guardado"
            }
        else
            return {
                success: false, data: null, errors: [
                    {
                        field: "status_parent_id",
                        msg: "Esta combinación ya esta registrada"
                    },
                    {
                        field: "status_child_id",
                        msg: "Esta combinación ya esta registrada"
                    }]
            }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._settingStatusService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los usuarios que tengan este rol" }
        }
    }

    @Get('findStatusbysetting/:status_parent_id')
    async findStatusbysetting(@Param('status_parent_id') status_parent_id : number)
    {
        return await this._settingStatusService.findStatusbysetting(status_parent_id)
    }

}
