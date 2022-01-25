import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ProductionsSchema: initialFValuesTypes = yup.object({
    existence_converted : yup.number().required("Este campo es requerido"),
    amount_to_take : yup.number().test({
        message : "la cant. a usar debe ser menor a la cant. existente",
        test : (value : any, ctx : any)=>{ return value <= ctx.parent.existence_converted } 
    })
    //amount_to_take : yup.number().lessThan(yup.ref('existence_converted'),'la cant. a usar debe ser menor a la cant. existente').required("Este campo es requerido")
    //units_generated : yup.number().required("Este campo es requerido"),
    //total_amount_used : yup.number().required("Este campo es requerido"),
    //waste_quantity : yup.number().required("Este campo es requerido"),
      
    //total_purchase_price : yup.number().required("Este campo es requerido"),
})

export const ProductionsWithQuantityToUsedSchema: initialFValuesTypes = yup.object({
    

    suggested_amount: yup.number().required("Este campo es requerido"),
    units_generated: yup.number().required("Este campo es requerido").test({
        message : "las unidades generadas no pueden ser mayor a las cantidades sugeridas",
        test : (value : any, ctx : any)=>{ return value <= ctx.parent.suggested_amount } 
    }),
    //units_generated : yup.number().lessThan(yup.ref('suggested_amount'),'las unidades generadas no pueden ser mayor a las cantidades sugeridas').required("Este campo es requerido"),


    amount_to_take : yup.number().required("Este campo es requerido"),
    total_amount_used : yup.number().required("Este campo es requerido").test({
        message : "la cant. total usado no debe ser mayor a cantidad a usar",
        test : (value : any, ctx : any)=>{ return value <= ctx.parent.amount_to_take } 
    }),
    //total_amount_used : yup.number().lessThan(yup.ref('amount_to_take'),'la cant. total usado no debe ser mayor a cantidad a usar').required("Este campo es requerido"),

    waste_quantity : yup.number().required("Este campo es requerido").test({
        message : "la suma de la merma más la cantidad total usada debe ser igual a la cantidad a usar",
        test : (value : any, ctx : any)=>{
            const sum = ctx.parent.total_amount_used + ctx.parent.waste_quantity
           
            return ctx.parent.amount_to_take === sum
        } 
    }),
    //waste_quantity : yup.number().required("Este campo es requerido"),

    //
      
    //total_purchase_price : yup.number().required("Este campo es requerido"),
})