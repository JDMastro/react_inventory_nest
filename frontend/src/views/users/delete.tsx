import React from 'react';
import { Snackbars, ButtonUi } from "../../components";
import { Stack, Box, Divider, Typography } from '@mui/material/';
import { UsersRequest } from "../../services/usersService";

export function DeleteUsers({ onClose, data, onSubmit : on }: any) {
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

    async function deleteProduct()
    {
        setdisablebtn(true)
        try {
            const res = await UsersRequest.delete(data.id, data.u_person_id)
            console.log(res)
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
            console.log(error)
        }
        
    }

    const handleClick = () => {
        setOpenn(true);
    };

    return (
        <div>
            <Box component="form">

                <Typography>{`¿ Desea eliminar este registro ?`} </Typography>
                <Divider style={{ marginTop : '15px' }} />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={disablebtn} text="Cancelar" type="button" onClick={onClose} />
                    <ButtonUi disabled={disablebtn} text="Enviar" type="button" onClick={()=> deleteProduct() } />

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