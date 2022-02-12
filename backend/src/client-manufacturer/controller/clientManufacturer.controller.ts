import { Body, Controller, Get, Param, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ClientManufacturerService } from "../service/clientManufacturer.service";
import { Response, Request } from "express";
import { UsersService } from "../../users/service/users.service";

@Controller('api/ClientManufacturer')
export class ClientManufacturerController {
    constructor(
        private _clientManufacturerService: ClientManufacturerService,
        private _usersService: UsersService
    ) { }

    @Get('findByManufactureId')
    async findByManufactureId(@Query() req) {
        //console.log("dasdasd",req)
        return await this._clientManufacturerService.findByManufactureId(req.manufacture_id, req._page, req._limit)
    }

    @Post()
    async createdOrDelete(@Body() body: any) {
        const { id, client_id, manufacturer_id } = body
        return await this._clientManufacturerService.createdOrDelete(id, client_id, manufacturer_id)
    }

    @Get('findUsersByClientManufacture')
    async findUsersByClientManufacture(@Req() request: Request) {
        try {
            //     const cookie = request.cookies['jwt']
            //     const data = await this._usersService.verifyToken(cookie)
            //     if(!data)
            //        throw new UnauthorizedException()

            //      return await this._clientManufacturerService.findUsersByClientManufacture(data['id'])
            const token = request.headers.authorization
            const data = await this._usersService.verifyToken(token.slice(7, token.length))
            if (!data)
                throw new UnauthorizedException()

            return await this._clientManufacturerService.findUsersByClientManufacture(data['id'])

        } catch (error) {
            console.log(error)
        }
    }
}
