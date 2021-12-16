import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const StatusSchema: initialFValuesTypes = yup.object({
    name: yup.string().required("Este campo es requerido"),
    description: yup.string().required("Este campo es requerido"),
    code : yup.string().required("Este campo es requerido")
})