import { Controller, Get, Post, Body, Put, Param, Delete, UnauthorizedException, Req } from '@nestjs/common';
import { ProductsDto } from "../dto/product.dto";
import { ProductsService } from "../service/products.service";
import { UsersService } from "../../users/service/users.service";

import { Response, Request } from "express";


@Controller('api/products')
export class ProductsController {
    constructor(
        private _productsService: ProductsService,
        private _usersService : UsersService
    ) { }

    @Post()
    async create(@Body() body: ProductsDto) {
        const { code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount } = body
        const errors: any = []
        const product = new ProductsDto()

        const check_sku = await this._productsService.findBySku(sku)
        const check_name = await this._productsService.findByName(name)


        if (check_sku)
            errors.push({ field: "sku", msg: "Este sku esta registrado" })

        if (check_name)
            errors.push({ field: "name", msg: "Este nombre esta registrado" })

        product.name = name
        product.description = description
        product.sku = sku
        product.code_bar = code_bar
        product.current_existence = current_existence
        product.reserved_quantity = reserved_quantity
        product.purchase_unit_id = purchase_unit_id
        product.sale_unit_id = sale_unit_id
        product.product_parent_id = product_parent_id
        product.isderivate = isderivate
        product.user_id = user_id
        product.to_discount = to_discount

        return errors.length > 0 ?
            { success: false, data: null, errors } :
            { success: true, data: await this._productsService.create(product), errors: null }


    }

    @Get('parents/:isderivate')
    async findProductByDerivate(@Param('isderivate') isderivate: boolean) {
        return await this._productsService.findProductByDerivate(isderivate)
    }

    @Get('suggest/:product_parent_id')
    async getByStatusSuggest(@Req() request :Request, @Param('product_parent_id') product_parent_id : number)
    {
        //return await this._productsService.getByStatusSuggest(person_id, product_parent_id)
       try {
            const cookie = request.cookies['jwt']

            const data = await this._usersService.verifyToken(cookie)
            if(!data){
                console.log(data)
               throw new UnauthorizedException()
             }               
               
            

            return await this._productsService.getByStatusSuggest(data['id'], product_parent_id)
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException()
        }
    }

    @Get('derivate/:parent_id')
    async findProductByParent(@Param('parent_id') parent_id : number) {
        
        return await this._productsService.findProductByParent(parent_id)
    }

    @Get("parent/producction")
    async findProductParentProducction()
    {
        return await this._productsService.findProductParentProducction()
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: ProductsDto) {
        const { code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount, waste_quantity } = body
        try {
            // await this._unitsService.update(id, body)
            return {
                success: true, data: await this._productsService.update(id, {
                    code_bar, current_existence,
                    description, isderivate, name,
                    product_parent_id, purchase_unit_id, reserved_quantity,
                    sale_unit_id, sku, user_id, to_discount,
                    waste_quantity
                }), errors: null
            }
        } catch (err) {
            var regExp = /\(([^)]+)\)/;

            var error = regExp.exec(err.detail)[1]

            var res = { field: error, msg: error === "sku" ? "Este sku esta registrado" : "Este correo esta registrado" }
            //error === "code" ? "Este código esta registrado" : "Este correo esta registrado"

            return { success: false, data: null, errors: res }
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            
        return { success: await this._productsService.delete(id), data: null, error : null }
        } catch (error) {
            return { success: false, data: null, error : "Debe eliminar todos los productos que deveriven de este" }
        }
    }



}
