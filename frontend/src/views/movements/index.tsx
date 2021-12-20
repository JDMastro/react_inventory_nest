import React, { useEffect } from "react";
import { FabUi, AlertDialogUi, TableNormalUi, CardUi } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { AddMovements } from "./add";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import { MovementRequest } from "../../services/movementService";
import { Avatar, Typography, Box, Stack } from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export function Movements() {
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [kindmov, setkindmov] = React.useState([]);
    const [movements, setmovements] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false)

    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    useEffect(() => {
        KindMovementsRequest.getAll().then(e => setkindmov(e))
    }, [])

    useEffect(() => {
        MovementRequest.getall().then(e => setmovements(e) )
    }, [refresh])

    return (
        <div>
            <Box sx={{ p: 2 }}>
            <CardUi content={
                <Box sx={{ p: 3 }}>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar>
                            <SupervisedUserCircleIcon />
                        </Avatar>
                        <Typography>Movimientos</Typography>
                        {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>
                    <TableNormalUi
                tableHead={
                    <TableRow >
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Id</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Numero de orden</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Tipo de Movimiento</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Producto</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Cantidad</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Precio Total</TableCell>
                        <TableCell align="left" style={{ fontWeight : 'bold' }}>Precio unitario</TableCell>
                         </TableRow>
                }
                tableBody={
                    movements.map((e: any, i: any) =>
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{e.m_id}</TableCell>
                            <TableCell align="left">{e.h_number_order}</TableCell>
                            <TableCell align="left">{e.ckm_name}</TableCell>
                            <TableCell align="left">{e.p_name}</TableCell>
                            <TableCell align="left">{e.m_quantity}</TableCell>
                            <TableCell align="left">{e.m_total_purchasePrice}</TableCell>
                            <TableCell align="left">{e.m_unit_price}</TableCell>
                            
                        </TableRow>
                    )

                }
            />
                    {/*<TableUi columns={columns} rows={rows} />*/}

                </Box>} />

                <FabUi

                size="small"
                color="primary" onClick={handleClickOpenModalAdd}
                ariaLabel="add"
                icon={<AddIcon />}
            />

            <AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<AddMovements kindmov={kindmov} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />



            </Box>
        </div>
    )
}

/*
<FabUi

                size="small"
                color="primary" onClick={handleClickOpenModalAdd}
                ariaLabel="add"
                icon={<AddIcon />}
            />

            <AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<AddMovements kindmov={kindmov} />}
                open={openModalAdd}
                title=""
            />



*/