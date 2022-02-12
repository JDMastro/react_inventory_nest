import React, { useEffect } from 'react';
import MUIDataTable from '../../components/table';
import { MovementRequest } from "../../services/movementService";
import { StatusRequest } from "../../services/statusService";
import { ReportsFilterForm } from "./ReportsFilterForm";
import { formatWeight } from "../../utils/FormatNumbers";
import { makeStyles } from '@mui/styles';
import { MovementsIcons } from "../movements/MovementsIcons";
import { DateTimeFormat } from "../../utils/DateTimeFormat";

const useStyles = makeStyles((theme: any) => ({

    tableHeadCellRight: {
        paddingRight: 0,
        '& > span': {
            justifyContent: 'flex-end',
        },
    },

}));



export function ReportsTable()
{
    const classes = useStyles();
    const refDatatable: any = React.useRef();
    const [status, setStatus] = React.useState([]);
    const [params, setParams] = React.useState({});
    

    useEffect(()=>{ StatusRequest.getAllForReports().then(e=> setStatus(e) ) },[])
    
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
            name: 'h_creation_at',
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

    const handleFormFilterSubmit = async (data: any) => {
        setParams(data)
       await refDatatable.current.filter(data);

    }

    return (
        <>
         <MUIDataTable
                title={"Lista de movimientos"}
                ref={refDatatable}
                fetchData={MovementRequest.findAllReports}
                columns={columns}
                options={options}
                filterForm={<ReportsFilterForm handleFormFilterSubmit={handleFormFilterSubmit} status={status} /> }
                additionalDataByRow={{
                    isNewRecord: false,
                }}
                params={params}
                hasInitialLoad={false}
                openFilterForm
            />
        </>
    )
}