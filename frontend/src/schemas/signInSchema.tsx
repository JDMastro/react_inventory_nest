import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const SignInSchema: initialFValuesTypes = yup.object({
    email_signin: yup.string().email("¡Por favor ingresa un correo valido!").required("¡Este campo es requerido!"),
    password_signin: yup.string().required("¡Este campo es requerido!")
})