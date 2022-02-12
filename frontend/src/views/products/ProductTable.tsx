import React from 'react';
//import { makeStyles } from '@mui/styles';

import MUIDataTable from '../../components/table';
import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsRequest } from '../../services/productsService';
import { IconButton, TableRow, TableCell } from "@mui/material";
import { UnitsRequest } from "../../services/unitsService";
import { AlertDialogUi, FabUi } from '../../components';
import AddIcon from "@mui/icons-material/Add";
//import { green } from '@mui/material/colors'


import { AddProduct } from "./AddProduct";
import { UpdateProduct } from "./UpdateProduct";
import { DeleteProduct } from "./DeleteProduct";
import { ProductSubTable } from "./ProductSubTable";
import { AddSubProduct } from "./AddSubProduct";
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

export function ProductTable() {
    const classes = useStyles();
    const refDatatable: any = React.useRef();
    const refDatatableSub: any = React.useRef();
    const [product, setProduct] = React.useState<any>({});
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openAddSubDialogForm, setOpenAddSubDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);
    const [weightUnits, setWeightUnits] = React.useState([]);

    React.useEffect(() => {
        UnitsRequest.getAll()
            .then(elements => setWeightUnits(elements))
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
            name: 'p_name',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_description',
            label: 'Descripción',
            options: {
                filter: true,
            },
        },
        {
            name: 'purchase_unit',
            label: 'Und.Compra',
            options: {
                filter: true,
                setCellHeaderProps: () => ({ className: classes.tableHeadCellCenter }),
                setCellProps: () => ({ style: { textAlign: 'center' } }),
            },
        },
        {
            name: 'sale_unit',
            label: 'Und.Venta',
            options: {
                filter: true,
                setCellHeaderProps: () => ({ className: classes.tableHeadCellCenter }),
                setCellProps: () => ({ style: { textAlign: 'center' } }),
            },
        },
        {
            name: 'p_current_existence',
            label: 'Existencia',
            options: {
                filter: true,
                setCellHeaderProps: () => ({ className: classes.tableHeadCellRight }),
                setCellProps: () => ({ style: { textAlign: 'right' } }),
                customBodyRender: (value: any) => {
                    return formatWeight(value);
                },
            },
        },
        {
            name: 'p_reserved_quantity',
            label: 'Reservados',
            options: {
                filter: true,
                setCellHeaderProps: () => ({ className: classes.tableHeadCellRight }),
                setCellProps: () => ({ style: { textAlign: 'right' } }),
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
                setCellHeaderProps: () => ({ className: classes.tableHeadCellCenter }),
                setCellProps: () => ({ style: { textAlign: 'left' } }),
                customBodyRenderLite: (dataIndex: number) => {
                    const productSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="maestro:products:create"
                                yes={() => (
                                    productSelected.p_actived ? (
                                        <IconButton
                                            aria-label="update"
                                            onClick={() => {
                                                setProduct(productSelected);
                                                setOpenAddSubDialogForm(true);
                                            }}
                                        >
                                            {/*  disabled={productSelected.p_actived ? false : true} */}
                                            <AddIcon fontSize="small" color="success" />
                                        </IconButton>
                                    ) : (<span></span>)

                                )}
                            />
                            <Can
                                perform="maestro:products:update"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setProduct(productSelected);
                                            setOpenEditDialogForm(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                            <Can
                                perform="maestro:products:delete"
                                yes={() => (

                                    productSelected.p_actived ? (
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {
                                                setProduct(productSelected);
                                                setOpenDeleteDialogForm(true);
                                            }}

                                        >
                                            {/*  disabled={productSelected.p_actived ? false : true} */}
                                            <DeleteIcon fontSize="small" color="error" />
                                        </IconButton>
                                    ) : (<span></span>)

                                )}
                            />
                        </>
                    )
                },
            }
        }
    ];

    const options = {
        serverSide: true,
        print: true,
        download: true,
        expandableRows: true,
        expandableRowsHeader: false,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            const currentProduct = refDatatable.current.findData(
                rowMeta.rowIndex
            );
            const colSpan = rowData.length + 1;
            return (
                <TableRow>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            borderBottom: 'none',
                            paddingLeft: '120px',
                        }}
                        colSpan={colSpan}
                    >
                        <ProductSubTable refDatatable={refDatatableSub} weightUnits={weightUnits} parentProduct={currentProduct} />
                    </TableCell>
                </TableRow>
            );
        }
    };

    /*const saveProductChild = (product : any) =>{
        refDatatable.current.createRecord(product)
    }*/

    const handleProductSaveClick = (oper: string, updatedProduct: any) => {
        switch (oper) {
            case "CREATED":
                refDatatable.current.createRecord(updatedProduct)
                break;
            case "UPDATED":
                refDatatable.current.updateRecord(updatedProduct.id, updatedProduct)
                break;
            case "DELETED":
                refDatatable.current.updateRecord(updatedProduct.id, updatedProduct)
                //refDatatable.current.deleteRecord(updatedProduct.id);
                break;
            case "CREATED_SUB":
                refDatatableSub.current.createRecord(updatedProduct)
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    /*const handleOpenAddDialogForm = (savedProduct : any) => {
        
        setOpenEditDialogForm(true);
    };*/

    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={ProductsRequest.findAllWithPagination}
                // filterForm={<UserTableFilterForm handleSubmit={() => ()}/>}
                columns={columns}
                options={options}
                title={"Lista de productos"}
            />

            <Can
                perform="maestro:products:create"
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
                    <AddProduct
                        units={weightUnits}
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
                    <UpdateProduct
                        onClose={() => setOpenEditDialogForm(false)}
                        units={weightUnits}
                        data={product}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteProduct
                        open={openDeleteDialogForm}
                        setOpen={setOpenDeleteDialogForm}
                        onClose={() => setOpenDeleteDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        data={product}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenAddSubDialogForm(false)}
                content={
                    <AddSubProduct
                        units={weightUnits}
                        data={product}
                        onClose={() => setOpenAddSubDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openAddSubDialogForm}
                title=""
            />

        </>
    )
}