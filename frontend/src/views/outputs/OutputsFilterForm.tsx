import { Box, Grid, MenuItem } from "@mui/material";
import { useState } from "react";
import Can from "../../components/can";
import { ButtonUi, SelectWrapperUi, UseForm } from "../../components";

import { FormikHelpers } from "formik";
import { ouputsSchema } from "../../schemas/outputsSchema";
import { initialFValuesTypes } from "../../types/initialFValues";

export function OutputsFilterForm({ handleFormFilterSubmit, status, people }: any) {
    

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {

        handleFormFilterSubmit(values)
    }

    const formik = UseForm({
        status_id: "",
        person_id: ""
    }, ouputsSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit} m={2}>
            <Grid container spacing={2}>

                <Grid item xs={5}>
                    <Can
                        perform="consultas:bystatus:view"
                        yes={() => (
                            <SelectWrapperUi
                                label='Personas'
                                name="person_id"
                                value={formik.values.person_id}
                                onChange={formik.handleChange}
                                menuItems={
                                    people.map(
                                        (currentPerson: any) => (

                                            <MenuItem value={currentPerson.id} key={currentPerson.id}>
                                                {currentPerson.p_fullname}
                                            </MenuItem>
                                        ))
                                }
                                error={formik.errors.person_id}
                            />
                        )}
                    />

                </Grid>

                <Grid item xs={5}>
                    <Can
                        perform="consultas:bystatus:view"
                        yes={() => (
                            <SelectWrapperUi
                                label='Estados'
                                name="status_id"
                                value={formik.values.status_id}
                                onChange={formik.handleChange}
                                menuItems={
                                    status.map(
                                        (currentStatu: any) => (
                                            <MenuItem value={currentStatu.id} key={currentStatu.id}>
                                                {currentStatu.name}
                                            </MenuItem>
                                        ))
                                }
                                error={formik.errors.status_id}
                            />
                        )}
                    />

                </Grid>


                <Grid item xs={2}>
                    <Can
                        perform="consultas:bystatus:view"
                        yes={() => (
                            <ButtonUi variant="contained" disabled={false} text="Buscar" type="submit" />
                        )}
                    />

                </Grid>




            </Grid>
        </Box>
    )
    /*  <ButtonUi disabled={disablebtn} text="Enviar" type="submit" /> */
}