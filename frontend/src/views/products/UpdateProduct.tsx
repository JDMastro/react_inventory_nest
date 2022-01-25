import * as React from 'react';
import { Stack, Box, Grid } from '@mui/material/';
import { ProductsRequest } from "../../services/productsService";
import { ProductsDadSchema } from "../../schemas/productsSchema";
import { UseForm, TextFieldUi, ButtonUi, Snackbars, SelectWrapperUi, CheckboxUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";
import Divider from '@mui/material/Divider';

export const UpdateProduct = ({ onClose, data, units, onSubmit : on } : any) =>
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
            const res = await ProductsRequest.update(data.id, {
                code_bar: values.code_bar === "" ? null : values.code_bar,
                description: values.description,
                isderivate: values.isderivate,
                name: values.name,
                product_parent_id: values.product_parent_id,
                purchase_unit_id: values.purchase_unit_id,
                sale_unit_id: values.sale_unit_id,
                sku: values.sku,
                user_id: values.user_id,
                to_discount: values.to_discount,
                sale_price : values.sale_price,
                actived : values.actived
            })
            if (res.success) {
                setMsg("Guardado exitosamente")
                handleClick()
                on("UPDATED",res.data);
                setdisablebtn(false)
                onClose()
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
        code_bar: data.p_code_bar ? data.p_code_bar : "",
        description: data.p_description,
        name: data.p_name,
        purchase_unit_id: data.purchase_id,
        sale_unit_id: data.sale_id,
        sku: data.p_sku,
        sale_price : data.p_sale_price,
        actived : data.p_actived
    }, ProductsDadSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item xs={6}>
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


                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.description}
                        label="Description *"
                        name="description"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("description", evt.target.value.toUpperCase())
                        }}
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
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("code_bar", evt.target.value.toUpperCase())
                        }}
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
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("sku", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.sku}
                    />
                </Grid>


                <Grid item xs={6}>
                    <SelectWrapperUi
                        label='Unidad de compra'
                        name="purchase_unit_id"
                        value={formik.values.purchase_unit_id}
                        onChange={formik.handleChange}
                        error={formik.errors.purchase_unit_id}
                        defaultValue={formik.values.purchase_unit_id}
                        menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.description}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={6}>
                    <SelectWrapperUi
                        label='Unidad de despacho'
                        name="sale_unit_id"
                        value={formik.values.sale_unit_id}
                        onChange={formik.handleChange}
                        error={formik.errors.sale_unit_id}
                        defaultValue={formik.values.sale_unit_id}
                        menuItems={units.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.description}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.sale_price}
                        label="Precio de venta *"
                        name="sale_price"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.sale_price}
                    />
                </Grid>

                {
                    data.p_actived ? (<span></span>) : (
                        <Grid item xs={12}>
                       <CheckboxUi
                         checked={formik.values.actived}
                         label="Habilitar"
                         name="actived"
                         onChange={formik.handleChange}
                       />
                    </Grid>
                    )
                }

                

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