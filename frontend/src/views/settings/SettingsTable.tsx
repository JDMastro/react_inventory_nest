
import MUIDataTable from '../../components/table';
import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { AlertDialogUi } from "../../components";
import React from 'react';

import { SettingsRequest } from "../../services/settingsService";
import { UpdateSettings } from "./UpdateSettings";


export function SettingsTable()
{
    const refDatatable: any = React.useRef();
    const [setting, setSetting] = React.useState<any>({});
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
            name: 'key',
            label: 'Llave',
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
            name: 'value',
            label: 'Valor',
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
                    const settingSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                        <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setSetting(settingSelected);
                                            setOpenEditDialogForm(true);
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

    const handleProductSaveClick = (updatedSetting: any) => {
        refDatatable.current.updateRecord(updatedSetting.id, updatedSetting);
    };
    
    return (
        <>
          <MUIDataTable
                ref={refDatatable}
                title={"Lista de configuración"}
                fetchData={SettingsRequest.getAll}
                columns={columns}
                options={options}
            />
             <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateSettings
                        onClose={() => setOpenEditDialogForm(false)}
                        data={setting}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
        </>
    )
}