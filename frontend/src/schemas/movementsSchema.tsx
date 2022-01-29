import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const movementsSchema: initialFValuesTypes = yup.object({
    /*nit : yup.string().required("Nit is required!"),
    name : yup.string().required("Name is required!"),*/
    kindmovements : yup.number().required("This field is required!"),
    idperson : yup.number().required("This field is required!"),
    //number_order : yup.number().required("This field is required!"),
    idproduct : yup.number().required("This field is required!"),
    quantity : yup.number().positive().required("This field is required!"),
         
    totalPrice : yup.number().positive().required("This field is required!"),
    observation : yup.string().required("This field is required!")
    //unitprice : yup.number().required("This field is required!"),
})