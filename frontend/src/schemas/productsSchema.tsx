import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";

export const ProductsDadSchema: initialFValuesTypes = yup.object({ 
 // product_parent_id: yup.number().required("Este campo es requerido"),
  description : yup.string().required("Este campo es requerido"), 
  name : yup.string().required("Este campo es requerido"),
  purchase_unit_id : yup.number().required("Este campo es requerido"), 
  sale_unit_id: yup.number().required("Este campo es requerido"), 
  sku : yup.string().required("Este campo es requerido"), 
  sale_price : yup.number().required("Este campo es requerido")
})

export const ProductsChildSchema: initialFValuesTypes = yup.object({
  description : yup.string().required("Este campo es requerido"),
  name : yup.string().required("Este campo es requerido"),
  to_discount : yup.number().required("Este campo es requerido"), 
  sale_unit_id: yup.number().required("Este campo es requerido"),
  sku : yup.string().required("Este campo es requerido"),
})


export const ProductFilterSchema : initialFValuesTypes = yup.object({
  product_parent_id : yup.number().required("Este campo es requerido")
})