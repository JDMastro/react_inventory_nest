import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ouputsSchema: initialFValuesTypes = yup.object({
    status_id: yup.number().required("Este campo es requerido"),
    person_id: yup.number().required("Este campo es requerido")
})