import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const KindMovementsSchema: initialFValuesTypes = yup.object({
   
    description : yup.string().required("Este campo es requerido"),
    name : yup.string().required("Este campo es requerido"),
    status_id : yup.number().required("Este campo es requerido"),
    roles_id : yup.number().required("Este campo es requerido"),
    classificationkindmovement_id : yup.number().required("Este campo es requerido"),
})