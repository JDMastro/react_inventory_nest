//import { makeStyles } from '@mui/styles';
import MUIDataTable from '../../components/table';
import { clientManufacturerRequest } from "../../services/clientManufacturerService";
import React from "react";
import Switch from '@mui/material/Switch';
import Can from '../../components/can';
import { Divider } from '@mui/material';
import { ButtonUi } from '../../components';
import Stack from '@mui/material/Stack';



export function ClientManufacturer({ data, onClose }: any) {
    //const classes = useStyles();
    const refDatatable: any = React.useRef();

    const columns = [

        {
            name: 'p_fullname',
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
                    const clientManufacturSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="usuarios:accounts:toassign"
                                yes={() => (
                                    <Switch
                                        checked={clientManufacturSelected.checking}
                                        onChange={(evt: any) => {
                                            clientManufacturerRequest.createdOrDelete({
                                                id: clientManufacturSelected.cm_id,
                                                client_id: clientManufacturSelected.id,
                                                manufacturer_id: data.u_person_id
                                            }).then(e => { refDatatable.current.updateRecord(e.data.id, e.data) })

                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                )}
                            />
                        </>
                    )
                }
            }
        }

    ];

    const options = {
        serverSide: true
    };



    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={clientManufacturerRequest.getAll}
                params={{ manufacture_id: data.u_person_id }}
                // filterForm={<UserTableFilterForm handleSubmit={() => }/>}
                columns={columns}
                options={options}
            />

            <Divider style={{ marginTop: '15px' }} />

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