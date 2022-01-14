import React from 'react';
import { makeStyles } from '@mui/styles';

import MUIDataTable from '../../../components/table';
import Can from '../../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsRequest } from '../../../services/productsService';
import { red } from "@mui/material/colors";
import { UnitsRequest } from "../../../services/unitsService";
import { AlertDialogUi } from "../../../components";
import { UpdateProductDad } from "../updateProductDad";


const useStyles = makeStyles((theme: any) => ({
    table: {
        '& .MuiToolbar-root': {
            display: 'none',
        },
        '& .MuiTableCell-root': {
            paddingTop: 0,
            paddingBottom: 0,
            borderBottom: 'none',
        }
    }
}));

interface ProductSubTableProps {
    parentProduct: any;
}

const ProductSubTable: React.FC<ProductSubTableProps> = (props: ProductSubTableProps) => {
    const classes = useStyles();
    const refDatatable: any = React.useRef();

    const [product, setProduct] = React.useState<any>({});
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [weightUnits, setWeightUnits] = React.useState([]);

    React.useEffect(() => {
        console.log(props?.parentProduct, 'parentProduct');
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
                                    <EditIcon fontSize="small" color="primary" />
                                )}
                            />
                            <Can
                                perform="users:create"
                                yes={() => (
                                    <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                                )}
                            />
                        </>
                    )
                },
            }
        }
    ];

    const options = {
        serverSide: true
    };

    const handleProductSaveClick = (updatedProduct: any) => {
        refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                className={classes.table}
                fetchData={ProductsRequest.getDerivate}
                params={{parentId : props.parentProduct.p_id}}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
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
        </>
    );
};

export default ProductSubTable;