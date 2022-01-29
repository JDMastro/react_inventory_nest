import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConversionDto } from "../dto/conversion.dto";
import { ConversionService } from "../service/conversion.service";


@Controller('api/conversion')
export class ConversionController {
    constructor(
        private _conversionService: ConversionService,
    ) { }

    @Get()
    async findAll(@Query() req) {

        //console.log(req)

        return await this._conversionService.findAll(req._page, req._limit)
    }


    @Post()
    async create(@Body() body: ConversionDto) {
        const { signs_id, conversion_to, conversion_quatity, conversion_from } = body
        return {
            success: true,
            data: await this._conversionService.create({ signs_id, conversion_to, conversion_quatity, conversion_from }),
            errors: null
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: ConversionDto) {
        const { signs_id, conversion_to, conversion_quatity, conversion_from } = body

        return { success: true, data: await this._conversionService.update(id, { signs_id, conversion_to, conversion_quatity, conversion_from }), errors: null }

    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            return { success: await this._conversionService.delete(id), data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registros que esten a cargo de este registro" }
        }
    }


    @Post('/turninto')
    async turninto(@Body() body: any) {
        let converted = 0
        const operation = await this._conversionService.getOperation(body.purchase_id, body.sale_id)


        if (body.purchase_id === body.sale_id) {
            converted = body.p_current_existence
        }else{
            if(operation)
               converted = eval(`${body.p_current_existence}${operation.s_sign}${operation.c_conversion_quatity}`)
        }
        return !operation && body.purchase_id !== body.sale_id ?  { success: false, msg : 'esta operacion no existe en la tabla de conversion, por favor registrela' } : { success: true, converted }
    }


}
