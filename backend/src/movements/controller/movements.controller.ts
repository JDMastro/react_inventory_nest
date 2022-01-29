import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UnauthorizedException, Req, Query } from '@nestjs/common';
import { MovementsRequest } from "../dto/movements.request";
import { ConsecutiveService } from "../../consecutive/service/consecutive.service";
import { HeaderService } from "../../header/service/header.service";
import { MovementsService } from "../service/movements.service";
import { ProductsService } from "../../products/service/products.service";
//import { getManager } from 'typeorm';
import { ConversionService } from "../../conversion/service/conversion.service";
import { SettingsService } from "../../settings/service/settings.service";
import { UsersService } from "../../users/service/users.service";

import { Response, Request } from "express";



@Controller('api/movements')
export class MovementsController {
    constructor(
        private _consecutiveService: ConsecutiveService,
        private _headerService: HeaderService,
        private _movementsService: MovementsService,
        private _productsService: ProductsService,
        private _conversionService: ConversionService,
        private _settingsService : SettingsService,
        private _usersService : UsersService

    ) { }

    @Post('provider')
    async createProvider(@Body() body: MovementsRequest) {
        const { classification_kindmovement_id, consecutive_id, kind_movements_id, number_order, observation,
            person_id, product_id, quantity, quantity_returned, require_consecutive, status_id,
            total_purchasePrice, unit_price, header_id, orderReturned } = body


        const product = await this._productsService.findById(product_id)

        let movementSaved;

        let new_number_order = ""

        //const operation = await this._conversionService.getOperation()

        //SI ES ENTRADA
        if (classification_kindmovement_id === 1) {
            /*  
            SI  REQUIERE CONSECUTIVO ES VERDADER, CONSECUECIE_ID ES NULL Y NUMBER_ORDER ES VACIO
            ESTO QUIERE DECIR QUE SE LE DEBE CREAR UN NUMBER_ORDER CON EL CONSECUTIVO
             */
            if (require_consecutive && consecutive_id && number_order === "") {
                /* SE OBTIENE EL CONSECUTIVO */
                const consecutive = await this._consecutiveService.findById(consecutive_id)

                /* SE CREA EL NUMBER_ORDER */
                new_number_order = `${consecutive.prefix}${consecutive.last_inserted}`

                const new_last_inserted = consecutive.last_inserted + 1

                /* SE ACTUALIZA EL CONSECUTIVO */
                await this._consecutiveService.update(consecutive.id, {
                    description: consecutive.description,
                    name: consecutive.name,
                    prefix: consecutive.prefix,
                    last_inserted: new_last_inserted
                })
                /* SE CREA EL HEADER */
                const header_res = await this._headerService.create({
                    kind_movements_id,
                    number_order: new_number_order,
                    observation,
                    person_id
                })
                /*  SE CREA EL MOVIMIENTO */
                movementSaved = await this._movementsService.create({
                    header_id: header_res.id,
                    product_id,
                    quantity,
                    quantity_returned: 0,
                    total_purchasePrice,
                    unit_price,
                    status_id,
                    amount_used : 0,
                    suggest_generated : 0,
                    suggest_units : 0,
                    waste_quantity : 0,
                    person_id : null,
                    observation : null
                })

                await this._productsService.update(product_id, {
                    current_existence: product.current_existence + quantity,
                    description: product.description,
                    isderivate: product.isderivate,
                    name: product.name,
                    product_parent_id: product.product_parent_id,
                    purchase_unit_id: product.purchase_unit_id,
                    reserved_quantity: product.reserved_quantity,
                    sale_unit_id: product.sale_unit_id,
                    sku: product.sku,
                    user_id: product.user_id,
                    code_bar: product.code_bar,
                    to_discount: product.to_discount,
                    waste_quantity: product.waste_quantity,
                    sale_price : product.sale_price,
                    actived : product.actived
                })






            } else {

                const check_order_number = await this._headerService.findByOrderNumber(number_order)
                new_number_order = number_order

                if (!check_order_number) {
                    /* SE CREA EL HEADER */
                    const header_res = await this._headerService.create({
                        kind_movements_id,
                        number_order,
                        observation,
                        person_id,
                    })

                    /*  SE CREA EL MOVIMIENTO */
                    movementSaved = await this._movementsService.create({
                        header_id: header_res.id,
                        product_id,
                        quantity,
                        quantity_returned: 0,
                        total_purchasePrice,
                        unit_price,
                        status_id,
                        amount_used : 0,
                        suggest_generated : 0,
                        suggest_units : 0,
                        waste_quantity : 0,
                        person_id : null,
                        observation : null
                    })

                    await this._productsService.update(product_id, {
                        current_existence: product.current_existence + quantity,
                        description: product.description,
                        isderivate: product.isderivate,
                        name: product.name,
                        product_parent_id: product.product_parent_id,
                        purchase_unit_id: product.purchase_unit_id,
                        reserved_quantity: product.reserved_quantity,
                        sale_unit_id: product.sale_unit_id,
                        sku: product.sku,
                        user_id: product.user_id,
                        code_bar: product.code_bar,
                        to_discount: product.to_discount,
                        waste_quantity: product.waste_quantity,
                        sale_price : product.sale_price,
                        actived : product.actived
                    })
                } else {
                    /*  SE CREA EL MOVIMIENTO */
                    movementSaved = await this._movementsService.create({
                        header_id: check_order_number.id,
                        product_id,
                        quantity,
                        quantity_returned: 0,
                        total_purchasePrice,
                        unit_price,
                        status_id,
                        amount_used : 0,
                        suggest_generated : 0,
                        suggest_units : 0,
                        waste_quantity : 0,
                        person_id : null,
                        observation: null
                    })

                    await this._productsService.update(product_id, {
                        current_existence: product.current_existence + quantity,
                        description: product.description,
                        isderivate: product.isderivate,
                        name: product.name,
                        product_parent_id: product.product_parent_id,
                        purchase_unit_id: product.purchase_unit_id,
                        reserved_quantity: product.reserved_quantity,
                        sale_unit_id: product.sale_unit_id,
                        sku: product.sku,
                        user_id: product.user_id,
                        code_bar: product.code_bar,
                        to_discount: product.to_discount,
                        waste_quantity: product.waste_quantity,
                        sale_price : product.sale_price,
                        actived : product.actived
                    })
                }
            }
        }


        //SI ES SALIDA
        if (classification_kindmovement_id === 2) {
            const mov_header = await this._movementsService.findByheaderId(orderReturned)
            if (mov_header.quantity < body.quantity) {
                console.log(mov_header.quantity)
                console.log(body.quantity)
                return { success: false, data: null, error: { quantity: "La cantidad no puede ser mayor cantidad comprada en la orden" } }
            } else {
                if (require_consecutive && consecutive_id && number_order === "") {
                    /* SE OBTIENE EL CONSECUTIVO */
                    const consecutive = await this._consecutiveService.findById(consecutive_id)

                    /* SE CREA EL NUMBER_ORDER */
                    new_number_order = `${consecutive.prefix}${consecutive.last_inserted}`

                    const new_last_inserted = consecutive.last_inserted + 1

                    /* SE ACTUALIZA EL CONSECUTIVO */
                    await this._consecutiveService.update(consecutive.id, {
                        description: consecutive.description,
                        name: consecutive.name,
                        prefix: consecutive.prefix,
                        last_inserted: new_last_inserted
                    })
                    /* SE CREA EL HEADER */
                    const header_res = await this._headerService.create({
                        kind_movements_id,
                        number_order: new_number_order,
                        observation,
                        person_id
                    })
                    /*  SE CREA EL MOVIMIENTO */
                    movementSaved = await this._movementsService.create({
                        header_id: header_res.id,
                        product_id,
                        quantity,
                        quantity_returned: quantity_returned,
                        total_purchasePrice,
                        unit_price,
                        status_id,
                        amount_used : 0,
                        suggest_generated : 0,
                        suggest_units : 0,
                        waste_quantity : 0,
                        person_id : null,
                        observation : null
                    })

                    await this._productsService.update(product_id, {
                        current_existence: product.current_existence - quantity,
                        description: product.description,
                        isderivate: product.isderivate,
                        name: product.name,
                        product_parent_id: product.product_parent_id,
                        purchase_unit_id: product.purchase_unit_id,
                        reserved_quantity: product.reserved_quantity,
                        sale_unit_id: product.sale_unit_id,
                        sku: product.sku,
                        user_id: product.user_id,
                        code_bar: product.code_bar,
                        to_discount: product.to_discount,
                        waste_quantity: product.waste_quantity,
                        sale_price: product.sale_price,
                        actived : product.actived
                    })






                } else {

                    const check_order_number = await this._headerService.findByOrderNumber(number_order)
                    new_number_order = number_order

                    if (!check_order_number) {
                        /* SE CREA EL HEADER */
                        const header_res = await this._headerService.create({
                            kind_movements_id,
                            number_order,
                            observation,
                            person_id,
                        })

                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: header_res.id,
                            product_id,
                            quantity,
                            quantity_returned: quantity_returned,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation : null
                        })

                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence - quantity,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price : product.sale_price,
                            actived : product.actived
                        })
                    } else {
                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: check_order_number.id,
                            product_id,
                            quantity,
                            quantity_returned: quantity_returned,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation : null
                        })

                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence - quantity,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price: product.sale_price,
                            actived : product.actived
                        })
                    }
                }


            }
        }






        return { success: true, lastmovement : movementSaved, movement: await this._movementsService.findMovementByNumberOrder(new_number_order), new_number_order }
    }


    @Post('client')
    async createClient(@Body() body: MovementsRequest) {
        const { classification_kindmovement_id, consecutive_id, kind_movements_id, number_order, observation,
            person_id, product_id, quantity, quantity_returned, require_consecutive, status_id,
            total_purchasePrice, unit_price, header_id, orderReturned } = body

        const product = await this._productsService.findById(product_id)
        let new_number_order = ""

        let movementSaved;
        //SI ES SALIDA
        if (classification_kindmovement_id === 2) {
            /*  
            SI  REQUIERE CONSECUTIVO ES VERDADER, CONSECUECIE_ID ES NULL Y NUMBER_ORDER ES VACIO
            ESTO QUIERE DECIR QUE SE LE DEBE CREAR UN NUMBER_ORDER CON EL CONSECUTIVO
             */

            if(product.current_existence < quantity){

                return { success: false, data: null, error: { quantity: "La cantidad no puede ser mayor cantidad que esta en existencia" } }


            }else{
                if (require_consecutive && consecutive_id && number_order === "") {
                    /* SE OBTIENE EL CONSECUTIVO */
                    const consecutive = await this._consecutiveService.findById(consecutive_id)
                    /* SE CREA EL NUMBER_ORDER */
                    new_number_order = `${consecutive.prefix}${consecutive.last_inserted}`
                    const new_last_inserted = consecutive.last_inserted + 1
                    /* SE ACTUALIZA EL CONSECUTIVO */
                    await this._consecutiveService.update(consecutive.id, {
                        description: consecutive.description,
                        name: consecutive.name,
                        prefix: consecutive.prefix,
                        last_inserted: new_last_inserted
                    })
                    /* SE CREA EL HEADER */
                    const header_res = await this._headerService.create({
                        kind_movements_id,
                        number_order: new_number_order,
                        observation,
                        person_id
                    })
                    /*  SE CREA EL MOVIMIENTO */
                    movementSaved = await this._movementsService.create({
                        header_id: header_res.id,
                        product_id,
                        quantity,
                        quantity_returned: 0,
                        total_purchasePrice,
                        unit_price,
                        status_id,
                        amount_used : 0,
                        suggest_generated : 0,
                        suggest_units : 0,
                        waste_quantity : 0,
                        person_id : null,
                        observation: null
                    })
    
                    await this._productsService.update(product_id, {
                        current_existence: product.current_existence - quantity,
                        description: product.description,
                        isderivate: product.isderivate,
                        name: product.name,
                        product_parent_id: product.product_parent_id,
                        purchase_unit_id: product.purchase_unit_id,
                        reserved_quantity: product.reserved_quantity,
                        sale_unit_id: product.sale_unit_id,
                        sku: product.sku,
                        user_id: product.user_id,
                        code_bar: product.code_bar,
                        to_discount: product.to_discount,
                        waste_quantity: product.waste_quantity,
                        sale_price : product.sale_price,
                        actived : product.actived
                    })
    
    
    
    
    
    
                } else {
    
                    const check_order_number = await this._headerService.findByOrderNumber(number_order)
                    new_number_order = number_order
    
                    if (!check_order_number) {
                        /* SE CREA EL HEADER */
                        const header_res = await this._headerService.create({
                            kind_movements_id,
                            number_order,
                            observation,
                            person_id,
                        })
    
                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: header_res.id,
                            product_id,
                            quantity,
                            quantity_returned: 0,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation: null
                        })
    
                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence - quantity,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price : product.sale_price,
                            actived : product.actived
                        })
                    } else {
                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: check_order_number.id,
                            product_id,
                            quantity,
                            quantity_returned: 0,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation: null
                        })
    
                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence - quantity,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price : product.sale_price,
                            actived : product.actived
                        })
                    }
                }
            }



           
        }


        //SI ES ENTRADA
        if (classification_kindmovement_id === 1) {
            const mov_header = await this._movementsService.findByheaderId(orderReturned)
            if (mov_header.quantity < body.quantity) {
                return { success: false, data: null, error: { quantity: "La cantidad no puede ser mayor cantidad comprada en la orden" } }
            } else {
                if (require_consecutive && consecutive_id && number_order === "") {
                    /* SE OBTIENE EL CONSECUTIVO */
                    const consecutive = await this._consecutiveService.findById(consecutive_id)

                    /* SE CREA EL NUMBER_ORDER */
                    new_number_order = `${consecutive.prefix}${consecutive.last_inserted}`

                    const new_last_inserted = consecutive.last_inserted + 1

                    /* SE ACTUALIZA EL CONSECUTIVO */
                    await this._consecutiveService.update(consecutive.id, {
                        description: consecutive.description,
                        name: consecutive.name,
                        prefix: consecutive.prefix,
                        last_inserted: new_last_inserted
                    })
                    /* SE CREA EL HEADER */
                    const header_res = await this._headerService.create({
                        kind_movements_id,
                        number_order: new_number_order,
                        observation,
                        person_id
                    })
                    /*  SE CREA EL MOVIMIENTO */
                    movementSaved = await this._movementsService.create({
                        header_id: header_res.id,
                        product_id,
                        quantity,
                        quantity_returned: quantity_returned,
                        total_purchasePrice,
                        unit_price,
                        status_id,
                        amount_used : 0,
                        suggest_generated : 0,
                        suggest_units : 0,
                        waste_quantity : 0,
                        person_id : null,
                        observation: null
                    })

                    await this._productsService.update(product_id, {
                        current_existence: product.current_existence,
                        description: product.description,
                        isderivate: product.isderivate,
                        name: product.name,
                        product_parent_id: product.product_parent_id,
                        purchase_unit_id: product.purchase_unit_id,
                        reserved_quantity: product.reserved_quantity + quantity,
                        sale_unit_id: product.sale_unit_id,
                        sku: product.sku,
                        user_id: product.user_id,
                        code_bar: product.code_bar,
                        to_discount: product.to_discount,
                        waste_quantity: product.waste_quantity,
                        sale_price : product.sale_price,
                        actived : product.actived
                    })






                } else {

                    const check_order_number = await this._headerService.findByOrderNumber(number_order)
                    new_number_order = number_order

                    if (!check_order_number) {
                        /* SE CREA EL HEADER */
                        const header_res = await this._headerService.create({
                            kind_movements_id,
                            number_order,
                            observation,
                            person_id,
                        })

                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: header_res.id,
                            product_id,
                            quantity,
                            quantity_returned: quantity_returned,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation: null
                        })

                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity + quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price : product.sale_price,
                            actived : product.actived
                        })
                    } else {
                        /*  SE CREA EL MOVIMIENTO */
                        movementSaved = await this._movementsService.create({
                            header_id: check_order_number.id,
                            product_id,
                            quantity,
                            quantity_returned: quantity_returned,
                            total_purchasePrice,
                            unit_price,
                            status_id,
                            amount_used : 0,
                            suggest_generated : 0,
                            suggest_units : 0,
                            waste_quantity : 0,
                            person_id : null,
                            observation: null
                        })

                        await this._productsService.update(product_id, {
                            current_existence: product.current_existence,
                            description: product.description,
                            isderivate: product.isderivate,
                            name: product.name,
                            product_parent_id: product.product_parent_id,
                            purchase_unit_id: product.purchase_unit_id,
                            reserved_quantity: product.reserved_quantity + quantity,
                            sale_unit_id: product.sale_unit_id,
                            sku: product.sku,
                            user_id: product.user_id,
                            code_bar: product.code_bar,
                            to_discount: product.to_discount,
                            waste_quantity: product.waste_quantity,
                            sale_price : product.sale_price,
                            actived : product.actived
                        })
                    }
                }


            }
        }






        return { success: true, lastmovement : movementSaved, movement: await this._movementsService.findMovementByNumberOrder(new_number_order), new_number_order }
    }

    @Post('productions')
    async createProductions(@Req() request :Request, @Body() body: any) {
        try {
            const cookie = request.cookies['jwt']

            const data = await this._usersService.verifyToken(cookie)
            if(!data)
               throw new UnauthorizedException()

               const check_settings = await this._settingsService.findByKey("ESTADO_PRODUCIDO_ACEPTADO")
               const check_settings_kind = await this._settingsService.findByKey("TIPO_MOV_SAL_PROD")

        
               const check_product_parent = await this._productsService.findById(body.product_parent_id)
               const check_product_child = await this._productsService.findById(body.product_child_id)
               let converted = 0
               let converted_waste = 0
               let converted_total_amount_used = 0
              // let converted_all_quantity_product_parent = 0
               const errors: any = []
               const operation = await this._conversionService.getOperation(check_product_parent.sale_unit_id, check_product_parent.purchase_unit_id)
               const operation_inverse = await this._conversionService.getOperation(check_product_parent.purchase_unit_id,check_product_parent.sale_unit_id)
               let new_number_order = ""

       
       
               if (check_product_child.purchase_unit_id === check_product_child.sale_unit_id) {
                   converted = body.amount_to_take
               } else {
                   if (operation){
                       converted = eval(`${body.amount_to_take}${operation.s_sign}${operation.c_conversion_quatity}`)
                       converted_waste = eval(`${body.waste_quantity}${operation.s_sign}${operation.c_conversion_quatity}`)
                       if(body.total_amount_used !== "")
                       converted_total_amount_used = eval(`${body.total_amount_used}${operation.s_sign}${operation.c_conversion_quatity}`)
       
                   }else{
                      errors.push({ field: "", msg: `esta operacion no existe en la tabla de conversion, por favor registrela` })}
               }
       
       
       
                   
                //console.log(converted)
               if (converted > check_product_parent.current_existence)
                   errors.push({ field: "amount_to_take", msg: "El padre de este producto no tiene esa cantidad" })
       
       
               if (errors.length < 1) {
                   if(body.require_consecutive && body.consecutive_id && body.number_order === "")
                   {
                        /* SE OBTIENE EL CONSECUTIVO */
                        const consecutive = await this._consecutiveService.findById(body.consecutive_id)
                        /* SE CREA EL NUMBER_ORDER */
                        new_number_order = `${consecutive.prefix}${consecutive.last_inserted}`
                        const new_last_inserted = consecutive.last_inserted + 1
                        /* SE ACTUALIZA EL CONSECUTIVO */
       
                        await this._consecutiveService.update(consecutive.id, {
                           description: consecutive.description,
                           name: consecutive.name,
                           prefix: consecutive.prefix,
                           last_inserted: new_last_inserted
                       })
       
                        const header_res = await this._headerService.create({
                           kind_movements_id : body.kind_movements_id,
                           number_order : new_number_order,
                           observation : body.observation,
                           person_id : data['id'],
                       })

                       if(body.movement_id){
                           console.log("------------------->")
                           await this._movementsService.updateMovement(body.movement_id,{
                            header_id: header_res.id,
                            product_id : body.product_child_id,
                           // quantity : body.amount_to_take,
                            quantity : parseFloat(body.units_generated),
                            quantity_returned: 0,
                            total_purchasePrice : 0,
                            unit_price : 0,
                            status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                            amount_used : parseFloat(body.amount_to_take),
                            suggest_generated : parseFloat(body.units_generated),
                            suggest_units : parseFloat(body.suggested_amount),
                            waste_quantity : parseFloat(body.waste_quantity),
                            person_id : data['id'],
                            observation: null
                           })

                           //----->

                           const header_res_update = await this._headerService.create({
                            kind_movements_id : parseInt(check_settings_kind.value),
                            number_order : new_number_order,
                            observation : body.observation,
                            person_id : data['id'],
                        })

                           await this._movementsService.create({
                            header_id: header_res_update.id,
                            product_id : body.product_parent_id,
                            //quantity : body.amount_to_take ,
                            quantity : body.amount_to_take - parseFloat(body.waste_quantity) ,
                            quantity_returned: 0,
                            total_purchasePrice : 0,
                            unit_price : 0,
                            status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                            amount_used : parseFloat(body.amount_to_take),
                            suggest_generated : parseFloat(body.units_generated),
                            suggest_units : parseFloat(body.suggested_amount),
                            waste_quantity : parseFloat(body.waste_quantity),
                            person_id : data['id'],
                            observation: null
                        
                        })




                       }else{
                        await this._movementsService.create({
                            header_id: header_res.id,
                            product_id : body.product_child_id,
                            quantity : body.amount_to_take,
                            quantity_returned: 0,
                            total_purchasePrice : 0,
                            unit_price : 0,
                            status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                            amount_used : parseFloat(body.amount_to_take),
                            suggest_generated : parseFloat(body.units_generated),
                            suggest_units : parseFloat(body.suggested_amount),
                            waste_quantity : parseFloat(body.waste_quantity),
                            person_id : data['id'],
                            observation: null
                        })
                       }
       
                     
       
                       
       
                       await this._productsService.update(check_product_parent.id,{
                           current_existence : body.total_amount_used > 0 ? check_product_parent.current_existence - (converted_total_amount_used + converted_waste) : check_product_parent.current_existence,
                           description : check_product_parent.description,
                           isderivate : check_product_parent.isderivate,
                           name : check_product_parent.name,
                           product_parent_id : check_product_parent.product_parent_id,
                           purchase_unit_id : check_product_parent.purchase_unit_id,
                           reserved_quantity : check_product_parent.reserved_quantity,
                           sale_unit_id : check_product_parent.sale_unit_id,
                           sku : check_product_parent.sku,
                           user_id : check_product_parent.user_id,
                           code_bar : check_product_parent.code_bar,
                           to_discount : check_product_parent.to_discount,
                           waste_quantity : check_product_parent.waste_quantity,
                           sale_price : check_product_parent.sale_price,
                           actived : check_product_parent.actived
                       })
                       
       
                       await this._productsService.update(check_product_child.id,{
                           current_existence : eval(`${check_product_child.current_existence} + ${parseFloat(body.units_generated)}`),
                           description : check_product_child.description,
                           isderivate : check_product_child.isderivate,
                           name : check_product_child.name,
                           product_parent_id : check_product_child.product_parent_id,
                           purchase_unit_id : check_product_child.purchase_unit_id,
                           reserved_quantity : check_product_child.reserved_quantity,
                           sale_unit_id : check_product_child.sale_unit_id,
                           sku : check_product_child.sku,
                           user_id : check_product_child.user_id,
                           code_bar : check_product_child.code_bar,
                           to_discount : check_product_child.to_discount,
                           waste_quantity : check_product_child.waste_quantity,
                           sale_price : check_product_child.sale_price,
                           actived : check_product_child.actived
                       })
                   }else{
                       const check_order_number = await this._headerService.findByOrderNumber(body.number_order)
                       new_number_order = body.number_order
       
                       if (!check_order_number) {
                           const header_res = await this._headerService.create({
                               kind_movements_id : body.kind_movements_id,
                               number_order : body.number_order,
                               observation : body.observation,
                               person_id : data['id'],
                           })

                           if(body.movement_id){
                            await this._movementsService.updateMovement(body.movement_id,{
                             header_id: header_res.id,
                             product_id : body.product_child_id,
                             quantity : parseFloat(body.units_generated),
                             quantity_returned: 0,
                             total_purchasePrice : 0,
                             unit_price : 0,
                             status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                             amount_used : parseFloat(body.amount_to_take),
                             suggest_generated : parseFloat(body.units_generated),
                             suggest_units : parseFloat(body.suggested_amount),
                             waste_quantity : parseFloat(body.waste_quantity),
                             person_id : data['id'],
                             observation: null
                            })
                            //--------------------------------------
                               //----->

                           const header_res_update = await this._headerService.create({
                            kind_movements_id : parseInt(check_settings_kind.value),
                            number_order : new_number_order,
                            observation : body.observation,
                            person_id : data['id'],
                        })

                           await this._movementsService.create({
                            header_id: header_res_update.id,
                            product_id : body.product_parent_id,
                            //quantity : body.amount_to_take ,
                            quantity : body.amount_to_take - parseFloat(body.waste_quantity) ,
                            quantity_returned: 0,
                            total_purchasePrice : 0,
                            unit_price : 0,
                            status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                            amount_used : parseFloat(body.amount_to_take),
                            suggest_generated : parseFloat(body.units_generated),
                            suggest_units : parseFloat(body.suggested_amount),
                            waste_quantity : 0,
                            person_id : data['id'],
                            observation: null
                        
                        })

                        }else{
                         await this._movementsService.create({
                             header_id: header_res.id,
                             product_id : body.product_child_id,
                             quantity : body.amount_to_take,
                             quantity_returned: 0,
                             total_purchasePrice : 0,
                             unit_price : 0,
                             status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                             amount_used : parseFloat(body.amount_to_take),
                             suggest_generated : parseFloat(body.units_generated),
                             suggest_units : parseFloat(body.suggested_amount),
                             waste_quantity : parseFloat(body.waste_quantity),
                             person_id : data['id'],
                             observation: null
                         })
                        }
       
                           /*await this._movementsService.create({
                               header_id: header_res.id,
                               product_id : body.product_child_id,
                               quantity : body.amount_to_take,
                               quantity_returned: 0,
                               total_purchasePrice : 0,
                               unit_price : 0,
                               status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                               amount_used : parseFloat(body.amount_to_take),
                               suggest_generated : parseFloat(body.units_generated),
                               suggest_units : parseFloat(body.suggested_amount),
                               waste_quantity : parseFloat(body.waste_quantity),
                               person_id : data['id'],
                               observation: null
                           })*/
       
                           await this._productsService.update(check_product_parent.id,{
                               current_existence : body.total_amount_used > 0 ? check_product_parent.current_existence - (converted_total_amount_used + converted_waste) : check_product_parent.current_existence,
                               description : check_product_parent.description,
                               isderivate : check_product_parent.isderivate,
                               name : check_product_parent.name,
                               product_parent_id : check_product_parent.product_parent_id,
                               purchase_unit_id : check_product_parent.purchase_unit_id,
                               reserved_quantity : check_product_parent.reserved_quantity,
                               sale_unit_id : check_product_parent.sale_unit_id,
                               sku : check_product_parent.sku,
                               user_id : check_product_parent.user_id,
                               code_bar : check_product_parent.code_bar,
                               to_discount : check_product_parent.to_discount,
                               waste_quantity : check_product_parent.waste_quantity,
                               sale_price : check_product_parent.sale_price,
                               actived : check_product_parent.actived
                           })
       
                           await this._productsService.update(check_product_child.id,{
                               current_existence :  eval(`${check_product_child.current_existence} + ${parseFloat(body.units_generated)}`),
                               //current_existence : eval(`${check_product_child.current_existence} + ${parseFloat(body.suggested_amount)}`),
                               description : check_product_child.description,
                               isderivate : check_product_child.isderivate,
                               name : check_product_child.name,
                               product_parent_id : check_product_child.product_parent_id,
                               purchase_unit_id : check_product_child.purchase_unit_id,
                               reserved_quantity : check_product_child.reserved_quantity,
                               sale_unit_id : check_product_child.sale_unit_id,
                               sku : check_product_child.sku,
                               user_id : check_product_child.user_id,
                               code_bar : check_product_child.code_bar,
                               to_discount : check_product_child.to_discount,
                               waste_quantity : check_product_child.waste_quantity,
                               sale_price : check_product_child.sale_price,
                               actived : check_product_child.actived
                           })
       
       
       
       
                       }else{
                           /*await this._movementsService.create({
                               header_id: check_order_number.id,
                               product_id : body.product_child_id,
                               quantity : body.amount_to_take,
                               quantity_returned: 0,
                               total_purchasePrice : 0,
                               //total_purchasePrice : body.total_purchase_price,
                               //unit_price : parseFloat(body.total_purchase_price)/converted,
                               unit_price : 0,
                               status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                               amount_used : parseFloat(body.amount_to_take),
                              // suggest_generated : parseFloat(body.suggested_amount),
                              // suggest_units : parseFloat(body.units_generated),
                              
                           suggest_generated : parseFloat(body.units_generated),
                           suggest_units : parseFloat(body.suggested_amount),
                               waste_quantity : parseFloat(body.waste_quantity),
                               person_id : data['id'],
                               observation: null
                           })*/

                           if(body.movement_id){
                            await this._movementsService.updateMovement(body.movement_id,{
                             header_id: check_order_number.id,
                             product_id : body.product_child_id,
                             quantity : parseFloat(body.units_generated),
                             quantity_returned: 0,
                             total_purchasePrice : 0,
                             unit_price : 0,
                             status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                             amount_used : parseFloat(body.amount_to_take),
                             suggest_generated : parseFloat(body.units_generated),
                             suggest_units : parseFloat(body.suggested_amount),
                             waste_quantity : parseFloat(body.waste_quantity),
                             person_id : data['id'],
                             observation: null
                            })
                               //--------------------------------------
                               //----->

                           const header_res_update = await this._headerService.create({
                            kind_movements_id : parseInt(check_settings_kind.value),
                            number_order : new_number_order,
                            observation : body.observation,
                            person_id : data['id'],
                        })

                           await this._movementsService.create({
                            header_id: header_res_update.id,
                            product_id : body.product_parent_id,
                            //quantity : body.amount_to_take ,
                            quantity : body.amount_to_take - parseFloat(body.waste_quantity) ,
                            quantity_returned: 0,
                            total_purchasePrice : 0,
                            unit_price : 0,
                            status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                            amount_used : parseFloat(body.amount_to_take),
                            suggest_generated : parseFloat(body.units_generated),
                            suggest_units : parseFloat(body.suggested_amount),
                            waste_quantity : 0,
                            person_id : data['id'],
                            observation: null
                        
                        })

                        }else{
                         await this._movementsService.create({
                             header_id: check_order_number.id,
                             product_id : body.product_child_id,
                             quantity : body.amount_to_take,
                             quantity_returned: 0,
                             total_purchasePrice : 0,
                             unit_price : 0,
                             status_id : body.total_amount_used > 0 ? parseInt(check_settings.value) : body.status_id,
                             amount_used : parseFloat(body.amount_to_take),
                             suggest_generated : parseFloat(body.units_generated),
                             suggest_units : parseFloat(body.suggested_amount),
                             waste_quantity : parseFloat(body.waste_quantity),
                             person_id : data['id'],
                             observation: null
                         })
                        }
       
                           await this._productsService.update(check_product_parent.id,{
                               current_existence : body.total_amount_used > 0 ? check_product_parent.current_existence - (converted_total_amount_used + converted_waste) : check_product_parent.current_existence,
                               description : check_product_parent.description,
                               isderivate : check_product_parent.isderivate,
                               name : check_product_parent.name,
                               product_parent_id : check_product_parent.product_parent_id,
                               purchase_unit_id : check_product_parent.purchase_unit_id,
                               reserved_quantity : check_product_parent.reserved_quantity,
                               sale_unit_id : check_product_parent.sale_unit_id,
                               sku : check_product_parent.sku,
                               user_id : check_product_parent.user_id,
                               code_bar : check_product_parent.code_bar,
                               to_discount : check_product_parent.to_discount,
                               waste_quantity : check_product_parent.waste_quantity,
                               sale_price : check_product_parent.sale_price,
                               actived : check_product_parent.actived
                           })
       
                           await this._productsService.update(check_product_child.id,{
                               current_existence :  eval(`${check_product_child.current_existence} + ${parseFloat(body.units_generated)}`),
                               //current_existence : eval(`${check_product_child.current_existence} + ${parseFloat(body.suggested_amount)}`),
                               description : check_product_child.description,
                               isderivate : check_product_child.isderivate,
                               name : check_product_child.name,
                               product_parent_id : check_product_child.product_parent_id,
                               purchase_unit_id : check_product_child.purchase_unit_id,
                               reserved_quantity : check_product_child.reserved_quantity,
                               sale_unit_id : check_product_child.sale_unit_id,
                               sku : check_product_child.sku,
                               user_id : check_product_child.user_id,
                               code_bar : check_product_child.code_bar,
                               to_discount : check_product_child.to_discount,
                               waste_quantity : check_product_child.waste_quantity,
                               sale_price : check_product_child.sale_price,
                               actived : check_product_child.actived
                           })
       
                       }


                       
                   
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
                   }

                   let converted_quantity = 0

                   if (check_product_parent.purchase_unit_id === check_product_parent.sale_unit_id) {
                    converted_quantity = body.amount_to_take
                } else {
                    if (operation_inverse){
                        converted_quantity = eval(`(${check_product_parent.current_existence}-(${converted_total_amount_used}+${converted_waste}))${operation_inverse.s_sign}${operation_inverse.c_conversion_quatity}`)
                        
                       
        
                    }else{
                       errors.push({ field: "", msg: `esta operacion no existe en la tabla de conversion, por favor registrela` })}
                }

                  
       
                   return { 
                       success: true, 
                       current_quantity : body.total_amount_used > 0 ? check_product_parent.current_existence - (converted_total_amount_used + converted_waste) : check_product_parent.current_existence ,
                       coverted_quantity : converted_quantity,
                       movement: await this._movementsService.findMovementByNumberOrder(new_number_order), new_number_order }
               } else {
                   return { success: false, data: null, errors }
               }
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException()
        }
    }





    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            const movement = await this._movementsService.findById(id)
            const product = await this._productsService.findById(movement.product_id)
            

            if(!product.isderivate && !product.product_parent_id){
               
                await this._productsService.update(product.id,{
                    current_existence : product.current_existence - movement.quantity,
                    description : product.description,
                    isderivate : product.isderivate,
                    name : product.name,
                    product_parent_id : product.product_parent_id,
                    purchase_unit_id : product.purchase_unit_id,
                    reserved_quantity : product.reserved_quantity,
                    sale_unit_id : product.sale_unit_id,
                    sku : product.sku,
                    user_id : product.user_id,
                    code_bar : product.code_bar,
                    to_discount : product.to_discount,
                    waste_quantity : product.waste_quantity,
                    sale_price : product.sale_price,
                    actived : product.actived
                })
            
                //console.log(converted)
            
            }else{

                const transform_units = await this._conversionService.getOperation(product.sale_unit_id, product.purchase_unit_id)
                let converted = 0

                if (product.sale_unit_id === product.purchase_unit_id) {
                    converted = movement.quantity
                } else {
                    if (transform_units)
                        converted = eval(`${movement.quantity}${transform_units.s_sign}${transform_units.c_conversion_quatity}`)
                    else
                       return { field: "", msg: `esta operacion no existe en la tabla de conversion, por favor registrela` }
                }


                const check_product = await this._productsService.findById(product.product_parent_id)


                await this._productsService.update(product.id,{
                    current_existence : product.current_existence - converted,
                    description : product.description,
                    isderivate : product.isderivate,
                    name : product.name,
                    product_parent_id : product.product_parent_id,
                    purchase_unit_id : product.purchase_unit_id,
                    reserved_quantity : product.reserved_quantity,
                    sale_unit_id : product.sale_unit_id,
                    sku : product.sku,
                    user_id : product.user_id,
                    code_bar : product.code_bar,
                    to_discount : product.to_discount,
                    waste_quantity : product.waste_quantity,
                    sale_price : product.sale_price,
                    actived : product.actived
                })

                await this._productsService.update(product.product_parent_id,{
                    current_existence : check_product.current_existence + converted,
                    description : check_product.description,
                    isderivate : check_product.isderivate,
                    name : check_product.name,
                    product_parent_id : check_product.product_parent_id,
                    purchase_unit_id : check_product.purchase_unit_id,
                    reserved_quantity : check_product.reserved_quantity,
                    sale_unit_id : check_product.sale_unit_id,
                    sku : check_product.sku,
                    user_id : check_product.user_id,
                    code_bar : check_product.code_bar,
                    to_discount : check_product.to_discount,
                    waste_quantity : check_product.waste_quantity,
                    sale_price : check_product.sale_price,
                    actived : check_product.actived
                })
            }
            //console.log(movement)
            //console.log(product)

            await this._movementsService.delete(id)

            return { success: true, data: null, error: null }
        } catch (error) {
            return { success: false, data: null, error: "Debe eliminar todos los registros que deveriven de este" }
        }
    }

    @Get(':number_order')
    async findMovementByNumberOrder(@Param('number_order') number_order: string) {
        return await this._movementsService.findMovementByNumberOrder(number_order)
    }

    @Get('header/:person_id')
    async findByPersonId(@Param('person_id') person_id: number) {
        return await this._headerService.findByPersonId(person_id)
    }

    @Get('header/findByPersonOutPuts/:person_id')
    async findByPersonOutPuts(@Param('person_id') person_id: number)
    {
        return await this._headerService.findByPersonOutPuts(person_id)
    }

    @Get('header/product/:header_id')
    async findByHeader(@Param('header_id') header_id: number) {
        console.log(header_id)
        return await this._productsService.findByHeader(header_id)
    }


    @Get()
    async findAll(@Query() req) {
        return await this._movementsService.findAll(req._page, req._limit)
    }


    @Get('findStartedMovements/:product_parent_id')
    async findStartedMovements(@Param('product_parent_id') product_parent_id: number) {
        return await this._movementsService.findStartedMovements(product_parent_id)
    }


    @Put('productionrejected/:movement_id')
    async productionRejected(@Param('movement_id') movement_id: number, @Body() body:any)
    {
        try {
            
        await this._movementsService.updateProductionRejeted(movement_id, body)
        } catch (error) {
            console.log(error)
        }

        return { success: true, data : null, error : null }
    }

    @Put('changeStatusMovement/:movement_id')
    async changeStatusMovement(@Param('movement_id') movement_id: number, @Body() body: any)
    {
        const { status_id } = body

        this._movementsService.changeStatusMovement(movement_id, status_id)
       
        return { success : true, data : null, error : null }
        
    }





}
