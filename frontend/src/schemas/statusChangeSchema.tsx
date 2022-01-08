import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const StatusChangeSchema: initialFValuesTypes = yup.object({
    status_id : yup.number().required("Este campo es requerido"),
})