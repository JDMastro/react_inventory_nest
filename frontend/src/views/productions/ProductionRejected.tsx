import { Box, Grid, Stack } from "@mui/material"
import { TextFieldUi, UseForm, ButtonUi } from "../../components";
import { initialFValuesTypes } from "../../types/initialFValues";
import { FormikHelpers } from "formik";
import { initialValuesProductionRejected } from "../../initialValues";
import { ProductionRejectedsSchema } from "../../schemas/productionRejectedSchema";
import { useState } from "react";
import { MovementRequest } from "../../services/movementService";
import { ProductsRequest } from "../../services/productsService";


export function ProductionRejected({ productparent, setproductDerivate, reserved_quantity, setreserved_quantity, productRejected, handleClose }: any) {

    const [severity, setSeverity] = useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);

    const [disablebtn, setdisablebtn] = useState(false);

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
        setdisablebtn(true)
        //console.log(reserved_quantity)
        //console.log(productRejected)
        await MovementRequest.productionrejected(productRejected.id, {
            observation: values.observation
        }).then(e => {
            setMsg("Guardado exitosamente")
            setreserved_quantity(reserved_quantity-productRejected.amount_used)
            ProductsRequest.getByStatusSuggest(productparent.p_id).then(e => setproductDerivate(e))
            handleClick()
            handleClose()
            setdisablebtn(false)
        }
        )
    }

    const formik = UseForm(initialValuesProductionRejected, ProductionRejectedsSchema, onSubmit)

    return (
        <Box sx={{ m: 1 }} component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextFieldUi
                        autofocus={true}
                        error={formik.errors.observation}
                        label="Observacion *"
                        name="observation"
                        onChange={(evt : any) =>{
                            //formik.handleChange
                            formik.setFieldValue("observation", evt.target.value.toUpperCase())
                        }}
                        type="text"
                        value={formik.values.observation}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={handleClose} />
                        <ButtonUi disabled={disablebtn} text="Enviar" type="submit" />

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}