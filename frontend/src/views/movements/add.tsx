import { useState } from "react"
import { Box, Grid, MenuItem, TableRow, TableCell, IconButton, Stack } from '@mui/material/';
import SaveIcon from '@mui/icons-material/Save';
import { initialValuesMovements } from "../../initialValues";
import { movementsSchema } from "../../schemas/movementsSchema";
import { UseForm, TextFieldUi, Snackbars, ButtonUi, SelectWrapperUi, TableNormalUi } from "../../components";

import { FormikHelpers } from "formik";
import { initialFValuesTypes } from "../../types/initialFValues";

import { PersonRequest } from "../../services/personService";
import { ProductsRequest } from "../../services/productsService";

import { MovementRequest } from "../../services/movementService";

import DeleteIcon from '@mui/icons-material/Delete';

export function AddMovements({ kindOfMovement, onClose, onSubmit: on }: any) {

    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);
    const [kindmov_selected, setkindmov_selected] = useState<any>(null);
    const [persons, setpersons] = useState([]);
    const [products, setproducts] = useState<any>([]);
    const [product_selected, setproduct_selected] = useState<any>(null);
    const [movements, setmovements] = useState<any>([]);
    const [numbers_orders, setnumbers_orders] = useState<any>([]);

    const [disable, setdisable] = useState(false)
    const [disablebtns, setdisablebtns] = useState(false)


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

        setdisablebtns(true)

        console.log(kindmov_selected)
        console.log(values.number_order)

        if(!kindmov_selected.require_consecutive && values.number_order === "")
        {
            formik.setFieldError('number_order', 'Este campo requerido')
        }else{
            if (kindmov_selected.classificationpeople_id === 1) {
                const res = await MovementRequest.createProvider({
                    classification_kindmovement_id: kindmov_selected.classification_kindmovement_id,
                    require_consecutive: kindmov_selected.require_consecutive,
                    consecutive_id: kindmov_selected.consecutive_id,
                    status_id: kindmov_selected.status_id,
                    product_id: values.idproduct,
                    quantity: values.quantity,
                    total_purchasePrice: values.totalPrice,
                    unit_price: values.unitprice,
                    quantity_returned: values.orderReturned,
                    number_order: values.number_order,
                    person_id: values.idperson,
                    kind_movements_id: formik.values.kindmovements,
                    observation: values.observation,
                    orderReturned: values.orderReturned
                })
    
    
    
                if (res.success) {
                    formikHelpers.setFieldValue("number_order", res.new_number_order)
                    on("CREATED", res.lastmovement)
                    setmovements(res.movement)
    
    
    
                    setSeverity("success")
                    setMsg("Guardado exitosamente")
                    handleClick()
    
    
                    formikHelpers.setFieldValue("quantity", "")
                    formikHelpers.setFieldValue("totalPrice", "")
                    formikHelpers.setFieldValue("unitprice", "")
    
                } else {
                    formikHelpers.setFieldError("quantity", res.error.quantity)
                    setSeverity("error")
                    setMsg("¡Hubo un error :( !")
                    handleClick()
                }
            }
    
            if (kindmov_selected.classificationpeople_id === 2) {
    
                const res = await MovementRequest.createClient({
                    classification_kindmovement_id: kindmov_selected.classification_kindmovement_id,
                    require_consecutive: kindmov_selected.require_consecutive,
                    consecutive_id: kindmov_selected.consecutive_id,
                    status_id: kindmov_selected.status_id,
                    product_id: values.idproduct,
                    quantity: values.quantity,
                    total_purchasePrice: values.totalPrice,
                    unit_price: values.unitprice,
                    quantity_returned: values.orderReturned,
                    number_order: values.number_order,
                    person_id: values.idperson,
                    kind_movements_id: formik.values.kindmovements,
                    observation: values.observation,
                    orderReturned: values.orderReturned
                })
    
    
                console.log(res)
    
    
    
                if (res.success) {
                    formikHelpers.setFieldValue("number_order", res.new_number_order)
                    on("CREATED", res.lastmovement)
                    setmovements(res.movement)
    
    
    
    
    
                    formikHelpers.setFieldValue("quantity", "")
                    formikHelpers.setFieldValue("totalPrice", "")
                    formikHelpers.setFieldValue("unitprice", "")
    
                    setSeverity("success")
                    setMsg("Guardado exitosamente")
                    handleClick()
    
                } else {
                    formikHelpers.setFieldError("quantity", res.error.quantity)
                    setSeverity("error")
                    setMsg("¡Hubo un error :( !")
                    handleClick()
                }
            }
        }

        /*if (kindmov_selected.classificationpeople_id === 1) {
            const res = await MovementRequest.createProvider({
                classification_kindmovement_id: kindmov_selected.classification_kindmovement_id,
                require_consecutive: kindmov_selected.require_consecutive,
                consecutive_id: kindmov_selected.consecutive_id,
                status_id: kindmov_selected.status_id,
                product_id: values.idproduct,
                quantity: values.quantity,
                total_purchasePrice: values.totalPrice,
                unit_price: values.unitprice,
                quantity_returned: values.orderReturned,
                number_order: values.number_order,
                person_id: values.idperson,
                kind_movements_id: formik.values.kindmovements,
                observation: values.observation,
                orderReturned: values.orderReturned
            })



            if (res.success) {
                formikHelpers.setFieldValue("number_order", res.new_number_order)
                on("CREATED", res.lastmovement)
                setmovements(res.movement)



                setSeverity("success")
                setMsg("Guardado exitosamente")
                handleClick()


                formikHelpers.setFieldValue("quantity", "")
                formikHelpers.setFieldValue("totalPrice", "")
                formikHelpers.setFieldValue("unitprice", "")

            } else {
                formikHelpers.setFieldError("quantity", res.error.quantity)
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
            }
        }

        if (kindmov_selected.classificationpeople_id === 2) {

            const res = await MovementRequest.createClient({
                classification_kindmovement_id: kindmov_selected.classification_kindmovement_id,
                require_consecutive: kindmov_selected.require_consecutive,
                consecutive_id: kindmov_selected.consecutive_id,
                status_id: kindmov_selected.status_id,
                product_id: values.idproduct,
                quantity: values.quantity,
                total_purchasePrice: values.totalPrice,
                unit_price: values.unitprice,
                quantity_returned: values.orderReturned,
                number_order: values.number_order,
                person_id: values.idperson,
                kind_movements_id: formik.values.kindmovements,
                observation: values.observation,
                orderReturned: values.orderReturned
            })


            console.log(res)



            if (res.success) {
                formikHelpers.setFieldValue("number_order", res.new_number_order)
                on("CREATED", res.lastmovement)
                setmovements(res.movement)





                formikHelpers.setFieldValue("quantity", "")
                formikHelpers.setFieldValue("totalPrice", "")
                formikHelpers.setFieldValue("unitprice", "")

                setSeverity("success")
                setMsg("Guardado exitosamente")
                handleClick()

            } else {
                formikHelpers.setFieldError("quantity", res.error.quantity)
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
            }
        }*/

        setdisablebtns(false)
        setdisable(true)

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
                        disabled={disable}
                        value={formik.values.kindmovements}
                        onChange={(evt: any) => {
                            formik.handleChange(evt)
                            /*SE BUSCA EL TIPO DE MOVIMIENTO POR EL ID Y SE LE ASIGNA EL VALOR
                              A KINDMOV_SELECTED
                            */
                            const kind = kindOfMovement.find((e: any) => e.id === evt.target.value)
                            formik.setFieldValue("idproduct", "")
                            formik.setFieldValue("idperson", "")
                            formik.setFieldValue("orderReturned", "")
                            formik.setFieldValue("unitprice", "")
                            formik.setFieldValue("totalPrice", "")
                            formik.setFieldValue("quantity", "")
                            setkindmov_selected(kind)
                            getpersons(kind.classificationpeople_id)
                        }}
                        error={formik.errors.kindmovements}
                        label="Tipo de movimientos"
                        menuItems={kindOfMovement.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                    />
                </Grid>

                <Grid item xs={12}>
                    <SelectWrapperUi
                        name="idperson"
                        disabled={disable}
                        value={formik.values.idperson}
                        onChange={(evt: any) => {
                            /*formik.handleChange*/
                            formik.handleChange(evt)
                            /*
                              EN CASO DE QUE SE HAYA SELECCIONADO EL TIPO DE MOVIMEINO Y
                              EL TIPO DE MOVIMIENTO TENGA ROL DE PROVEEDOR SE VA A BUSCAR LOS
                              PRODUCTOS QUE NO SEAN DERIVADOS
                            */
                            if (kindmov_selected && kindmov_selected.classificationpeople_id === 1)
                                ProductsRequest.findProductByDerivate(false).then(e =>{ console.log(e); setproducts(e)})

                            /*
                          EN CASO DE QUE SE HAYA SELECCIONADO EL TIPO DE MOVIMEINO Y
                          EL TIPO DE MOVIMIENTO TENGA ROL DE CLIENTE SE VA A BUSCAR LOS
                          PRODUCTOS QUE SEAN DERIVADOS
                        */
                            if (kindmov_selected && kindmov_selected.classificationpeople_id === 2)
                                ProductsRequest.findProductByDerivate(true).then(e =>{ console.log(e); setproducts(e)})


                            /*
                            EN CASO DE QUE LA CLASIFICACION DEL TIPO DE MOVIMIENTO SEA SALIDA(2)
                            SE VA A BUSCAR LAS ORDENES
                            */

                            if (kindmov_selected.classification_kindmovement_id === 2)
                                MovementRequest.findByPersonId(evt.target.value).then(e => { setnumbers_orders(e); console.log(e) })


                            if (kindmov_selected.classification_kindmovement_id === 1)
                                MovementRequest.findByPersonOutPuts(evt.target.value).then(e => { setnumbers_orders(e); console.log(e) })

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
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("number_order", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.number_order}
                        disabled={kindmov_selected && kindmov_selected.require_consecutive ? true : false}
                    />
                </Grid>



                {
                    /* ESTE CAMPO SE VA A MOSTRA EN CASO DE QUE EL TIPO DE MOVIMIENTO SEA UNA SALIDA */
                    /*
                    
                     kindmov_selected && kindmov_selected.classification_kindmovement_id === 2 && kindmov_selected.roles_id === 1 ||
                    kindmov_selected && kindmov_selected.classification_kindmovement_id === 1 && kindmov_selected.roles_id === 2 ?
                    
                    */

                    !kindmov_selected ? (<span></span>) :
                        kindmov_selected.classification_kindmovement_id === 2 && kindmov_selected.classificationpeople_id === 1 ?
                            (
                                <Grid item xs={6}>
                                    <SelectWrapperUi
                                        name="orderReturned"
                                        value={formik.values.orderReturned}
                                        onChange={(evt: any) => {
                                            formik.setFieldValue("idproduct", "")
                                            formik.handleChange(evt)
                                            MovementRequest.findByHeader(evt.target.value).then(e =>{console.log(e); setproducts(e)})
                                        }}
                                        error={formik.errors.orderReturned}
                                        label="Orden a devolver"
                                        menuItems={
                                            numbers_orders.map((data: any, i: any) => <MenuItem value={data.h_id} key={i}>{`${data.h_number_order}`}</MenuItem>)
                                        }

                                    />
                                </Grid>) :
                            kindmov_selected.classification_kindmovement_id === 1 && kindmov_selected.classificationpeople_id === 2 ?
                                (
                                    <Grid item xs={6}>
                                        <SelectWrapperUi
                                            name="orderReturned"
                                            value={formik.values.orderReturned}
                                            onChange={(evt: any) => {
                                                formik.setFieldValue("idproduct", "")
                                                formik.handleChange(evt)

                                               MovementRequest.findByHeader(evt.target.value).then(e =>{console.log(e); setproducts(e)})
                                            }}
                                            error={formik.errors.orderReturned}
                                            label="Orden a devolver"
                                            menuItems={
                                                numbers_orders.map((data: any, i: any) => <MenuItem value={data.h_id} key={i}>{`${data.h_number_order}`}</MenuItem>)
                                            }

                                        />
                                    </Grid>) : (<span></span>)
                }

                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.observation}
                        label="Observaciones *"
                        name="observation"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("observation", evt.target.value.toUpperCase())
                        }}
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
                            const product = products.find((e: any) => e.id === evt.target.value)
                            setproduct_selected(product)
                        }}
                        error={formik.errors.idproduct}
                        label="Producto"
                        menuItems={products.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.p_name}`}</MenuItem>)}
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
                            formik.values.idproduct !== "" && products.find((e: any) => e.id === formik.values.idproduct) ?
                                formik.values.current_existence = products.find((e: any) => e.id === formik.values.idproduct).p_current_existence : formik.values.current_existence="0"}
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
                            kindmov_selected && kindmov_selected.classificationpeople_id === 1 && product_selected ?
                                product_selected.purchase_unit :
                                /*  EN CASO  DE QUE EL TIPO DE MOVIMIENTO  Y PRODUCTOSEA SELECCIONADO Y EL ROL SEA CLIENTE(2)
                                SE VA A MOSTRAR LA UNIDAD DE VENTA */
                                kindmov_selected && kindmov_selected.classificationpeople_id === 2 && product_selected ?
                                    product_selected.sale_unit : ""
                        }
                    />
                </Grid>


                <Grid item xs={4}>
                    <TextFieldUi
                        autofocus={false}
                        error={formik.errors.totalPrice}
                        label={"Precio total *"}
                        name="totalPrice"
                        disabled={
                            /*
                               ESTE CAMPO DE DESHABILITARA SI LA CLASIFICACION DEL TIPO MOVIMIENTO ES DIFERENTE
                                A ENTRADA(1)
                            */
                            !kindmov_selected ? true :
                                kindmov_selected.classification_kindmovement_id === 1 && kindmov_selected.classificationpeople_id === 1 ?
                                    false :
                                    kindmov_selected.classification_kindmovement_id === 2 && kindmov_selected.classificationpeople_id === 2 ?
                                        false : true
                        }
                        onChange={formik.handleChange}
                        type="number"
                        value={
                            !kindmov_selected ? formik.values.totalPrice :
                            kindmov_selected.classification_kindmovement_id === 2 && kindmov_selected.classificationpeople_id === 2 ?
                            !product_selected ? formik.values.totalPrice : formik.values.totalPrice= product_selected.p_sale_price * formik.values.quantity :
                            kindmov_selected.classification_kindmovement_id === 2 && kindmov_selected.classificationpeople_id === 1 || kindmov_selected.classificationpeople_id === 2 ?
                            !product_selected ? formik.values.totalPrice : formik.values.totalPrice= product_selected.m_unit_price * formik.values.quantity :
                            formik.values.totalPrice

                            /*product_selected && formik.values.orderReturned !== "" ?
                                formik.values.totalPrice = product_selected.m_unit_price * formik.values.quantity : formik.values.totalPrice*/
                            }
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
                    <ButtonUi variant="contained" disabled={false} text="Guardar" type="submit" Icon={<SaveIcon fontSize="small" />} />

                </Grid>













            </Grid>




            <Box style={{ marginTop: "5px" }}>
                <TableNormalUi

                    tableHead={
                        <TableRow >
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Id</TableCell>
                            {/*<TableCell align="center" style={{ fontWeight : 'bold' }}>Tipo de Movimiento</TableCell>*/}
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Producto</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Precio Total</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Precio unitario</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                        </TableRow>

                    }

                    tableBody={
                        movements.map((e: any, i: any) =>
                            <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{e.m_id}</TableCell>
                                {/*<TableCell align="center">{e.Header.KindMovements.name}</TableCell>*/}
                                <TableCell align="center">{e.p_name}</TableCell>
                                <TableCell align="center">{e.m_quantity}</TableCell>
                                <TableCell align="center">{e.m_total_purchasePrice}</TableCell>
                                <TableCell align="center">{
                                    e.m_unit_price
                                }</TableCell>
                                <TableCell align="center"><IconButton aria-label="delete" onClick={() => MovementRequest.deleteNovement(e.m_id).then(e => MovementRequest.findMovementByNumberOrder(formik.values.number_order).then(e => setmovements(e)))} ><DeleteIcon fontSize="small" /></IconButton></TableCell>
                            </TableRow>

                        )

                    }

                />
            </Box>





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
                <ButtonUi disabled={disablebtns} text="cancel" type="button" onClick={onClose} />


            </Stack>


        </Box>
    )
}




/*

HEADER DROP LIST
<Grid item xs={6}>
                                <SelectWrapperUi
                                    name="orderReturned"
                                    value={formik.values.orderReturned}
                                    onChange={(evt: any) => {
                                        formik.setFieldValue("idproduct", "")
                                        formik.handleChange(evt)

                                        MovementRequest.findByHeader(evt.target.value).then(e => setproducts(e))
                                    }}
                                    error={formik.errors.orderReturned}
                                    label="Orden a devolver"
                                    menuItems={
                                        numbers_orders.map((data: any, i: any) => <MenuItem value={data.h_id} key={i}>{`${data.h_number_order}`}</MenuItem>)
                                    }

                                />
                            </Grid>

*/

