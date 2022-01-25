


export class ProductsDto {
    id?: number    
    name: string;
    description: string;
    sku: string;
    code_bar?: string;
    current_existence: number;
    reserved_quantity: number;
    purchase_unit_id: number
    sale_unit_id: number
    product_parent_id: number
    isderivate: boolean
    user_id: number
    to_discount? : number
    waste_quantity? : number
    sale_price : number
    actived : boolean
}