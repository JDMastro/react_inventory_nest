import React, { useEffect } from "react";

import { TableNormalUi, CardUi, FabUi, AlertDialogUi } from "../../components";

import { Box, TableCell, TableRow } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Avatar, Typography } from "@mui/material";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { PersonRequest } from "../../services/personService";
import { KindIdRequest } from "../../services/kindIdentityService";
import { RolesRequest } from "../../services/roleService";

import { red } from '@mui/material/colors';

import { AddPerson } from "./add";
import { UpdatePerson } from "./update";
import { DeletePerson } from "./delete";




export function Person() {
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [kindId, setkindId] = React.useState([]);
    const [roles, setroles] = React.useState([]);
    const [data, setdata] = React.useState({});

    useEffect(() => {
        PersonRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])

    useEffect(() => {
        KindIdRequest.getAll().then(e => setkindId(e))
    }, [])

    useEffect(() => {
        RolesRequest.getRoleProviderOrClient().then(e => setroles(e))
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
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <CardUi content={
                <Box sx={{ p: 3 }}>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar>
                            <SupervisedUserCircleIcon />
                        </Avatar>
                        <Typography>Trabajadores</Typography>
                        {/*<IconButton aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Tipo Id</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Identificación</TableCell>

                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Teléfono</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Contacto</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>

                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left" component="th" scope="row">{data.p_id}</TableCell>
                                    <TableCell align="left">{data.kind_code}</TableCell>
                                    <TableCell align="left">{data.p_idnumber}</TableCell>
                                    <TableCell align="left">{data.p_fullname}</TableCell>
                                    <TableCell align="left">{data.r_name}</TableCell>

                                    <TableCell align="left">{data.p_phone}</TableCell>
                                    <TableCell align="left">{data.p_contact}</TableCell>

                                    <TableCell align="right">
                                        <Stack direction="row" alignItems="center">
                                            <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdate(data)}><EditIcon color="primary" fontSize="small" /></IconButton>
                                            <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    />

                </Box>} />

            <FabUi

                size="small"
                color="primary" onClick={handleClickOpenModalAdd}
                ariaLabel="add"
                icon={<AddIcon />}

            />



            <AlertDialogUi
                handleClose={handleCloseModalUpdate}
                content={<UpdatePerson roles={roles} kindId={kindId} handleClose={handleCloseModalUpdate} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalUpdate}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeletePerson handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddPerson roles={roles} kindId={kindId} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    )
}