



export class MovementsRequest {
    id?: number
    /* tipo de movimiento */
    require_consecutive: boolean
    consecutive_id : number
    status_id : number
    classification_kindmovement_id : number

    /*  header */
    person_id: number
    number_order: string 
    kind_movements_id: number
    observation: string

    /* consecutivo

        prefix : string
        last_inserted? : number
     */

    /*  movement */

    product_id: number
    quantity: number;
    total_purchasePrice: number;
    unit_price: number;
    //header_id: number
    quantity_returned: number;
    


    
}