import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const SettingsSchema: initialFValuesTypes = yup.object({
    value : yup.number().required("Este campo es requerido"), 
    description : yup.string().required("Este campo es requerido")
})