import React, { useEffect } from "react";
import { Box, Avatar, Typography, Stack, TableCell, TableRow } from '@mui/material';
import { CardUi, TableNormalUi, AlertDialogUi, FabUi } from "../../components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import IconButton from '@mui/material/IconButton';
import { ConversionRequest } from "../../services/conversionService";
import { SignsRequest } from "../../services/signsService";
import { UnitsRequest } from "../../services/unitsService";
import { red } from '@mui/material/colors';
import { AddConversion } from "./add";
import { UpdateConversion } from "./update";
import { DeleteConversion } from "./delete";

import { formatWeight } from "../../utils/FormatNumbers";



export function Conversion()
{
    const [refresh, setRefresh] = React.useState(false)
    const [rows, setrows] = React.useState([]);
    const [signs, setsigns] = React.useState([]);
    const [units, setunits] = React.useState([]);
    const [openModalUpdate, setOpenModalUpdate] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [data, setdata] = React.useState({});

    useEffect(() => {
        ConversionRequest.getAll()
            .then(e => setrows(e))
    }, [refresh])

    useEffect(() => {
        SignsRequest.getAll()
            .then(e => setsigns(e))
    }, [])

    useEffect(() => {
        UnitsRequest.getAll()
            .then(e => setunits(e))
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
                        <Typography>Conversión</Typography>
                        {/*<IconButton aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}

                    </Stack>
                    <TableNormalUi
                        tableHead={
                            <TableRow >

                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>De</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>A</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Signo</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                                <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                            </TableRow>
                        }
                        tableBody={
                            rows.map((data: any, i: any) =>
                                <TableRow
                                    key={data.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left" component="th" scope="row">{data.c_id}</TableCell>
                                    <TableCell align="left">{data.code_from}</TableCell>
                                    <TableCell align="left">{data.code_to}</TableCell>
                                    <TableCell align="left">{data.s_sign}</TableCell>
                                    <TableCell align="left">{formatWeight(data.c_conversion_quatity)}</TableCell>

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
                content={<UpdateConversion units={units} signs={signs} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalUpdate} data={data} />}
                open={openModalUpdate}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalDelete}
                content={<DeleteConversion handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                open={openModalDelete}
                title=""
            />

            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddConversion units={units} signs={signs} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
          />
        </Box>

    )
}