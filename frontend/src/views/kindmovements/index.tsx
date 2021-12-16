import React, { useEffect } from "react";
import { Box, Avatar, Typography, Stack, TableCell, TableRow } from '@mui/material';
import { CardUi, TableNormalUi, AlertDialogUi, FabUi } from "../../components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import IconButton from '@mui/material/IconButton';

import { KindMovementsRequest } from "../../services/kindmovementsService";
import { StatusRequest } from "../../services/statusService";
import { RolesRequest } from "../../services/roleService";
import { ClassificationkindmovementRequest } from "../../services/classificationkindmovementService";
import { ConsecutiveRequest } from "../../services/consecutiveService";

import { red } from '@mui/material/colors';
import { Addkindmovements } from "./add";
import { UpdateMovements } from "./update";
import { Deletemovements } from "./delete";


export function KindMovements() {
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [roles, setroles] = React.useState([]);
    const [consecutives, setconsecutives] = React.useState([]);
    const [Classificationkindmovement, setClassificationkindmovement] = React.useState([]);
    const [data, setdata] = React.useState({});

    const [status, setstatus] = React.useState([]);

    useEffect(() => {
        KindMovementsRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])

    useEffect(() => {
        StatusRequest.getAll()
            .then(e => setstatus(e))
    }, [])

    useEffect(() => {
        RolesRequest.getRoleProviderOrClient().then(e => setroles(e) )
    }, [])

    useEffect(() => {
        ClassificationkindmovementRequest.getAll().then(e => setClassificationkindmovement(e) )
    }, [])

    useEffect(() => {
        ConsecutiveRequest.getAll().then(e => setconsecutives(e) )
    }, [])



    const handleClickOpenModalUpdate = (data: any) => {
        setdata(data)
        setOpenModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setOpenModalUpdate(false);
    };

    const handleClickOpenModalDelete = (data: any) => {
        setdata(data)
        setOpenModalDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            <CardUi content={
                <Box sx={{ p: 3 }}>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar>
                            <SupervisedUserCircleIcon />
                        </Avatar>
                        <Typography>Tipo de movimiento</Typography>
                        {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>


                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell component="th" scope="row">{data.id}</TableCell>
                                    <TableCell align="left">{data.name}</TableCell>
                                    <TableCell align="left">{data.description}</TableCell>
                                    <TableCell align="left">
                                        <Stack direction="row" alignItems="center">
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon color="primary" fontSize="small" /></IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                        </Stack>
                                    </TableCell>
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
                handleClose={handleCloseModalUpdate}
                content={<UpdateMovements consecutives={consecutives} Classificationkindmovement={Classificationkindmovement} roles={roles} status={status} handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<Deletemovements handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<Addkindmovements consecutives={consecutives} Classificationkindmovement={Classificationkindmovement} roles={roles} status={status} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    )
}