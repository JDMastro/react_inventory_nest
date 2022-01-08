import * as React from 'react';
import { Stack, Box, Grid } from '@mui/material/';
import { ProductsRequest } from "../../services/productsService";
import { ProductsChildSchema } from "../../schemas/productsSchema";
import { UseForm, TextFieldUi, ButtonUi, Snackbars, SelectWrapperUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";
import Divider from '@mui/material/Divider';



export function UpdateProductChild({open, setOpen, derivate, handleClose, units, setRefresh, refresh, data }: any)
{
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
            const res = await ProductsRequest.update(derivate.p_id,{
                code_bar: values.code_bar === "" ? null : values.code_bar,
                description: values.description,
                isderivate: values.isderivate,
                name: values.name,
                product_parent_id: values.product_parent_id,
                purchase_unit_id: values.purchase_unit_id,
                sale_unit_id: values.sale_unit_id,
                sku: values.sku,
                user_id: values.user_id,
                to_discount: values.to_discount
            })
            if (res.success) {
                setMsg("Guardado exitosamente")
                handleClick()
                setRefresh(!refresh)
                handleClose()
                setdisablebtn(false)
                setOpen(!open)
            } else {
                res.errors.map((e: any) => formikHelpers.setFieldError(e.field, e.msg))
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
        code_bar: derivate.p_code_bar,
        description: derivate.p_description,
        name: derivate.p_name,
        isderivate: true,
        product_parent_id: data.p_id,
        purchase_unit_id: derivate.purchase_id,
        sale_unit_id: derivate.sale_id,
        sku: derivate.p_sku,
        user_id: 0,
        to_discount: derivate.p_to_discount
    }, ProductsChildSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>


                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={true}
                        error={formik.errors.name}
                        label="Nombre *"
                        name="name"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.name}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.description}
                        label="Description *"
                        name="description"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.description}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.code_bar}
                        label="Código de barra *"
                        name="code_bar"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.code_bar}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.sku}
                        label="Sku *"
                        name="sku"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.sku}
                    />
                </Grid>

                <Grid item xs={6}>
                    <SelectWrapperUi
                        label='Unidad de despacho'
                        name="sale_unit_id"
                        value={formik.values.sale_unit_id}
                        onChange={formik.handleChange}
                        error={formik.errors.sale_unit_id}
                        menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.description}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.to_discount}
                        label="Descontar *"
                        name="to_discount"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.to_discount}
                        inputInside={
                            data.sale_unit
                        }
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
                <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

            </Stack>
        </Box>
    )
}