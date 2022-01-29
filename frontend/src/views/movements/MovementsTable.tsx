import { MovementRequest } from "../../services/movementService";
import MUIDataTable from '../../components/table';
import React, { useEffect } from "react";
import { AlertDialogUi, FabUi } from "../../components";
import { AddMovements } from "./add";

import AddIcon from "@mui/icons-material/Add";
import { KindMovementsRequest } from "../../services/kindmovementsService";

import { formatWeight } from "../../utils/FormatNumbers";
import { makeStyles } from '@mui/styles';
import { MovementsIcons } from "./MovementsIcons";
import { DateTimeFormat } from "../../utils/DateTimeFormat";


const useStyles = makeStyles((theme: any) => ({

    tableHeadCellRight: {
        paddingRight: 0,
        '& > span': {
            justifyContent: 'flex-end',
        },
    },

}));

export function MovementsTable() {
    const classes = useStyles();
    const refDatatable: any = React.useRef();

    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [kindOfMovement, setKindOfMovement] = React.useState([]);

    useEffect(() => { KindMovementsRequest.findKindMovClientOrProvider().then(e => setKindOfMovement(e)) }, [])

    const columns = [
        {
            name: 'm_id',
            label: 'Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'h_number_order',
            label: 'Número de orden',
            options: {
                filter: true,
            },
        },
        {
            name: 'creation_at',
            label: 'Fecha',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return DateTimeFormat(value);
                },
            },
        },
        {
            name: 'ckm_name',
            label: 'Tipo de Movimiento',
            options: {
                filter: true,
            },
        },
        {
            name: 'p_name',
            label: 'Producto',
            options: {
                filter: true,
            },
        },
        {
            name: 'm_quantity',
            label: 'Cantidad',
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
            name: 'm_total_purchasePrice',
            label: 'Precio Total',
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
            name: 'm_unit_price',
            label: 'Precio unitario',
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
            name: 'm_waste_quantity',
            label: 'Merma',
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
            name: 'type_icon',
            label: 'Estado',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const movementsSelected = refDatatable.current.findData(dataIndex);
                    return (
                        <>
                            <MovementsIcons type_icon={movementsSelected.type_icon} />
                        </>
                    )
                }
            },
        },
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
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
            <MUIDataTable
                title={"Lista de movimientos"}
                ref={refDatatable}
                fetchData={MovementRequest.getall}
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
                    <AddMovements
                        kindOfMovement={kindOfMovement}
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                    />
                }
                open={openAddDialogForm}
                title=""
            />
        </>
    )
}