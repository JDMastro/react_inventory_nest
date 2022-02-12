import React, { useState } from "react";
import { Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { ConversionSchema } from "../../schemas/conversionSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ConversionRequest } from "../../services/conversionService";
import { FormikHelpers } from "formik";


export function UpdateConversion({ data, units, signs, onClose, onSubmit : on }: any) {
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
        //setloading(true)
        setdisablebtn(true)
        try {
             const res = await ConversionRequest.update(data.id, {
                conversion_from: values.conversion_from,
                conversion_to: values.conversion_to,
                conversion_quatity: values.conversion_quatity,
                signs_id: values.signs_id
            })

            setMsg("Actualzado corrrectamente")
            handleClick()
            on("UPDATED", res.data)
            onClose()
            setdisablebtn(false)

        } catch (error) {
        }

    }



    const formik = UseForm({
        conversion_from: data.c_conversion_from,
        conversion_to: data.c_conversion_to,
        conversion_quatity: data.c_conversion_quatity,
        signs_id: data.c_signs_id
    }, ConversionSchema, onSubmit)

    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            label='De'
                            name="conversion_from"
                            value={formik.values.conversion_from}
                            onChange={formik.handleChange}
                            error={formik.errors.conversion_from}
                            menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.code}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            label='A'
                            name="conversion_to"
                            value={formik.values.conversion_to}
                            onChange={formik.handleChange}
                            error={formik.errors.conversion_to}
                            menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.code}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            label='Signo'
                            name="signs_id"
                            value={formik.values.signs_id}
                            onChange={formik.handleChange}
                            error={formik.errors.signs_id}
                            menuItems={signs.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.sign}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.conversion_quatity}
                            label="Cantidad equivalente *"
                            name="conversion_quatity"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.conversion_quatity}
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
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>


            </Box>
        </div>
    )


}