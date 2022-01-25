import React from 'react';
import { AlertDialogUi, FabUi } from '../../components';
import MUIDataTable from '../../components/table';
import { StatusRequest } from "../../services/statusService";
import AddIcon from "@mui/icons-material/Add";
import { AddStatus } from "./add";
import Can from '../../components/can';
import { IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { UpdateStatus } from "./update";
import { red } from "@mui/material/colors"
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteStatus } from "./delete";

export function StatusTable()
{
    const refDatatable: any = React.useRef();
    const [status, setStatus] = React.useState<any>({});
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);
    
    const columns = [
        {
            name: 'id',
            label: 'Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'code',
            label: 'Código',
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Descripción',
            options: {
                filter: true,
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
                    const statusSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                         <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setStatus(statusSelected);
                                            setOpenEditDialogForm(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                            <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setStatus(statusSelected);
                                            setOpenDeleteDialogForm(true);
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
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

    const handleProductSaveClick = (oper : string, updatedConsecutive: any) => {
        switch(oper)
        {
            case "CREATED" :
                refDatatable.current.createRecord(updatedConsecutive)
                break;
            case "UPDATED" :
                refDatatable.current.updateRecord(updatedConsecutive.id, updatedConsecutive)
                break;
            case "DELETED" :
                refDatatable.current.deleteRecord(updatedConsecutive.id);
                break;
            default : break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
           <MUIDataTable
                ref={refDatatable}
                fetchData={StatusRequest.getAll}
                title={"Lista de estados"}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
             <FabUi
                size="small"
                color="primary" 
                onClick={() => setOpenAddDialogForm(true)}
                ariaLabel="add"
                icon={<AddIcon />}
            />
            <AlertDialogUi
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <AddStatus
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openAddDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateStatus
                        onClose={() => setOpenEditDialogForm(false)}
                        data={status}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
             <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteStatus
                       onClose={() => setOpenDeleteDialogForm(false)}
                       data={status}
                       onSubmit={handleProductSaveClick}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}