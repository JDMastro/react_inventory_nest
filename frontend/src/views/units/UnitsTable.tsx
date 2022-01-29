import React from 'react';
import { AlertDialogUi, FabUi } from '../../components';
import MUIDataTable from '../../components/table';
import { UnitsRequest } from "../../services/unitsService";
import AddIcon from "@mui/icons-material/Add";

import { AddUnits } from "./add";
import Can from '../../components/can';
import { IconButton } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { UpdateUnits } from "./update";

import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteUnits } from "./delete";

export function UnitsTable()
{
    const refDatatable: any = React.useRef();
    const [units, setUnits] = React.useState<any>({});
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
            label: 'Sigla',
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
                    const unitsSelected = refDatatable.current.findData(dataIndex);
                    return(
                        <>
                         <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setUnits(unitsSelected);
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
                                            setUnits(unitsSelected);
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
                fetchData={UnitsRequest.findAllWithPagination}
                title={"Lista de unidades"}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
              <FabUi
                size="small"
                color="primary" onClick={() => setOpenAddDialogForm(true)}
                ariaLabel="add"
                icon={<AddIcon />}
            />
            <AlertDialogUi
                maxWidth="md"
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <AddUnits
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
                    <UpdateUnits
                        onClose={() => setOpenEditDialogForm(false)}
                        data={units}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteUnits
                        onClose={() => setOpenDeleteDialogForm(false)}
                        data={units}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}