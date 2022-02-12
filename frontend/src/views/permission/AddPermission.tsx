import { Switch, Stack } from "@mui/material";
import { /*useEffect,*/ useRef } from "react"
import MUIDataTable from '../../components/table';
import { PermissionRequest } from "../../services/permissionService";
import { ButtonUi } from "../../components";


export function AddPermission({ onClose, data }: any) {
    const refDatatable: any = useRef();
    
    const columns = [
        {
            name: 'fullmodule',
            label: 'Modulo',
            aling: '',
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Description',
            aling: '',
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
                    const permissionSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Switch
                                checked={permissionSelected.checking}
                                onChange={(evt: any) => {
                                    PermissionRequest.createOrDelete({
                                        checking: permissionSelected.checking,
                                        user_id: data.id,
                                        permission_id: permissionSelected.id
                                    }).then(e => {

                                        refDatatable.current.updateRecord(e.data.id, e.data)
                                    })
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
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
                fetchData={PermissionRequest.getAll}
                params={{ user_Id: data.id }}
                title={`Permisos para la cuenta de ${data.p_fullname}`}
                // filterForm={<UserTableFilterForm handleSubmit={() => ()}/>}
                columns={columns}
                options={options}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <span></span>

                <ButtonUi disabled={false} text="Aceptar" type="button" onClick={onClose} />
            </Stack>

        </>
    )
}