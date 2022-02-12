import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";

const today = new Date()

export const ReportsSchema: initialFValuesTypes = yup.object({ 
 // product_parent_id: yup.number().required("Este campo es requerido"),
  status_id : yup.number().required("Este campo es requerido"), 
  startDate : yup.date().required("Este campo es requerido").max(today, "La fecha no puede ser mayor a la actual"), 
  finishDate : yup.date().required("Este campo es requerido").max(today, "La fecha no puede ser mayor a la actual"), 
})
