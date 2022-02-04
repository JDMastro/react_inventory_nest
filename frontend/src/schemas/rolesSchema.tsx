import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const RolesSchema: initialFValuesTypes = yup.object({
    name: yup.string().required("¡Este campo es requerido!"),
})