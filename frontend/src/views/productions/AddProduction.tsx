import { Box, Grid, MenuItem, Stack, TableCell, TableRow, IconButton } from '@mui/material';
import { FormikHelpers } from 'formik';
import { UseForm, TextFieldUi, ButtonUi, SelectWrapperUi, Snackbars, TableNormalUi } from "../../components";
import { initialFValuesTypes } from '../../types/initialFValues';
import { ProductionsSchema } from "../../schemas/productionsSchema";
import { useState } from 'react';
import { MovementRequest } from "../../services/movementService";
import DeleteIcon from '@mui/icons-material/Delete';


export function AddProduction({ kind_movement, existence_converted, productparent, productchild, handleClose }: any) {

    const [disablebtn, setdisablebtn] = useState(false);
    const [movements, setmovements] = useState<any>([]);
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

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        //console.log(productparent)
        //console.log(productchild)
        setdisablebtn(true)
        const kind = kind_movement.find((e: any) => e.id === values.kind_movemet_id)
        //console.log(kind_movement.find((e:any) => e.id === values.kind_movemet_id ))
        MovementRequest.createProduction({
            product_parent_id: productparent.p_id,
            product_child_id: productchild.p_id,
            amount_to_take: values.amount_to_take,
            require_consecutive: kind.require_consecutive,
            consecutive_id: kind.consecutive_id,
            number_order: values.number_order,
            kind_movements_id: kind.id,
            observation: values.observation,
            person_id: 1,
            units_generated: values.units_generated,
            status_id: kind.status_id,
            suggested_amount: values.suggested_amount
        }).then((res: any) => {
            console.log(res)
            if (res.success) {
                formikHelpers.setFieldValue("number_order", res.new_number_order)
                setmovements(res.movement)
                
                setSeverity("success")
                setMsg("Guardado exitosamente")
                setdisablebtn(false)
            } else {
                res.errors.map((e: any) => formikHelpers.setFieldError(e.field, e.msg))
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        })
    }

    const formik = UseForm({
        product_parent_name: productchild.p_name,
        existence_converted: existence_converted,
        to_discount: productchild.p_to_discount,
        amount_to_take: "",
        units_generated: "",
        total_amount_used: "",
        waste_quantity: "",
        suggested_amount: "",
        kind_movemet_id: "",
        number_order: "",
        observation: "",
    }, ProductionsSchema, onSubmit)

    return (
        <div>
            <Box sx={{ m: 1 }}>
                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            disabled={true}
                            error={formik.errors.product_parent_name}
                            label="Producto "
                            name="product_parent_name"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.product_parent_name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            disabled={true}
                            error={formik.errors.existence_converted}
                            label="Cantidad disponible"
                            name="existence_converted"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.existence_converted}
                            inputInside={
                                productparent.sale_unit
                            }
                        />
                    </Grid>

                    {/* <Grid item xs={9}>
                        <TextFieldUi
                            autofocus={false}
                            disabled={true}
                            error={formik.errors.to_discount}
                            label="Total a descontar *"
                            name="to_discount"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.to_discount}
                            inputInside={
                                productparent.sale_unit
                            }
                        />
                        </Grid>*/}

                </Grid>
            </Box>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ m: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={true}
                            error={formik.errors.amount_to_take}
                            label="Cantidad a usar *"
                            name="amount_to_take"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.amount_to_take}
                            inputInside={
                                productparent.sale_unit
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            disabled={true}
                            error={formik.errors.suggested_amount}
                            label="Unidades sugeridas *"
                            name="suggested_amount"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.amount_to_take === 0 ? "0" : "" + formik.values.amount_to_take / formik.values.to_discount}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.units_generated}

                            label="Unidades generadas"
                            name="units_generated"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.units_generated}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.total_amount_used}

                            label="Cantidad total usado"
                            name="total_amount_used"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.total_amount_used}
                            inputInside={
                                productparent.sale_unit
                            }

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.waste_quantity}

                            label="Merma"
                            name="waste_quantity"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.waste_quantity}
                            inputInside={
                                productparent.sale_unit
                            }

                        />
                    </Grid>

                    <Grid item xs={12}>
                        <SelectWrapperUi
                            name="kind_movemet_id"
                            label='Tipo de movimiento'
                            value={formik.values.kind_movemet_id}
                            onChange={formik.handleChange}
                            error={formik.errors.kind_movemet_id}
                            menuItems={kind_movement.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.number_order}
                            label="Número de orden"
                            disabled={formik.values.kind_movemet_id !== "" ? kind_movement.find((e: any) => e.id === formik.values.kind_movemet_id).require_consecutive ? true : false : true}
                            name="number_order"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.number_order}

                        />
                    </Grid>


                    <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.observation}
                            label="Observación"
                            name="observation"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.observation}

                        />
                    </Grid>



                    {/*<Grid item xs={2}>
                        <ButtonUi variant="contained" disabled={false} text="Guardar" type="submit" Icon={<CalculateIcon fontSize="small" />} />
                        </Grid>*/}

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

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                </Stack>


                <Snackbars
                    msg={msg}
                    open={openn}
                    severity={severity}
                    handleClose={handleCloses}
                />


            </Box>
        </div>

    )
}

