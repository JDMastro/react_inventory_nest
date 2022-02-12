import React, { useEffect } from "react";
import { Stack, Box, Grid, Divider, MenuItem } from '@mui/material/';
import { initialValueskindmovements } from "../../initialValues";
import { KindMovementsSchema } from "../../schemas/kindmovementsSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi, CheckboxUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import { FormikHelpers } from "formik";

export function Addkindmovements({ consecutives, Classificationkindmovement, classificationPeople, onClose, status, onSubmit : on}: any) {
    
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

        //setdisablebtn(true)

        

        if(values.require_consecutive && values.consecutive_id==="")
        {
            formikHelpers.setFieldError("consecutive_id", "Este campo es requerido")
            
            setdisablebtn(false)
        }else{
            try {
                const res = await KindMovementsRequest.save({
                    name: values.name,
                    description: values.description,
                    classificationpeople_id : values.classificationpeople_id,
                    classification_kindmovement_id : values.classificationkindmovement_id,
                    status_id : values.status_id,
                    user_id : 0,
                    consecutive_id :values.consecutive_id === "" ? null : values.consecutive_id,
                    require_consecutive : values.require_consecutive
                })

                
    
                setMsg("Guardado exitosamente")
                handleClick()
                setdisablebtn(false)
                setdisablebtn(false)
                on("CREATED", res.data)
                onClose()
                
            } catch (error) {
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
            }
        }

        /**/
      
    }

    const formik = UseForm(initialValueskindmovements, KindMovementsSchema, onSubmit)

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
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("name", evt.target.value.toUpperCase())
                            }}
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
                            onChange={(evt : any) =>{
                                //formik.handleChange
                                formik.setFieldValue("description", evt.target.value.toUpperCase())
                            }}
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
                            label='tipo de persona'
                            name="classificationpeople_id"
                            value={formik.values.classificationpeople_id}
                            onChange={formik.handleChange}
                            error={formik.errors.classificationpeople_id}
                            menuItems={classificationPeople.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

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
                            menuItems={consecutives.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

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
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>

            </Box>
        </div>
    )
}
