import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PermissionService } from "../service/permission.service";

@Controller('api/permission')
export class PermissionController {
    constructor(
        private _permissionService: PermissionService
    ) { }

    @Get()
    async findAll(@Query() req) {
        return await this._permissionService.findAll(req.user_Id, req._page, req._limit)
    }

    @Post('CreateOrDelete')
    async CreateOrDelete(@Body() body: any) {
        const { checking, user_id, permission_id } = body

        return await this._permissionService.createOrDeletePermission({ checking, user_id, permission_id })
    }
}
