import { makeStyles } from '@mui/styles';
import MUIDataTable from '../../components/table';
import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductsRequest } from '../../services/productsService';
import { red } from "@mui/material/colors";
import { AlertDialogUi } from "../../components";
import { /*useRef,*/ useState } from 'react';
import { IconButton } from '@mui/material';
//import { UpdateProductDad } from "../updateProductDad";
import { UpdateSubProduct } from "./UpdateSubProduct";
import { DeleteProduct } from "./DeleteProduct";
import { formatWeight } from "../../utils/FormatNumbers";

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
    },
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

interface ProductSubTableProps {
    parentProduct: any;
    weightUnits: any
    refDatatable: any
}

export const ProductSubTable: React.FC<ProductSubTableProps> = (props: ProductSubTableProps) => {


    const classes = useStyles();
    //const refDatatable: any = useRef();

    const [product, setProduct] = useState<any>({});
    const [openEditDialogForm, setOpenEditDialogForm] = useState<boolean>(false);
    //const [weightUnits, setWeightUnits] = useState([]);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = useState<boolean>(false);

    const columns = [
        {
            name: 'id',
            label: 'Id',
            aling: '',
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
                    const productSelected = props.refDatatable.current.findData(dataIndex);
                    console.log("----",productSelected)
                    return (
                        <>
                            {/*<Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setProduct(productSelected);
                                            setOpenEditDialogForm(true)
                                        }}

                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                                    />*/}
                            {
                               !productSelected ? (<span></span>) :
                              !props.parentProduct.p_actived  && !productSelected.p_actived ? (<span></span>) : 
                               (  <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setProduct(productSelected);
                                            setOpenEditDialogForm(true)
                                        }}

                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />)
                            
                                    }
                            {productSelected && productSelected.p_actived ? (
                                <Can
                                    perform="users:create"
                                    yes={() => (
                                        <IconButton
                                            aria-label="update"
                                            onClick={() => {
                                                setProduct(productSelected);
                                                setOpenDeleteDialogForm(true)
                                            }}
                                            disabled={productSelected.p_actived ? false : true}
                                        >
                                            <DeleteIcon fontSize="small" sx={{ color: red[700] }} />
                                        </IconButton>
                                    )}
                                />
                                        ) : (<span></span>)}

                        </>
                    )
                },
            }
        }
    ];

    const options = {
        serverSide: true
    };

    const handleProductSaveClick = (oper: string, updatedProduct: any) => {
        switch (oper) {
            case "UPDATED":
                props.refDatatable.current.updateRecord(updatedProduct.id, updatedProduct)
                break;
            case "DELETED":
                //props.refDatatable.current.deleteRecord(updatedProduct.id);
                props.refDatatable.current.updateRecord(updatedProduct.id, updatedProduct)
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
            <MUIDataTable
                ref={props.refDatatable}
                className={classes.table}
                fetchData={ProductsRequest.getDerivate}
                params={{ parentId: props.parentProduct.id }}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
            <AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateSubProduct
                        onClose={() => setOpenEditDialogForm(false)}
                        units={props.weightUnits}
                        data={product}
                        parentproduct={props.parentProduct}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openEditDialogForm}
                title=""
            />

            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <DeleteProduct
                        onClose={() => setOpenDeleteDialogForm(false)}
                        data={product}
                        onSubmit={handleProductSaveClick}
                    />}
                open={openDeleteDialogForm}
                title=""
            />
        </>
    )
}