import { Controller, Get } from '@nestjs/common';
import { SignsService } from "../service/signs.service";

@Controller('api/signs')
export class SignsController {
    constructor(
        private _signsService: SignsService
    ) { }

    @Get()
    async findAll() {
        return await this._signsService.findAll()
    }
}
