import { Controller, Get } from '@nestjs/common';
import { ClassificationPeopleService } from "../service/classificationPeople.service";


@Controller('api/classificationPeople')
export class ClassificationPeopleController {
    constructor(
        private _classificationPeople: ClassificationPeopleService
    ) { }

    @Get()
    async getAll()
    {
        return await this._classificationPeople.getAll()
    }

    @Get('getClassificationUserOrEmpleado')
    async getClassificationUserOrEmpleado()
    {
        return await this._classificationPeople.getClassificationUserOrEmpleado()
    }

   /* @Get()
    async findAll() {
        return await this._rolesService.findAll()
    }

    @Get('getRoleProviderOrClient')
    async getRoleProviderOrClient()
    {
        return await this._rolesService.getRoleProviderOrClient()
    }

    @Get('getRoleEmployeeOrClient')
    async getRoleEmployeeOrClient()
    {
        return await this._rolesService.getRoleEmployeeOrClient()
    }*/
}
