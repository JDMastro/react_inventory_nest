



export class MovementsDto {
    id?: number
   
    product_id: number
    quantity: number;
    total_purchasePrice: number;
    unit_price: number;
    header_id: number
    quantity_returned: number;
    status_id : number

    suggest_units : number
    suggest_generated : number
    amount_used : number
    waste_quantity : number


    person_id : number
    observation : string
}