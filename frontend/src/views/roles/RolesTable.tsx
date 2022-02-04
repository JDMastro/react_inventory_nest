import MUIDataTable from '../../components/table';
import React from "react";
import { RolesRequest } from "../../services/roleService";
import { AlertDialogUi, FabUi } from '../../components';

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import Can from '../../components/can';
import { IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

import { AddRoles } from "./AddRoles";
import { UpdateRoles } from "./UpdateRoles";
import { DeleteRoles } from "./DeleteRoles";

export function RolesTable()
{
    const refDatatable: any = React.useRef();
    const [role, setRole] = React.useState<any>({});
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
            name: 'name',
            label: 'Nombre',
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
                    const roleSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                         <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setRole(roleSelected);
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
                                            setRole(roleSelected);
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
                fetchData={RolesRequest.getAll}
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
                    <AddRoles
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
                    <UpdateRoles
                        onClose={() => setOpenEditDialogForm(false)}
                        data={role}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />

<AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteRoles
                    data={role}
                    onSubmit={handleProductSaveClick}
                    onClose={() => setOpenDeleteDialogForm(false)}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}