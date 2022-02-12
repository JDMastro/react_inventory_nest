import * as React from 'react';
import { Stack, Box, Typography } from '@mui/material/';
import { ProductsRequest } from "../../services/productsService";
import { ButtonUi, Snackbars } from "../../components";

import Divider from '@mui/material/Divider';


export const DeleteProduct = ({ onClose, data, onSubmit : on } : any) =>
{
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);
    const [disablebtn, setdisablebtn] = React.useState(false);

    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    async function deleteProduct() {

        setdisablebtn(true)
        try {
            const res = await ProductsRequest.delete(data.id)
            if (res.success) {
                setMsg("Eliminado exitosamente")
                handleClick()
                setdisablebtn(false)
                on("DELETED", res.data)
                onClose()
            } else {
                setSeverity("error")
                setMsg(res.error)
                handleClick()
                setdisablebtn(false)
            }
        } catch (error) {
        }

    }

    const handleClick = () => {
        setOpenn(true);
    };

    return (
        <div>
            <Box component="form">

                <Typography>{`¿ Desea eliminar este registro ?`} </Typography>
                <Divider style={{ marginTop: '15px' }} />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="button" onClick={() => deleteProduct()} />

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