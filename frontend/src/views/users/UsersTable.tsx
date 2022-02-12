import React from "react";
import MUIDataTable from "../../components/table";
import { UsersRequest } from "../../services/usersService";
import { KindIdRequest } from "../../services/kindIdentityService";
//import { RolesRequest } from "../../services/roleService";
import { classificationPeopleRequest } from "../../services/classificationPeopleService";
import { AlertDialogUi, FabUi } from "../../components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { AddUsers } from "./add";
import Can from "../../components/can";
import { IconButton } from "@mui/material";

import { UpdateUser } from "./update";

import { DeleteUsers } from "./delete";
import { UserIcon } from "./UserICon";

import AssignmentIcon from '@mui/icons-material/Assignment';

import { ClientManufacturer } from "./ClientManufacturer";

export function UsersTable() {
    const refDatatable: any = React.useRef();
    const [kindId, setKindId] = React.useState([])
    const [classificationPeople, setClassificationPeople] = React.useState([])
    const [user, setUser] = React.useState({})
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);
    const [openclientManufacturerDialogForm, setOpenclientManufacturerDialogForm] = React.useState<boolean>(false);


    React.useEffect(() => {
        KindIdRequest.getAll().then(e => setKindId(e))
    }, [])

    React.useEffect(() => {
        classificationPeopleRequest.getClassificationUserOrEmpleado().then(e => setClassificationPeople(e))
    }, [])


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
            name: 'cp_name',
            label: 'Clasificación',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const userSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <UserIcon classification={userSelected.cp_name} />
                        </>
                    )
                }
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
                                perform="usuarios:accounts:update"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setUser(userSelected);
                                            setOpenEditDialogForm(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                            <Can
                                perform="usuarios:accounts:delete"
                                yes={() => (
                                    userSelected.p_actived ? (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setUser(userSelected);
                                                setOpenDeleteDialogForm(true);
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" color="error" />
                                        </IconButton>
                                    ) : (<span></span>)
                                )}
                            />
                            <Can
                                perform="usuarios:accounts:toassign"
                                yes={() => (
                                    userSelected.p_actived ? (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setUser(userSelected);
                                                setOpenclientManufacturerDialogForm(true);
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

    /*
     
    
    */

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
                refDatatable.current.updateRecord(updatedConsecutive.id, updatedConsecutive)
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
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

            <Can
                perform="usuarios:accounts:create"
                yes={() => (
                    <FabUi
                        size="small"
                        color="primary" onClick={() => setOpenAddDialogForm(true)}
                        ariaLabel="add"
                        icon={<AddIcon />}
                    />

                )}
            />


            <AlertDialogUi
                maxWidth="md"
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <AddUsers
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        kindId={kindId}
                        classificationPeople={classificationPeople}
                    />
                }
                open={openAddDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateUser
                        onClose={() => setOpenEditDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        data={user}
                        kindId={kindId}
                        classificationPeople={classificationPeople}
                    />}
                open={openEditDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteUsers
                        onClose={() => setOpenDeleteDialogForm(false)}
                        data={user}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />

            <AlertDialogUi
                maxWidth="md"
                handleClose={() => setOpenclientManufacturerDialogForm(false)}
                content={
                    <ClientManufacturer
                        onClose={() => setOpenclientManufacturerDialogForm(false)}
                        data={user}
                    />

                }
                open={openclientManufacturerDialogForm}
                title=""
            />
        </>
    )
}