/*import React, { useEffect } from "react";
import { Avatar, Typography, Box, Stack, TableCell, TableRow, IconButton, TableContainer } from "@mui/material";
import { CardUi, AlertDialogUi, FabUi } from "../../components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { red } from '@mui/material/colors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { ProductsRequest } from "../../services/productsService";*/
import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CardUi, AlertDialogUi, FabUi } from "../../components";

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { ProductsRequest } from "../../services/productsService";

import { Avatar, Typography, Box, Stack, TableCell, TableRow, IconButton, TableContainer } from "@mui/material";

import { AddProductDad } from "./addProducDad";
import { UpdateProductDad } from "./updateProductDad";

import { AddProductChild } from "./addProductChild";
import { UpdateProductChild } from "./updateProductChild";
import { DeleteProduct } from "./delete";

import { UnitsRequest } from "../../services/unitsService";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

function Row(props: { row: any, setRefresh: any, refresh: any, key:any }) {
    const { row, setRefresh, refresh, key } = props;
    const [open, setOpen] = React.useState(false);
    const [openModalUpdateDad, setOpenModalUpdateDad] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = React.useState(false);
    const [openModalAddChild, setOpenModalAddChild] = React.useState(false);
    const [openModalUpdateChild, setOpenModalUpdateChild] = React.useState(false);
    const [data, setdata] = React.useState({});
    const [dataderivate, setdataderivate] = React.useState({});
    const [units, setunits] = React.useState([]);
    const [derivates, setderivates] = React.useState([]);

    React.useEffect(() => {
        UnitsRequest.getAll()
            .then(e => setunits(e))
    }, [])

    const handleClickOpenModalUpdateDad = (data: any) => {
        setdata(data)
        setOpenModalUpdateDad(true);
    };

    const handleCloseModalUpdateDad = () => {
        setOpenModalUpdateDad(false);
    };

    const handleClickOpenModalDelete = (data: any) => {
        setdata(data)
        setOpenModalDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
    };

    const handleClickOpenModalAddChild = (data: any) => {
        setdata(data)
        setOpenModalAddChild(true);
    };

    const handleCloseModalAddChild = () => {
        setOpenModalAddChild(false);
    };

    const handleClickOpenModalUpdateChild = (data: any) => {
        setdataderivate(data)
        setOpenModalUpdateChild(true);
    };

    const handleCloseModalUpdateChild = () => {
        setOpenModalUpdateChild(false);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} key={key}> 
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => { setdata(row); setOpen(!open); ProductsRequest.getDerivate(row.p_id).then(e => setderivates(e)) }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.p_id}</TableCell>
                <TableCell align="left">{row.p_name}</TableCell>
                <TableCell align="left">{row.p_description}</TableCell>
                <TableCell align="left">{row.purchase_unit}</TableCell>
                <TableCell align="left">{row.sale_unit}</TableCell>
                <TableCell align="left">{row.p_current_existence}</TableCell>
                <TableCell align="left">{row.p_reserved_quantity}</TableCell>
                <TableCell align="left">
                    <Stack direction="row" alignItems="left">
                        <IconButton aria-label="addchild" onClick={() => handleClickOpenModalAddChild(row)}><AddIcon fontSize="small" sx={{ color: green[700] }} color="primary" /></IconButton>
                        <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdateDad(row)}><EditIcon fontSize="small" color="primary" /></IconButton>
                        <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(row)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Compra</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Venta</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Existencia</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Reservados </TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>


                                    {
                                        derivates.map((data: any) =>
                                            <TableRow key={data.p_id}>

                                                <TableCell />
                                                <TableCell component="th" scope="row">{data.p_id}</TableCell>
                                                <TableCell align="left">{data.p_name}</TableCell>
                                                <TableCell align="left">{data.p_description}</TableCell>
                                                <TableCell align="left">{data.purchase_unit}</TableCell>
                                                <TableCell align="left">{data.sale_unit}</TableCell>
                                                <TableCell align="left">{data.p_current_existence}</TableCell>
                                                <TableCell align="left">{data.p_reserved_quantity}</TableCell>
                                                <TableCell align="left">
                                                    <Stack direction="row" alignItems="left">
                                                        <IconButton aria-label="update" onClick={() => handleClickOpenModalUpdateChild(data)}><EditIcon fontSize="small" color="primary" /></IconButton>
                                                        <IconButton aria-label="delete" onClick={() => handleClickOpenModalDelete(data)} ><DeleteIcon fontSize="small" sx={{ color: red[700] }} /></IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }




                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>

                <AlertDialogUi
                    handleClose={handleCloseModalUpdateDad}
                    content={<UpdateProductDad handleClose={handleCloseModalUpdateDad} units={units} setRefresh={setRefresh} refresh={refresh} data={data} />}
                    open={openModalUpdateDad}
                    title=""
                />

                            </TableRow>

                            <AlertDialogUi
                    handleClose={handleCloseModalDelete}
                    content={<DeleteProduct open={open} setOpen={setOpen} handleClose={handleCloseModalDelete} setRefresh={setRefresh} refresh={refresh} data={data} />}
                    open={openModalDelete}
                    title=""
                />

                <AlertDialogUi
                    handleClose={handleCloseModalAddChild}
                    content={<AddProductChild handleClose={handleCloseModalAddChild} setRefresh={setRefresh} refresh={refresh} data={data} units={units} />}
                    open={openModalAddChild}
                    title=""
                />

                <AlertDialogUi
                    handleClose={handleCloseModalUpdateChild}
                    content={<UpdateProductChild open={open} setOpen={setOpen} derivate={dataderivate} handleClose={handleCloseModalUpdateChild} setRefresh={setRefresh} refresh={refresh} data={data} units={units} />}
                    open={openModalUpdateChild}
                    title=""
                />

        </React.Fragment>
    );
}


export function Products() {
    const [rows, setrows] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false)
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [units, setunits] = React.useState([]);

    React.useEffect(() => {
        ProductsRequest.getNotDerivate(false)
            .then(e => setrows(e))
    }, [refresh])

    React.useEffect(() => {
        UnitsRequest.getAll()
            .then(e => setunits(e))
    }, [])

    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    return (
        <Box sx={{ p: 2 }}>
            <CardUi
                content={
                    <Box>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar>
                                <SupervisedUserCircleIcon />
                            </Avatar>
                            <Typography>Productos</Typography>
                            {/*<IconButton onClick={handleClickOpenModalAdd} aria-label="add" ><AddIcon fontSize="small" /></IconButton>*/}
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Id</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Compra</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Und.Venta</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Existencia</TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Reservados </TableCell>
                                        <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row: any) => (
                                        <Row key={row.id} row={row} setRefresh={setRefresh} refresh={refresh} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                }
            />
            <FabUi

                size="small"
                color="primary" onClick={handleClickOpenModalAdd}
                ariaLabel="add"
                icon={<AddIcon />}

            />
            <AlertDialogUi
                handleClose={handleCloseModalAdd}
                content={<AddProductDad refresh={refresh} setRefresh={setRefresh} units={units} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    );
}