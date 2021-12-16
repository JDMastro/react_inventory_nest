import React, { useState } from "react";
import { Stack, Box, Grid, Divider } from '@mui/material/';
import { KindIdSchema } from "../../schemas/kindIdSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { KindIdRequest } from "../../services/kindIdentityService";
import { FormikHelpers } from "formik";

export function UpdateKindId({ handleClose, setRefresh, refresh, data }: any)
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
            const res = await KindIdRequest.update(data.id,{ code: values.code, description: values.description })
            if (res.success) {
                setMsg("Actualzado corrrectamente")
                handleClick()
                setRefresh(!refresh)
                handleClose()
                setdisablebtn(false)
            } else {
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



    const formik = UseForm({
        code: data.code,
        description: data.description
    }, KindIdSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.code}
                            label="Sigla *"
                            name="code"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.description}
                            label="Descripción *"
                            name="description"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.description}
                        />
                        <Divider style={{ marginTop: '15px' }} />
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
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>

            </Box>
        </div>
    )

}