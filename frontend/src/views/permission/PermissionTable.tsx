import { IconButton } from "@mui/material";
import React from "react";
import MUIDataTable from '../../components/table';
import { AlertDialogUi } from '../../components';
import { UsersRequest } from "../../services/usersService";

import Can from "../../components/can";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { AddPermission } from "./AddPermission";


export function PermissionTable() {
    const refDatatable: any = React.useRef();
    const [user, setUser] = React.useState({})
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);


    const columns = [
        {
            name: 'id',
            label: 'Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'u_code',
            label: 'Código',
            options: {
                filter: true,
            },
        },
        {
            name: 'u_email',
            label: 'Correo',
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
            name: 'kind_description',
            label: 'Tipo Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'phone',
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
                    const userSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="configuracion:permi:create"
                                yes={() => (
                                    userSelected.p_actived ? (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setUser(userSelected);
                                                setOpenEditDialogForm(true);
                                            }}
                                        >
                                            <AssignmentIcon fontSize="small" color="success" />
                                        </IconButton>
                                    ) : (<span></span>)


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


    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={UsersRequest.getAll}
                title={"Lista de usuarios"}
                // filterForm={<UserTableFilterForm handleSubmit={() => ()}/>}
                columns={columns}
                options={options}
            />
            <AlertDialogUi
                maxWidth="md"
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <AddPermission
                        onClose={() => setOpenEditDialogForm(false)}
                        data={user}
                    />}
                open={openEditDialogForm}
                title=""
            />

        </>
    )
}