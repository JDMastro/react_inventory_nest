import React, { useEffect } from "react";
import { AlertDialogUi, FabUi } from "../../components";
import MUIDataTable from "../../components/table";
import { PersonRequest } from "../../services/personService";
import AddIcon from "@mui/icons-material/Add";
import { AddPerson } from "./add";

import { KindIdRequest } from "../../services/kindIdentityService";
import { RolesRequest } from "../../services/roleService";
import Can from "../../components/can";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { UpdatePerson } from "./update";
import DeleteIcon from "@mui/icons-material/Delete";

import { DeletePerson } from "./delete";
import { red } from "@mui/material/colors";

export function PersonTable() {

    const refDatatable: any = React.useRef();
    const [person, setPerson] = React.useState<any>({});
    const [kindId, setkindId] = React.useState([]);
    const [roles, setroles] = React.useState([]);
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);

    useEffect(() => { KindIdRequest.getAll().then(e => setkindId(e)) }, [])
    useEffect(() => { RolesRequest.getRoleProviderOrClient().then(e => setroles(e)) }, [])

    const columns = [
        {
            name: 'id',
            label: 'Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'kind_code',
            label: 'Tipo Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_idnumber',
            label: 'Identificación',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_fullname',
            label: 'Nombre Completo',
            options: {
                filter: true,
            },
        },
        {
            name: 'r_name',
            label: 'Descripción',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_phone',
            label: 'Teléfono',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_contact',
            label: 'Contacto',
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
                    const personSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setPerson(personSelected);
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
                                            setPerson(personSelected);
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

    const handleProductSaveClick = (oper: string, updatedConsecutive: any) => {
        switch (oper) {
            case "CREATED":
                refDatatable.current.createRecord(updatedConsecutive)
                break;
            case "UPDATED":
                refDatatable.current.updateRecord(updatedConsecutive.id, updatedConsecutive)
                break;
            case "DELETED":
                console.log(updatedConsecutive.p_id)
                refDatatable.current.deleteRecord(updatedConsecutive.id);
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={PersonRequest.getAll}
                title={"Lista de proveedores y clientes"}
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
                    <AddPerson
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        roles={roles}
                        kindId={kindId}
                    />
                }
                open={openAddDialogForm}
                title=""
            />

            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdatePerson
                        onClose={() => setOpenEditDialogForm(false)}
                        roles={roles}
                        kindId={kindId}
                        data={person}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeletePerson
                    data={person}
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