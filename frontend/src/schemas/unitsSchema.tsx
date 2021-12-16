import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const UnitsSchema: initialFValuesTypes = yup.object({
    code: yup.string().required("Este campo es requerido"),
    description: yup.string().required("Este campo es requerido")
})