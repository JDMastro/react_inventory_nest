import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Products } from "../entities/products.entity";
import { ProductsDto } from "../dto/product.dto";
import { Units } from "../../units/entities/units.entity";
import { Header } from "../../header/entities/header.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private _productsRepo: Repository<Products>,
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

    async findProductByDerivate(isderivate: boolean) {
        //return await this._productsRepo.find({ isderivate })
        return await getManager().createQueryBuilder("products", "p")
            .select(["u.id as purchase_id", "u2.id as sale_id", "p.id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
                "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount"])
            .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
            .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
            .where("p.isderivate = :isderivate", { isderivate })
            .getRawMany()
    }

    async findProductByParent(parent_id : number)
    {
        return await getManager().createQueryBuilder("products", "p")
        .select(["u.id as purchase_id", "u2.id as sale_id", "p.id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
            "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount"])
        .innerJoin(Units, "u", "u.id = p.purchase_unit_id ")
        .innerJoin(Units, "u2", "u2.id = p.sale_unit_id")
        .where("p.product_parent_id = :parent_id", { parent_id })
        .getRawMany()
    }

    async findByHeader(header_id : number)
    {
        return getManager().createQueryBuilder("movements","m")
        .select(["u.id as purchase_id", "u2.id as sale_id", "p.id", "p.name", "p.description", "p.sku", "p.code_bar", "p.current_existence", "p.reserved_quantity",
                "u.code as purchase_unit", "u2.code as sale_unit", "p.to_discount"])
                   .innerJoin(Products, "p", "m.product_id = p.id")
                   .innerJoin(Header, "h", "h.id = m.header_id")
                   .innerJoin(Units, "u", "p.purchase_unit_id = u.id ")
                   .innerJoin(Units, "u2", "p.sale_unit_id = u2.id")
                   .where("h.id = :header_id", { header_id })
                   .getRawMany()
    }

    async create(body: ProductsDto) {
        const { code_bar,
            description, isderivate, name,
            product_parent_id, purchase_unit_id,
            sale_unit_id, sku, user_id, to_discount } = body

        return await this._productsRepo.save({
            code_bar, current_existence : 0,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity : 0,
            sale_unit_id, sku, user_id,
            to_discount
        })
    }

    async update(id: number, body: ProductsDto) {
        const { code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount } = body

        const product = await this._productsRepo.findOne(id)

        await this._productsRepo.merge(product, {
            code_bar, current_existence,
            description, isderivate, name,
            product_parent_id, purchase_unit_id, reserved_quantity,
            sale_unit_id, sku, user_id, to_discount
        })

        return await this._productsRepo.save(product)
    }

    async delete(id: number) {
        await this._productsRepo.delete(id)
        return true
    }


}