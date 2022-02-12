import React, { useState } from "react";
import { Stack, Box, Divider, Typography } from '@mui/material/';
import { Snackbars, ButtonUi } from "../../components";
import { ConsecutiveRequest } from "../../services/consecutiveService";

export function DeleteConsecutive({ onClose, data, onSubmit : on }: any)
{
    const [severity, setSeverity] = React.useState("success");
    const [msg, setMsg] = useState("success");
    const [openn, setOpenn] = useState(false);
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
            const res = await ConsecutiveRequest.delete(data.id)
            if (res.success) {
                setMsg("Eliminado exitosamente")
                handleClick()
                setdisablebtn(false)
                on("DELETED",{ id : data.id })
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
