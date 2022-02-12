import { Box, Grid, MenuItem } from "@mui/material";
import React from "react";
import { SelectWrapperUi, UseForm, TextFieldUi, ButtonUi } from "../../components";
//import DateAdapter from '@mui/';
//import DateAdapter from '@mui/lab/AdapterMoment';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import MobileDatePicker from '@mui/lab/MobileDatePicker';

import { FormikHelpers } from "formik";
//import { ouputsSchema } from "../../schemas/outputsSchema";
import { initialFValuesTypes } from "../../types/initialFValues";

import { ReportsSchema } from "../../schemas/reportsSchema";



export function ReportsFilterForm({ status, handleFormFilterSubmit }: any) {
    //const [kindOfMovement, setKindOfMovement] = React.useState("");
    //const [startDate, setStartDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'),);

    //const handleChangeStartDate = (newValue: Date | null) => { setStartDate(newValue); };

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {

        handleFormFilterSubmit(values)
    }

    const formik = UseForm({
        status_id: "",
        startDate: "",
        finishDate: ""
    }, ReportsSchema, onSubmit)

    return (
        <Box sx={{ margin: 2 }} component="form" onSubmit={formik.handleSubmit} >
            <Grid container spacing={2} item xs={12}>
                <Grid item xs={6} md={4}>
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
                </Grid>

                <Grid item xs={6} md={3}>

                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.startDate}
                        label="Fecha inicial *"
                        name="startDate"
                        onChange={formik.handleChange}
                        type="date"
                        value={formik.values.startDate}
                    />
                </Grid>
                
                <Grid item xs={6} md={3}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.finishDate}
                        label="Fecha final *"
                        name="finishDate"
                        onChange={formik.handleChange}
                        type="date"
                        value={formik.values.finishDate}
                    />
                </Grid>

                <Grid item xs={6} md={2}>
                    <ButtonUi variant="contained" disabled={false} text="Buscar" type="submit" />
                </Grid>


            </Grid>
        </Box>
    )
}