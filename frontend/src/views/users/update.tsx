import Stack from '@mui/material/Stack';
import { Box, Grid, Divider, MenuItem } from '@mui/material/';

import { UsersSchema } from "../../schemas/usersSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { UsersRequest } from "../../services/usersService";
import { FormikHelpers } from "formik";
import React from 'react';

export function UpdateUser({ kindId, handleClose, setRefresh, refresh, data }: any) {
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
            const res = await UsersRequest.update(data.u_id, {
                code: values.code,
                email: values.email,
                password: values.password,
                kind_id: values.kind_id,
                idnumber: values.idnumber,
                name: values.name,
                second_name: values.second_name,
                first_surname: values.first_surname,
                second_surname: values.second_surname,
                fullname: `${values.name} ${values.second_name} ${values.first_surname} ${values.second_surname}`,
                address: values.address,
                phone: values.phone,
                contact: values.contact,
                user_id: 0,
                person_id : data.u_person_id
            })

            console.log(res)

            if (res.success) {
                setMsg("Actualizado exitosamente")
                handleClick()
                handleClose()
                setdisablebtn(false)
                setRefresh(!refresh)
            }
            else {
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
        code: data.u_code,/* */
        email: data.u_email,/* */
        password: "",
        confirmpassword: "",

        kind_id: data.kind_id,/* */
        idnumber: data.p_idnumber,/* */
        name: data.p_name,/* */
        second_name: data.p_second_name ? data.p_second_name : "",/* */
        first_surname: data.p_first_surname,/* */
        second_surname: data.p_second_surname,/* */
        address: data.address,/* */
        phone: data.phone,/* */
        contact: data.p_contact,/* */
    }, UsersSchema, onSubmit)


    return (
        <div>
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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
                            onChange={formik.handleChange}
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

                  

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.code}
                            label="código *"
                            name="code"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.code}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.email}
                            label="Correo *"
                            name="email"
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.password}
                            label="Contraseña *"
                            name="password"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.confirmpassword}
                            label="Confirma la contraseña *"
                            name="confirmpassword"
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.confirmpassword}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.contact}
                            label="Contacto *"
                            name="contact"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.contact}
                        />
                    </Grid>

                    <Divider style={{ marginTop: '15px' }} />

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