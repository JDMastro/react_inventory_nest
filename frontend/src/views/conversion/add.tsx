import React,{ useState } from "react";
import {Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { initialValuesconversion } from "../../initialValues";
import { ConversionSchema } from "../../schemas/conversionSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ConversionRequest } from "../../services/conversionService";
import { FormikHelpers } from "formik";

export function AddConversion({ units, signs, onClose, onSubmit : on }: any)
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
        try {
            const res = await ConversionRequest.create({ 
                conversion_from: values.conversion_from,
                conversion_to: values.conversion_to,
                conversion_quatity: values.conversion_quatity,
                signs_id: values.signs_id
             })
           
                setMsg("Guardado exitosamente")
                handleClick()
                on("CREATED", res.data)
                onClose()
                setdisablebtn(false)
           
        } catch (error) {
        }
      
    }

    const formik = UseForm(initialValuesconversion, ConversionSchema, onSubmit)

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