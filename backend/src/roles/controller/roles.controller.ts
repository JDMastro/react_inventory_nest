import { Controller, Get } from '@nestjs/common';
import { RolesService } from "../service/roles.service";

@Controller('api/roles')
export class RolesController {
    constructor(
        private _rolesService: RolesService
    ) { }

    @Get()
    async findAll() {
        return await this._rolesService.findAll()
    }
}
