import { Box, Grid, Stack } from '@mui/material';
import { FormikHelpers } from 'formik';
import { UseForm, TextFieldUi, ButtonUi, Snackbars } from "../../components";
import { initialFValuesTypes } from '../../types/initialFValues';
import { ProductionsSchema } from "../../schemas/productionsSchema";
import { useState } from 'react';
import { MovementRequest } from "../../services/movementService";


export function AddProduction({ existence_converted, productparent, productchild, handleClose, setnumber_order, number_order, kind_mov, obsertvation }: any) {

    const [disablebtn, setdisablebtn] = useState(false);
    //const [movements, setmovements] = useState<any>([]);
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
        //const kind = kind_movement.find((e: any) => e.id === values.kind_movemet_id)
        //console.log(kind_movement.find((e:any) => e.id === values.kind_movemet_id ))
        MovementRequest.createProduction({
            product_parent_id: productparent.p_id,
            product_child_id: productchild.p_id,
            amount_to_take: values.amount_to_take,
            require_consecutive: kind_mov.data.require_consecutive,
            consecutive_id: kind_mov.data.consecutive_id,
            number_order: values.number_order,
            kind_movements_id: kind_mov.data.id,
            observation: values.observation,
            person_id: 1,
            units_generated: values.units_generated,
            status_id: kind_mov.data.status_id,
            suggested_amount: values.suggested_amount,
            waste_quantity : values.waste_quantity
        }).then((res: any) => {
            console.log(res)
            if (res.success) {
                //formikHelpers.setFieldValue("number_order", )
                setnumber_order(res.new_number_order)
                
                
                setSeverity("success")
                setMsg("Guardado exitosamente")
                setdisablebtn(false)
                handleClose()
            } else {
                res.errors.map((e: any) => formikHelpers.setFieldError(e.field, e.msg))
                setSeverity("error")
                setMsg("¡Hubo un error :( !")
                handleClick()
                setdisablebtn(false)
            }
        })

        console.log(kind_mov)
    }
     //number_order, kind_mov, obsertvation
    const formik = UseForm({
        product_parent_name: productchild.p_name,
        existence_converted: existence_converted,
        to_discount: productchild.p_to_discount,
        amount_to_take: "",
        units_generated: "",
        total_amount_used: "",
        waste_quantity: "",
        suggested_amount: "",
        number_order: number_order,
        observation: obsertvation,
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
                            value={formik.values.amount_to_take === 0 ? formik.values.suggested_amount="0" : formik.values.suggested_amount="" + formik.values.amount_to_take / formik.values.to_discount}

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
                            value={formik.values.units_generated === 0 ? "0" : formik.values.total_amount_used = "" + formik.values.units_generated * formik.values.to_discount}
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

                   {/* <Grid item xs={12}>
                        <SelectWrapperUi
                            name="kind_movemet_id"
                            label='Tipo de movimiento'
                            value={formik.values.kind_movemet_id}
                            onChange={formik.handleChange}
                            error={formik.errors.kind_movemet_id}
                            menuItems={kind_movement.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />
                        </Grid>*/}


                  

                   {/* <Grid item xs={6}>
                        <TextFieldUi
                            autofocus={false}
                            error={formik.errors.observation}
                            label="Observación"
                            name="observation"
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.observation}

                        />
                        </Grid>*/}



                    {/*<Grid item xs={2}>
                        <ButtonUi variant="contained" disabled={false} text="Guardar" type="submit" Icon={<CalculateIcon fontSize="small" />} />
                        </Grid>*/}

                </Grid>

          
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

