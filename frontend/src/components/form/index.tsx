import { useFormik } from "formik";
import { initialFValuesTypes } from "../../types/initialFValues";

export function UseForm(initialFValues :initialFValuesTypes, validationSchema : initialFValuesTypes, onsubmit : any){
    
    const formik = useFormik({
        initialValues : initialFValues,
        validateOnBlur : true,
        onSubmit : onsubmit,
        validationSchema : validationSchema
    })


    return formik
}
