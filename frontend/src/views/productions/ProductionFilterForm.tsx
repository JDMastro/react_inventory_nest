import React from "react";
import { SelectWrapperUi } from "../../components";
import Can from "../../components/can";
import { Box, Grid, MenuItem } from '@mui/material/'
import useFormFields from "../../hooks/useFormFields";

const products = [
    {id: "", name: 'Seleccione'},
    {id: 1, name: 'Carne'},
    {id: 2, name: 'Pollo'},
    {id: 3, name: 'Cerdo'},
    {id: 4, name: 'Pescado'},
]

const ProductionFilterForm = ({ handleSubmit }: any) => {

    const [fields, setFields] = useFormFields({
        product: ""
    });

    return (
        <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <SelectWrapperUi
                                label='Productos'
                                id="product"
                                name="product"
                                value={fields.product}
                                onChange={(event: any) => {
                                    setFields(event);
                                    handleSubmit({
                                        product: event.target.value
                                    })
                                }}
                                menuItems={
                                    products.map(
                                        (currentProduct: any) => (
                                            <MenuItem value={currentProduct.id} key={currentProduct.id}>
                                                {currentProduct.name}
                                            </MenuItem>
                                        ))
                                }
                                error={""}
                            />
                        )}
                    />

                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductionFilterForm;
