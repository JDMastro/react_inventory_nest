import React from "react";
import { Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { KindMovementsSchema } from "../../schemas/kindmovementsSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi, CheckboxUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import { FormikHelpers } from "formik";

export function UpdateMovements({ consecutives, Classificationkindmovement, roles, handleClose, setRefresh, refresh, data, status}: any) {
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    //const [loading, setloading] = React.useState(false);

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
        //setloading(true)
        setdisablebtn(true)

        try {

            if(values.require_consecutive && values.consecutive_id==="")
        {
            formikHelpers.setFieldError("consecutive_id", "Este campo es requerido")
            
            setdisablebtn(false)
        }else{
            await KindMovementsRequest.update(data.id,{
                name: values.name,
                description: values.description,
                role_id : values.roles_id,
                classification_kindmovement_id : values.classificationkindmovement_id,
                status_id : values.status_id,
                user_id : 0,
                consecutive_id :values.consecutive_id === "" || !values.require_consecutive ? null : values.consecutive_id,
                require_consecutive : values.require_consecutive
            })


            setMsg("Guardado exitosamente")
            handleClick()

            setRefresh(!refresh)
            handleClose()
            setdisablebtn(false)
        }
            
        } catch (error) {
            console.log(error)
            setSeverity("error")
            setMsg("¡Hubo un error :( !")
            handleClick()
        }

    }



    const formik = UseForm({
        name: data.name,
        description: data.description,
        iduser: data.iduser,
        status_id : data.status_id,
        roles_id : data.roles_id,
        classificationkindmovement_id : data.classification_kindmovement_id,
        require_consecutive : data.require_consecutive,
        consecutive_id : data.consecutive_id === null ? "" : data.consecutive_id

    }, KindMovementsSchema, onSubmit)


    return (
        <div>
            <Box component="form" onSubmit={formik.handleSubmit}>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
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
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            name="status_id"
                            label='Estado por defecto'
                            value={formik.values.status_id}
                            onChange={formik.handleChange}
                            error={formik.errors.status_id}
                            menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>


                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Roles'
                            name="roles_id"
                            value={formik.values.roles_id}
                            onChange={formik.handleChange}
                            error={formik.errors.roles_id}
                            menuItems={roles.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Tipo'
                            name="classificationkindmovement_id"
                            value={formik.values.classificationkindmovement_id}
                            onChange={formik.handleChange}
                            error={formik.errors.classificationkindmovement_id}
                            menuItems={Classificationkindmovement.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CheckboxUi
                            checked={formik.values.require_consecutive}
                            label='Requiere consecutivo'
                            name="require_consecutive"
                            onChange={formik.handleChange}
                        />
                    </Grid>

                    {
                        formik.values.require_consecutive &&  <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Consecutivo'
                            name="consecutive_id"
                            value={formik.values.consecutive_id}
                            onChange={formik.handleChange}
                            error={formik.errors.consecutive_id}
                            menuItems={consecutives.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.description}`}</MenuItem>)}

                        />
                    </Grid>
                    }

                    

                    <Grid item xs={12}>
                       

                       <Divider style={{ marginTop : '15px' }} />
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
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit"/>

                </Stack>


            </Box>
        </div>
    )

}