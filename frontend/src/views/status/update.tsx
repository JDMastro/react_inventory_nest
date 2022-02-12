import React, { useState } from "react";
import { Stack, Box, Grid, Divider } from '@mui/material/';
import { StatusSchema } from "../../schemas/statusSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, CheckboxUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { StatusRequest } from "../../services/statusService";
import { FormikHelpers } from "formik";


export function UpdateStatus({ onClose, data, onSubmit : on }: any)
{
    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);
    const [disablebtn, setdisablebtn] = useState(false);


    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    const handleClick = () => {
        setOpenn(true);
    };

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        //setloading(true)
        setdisablebtn(true)
        try {
            const res = await StatusRequest.update(data.id,{ code: values.code, description: values.description, name : values.name, is_to_employee : values.is_to_employee })
            if (res.success) {
                setMsg("Actualzado corrrectamente")
                handleClick()
                setdisablebtn(false)
                on("UPDATED", res.data)
                onClose()
            } else {
                formikHelpers.setFieldError(res.errors.field, res.errors.msg)
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        } catch (error) {
        }

    }



    const formik = UseForm({
        code: data.code,
        description: data.description,
        name : data.name,
        is_to_employee : data.is_to_employee

    }, StatusSchema, onSubmit)


    
    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.code}
                            label="Código *"
                            name="code"
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("code", evt.target.value.toUpperCase())
                            }}
                            type="text"
                            value={formik.values.code}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.name}
                            label="Nombre *"
                            name="name"
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("name", evt.target.value.toUpperCase())
                            }}
                            type="text"
                            value={formik.values.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.description}
                            label="Descripción *"
                            name="description"
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("description", evt.target.value.toUpperCase())
                            }}
                            type="text"
                            value={formik.values.description}
                        />
                    </Grid>

                    <Grid item xs={12}>
                       <CheckboxUi
                         checked={formik.values.is_to_employee}
                         label="Es para emplados"
                         name="is_to_employee"
                         onChange={formik.handleChange}
                       />
                    </Grid>


                    <Grid item xs={12}>
                        
                        <Divider style={{ marginTop : '15px' }} />
                    </Grid>


                </Grid>

                <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>


            </Box>
        </div>
    )

}