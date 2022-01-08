import { FormikHelpers } from "formik";
import { useState } from "react";
import { initialFValuesTypes } from "../../types/initialFValues";
import { StatusChangeSchema } from "../../schemas/statusChangeSchema";
import { initialValuesStatusChange } from "../../initialValues";
import { SelectWrapperUi, UseForm, Snackbars, ButtonUi } from "../../components";
import { Box, Grid, MenuItem, Stack } from "@mui/material";
import { MovementRequest } from "../../services/movementService";

import { StatusRequest } from "../../services/statusService";


export function Status({ status_id, person_id, setNumber_orders, setExpanded, data, status, handleClose }:any)
{
    const [severity] = useState("success");
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
        console.log(values)
        console.log(data)
        const res = await MovementRequest.changeStatusMovement(data.m_id,{ status_id : values.status_id })
        setExpanded(false)
        setMsg("Guardado exitosamente")
        handleClick()
        handleClose()
        setdisablebtn(false)

        StatusRequest.getAllNumberOrdersbyStatus(status_id, person_id)
        .then(e => setNumber_orders(e))
    }

    const formik = UseForm(initialValuesStatusChange, StatusChangeSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
             <Grid container spacing={2}>

             <Grid item xs={12}>
                    <SelectWrapperUi
                        label='Estados'
                        name="status_id"
                        value={formik.values.status_id}
                        onChange={formik.handleChange}
                        error={formik.errors.status_id}
                        menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                    />
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
    )
}