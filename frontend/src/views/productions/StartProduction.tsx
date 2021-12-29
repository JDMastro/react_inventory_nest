
import { Box, Stack, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { MovementRequest } from "../../services/movementService";
import { TableNormalUi, ButtonUi } from "../../components";

export function StartProduction({ handleClose, data }: any) {
    const [persons, setpersons] = useState([])
    //console.log(data)
    useEffect(() => { MovementRequest.findStartedMovements(data.p_id).then(e => setpersons(e)) }, [])
    return (
        <Box>
            <TableNormalUi
                tableHead={
                    <TableRow >
                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Cantidad reservada</TableCell>

                    </TableRow>
                }

                tableBody={
                    persons.map((e: any, i: any) =>
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{e.p_fullname}</TableCell>
                            <TableCell align="left">{e.total_amount_used}</TableCell>

                        </TableRow>
                    )
                }


                


            />
              <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <ButtonUi disabled={false} text="Cancelar" type="button" onClick={handleClose} />
                    
                </Stack>
        </Box>
    )
}

/*
 persons.map((e: any, i: any) =>{
                <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left">{e.p_name}</TableCell>
                    <TableCell align="left">{e.total_amount_used}</TableCell>
                    
                </TableRow>}

*/