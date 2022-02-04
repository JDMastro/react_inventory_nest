import React, { useState } from "react";
import { Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { SettingStatusnSchema } from "../../schemas/settingsstatusSchema";
import { UseForm, Snackbars, ButtonUi, SelectWrapperUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { SettingsStatusRequest } from "../../services/settingsStatusService";
import { FormikHelpers } from "formik";



export function UpdateSettingStatus({ data, status, onClose, onSubmit: on }: any) {
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
            const res = await SettingsStatusRequest.updated(data.id,{
                status_parent_id: values.status_parent_id,
                status_child_id: values.status_child_id
            })

            if (res.success) {
                setMsg("Guardado exitosamente")
                handleClick()
                setdisablebtn(false)
                setdisablebtn(false)
                on("UPDATED", res.data)
                onClose()
            }
            else {
                res.errors.map((e: any) => formikHelpers.setFieldError(e.field, e.msg))
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const formik = UseForm({
        status_parent_id: data.status_parent_id,
        status_child_id: data.status_child_id
    }, SettingStatusnSchema, onSubmit)
    return (
        <Box component="form" onSubmit={formik.handleSubmit}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <SelectWrapperUi
                        name="status_parent_id"
                        label='Estado padre'
                        value={formik.values.status_parent_id}
                        onChange={formik.handleChange}
                        error={formik.errors.status_parent_id}
                        menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={12}>
                    <SelectWrapperUi
                        name="status_child_id"
                        label='Estado Hijo'
                        value={formik.values.status_child_id}
                        onChange={formik.handleChange}
                        error={formik.errors.status_child_id}
                        menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                    />
                </Grid>

                <Grid>
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