import React from 'react';
import { makeStyles } from '@mui/styles';

import MUIDataTable from '../../../components/table';
import Can from '../../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsRequest } from '../../../services/productsService';
import { IconButton, TableRow, TableCell } from "@mui/material";
import { red } from "@mui/material/colors";
import { UnitsRequest } from "../../../services/unitsService";
import {AlertDialogUi, FabUi} from "../../../components";
import { UpdateProductDad } from "../updateProductDad";

import ProductSubTable from './ProductSubTable';
import {DeleteProduct} from "../delete";
import AddIcon from "@mui/icons-material/Add";
import {AddProductDad} from "../addProducDad";


const useStyles = makeStyles((theme: any) => ({}));

const ProductTable: React.FC = () => {
    const classes = useStyles();
    const refDatatable: any = React.useRef();

    const [product, setProduct] = React.useState<any>({});
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);
    const [weightUnits, setWeightUnits] = React.useState([]);

    React.useEffect(() => {
        UnitsRequest.getAll()
            .then(elements => setWeightUnits(elements))
    }, [])

    const columns = [
        {
            name: 'p_id',
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
            },
        },
        {
            name: 'sale_unit',
            label: 'Und.Venta',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_current_existence',
            label: 'Existencia',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_reserved_quantity',
            label: 'Reservados',
            options: {
                filter: true,
            },
        },    {
            name: 'actions',
            label: 'Acciones',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const productSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <Can
                                perform="users:create"
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
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setProduct(productSelected);
                                            setOpenDeleteDialogForm(true);
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                                    </IconButton>
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
        expandableRowsOnClick: true,
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
                        <ProductSubTable parentProduct={currentProduct} />
                    </TableCell>
                </TableRow>
            );
        }
    };

    const handleProductSaveClick = (updatedProduct: any) => {
        refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    const handleOpenAddDialogForm = () => {
        setProduct({});
        setOpenEditDialogForm(true);
    };

    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={ProductsRequest.getNotDerivate}
                params={{ isDerivate: false }}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
            <FabUi
                size="small"
                color="primary" onClick={handleOpenAddDialogForm}
                ariaLabel="add"
                icon={<AddIcon />}
            />
            <AlertDialogUi
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <AddProductDad
                        units={weightUnits}
                        handleClose={() => setOpenAddDialogForm(false)}
                    />
                }
                open={openAddDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateProductDad
                        handleClose={() => setOpenEditDialogForm(false)}
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
                        handleClose={() => setOpenDeleteDialogForm(false)}
                        data={product}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />
        </>
    );
};

export default ProductTable;