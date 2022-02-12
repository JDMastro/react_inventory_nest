import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UnauthorizedException } from '@nestjs/common';
import { StatusDto } from "../dto/status.dto";
import { StatusService } from "../service/status.service";
import { Request } from "express";
import { UsersService } from "../../users/service/users.service";

@Controller('api/status')
export class StatusController {
    constructor(
        private _statusService: StatusService,
        private _usersService : UsersService
    ) { }

    @Get()
    async findAll() {
        return await this._statusService.findAll()
    }

    @Get('withpagination')
    async findAllWithPagination(@Query() req)
    {
        return await this._statusService.findAllWithPagination(req._page, req._limit)
    }

    @Get('getAllNumberOrdersbyStatus/:status_id/:person_id')
      async getAllNumberOrdersbyStatus(@Param('status_id') status_id : number, @Param('person_id') person_id : number)
      {
        
            

              return await this._statusService.getAllNumberOrdersbyStatus(status_id, person_id)
      
        //return await this._statusService.getAllNumberOrdersbyStatus(status_id, person_id)
      }

    @Post()
    async create(@Body() body: StatusDto) {
        const { code, description, name, is_to_employee } = body

        const check_code = await this._statusService.findByCode(code)

        return check_code ? {
            success: false,
            data: null,
            errors: { field: "code", msg: "Esta código ya esta registrado" }
        } : {
            success: true,
            data: await this._statusService.create({ code, description, name, is_to_employee }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: StatusDto) {
        const { code, description, name, is_to_employee } = body
        try {
            // await this._unitsService.update(id, body)
            return { success: true, data: await this._statusService.update(id, { description, code, name, is_to_employee }), errors: null }
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

    @Get('getAllnumberOrders/:number_orders/:status_id')
    async getAllnumberOrders(@Param('number_orders') number_orders : string, @Param('status_id') status_id : number)
    {
      return await this._statusService.getAllnumberOrders(number_orders,status_id)
    }

    @Get('getAllForReports')
    async getAllForReports()
    {
        return await this._statusService.getAllForReports()
    }

    @Get('findStatusEmplyee')
    async findStatusEmplyee()
    {
        return await this._statusService.findStatusEmplyee()
    }


}
