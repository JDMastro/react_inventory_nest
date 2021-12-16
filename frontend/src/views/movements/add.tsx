import { useState } from "react"
import { Box, Grid, Stack, MenuItem } from '@mui/material/';
import SaveIcon from '@mui/icons-material/Save';
import { initialValuesMovements } from "../../initialValues";
import { movementsSchema } from "../../schemas/movementsSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi } from "../../components";

import { FormikHelpers } from "formik";
import { initialFValuesTypes } from "../../types/initialFValues";

import { PersonRequest } from "../../services/personService";
import { ProductsRequest } from "../../services/productsService";

import { MovementRequest } from "../../services/movementService";

export function AddMovements({ kindmov, handleClose, setRefresh, refresh }: any) {

    const [openn, setOpenn] = useState(false);
    const [kindmov_selected, setkindmov_selected] = useState<any>(null);
    const [persons, setpersons] = useState([]);
    const [products, setproducts] = useState<any>([]);
    const [product_selected, setproduct_selected] = useState<any>(null);


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
        console.log(kindmov_selected)
        console.log(values)

        if(kindmov_selected.roles_id === 1)
        {
            const res = await MovementRequest.createProvider({
                classification_kindmovement_id : kindmov_selected.classification_kindmovement_id,
                require_consecutive: kindmov_selected.require_consecutive,
                consecutive_id : kindmov_selected.consecutive_id,
                status_id : kindmov_selected.status_id,
                product_id: values.idproduct,
                quantity: values.quantity,
                total_purchasePrice: values.totalPrice,
                unit_price: values.unitprice,
                quantity_returned: values.orderReturned,
                number_order : values.number_order,
                person_id: values.idperson,
                kind_movements_id: formik.values.kindmovements,
                observation: values.observation
            })
        }
    }

    const formik = UseForm(initialValuesMovements, movementsSchema, onSubmit)

    async function getpersons(role_id: number) {
        //ProductsRequest
        PersonRequest.findAllPersonByRole(role_id).then(e => setpersons(e))
    }


    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <SelectWrapperUi
                        name="kindmovements"
                        disabled={false}
                        value={formik.values.kindmovements}
                        onChange={(evt: any) => {
                            formik.handleChange(evt)
                            /*SE BUSCA EL TIPO DE MOVIMIENTO POR EL ID Y SE LE ASIGNA EL VALOR
                              A KINDMOV_SELECTED
                            */
                            const kind = kindmov.find((e: any) => e.id === evt.target.value)
                            setkindmov_selected(kind)
                            getpersons(kind.roles_id)
                        }}
                        error={formik.errors.kindmovements}
                        label="Tipo de movimientos"
                        menuItems={kindmov.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={12}>
                    <SelectWrapperUi
                        name="idperson"
                        disabled={false}
                        value={formik.values.idperson}
                        onChange={(evt: any) => {
                            /*formik.handleChange*/
                            formik.handleChange(evt)
                            /*
                              EN CASO DE QUE SE HAYA SELECCIONADO EL TIPO DE MOVIMEINO Y
                              EL TIPO DE MOVIMIENTO TENGA ROL DE PROVEEDOR SE VA A BUSCAR LOS
                              PRODUCTOS QUE NO SEAN DERIVADOS
                            */
                            if (kindmov_selected && kindmov_selected.roles_id === 1)
                                ProductsRequest.findProductByDerivate(false).then(e => setproducts(e))

                            /*
                          EN CASO DE QUE SE HAYA SELECCIONADO EL TIPO DE MOVIMEINO Y
                          EL TIPO DE MOVIMIENTO TENGA ROL DE CLIENTE SE VA A BUSCAR LOS
                          PRODUCTOS QUE SEAN DERIVADOS
                        */
                            if (kindmov_selected && kindmov_selected.roles_id === 2)
                                ProductsRequest.findProductByDerivate(true).then(e => setproducts(e))
                        }}
                        error={formik.errors.idperson}
                        label="Proveedor o Cliente"
                        menuItems={
                            persons.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.fullname}`}</MenuItem>)
                        }

                    />
                </Grid>

                { /* ESTE CAMPO SE VA A MOSTRA EN CASO DE QUE SE HAYA SELECCIONADO UN TIPO DE
                    MOVIMIENTO Y ESTE TIPO NO REQUIERA UN CONSECUTIVO */}
                <Grid item xs={6}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.number_order}
                        label="No Orden *"
                        name="number_order"
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.number_order}
                        disabled={kindmov_selected && kindmov_selected.require_consecutive ? true : false}
                    />
                </Grid>



                {
                    /* ESTE CAMPO SE VA A MOSTRA EN CASO DE QUE EL TIPO DE MOVIMIENTO SEA UNA SALIDA */
                    kindmov_selected && kindmov_selected.classificationkindmovement_id === 2 ?
                        (
                            <div>Header drop list</div>
                        ) : <span></span>
                }

                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.observation}
                        label="Observaciones *"
                        name="observation"
                        onChange={formik.handleChange}
                        type="text"
                        disabled={false}
                        value={formik.values.observation}
                    />
                </Grid>

                <Grid item xs={9}>
                    <SelectWrapperUi
                        name="idproduct"
                        value={formik.values.idproduct}
                        onChange={(evt: any) => {

                            //setproduct_selected(evt)
                            formik.handleChange(evt)
                            /*
                              SE BUSCA EL PRODUCTO POR EL ID Y SE LE ASIGNA EL VALOR
                              A PRODUCT_SELECTED
                            */
                            const product = products.find((e: any) => e.p_id === evt.target.value)
                            setproduct_selected(product)
                        }}
                        error={formik.errors.idproduct}
                        label="Producto"
                        menuItems={products.map((data: any, i: any) => <MenuItem value={data.p_id} key={i}>{`${data.p_name}`}</MenuItem>)}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.current_existence}
                        label="existencia actual *"
                        name="current_existence"
                        onChange={formik.handleChange}
                        type="number"
                        disabled={true}
                        value={
                            /*
                             ESTE CAMPO ES PARA MOSTRAR LA EXISTENCIA ACTUAL QUE TIENE UN PRODUCTO
                            */
                            formik.values.idproduct !== "" && products.find((e: any) => e.p_id === formik.values.idproduct) ?
                                formik.values.current_existence = products.find((e: any) => e.p_id === formik.values.idproduct).p_current_existence : "0"}
                    />
                </Grid>






                <Grid item xs={3}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.quantity}
                        label="Cantidad *"
                        name="quantity"
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.quantity}
                        inputInside={
                            /*  EN CASO  DE QUE EL TIPO DE MOVIMIENTO Y PRODUCTO SEA SELECCIONADO Y EL ROL SEA PROVEEDOR(1)
                                SE VA A MOSTRAR LA UNIDAD DE COMPRA */
                            kindmov_selected && kindmov_selected.roles_id === 1 && product_selected ?
                                product_selected.purchase_unit :
                                /*  EN CASO  DE QUE EL TIPO DE MOVIMIENTO  Y PRODUCTOSEA SELECCIONADO Y EL ROL SEA CLIENTE(2)
                                SE VA A MOSTRAR LA UNIDAD DE VENTA */
                                kindmov_selected && kindmov_selected.roles_id === 2 && product_selected ?
                                    product_selected.sale_unit : ""
                        }
                    />
                </Grid>


                <Grid item xs={4}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.totalPrice}
                        label="Precio total de compra *"
                        name="totalPrice"
                        disabled={
                            /*
                               ESTE CAMPO DE DESHABILITARA SI LA CLASIFICACION DEL TIPO MOVIMIENTO ES DIFERENTE
                                A ENTRADA(1)
                            */
                            kindmov_selected && kindmov_selected.classification_kindmovement_id === 1 ?
                                false : true
                        }
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.totalPrice}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.unitprice}
                        label="Precio Unitario *"
                        name="unitprice"
                        onChange={formik.handleChange}
                        type="number"
                        value={
                            /*
                              EN ESTE CAMPO SE CALCULA EL PRECIO TOTAL POR UNIDAD
                            */
                            formik.values.totalPrice !== "" && formik.values.quantity !== "" ?
                                formik.values.unitprice = "" + formik.values.totalPrice / formik.values.quantity : formik.values.unitprice
                        }
                        disabled={true}
                        inputInside={
                            /*
                             MOSTRARA QUE UNIDAD ES
                           */
                            formik.values.idproduct !== "" && products.find((e: any) => e.p_id === formik.values.idproduct) ?
                                products.find((e: any) => e.p_id === formik.values.idproduct).purchase_unit : ""

                        }
                    />
                </Grid>



                <Grid item xs={2} style={{ marginTop: "2px" }}>
                    <ButtonUi variant="contained" disabled={false} text="Save" type="submit" Icon={<SaveIcon fontSize="small" />} />

                </Grid>













            </Grid>
        </Box>
    )
}




/*

HEADER DROP LIST

<Grid item xs={6}>
                        <SelectWrapperUi
                            name="orderReturned"
                            value={formik.values.orderReturned}
                            onChange={}
                            error={formik.errors.orderReturned}
                            label="Orden a devolver"
                            menuItems={
                                
                            }

                        />
                    </Grid>


*/

