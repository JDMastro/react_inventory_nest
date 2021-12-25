import React, { useEffect, useState } from "react";
import { SelectWrapperUi, Snackbars, TextFieldUi } from "../../components";
import Can from "../../components/can";
import { Box, Grid, MenuItem } from '@mui/material/'
//import useFormFields from "../../hooks/useFormFields";
import { ProductsRequest } from "../../services/productsService";
import { ConversionRequest } from "../../services/conversionService";


/*const products = [
    {id: "", name: 'Seleccione'},
    {id: 1, name: 'Carne'},
    {id: 2, name: 'Pollo'},
    {id: 3, name: 'Cerdo'},
    {id: 4, name: 'Pescado'},
]*/

const ProductionFilterForm = ({ handleSubmit }: any) => {

    const [products, setproducts] = useState([])
    const [product, setproduct] = useState<any>("")
    const [purchase_unit_parent, setpurchase_unit_parent] = useState<any>("")
    const [sale_unit_parent, setsale_unit_parent] = useState<any>("")
    const [current_existence_parent, setcurrent_existence_parent] = useState<any>("")
    const [converted_current_existence_parent, setconverted_current_existence_parent] = useState<any>("")


    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);
    
    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    const handleClick = () => {
        setOpenn(true);
    };
    useEffect(() => { ProductsRequest.findProductByDerivate(false).then(e => setproducts(e)) }, [])





    return (
        <Box component="form">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <SelectWrapperUi
                                label='Productos'
                                name="product"
                                value={product}
                                onChange={(evt: any) => {
                                    setproduct(evt.target.value)


                                    setpurchase_unit_parent(evt.target.value.purchase_unit)
                                    setsale_unit_parent(evt.target.value.sale_unit)
                                    setcurrent_existence_parent(evt.target.value.p_current_existence)

                                    ConversionRequest.turninto(evt.target.value)
                                        .then(e => {
                                            if (e.success) {
                                                setconverted_current_existence_parent(e.converted)

                                                handleSubmit({
                                                    product: evt.target.value,
                                                    existence_converted : e.converted
                                                })
                                            }else{
                                                handleClick()
                                                setSeverity("error")
                                                setMsg(e.msg)
                                                setconverted_current_existence_parent(0)

                                                handleSubmit({
                                                    product: evt.target.value,
                                                    existence_converted : 0
                                                })
                                            }
                                        })

                                   
                                }}
                                menuItems={
                                    products.map(
                                        (currentProduct: any) => (
                                            <MenuItem value={currentProduct} key={currentProduct.p_id}>
                                                {currentProduct.p_name}
                                            </MenuItem>
                                        ))
                                }
                                error={""}
                            />
                        )}
                    />

                </Grid>




                <Grid item xs={4}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <TextFieldUi
                                autofocus={false}
                                error={""}
                                label="Unidad de compra"
                                disabled={true}
                                name="current_existence_parent"
                                onChange={(evt: any) => { }}
                                type="text"
                                value={current_existence_parent}
                                inputInside={
                                    purchase_unit_parent
                                }
                            />
                        )}
                    />

                </Grid>


                <Grid item xs={4}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <TextFieldUi
                                autofocus={false}
                                error={""}
                                label="Unidad de venta"
                                disabled={true}
                                name="current_existence_parent"
                                onChange={(evt: any) => { }}
                                type="text"
                                value={converted_current_existence_parent}
                                inputInside={
                                    sale_unit_parent
                                }
                            />
                        )}
                    />

                </Grid>









                <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />



            </Grid>
        </Box>
    );
};

export default ProductionFilterForm;


/*

(event: any) => {
                                    handleSubmit({
                                        product: event.target.value
                                    })
                                    formik.handleChange(event)

                                    
                                }

 <Grid item xs={4}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <SelectWrapperUi
                                label='Productos'
                                name="product"
                                value={fields.product}
                                onChange={(event: any) => {
                                    setFields(event);
                                    handleSubmit({
                                        product: event.target.value
                                    })

                                    console.log("---<",fields)
                                }}
                                menuItems={
                                    products.map(
                                        (currentProduct: any) => (
                                            <MenuItem value={currentProduct} key={currentProduct.p_id}>
                                                {currentProduct.p_name}
                                            </MenuItem>
                                        ))
                                }
                                error={""}
                            />
                        )}
                    />

                </Grid>



*/
