import React, { useEffect, useState } from "react";
import { SelectWrapperUi, Snackbars, TextFieldUi, AlertDialogUi } from "../../components";
import Can from "../../components/can";
import { Box, Grid, IconButton, MenuItem } from '@mui/material/'
//import useFormFields from "../../hooks/useFormFields";
import { ProductsRequest } from "../../services/productsService";
import { ConversionRequest } from "../../services/conversionService";
import { SettingsRequest } from "../../services/settingsService"
import { isEmpty, trim } from 'lodash';
import { StartProduction } from "./StartProduction";
import VisibilityIcon from '@mui/icons-material/Visibility';


/*const products = [
    {id: "", name: 'Seleccione'},
    {id: 1, name: 'Carne'},
    {id: 2, name: 'Pollo'},
    {id: 3, name: 'Cerdo'},
    {id: 4, name: 'Pescado'},
]*/

const ProductionFilterForm = ({ reserved_quantity, setreserved_quantity, handleSubmit, setisEnable, number_order, setnumber_order, kind_mov, setkind_mov, disable_number_order, setdisable_number_order, obsertvation, setobsertvation }: any) => {

    const [products, setproducts] = useState([])
    const [product, setproduct] = useState<any>("")
    const [purchase_unit_parent, setpurchase_unit_parent] = useState<any>("")
    const [sale_unit_parent, setsale_unit_parent] = useState<any>("")
    const [current_existence_parent, setcurrent_existence_parent] = useState<any>("")
    const [converted_current_existence_parent, setconverted_current_existence_parent] = useState<any>("")
    

    const [openModal, setOpenModal] = React.useState(false);

    
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
    useEffect(() => { 
        
        ProductsRequest.findProductParentProducction().then(e =>{ setproducts(e); console.log(e) }) 
    }, [])



    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box component="form" m={2}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
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
                                    setreserved_quantity(evt.target.value.total_amount_used ? evt.target.value.total_amount_used : "0")
                                    ConversionRequest.turninto(evt.target.value)
                                        .then(e => {
                                            if (e.success) {
                                                setconverted_current_existence_parent(e.converted)

                                                handleSubmit({
                                                    product: evt.target.value,
                                                    existence_converted: e.converted
                                                })
                                            } else {
                                                handleClick()
                                                setSeverity("error")
                                                setMsg(e.msg)
                                                setconverted_current_existence_parent(0)

                                                handleSubmit({
                                                    product: evt.target.value,
                                                    existence_converted: 0
                                                })
                                            }
                                        })

                                    SettingsRequest.findByKey().then(e => {
                                        setkind_mov(e);
                                        console.log(e)
                                        if (e.success) {
                                            setdisable_number_order(e.data.require_consecutive)
                                            if (e.data.require_consecutive) {
                                                setisEnable(false)
                                            } else {
                                                setisEnable(true)
                                            }
                                        }
                                    })

                                    if(evt.target.value.total_amount_used > 0 && evt.target.value.total_amount_used !== "")
                                      handleClickOpen()

                                    //ProductsRequest

                                    setnumber_order("")
                                    setobsertvation("")



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




                <Grid item xs={6}>
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


                <Grid item xs={6}>
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


                <Grid item xs={6}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <TextFieldUi
                                autofocus={false}
                                error={""}
                                label="Numero de orden"
                                disabled={disable_number_order}
                                name="number_order"
                                onChange={(evt: any) => {
                                    setnumber_order(evt.target.value)
                                    if (isEmpty(trim(evt.target.value)))
                                        setisEnable(true)
                                    else
                                        setisEnable(false)
                                }}
                                type="text"
                                value={number_order}

                            />
                        )}
                    />

                </Grid>

                <Grid item xs={10}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <TextFieldUi
                                autofocus={false}
                                error={""}
                                label="Cantidad reservada"
                                disabled={true}
                                name="reserved_quantity"
                                onChange={(evt: any) => {
                                    setnumber_order(evt.target.value)
                                    if (isEmpty(trim(evt.target.value)))
                                        setisEnable(true)
                                    else
                                        setisEnable(false)
                                }}
                                type="text"
                                value={reserved_quantity}

                            />
                        )}
                    />

                </Grid>

                {
                 product === "" ? <span></span> :    <Grid item xs={2}>
                 <Can
                     perform="users:create"
                     yes={() => (
                         <IconButton aria-label="delete" onClick={() => handleClickOpen()} ><VisibilityIcon color="primary" fontSize="medium" /></IconButton>
                     )}
                 />

             </Grid>
             }


                <Grid item xs={12}>
                    <Can
                        perform="users:create"
                        yes={() => (
                            <TextFieldUi
                                autofocus={false}
                                error={""}
                                label="Observación"
                                name="observation"
                                onChange={(evt: any) => setobsertvation(evt.target.value)}
                                type="text"
                                value={obsertvation}

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

            <AlertDialogUi
                handleClose={handleCloseModal}
                content={<StartProduction handleClose={handleCloseModal} data={product} />}
                open={openModal}
                title=""
            />
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
