import React,{ useState } from "react";
import {Stack, Box, Grid, Divider } from '@mui/material/';
import { initialValuesConsecutive } from "../../initialValues";
import { ConcecutiveSchema } from "../../schemas/consecutiveSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ConsecutiveRequest } from "../../services/consecutiveService";
import { FormikHelpers } from "formik";

export function AddConsecutive({ onClose, onSubmit : on }: any)
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

        setdisablebtn(true)
        try {
            const res = await ConsecutiveRequest.create({ 
                name : values.name,
                description : values.description,
                prefix : values.prefix
             })
            if(res.success)
            {
                setMsg("Guardado exitosamente")
                handleClick()
                setdisablebtn(false)
                on("CREATED", res.data)
                onClose()
            }else{
                formikHelpers.setFieldError(res.errors.field, res.errors.msg)
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        } catch (error) {
            console.log(error)
        }
      
    }

    const formik = UseForm(initialValuesConsecutive, ConcecutiveSchema, onSubmit)

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={true}
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
                            error={formik.errors.prefix}
                            label="Prefijo *"
                            name="prefix"
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("prefix", evt.target.value.toUpperCase())
                            }}
                            type="text"
                            value={formik.values.prefix}
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