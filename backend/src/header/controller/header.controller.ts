import { Controller, Get } from '@nestjs/common';
import { HeaderService } from "../service/header.service";

@Controller('api/header')
export class HeaderController {
    constructor(
        private _headerService: HeaderService
    ) { }
}
