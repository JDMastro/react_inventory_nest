import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const UsersSchema: initialFValuesTypes = yup.object({
    code: yup.string().required("Este campo es requerido"),
    email: yup.string().email("¡Por favor ingresa un correo valido!").required("Este campo es requerido"),
    password: yup.string().matches(PASSWORD_REGEX, "Por favor ingrese una contrasea min de 8 digitos que tenga minimo una letra mayúscula").required("Este campo es requerido"),
    confirmpassword: yup.string().required("por favor confirme la contraseña")
        .when("password", {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
        }),

    kind_id: yup.number().required("Este campo es requerido"),
    idnumber: yup.string().required("Este campo es requerido"),
    name: yup.string().required("Este campo es requerido"),
    first_surname: yup.string().required("Este campo es requerido"),
    address: yup.string().required("Este campo es requerido"),
    phone: yup.string().required("Este campo es requerido"),
    contact: yup.string().required("Este campo es requerido"),
})