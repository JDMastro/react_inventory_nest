import { initialFValuesTypes } from "../types/initialFValues";
import * as yup from "yup";


export const SettingStatusnSchema: initialFValuesTypes = yup.object({
    status_parent_id: yup.number().required("Este campo es requerido")
        .test({
            message: "El satdo padre no puede ser igual al hijo",
            test: (value: any, ctx: any) => value !== ctx.parent.status_child_id
        }),
    status_child_id: yup.number().required("Este campo es requerido")
        .test({
            message: "El satdo hijo no puede ser igual al padre",
            test: (value: any, ctx: any) => value !== ctx.parent.status_parent_id
        }),
})