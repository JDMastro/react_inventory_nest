import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ConversionSchema: initialFValuesTypes = yup.object({
    conversion_from: yup.number().required("Este campo es requerido"),
    conversion_to: yup.number().required("Este campo es requerido"),
    conversion_quatity: yup.number().positive().required("Este campo es requerido"),
    signs_id: yup.number().required("Este campo es requerido")
})