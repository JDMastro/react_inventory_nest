import React, { useEffect, useState } from "react";
import { StatusRequest } from "../../services/statusService";
import MUIDataTable from '../../components/table';
/*import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";*/
import { makeStyles } from '@mui/styles';
import { formatWeight } from "../../utils/FormatNumbers";
import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { AlertDialogUi } from "../../components";

import { DateTimeFormat } from "../../utils/DateTimeFormat";

import { Status } from "./ChangeStatus";


const useStyles = makeStyles((theme: any) => ({
    table: {
        '& .MuiToolbar-root': {
            display: 'none',
        },
        '& .MuiTableCell-root': {
            paddingTop: 0,
            paddingBottom: 0,
            borderBottom: 'none',
        }
    }
}));

export function OutputsSubTable({ statu, parentOutputs, refSubDatatable, statusChild }: any) {
    const classes = useStyles();
    const [output, setOutput] = useState<any>({});

    //statu


    const [openEditDialogForm, setOpenEditDialogForm] = useState<boolean>(false);


    const columns = [
        {
            name: 'p_name',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'm_quantity',
            label: 'Cantidad',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return formatWeight(value);
                },
            },
        },
        {
            name: 'creation_at',
            label: 'Fecha de Creación',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return DateTimeFormat(value);
                },
            },
        },
        {
            name: 'actions',
            label: 'Acciones',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const outputsSelected = refSubDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="consultas:bystatus:update"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setOutput(outputsSelected);
                                            setOpenEditDialogForm(true)
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                        </>
                    )
                }
            }
        }
    ]

    const options = {
        serverSide: true,
        print: true,
        download: true,
    };

    const handleStateSaveClick = (oper: string, updatedProduct: any) => {


        switch (oper) {
            case "DELETED":
                refSubDatatable.current.deleteRecord(updatedProduct.id);
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
            <MUIDataTable
                ref={refSubDatatable}
                className={classes.table}
                fetchData={StatusRequest.getAllnumberOrders}
                params={{ number_order: parentOutputs.h_number_order, status_id: statu }}
                // filterForm={<UserTableFilterForm handleSubmit={() => }/>}
                columns={columns}
                options={options}
            />

            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <Status
                        onClose={() => setOpenEditDialogForm(false)}
                        data={output}
                        statusChild={statusChild}
                        onSubmit={handleStateSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
        </>
    )
}