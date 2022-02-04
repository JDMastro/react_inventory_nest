import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ClientManufacturerService } from "../service/clientManufacturer.service";
import { Response, Request } from "express";
import { UsersService } from "../../users/service/users.service";

@Controller('api/ClientManufacturer')
export class ClientManufacturerController {
    constructor(
        private _clientManufacturerService: ClientManufacturerService,
        private _usersService : UsersService
    ) { }

    @Get('findByManufactureId/:manufacurer_id')
    async findByManufactureId(@Param('manufacurer_id') manufacurer_id : number){
        
        return await this._clientManufacturerService.findByManufactureId(manufacurer_id)
    }

    @Post()
    async createdOrDelete(@Body() body: any)
    {
        const { id, client_id, manufacturer_id } = body
        return await this._clientManufacturerService.createdOrDelete(id, client_id, manufacturer_id)
    }

    @Get('findUsersByClientManufacture')
    async findUsersByClientManufacture(@Req() request :Request){
        try {
            const cookie = request.cookies['jwt']
            const data = await this._usersService.verifyToken(cookie)
            if(!data)
               throw new UnauthorizedException()

               return await this._clientManufacturerService.findUsersByClientManufacture(data['id'])
        } catch (error) {
            console.log(error)
        }
    }
}
