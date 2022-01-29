import MUIDataTable from '../../components/table';
import React from "react";
import { ConsecutiveRequest } from "../../services/consecutiveService";
import { AlertDialogUi, FabUi } from '../../components';

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { AddConsecutive } from "./add";
import Can from '../../components/can';
import { IconButton } from '@mui/material';

import { UpdateConsecutive } from "./update";

import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteConsecutive } from "./delete";


export function ConsecutiveTable()
{
    const refDatatable: any = React.useRef();
    const [consecutive, setConsecutive] = React.useState<any>({});
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
            name: 'prefix',
            label: 'Prefijos',
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
                    const consecutiveSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                         <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setConsecutive(consecutiveSelected);
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
                                            setConsecutive(consecutiveSelected);
                                            setOpenDeleteDialogForm(true);
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" color="error" />
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
                fetchData={ConsecutiveRequest.findAllWithPagination}
                title={"Lista de consecutivo"}
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
                    <AddConsecutive
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
                    <UpdateConsecutive
                        onClose={() => setOpenEditDialogForm(false)}
                        data={consecutive}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />

<AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteConsecutive
                        onClose={() => setOpenDeleteDialogForm(false)}
                        data={consecutive}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}