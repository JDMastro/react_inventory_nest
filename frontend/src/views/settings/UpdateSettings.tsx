import * as React from 'react';
import { Stack, Box, Grid } from '@mui/material/';
import { SettingsRequest } from "../../services/settingsService";
import { SettingsSchema } from "../../schemas/settingsSchema";
import { UseForm, TextFieldUi, ButtonUi, Snackbars } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";

import { FormikHelpers } from "formik";
import Divider from '@mui/material/Divider';


export function UpdateSettings({ onClose, data, onSubmit: on }: any) {
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    const [disablebtn, setdisablebtn] = React.useState(false);

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
            const res = await SettingsRequest.update(data.id, {
                value: values.value,
                description: values.description
            })
            if (res.success) {
                setMsg("Guardado exitosamente")
                handleClick()
                on(res.data)
                onClose()
                setdisablebtn(false)
            } else {
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
        value: data.value,
        description: data.description
    }, SettingsSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={true}
                        error={formik.errors.description}
                        label="Descripción *"
                        name="description"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.value}
                        label="Valor *"
                        name="value"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.value}
                    />
                </Grid>
                <Grid item xs={12}>
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
                <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

            </Stack>
        </Box>
    )
}