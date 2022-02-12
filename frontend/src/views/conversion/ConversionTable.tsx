
import React from 'react';
import { AlertDialogUi, FabUi } from '../../components';
import MUIDataTable from '../../components/table';
import { ConversionRequest } from "../../services/conversionService";
import { SignsRequest } from '../../services/signsService';
import { UnitsRequest } from '../../services/unitsService';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { DeleteConversion } from "./delete";
import { UpdateConversion } from "./update";
import { AddConversion } from "./add";
import AddIcon from "@mui/icons-material/Add";
import Can from '../../components/can';
import { IconButton } from '@mui/material';

import { makeStyles } from '@mui/styles';
import { formatWeight } from "../../utils/FormatNumbers";



const useStyles = makeStyles((theme: any) => ({
   
    tableHeadCellRight: {
        paddingRight: 0,
        '& > span': {
          justifyContent: 'flex-end',
        },
      },

      tableHeadCellCenter: {
        paddingRight: 0,
        '& > span': {
          justifyContent: 'center',
        },
      },
}));




export function ConversionTable() {
    const classes = useStyles();
    const refDatatable: any = React.useRef();
    const [conversion, setConversion] = React.useState<any>({});
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);

    const [weightUnits, setWeightUnits] = React.useState([]);
    const [mathSigns, setMathSigns] = React.useState([])

    React.useEffect(() => {
        UnitsRequest.getAll()
            .then(elements => setWeightUnits(elements))
    }, [])

    React.useEffect(() => {
        SignsRequest.getAll()
            .then(e => setMathSigns(e))
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
            name: 'code_from',
            label: 'De',
            options: {
                filter: true,
            },
        },
        {
            name: 'code_to',
            label: 'A',
            options: {
                filter: true,
            },
        },
        {
            name: 's_sign',
            label: 'Signo',
            options: {
                filter: true,
            },
        },
        {
            name: 'c_conversion_quatity',
            label: 'Cantidad',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return formatWeight(value);
                  },
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
                    const conversionSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                          <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            //setProduct(productSelected);
                                            setConversion(conversionSelected)
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
                                            setConversion(conversionSelected)
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

    const handleProductSaveClick = (oper : string, updatedConversion: any) => {
        switch(oper)
        {
            case "CREATED" :
                refDatatable.current.createRecord(updatedConversion)
                break;
            case "UPDATED" :
                refDatatable.current.updateRecord(updatedConversion.id, updatedConversion)
                break;
            case "DELETED" :
                refDatatable.current.deleteRecord(updatedConversion.id);
                break;
            default : break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };


    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={ConversionRequest.getAll}
                title={"Lista de conversion"}
                // filterForm={<UserTableFilterForm handleSubmit={() => ()}/>}
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
                    <AddConversion
                        units={weightUnits}
                        onClose={() => setOpenAddDialogForm(false)}
                        signs={mathSigns}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openAddDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateConversion
                      units={weightUnits}
                      onClose={() => setOpenEditDialogForm(false)}
                      signs={mathSigns}
                      onSubmit={handleProductSaveClick}
                      data={conversion}
                    />}
                open={openEditDialogForm}
                title=""
            />
             <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteConversion
                      onClose={() => setOpenDeleteDialogForm(false)}
                      onSubmit={handleProductSaveClick}
                      data={conversion}
                    />}
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}