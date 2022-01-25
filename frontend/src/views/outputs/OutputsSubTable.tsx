import React from "react";
import { StatusRequest } from "../../services/statusService";
import MUIDataTable from '../../components/table';
/*import Can from '../../components/can';
import EditIcon from "@mui/icons-material/Edit";*/
import { makeStyles } from '@mui/styles';
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
    }
}));

export function OutputsSubTable({ parentOutputs } : any)
{
    const classes = useStyles();
    const refDatatable: any = React.useRef();

    const columns = [
        {
            name: 'p_name',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'm_quantity',
            label: 'Cantidad',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return formatWeight(value);
                  },
            },
        },
        {
            name: 'creation_at',
            label: 'Fecha de Creación',
            options: {
                filter: true,
            },
        },
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
                className={classes.table}
                fetchData={StatusRequest.getAllnumberOrders}
                params={{ number_order : parentOutputs.h_number_order }}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
        </>
    )
}