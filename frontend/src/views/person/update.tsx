import React, { useState } from "react";
import { Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { PersonSchema } from "../../schemas/personSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi, CheckboxUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { PersonRequest } from "../../services/personService";
import { FormikHelpers } from "formik";


export function UpdatePerson({ kindId, onClose, data, onSubmit : on }: any) {
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
            const res = await PersonRequest.update(data.id, {
                address: values.address,
                contact: values.contact,
                fullname: `${values.name} ${values.second_name} ${values.first_surname} ${values.second_surname}`,
                idnumber: values.idnumber,
                kind_id: values.kind_id,
                phone: values.phone,
                provider: values.provider,
                name: values.name,
                first_surname: values.first_surname,
                second_name: values.second_name,
                second_surname: values.second_surname,
                user_id: 0,
                actived : values.actived
            })
            if (res.success) {
                setMsg("Guardado exitosamente")
                handleClick()
                setdisablebtn(false)
                on("UPDATED", res.data)
                onClose()
            } else {
                res.errors.map((e: any) => formikHelpers.setFieldError(e.field, e.msg))
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        } catch (error) {
        }

    }

    const formik = UseForm({
        address: data.p_address,
        contact: data.p_contact,
        idnumber: data.p_idnumber,
        kind_id: data.p_kind_id,
        phone: data.p_phone,
        name: data.p_name,
        first_surname: data.p_first_surname,
        second_name: data.p_second_name ? data.p_second_name : "",
        second_surname: data.p_second_surname,
        actived : data.p_actived
    }, PersonSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>


            <Grid item xs={6}>
                    <SelectWrapperUi
                        label='Tipo id'
                        name="kind_id"
                        value={formik.values.kind_id}
                        onChange={formik.handleChange}
                        error={formik.errors.kind_id}
                        menuItems={kindId.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.description}`}</MenuItem>)}

                    />
                </Grid>

            <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={true}
                        error={formik.errors.idnumber}
                        label="Número de id *"
                        name="idnumber"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("idnumber", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.idnumber}
                    />
                </Grid>

               

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.name}
                        label="Primer nombre *"
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
                        error={formik.errors.second_name}
                        label="Segundo nombre *"
                        name="second_name"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("second_name", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.second_name}
                    />
                </Grid>


                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.first_surname}
                        label="Primer apellido *"
                        name="first_surname"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("first_surname", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.first_surname}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.second_surname}
                        label="Segundo apellido *"
                        name="second_surname"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("second_surname", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.second_surname}
                    />
                </Grid>


                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.address}
                        label="Dirección *"
                        name="address"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("address", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.address}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.phone}
                        label="Teléfono *"
                        name="phone"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.phone}
                    />
                </Grid>

              

                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.contact}
                        label="Contacto *"
                        name="contact"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("contact", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.contact}
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
             
                <Grid item xs={12}> <Divider style={{ marginTop: '15px' }} /></Grid>
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