import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ConcecutiveSchema: initialFValuesTypes = yup.object({
    name: yup.string().required("Este campo es requerido"),
    description: yup.string().required("Este campo es requerido"),
    prefix : yup.string().required("Este campo es requerido")
})