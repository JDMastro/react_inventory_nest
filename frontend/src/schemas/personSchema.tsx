import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const PersonSchema: initialFValuesTypes = yup.object({
    address: yup.string().required("Este campo es requerido"),
    contact: yup.string().required("Este campo es requerido"),
    idnumber: yup.string().required("Este campo es requerido"),
    kind_id: yup.number().required("Este campo es requerido"),
    phone: yup.number().required("Este campo es requerido"),
    name: yup.string().required("Este campo es requerido"),
    first_surname: yup.string().required("Este campo es requerido"),
    roles_id: yup.number().required("Este campo es requerido")
})