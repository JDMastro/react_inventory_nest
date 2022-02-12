import React from 'react';
import { AlertDialogUi, FabUi } from '../../components';
import MUIDataTable from '../../components/table';
import { SettingsStatusRequest } from "../../services/settingsStatusService";
import { AddSettingsStatus } from "./AddSettingsStatus";


import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { StatusRequest } from "../../services/statusService";
import Can from '../../components/can';
import { IconButton } from '@mui/material';

import { UpdateSettingStatus } from "./UpdateSettingStatus";
import { DeleteSettingStatus } from "./DeleteSettingStatus";


export function SettingsStatusTable() {
    const refDatatable: any = React.useRef();
    const [status, setStatus] = React.useState([])
    const [settingStatus, setSettingStatus] = React.useState<any>({});
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);


    React.useEffect(() => {
        StatusRequest.getAll()
            .then(e => setStatus(e))
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
            name: 'sp_name',
            label: 'Estado padre',
            options: {
                filter: true,
            },
        },
        {
            name: 'sc_name',
            label: 'Estado hijo',
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
                    const settingsStatusSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="configuracion:status:update"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            //setProduct(productSelected);
                                            setSettingStatus(settingsStatusSelected)
                                            setOpenEditDialogForm(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                            <Can
                                perform="configuracion:status:delete"
                                yes={() => (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setSettingStatus(settingsStatusSelected)
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

    const handleProductSaveClick = (oper: string, updatedConsecutive: any) => {
        switch (oper) {
            case "CREATED":
                refDatatable.current.createRecord(updatedConsecutive)
                break;
            case "UPDATED":
                refDatatable.current.updateRecord(updatedConsecutive.id, updatedConsecutive)
                break;
            case "DELETED":
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
                fetchData={SettingsStatusRequest.getAll}
                title={"Lista de configuración de estados"}
                // filterForm={<UserTableFilterForm handleSubmit={() => }/>}
                columns={columns}
                options={options}
            />

            <Can
                perform="configuracion:status:create"
                yes={() => (
                    <FabUi
                        size="small"
                        color="primary"
                        onClick={() => setOpenAddDialogForm(true)}
                        ariaLabel="add"
                        icon={<AddIcon />}
                    />
                )}
            />




            <AlertDialogUi
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <AddSettingsStatus
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        status={status}
                    />
                }
                open={openAddDialogForm}
                title=""
            />

            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateSettingStatus
                        onClose={() => setOpenEditDialogForm(false)}
                        status={status}
                        onSubmit={handleProductSaveClick}
                        data={settingStatus}
                    />}
                open={openEditDialogForm}
                title=""
            />

            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteSettingStatus
                        onClose={() => setOpenDeleteDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        data={settingStatus}
                    />}
                open={openDeleteDialogForm}
                title=""
            />

        </>
    )
}