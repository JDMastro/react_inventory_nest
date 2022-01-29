import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { Products } from "../entities/products.entity";
import { ProductsDto } from "../dto/product.dto";
import { Units } from "../../units/entities/units.entity";
import { Header } from "../../header/entities/header.entity";
import { Movements } from 'src/movements/entities/movements.entity';
//import { IsNull } from "typeorm";

import { SettingsService } from '../../settings/service/settings.service'

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private _productsRepo: Repository<Products>,
        private _settingsService : SettingsService
    ) { }

    async findBySku(sku: string) {
        return await this._productsRepo.findOne({ sku })
    }

    async findById(id : number){
        return await this._productsRepo.findOne(id)
    }

    async findByName(name: string) {
        return await this._productsRepo.findOne({ name })
    }

    async getByStatusSuggest(person_id:number, product_parent_id : number)
    {

        const status_id = await this._settingsService.findByKey("ESTADO_SUGERIDO")
        
        //cambiar este query, quitar person_id de movements
        return await getManager().createQueryBuilder("products" ,"p")
          //.select(["m.id","h.number_order","p.to_discount","p.name" , "p.id", "m.suggest_units", "m.suggest_generated", "m.amount_used", "m.waste_quantity"])
          .distinct(true)
          .select([`case when m.status_id = ${parseInt(status_id.value)} then m.id else null end as id`,
          `case when m.status_id = ${parseInt(status_id.value)} then h.number_order else '' end as number_order`,
          "p.to_discount","p.name", "p.id as producto_id,m.suggest_units","m.suggest_generated",
          `case when m.status_id = ${parseInt(status_id.value)} then m.amount_used else 0 end as amount_used`,
          `case when m.status_id = ${parseInt(status_id.value)} then m.waste_quantity else 0 end as waste_quantity`])
          .leftJoin(Movements, "m", `p.id = m.product_id and (m.person_id = ${person_id} or m.person_id = null) and (m.status_id=${parseInt(status_id.value)} or m.status_id is null)`)
          .leftJoin(Header, "h", `h.person_id = ${person_id} AND m.header_id = h.id`)
          
          //.where(`p.product_parent_id = ${product_parent_id} and (m.status_id = ${parseInt(status_id.value)} or m.status_id is null)`)
          .where(`p.product_parent_id = ${product_parent_id}`)
          //.andWhere("(m.status_id = :status_id", { status_id : parseInt(status_id.value) })
          //.orWhere("m.status_id m.status_id is null)")
          //.groupBy(["p.id", "m.suggest_units" , "m.suggest_generated", "m.amount_used", "m.waste_quantity"])
          
          .orderBy("p.name", 'ASC')
          .groupBy("p.id")
          .addGroupBy("p.name")
          .addGroupBy("m.suggest_units")
          .addGroupBy("m.suggest_generated")
          .addGroupBy("m.amount_used")
          .addGroupBy("m.waste_quantity")
          .addGroupBy("h.number_order")
          .addGroupBy("m.id")
          .getRawMany()
    }

   async findAllWithPagination(page : number, perPage : number) {
        //return await this._productsRepo.find({ isderivate })
        const data = await getManager().createQueryBuilder("products", "p")
            .select(["u.id as purchase_id", "u2.id as sale_id", "p.id as id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
                "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount", "p.sale_price", "p.actived"])
            .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
            .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
            .where("p.isderivate = :isderivate", { isderivate : false })
            .orderBy("p.name", 'ASC')
            .offset((page - 1) * perPage)
            .limit(perPage)

            const total = await data.getCount()
            return {
                data : await data.getRawMany(),
                total,
                page_count : perPage,
                current_page : page,
                last_page : Math.ceil(total/perPage)
              }
    }

    async findProductByDerivate(isderivate : boolean) {
        //return await this._productsRepo.find({ isderivate })
         return  await getManager().createQueryBuilder("products", "p")
            .select(["u.id as purchase_id", "u2.id as sale_id", "p.id as id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
                "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount", "p.sale_price", "p.actived"])
            .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
            .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
            .where("p.isderivate = :isderivate", { isderivate })
            .orderBy("p.name", 'ASC')
            .getRawMany()
    }
    
    async findProductParentProducction()
    {
        const status_id = await this._settingsService.findByKey("ESTADO_SUGERIDO")

        return await getManager().createQueryBuilder("products","p")
           .select(["u.id as purchase_id", "u2.id as sale_id", "p.id", "p.name", 
           "p.description","p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
           "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount", "total_amount_used"
           ])
           .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
           .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
           //.leftJoin("x","(select p2.product_parent_id ,sum(m.amount_used) as total_amount_used from movements m inner join products p2 on m.product_id = p2.id and not p2.product_parent_id isnull where m.status_id = 4 group by p2.product_parent_id) x on x.product_parent_id = p.id")
           .leftJoinAndSelect(subQuery => {
               return subQuery.from("movements", "m")
                 .select(["p2.product_parent_id as product_parent_id" ,"sum(m.amount_used) as total_amount_used"])
                 .innerJoin(Products, "p2", "m.product_id = p2.id and not p2.product_parent_id isnull")
                 .where("m.status_id = :status_id",{ status_id : parseInt(status_id.value) })
                 .groupBy("p2.product_parent_id")
           },"x","x.product_parent_id = p.id")
           .where("p.isderivate = :isderivate", { isderivate : false })
           .orderBy("p.name", 'ASC')
           .getRawMany()
    }

    async findProductByParent(parent_id : number)
    {
        return { data : await getManager().createQueryBuilder("products", "p")
        .select(["u.id as purchase_id", "u2.id as sale_id", "p.id as id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
            "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount", "p.sale_price", "p.actived"])
        .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
        .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
        .where("p.product_parent_id = :parent_id", { parent_id })
        .orderBy("p.name", 'ASC')
        .getRawMany() }
    }

    async findByHeader(header_id : number)
    {
        return getManager().createQueryBuilder("movements","m")
        .select(["m.unit_price",
                 "u.id as purchase_id", 
                 "u2.id as sale_id", 
                 "p.id as id", "p.name", 
                 "p.description", "p.sku", 
                 "p.code_bar", "p.current_existence", 
                 "p.reserved_quantity",
                "u.code as purchase_unit", 
                "u2.code as sale_unit",
                 "p.to_discount", 
                 "m.unit_price", "p.sale_price"])
                   .innerJoin(Products, "p", "m.product_id = p.id")
                   .innerJoin(Header, "h", "h.id = m.header_id")
                   .innerJoin(Units, "u", "p.purchase_unit_id = u.id ")
                   .innerJoin(Units, "u2", "p.sale_unit_id = u2.id")
                   .where("h.id = :header_id", { header_id })
                   .orderBy("p.name", 'ASC')
                   .getRawMany()
    }

    async getLastSaved(id: number)
    {
        return await getManager().createQueryBuilder("products", "p")
        .select(["p.actived","u.id as purchase_id", "u2.id as sale_id", "p.id as id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
            "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount", "p.sale_price"])
        .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
        .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
        .where("p.id = :id", { id })
        .getRawOne()
    }

    async create(body: ProductsDto) {
        const { code_bar,
            description, isderivate, name,
            product_parent_id, purchase_unit_id,
            sale_unit_id, sku, user_id, to_discount, sale_price } = body

        
            const product = await this._productsRepo.save({
                code_bar, current_existence : 0,
                description, isderivate, name,
                product_parent_id, purchase_unit_id, reserved_quantity : 0,
                sale_unit_id, sku, user_id,
                to_discount,
                sale_price
            })

            const lastSaved = await this.getLastSaved(product.id)

           

        return lastSaved
    }

    async update(id: number, body: ProductsDto) {
        const { code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount, sale_price, actived } = body

        const product = await this._productsRepo.findOne(id)

        //console.log(product)
        if(!product.isderivate && !product.product_parent_id)
        {
            await this._productsRepo.merge(product, {
                code_bar, current_existence,
                description, isderivate, name,
                product_parent_id, purchase_unit_id, reserved_quantity,
                sale_unit_id, sku, user_id, to_discount,
                sale_price,
                actived
            })

            await getConnection().createQueryBuilder()
              .update(Products)
              .set({ purchase_unit_id : product.sale_unit_id, actived : actived })
              .where("product_parent_id = :parent_id",{ parent_id : product.id })
              .execute()

        }else{
            await this._productsRepo.merge(product, {
                code_bar, current_existence,
                description, isderivate, name,
                product_parent_id, purchase_unit_id, reserved_quantity,
                sale_unit_id, sku, user_id, to_discount,
                sale_price,
                actived
            })
        }

        /*await this._productsRepo.merge(product, {
            code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount,
            sale_price
        })*/

        await this._productsRepo.save(product)

        return await this.getLastSaved(id)
    }

    async delete(id: number) {
        //await this._productsRepo.delete(id)

        /*const product = await this._productsRepo.findOne(id)
        const movements = await getManager().createQueryBuilder("movements","m")
           .where("product_id = :id",{ id })
           .getRawMany()


        if(movements.length > 0 && product.isderivate)
        {
           await this._productsRepo.update(id,{ actived : false })
           return true
        }

        await this._productsRepo.delete(id)*/

        //if(product.)
        const product = await this._productsRepo.findOne(id)


        //console.log(product)
        if(!product.isderivate && !product.product_parent_id)
        {
            await this._productsRepo.merge(product, {
                actived : false
            })

            await getConnection().createQueryBuilder()
              .update(Products)
              .set({ actived : false })
              .where("product_parent_id = :parent_id",{ parent_id : product.id })
              .execute()

        }else{
            await this._productsRepo.merge(product, {
                actived : false
            })
        }
        await this._productsRepo.save(product)
        return await this.getLastSaved(id)
    }


}