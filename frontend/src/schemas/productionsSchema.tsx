import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ProductionsSchema: initialFValuesTypes = yup.object({
    amount_to_take : yup.number().required("Este campo es requerido"),
    units_generated : yup.number().required("Este campo es requerido"),
    total_amount_used : yup.number().required("Este campo es requerido"),
    waste_quantity : yup.number().required("Este campo es requerido"),
    kind_movemet_id : yup.number().required("Este campo es requerido"),
    observation : yup.string().required("Este campo es requerido"),
    total_purchase_price : yup.number().required("Este campo es requerido"),
})