import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const KindIdSchema: initialFValuesTypes = yup.object({
    description : yup.string().required("Este campo es requerido"),
    code : yup.string().required("Este campo es requerido")
})