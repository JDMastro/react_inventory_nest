import React from "react";
import { UseForm, TextFieldUi, SelectWrapperUi, ButtonUi } from "../../components";
import { initialValuesProductDad } from "../../initialValues/"
import { ProductFilterSchema } from "../../schemas/productsSchema";
import { initialFValuesTypes } from "../../types/initialFValues";

import {Stack, Box, Grid, MenuItem } from '@mui/material/'
import { FormikHelpers } from "formik";


const prodcuts = [
    { id : 1, name : 'carne' },
    { id : 2, name : 'pollo' },
    { id : 3, name : 'cerdo' },
    { id : 4, name : 'pescado' },
    { id : 5, name : 'arroz' },
    { id : 6, name : 'maiz' },
]

/*const units = [
    { id : 1, name : 'KG' },
    { id : 2, name : 'GR' },
]*/


const ProductionFilterForm = ( { handleSubmit } :any ) => {

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        console.log(values)
     
    }

    const formik = UseForm({ product_parent_id : '' }, ProductFilterSchema, onSubmit)

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                   

                    <Grid item xs={6}>
                        <SelectWrapperUi
                            label='Productos'
                            name="product_parent_id"
                            value={formik.values.product_parent_id}
                            onChange={(evt: any) => {formik.handleChange(evt); formik.submitForm() }}
                            error={formik.errors.purchase_unit_id}
                            menuItems={prodcuts.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>

                </Grid>
                    
               
        </Box>
    );
};

export default ProductionFilterForm;
