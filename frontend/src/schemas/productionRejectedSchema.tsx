import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const ProductionRejectedsSchema: initialFValuesTypes = yup.object({
   
    observation : yup.string().required("Este campo es requerido")
})