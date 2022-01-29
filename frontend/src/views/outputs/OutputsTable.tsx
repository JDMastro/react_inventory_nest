import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import MUIDataTable from "../../components/table"
import { StatusRequest } from "../../services/statusService";
import { OutputsFilterForm } from "./OutputsFilterForm";
import { OutputsSubTable } from "./OutputsSubTable";
import { formatWeight } from "../../utils/FormatNumbers";


export function OutPutsTable() {
    const refDatatable: any = React.useRef();
    const refSubDatatable: any = React.useRef();
    const [status, setStatus] = useState([])
    const [statu, setStatu] = useState([])
    const [numberOrdersbyStatus, setNumberOrdersbyStatus] = useState([])
    //NumberOrdersbyStatus


    useEffect(() => { StatusRequest.findStatusEmployee().then(elements => setStatus(elements)) }, [])

    const columns = [
        {
            name: 'ps_fullname',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'h_number_order',
            label: 'Nro order',
            options: {
                filter: true,
            },
        },
        {
            name: 'mquantity',
            label: 'Cantidad',
            options: {
                filter: true,
                customBodyRender: (value: any) => {
                    return formatWeight(value);
                  },
            },
        },

    ]

    const options = {
        serverSide: true,
        print: true,
        download: true,
        expandableRows: true,
        expandableRowsHeader: false,
        expandableRowsOnClick: true,
        renderExpandableRow: (rowData: any, rowMeta: any) => {
            const currentStatu = refDatatable.current.findData(
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
                        <OutputsSubTable statu={statu} refSubDatatable={refSubDatatable} status={status} parentOutputs={currentStatu} />
                    </TableCell>
                </TableRow>
            );
        }
    }

    const handleFormFilterSubmit = async (data: any) => {
       // setStatu(data)
        //StatusRequest.getAllNumberOrdersbyStatus(data)
        //    .then(elements => setNumberOrdersbyStatus(elements))

        //console.log("estado id",data)

        await refDatatable.current.filter({ statu : data});

       
    }

    return (
        <>
            <MUIDataTable
                ref={refDatatable}
                fetchData={StatusRequest.getAllNumberOrdersbyStatus}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
                additionalDataByRow={{
                    isNewRecord: false,
                }}
                params={{
                    overwrites: {
                        statu: 'statu=',
                    },
                  }}
                filterForm={<OutputsFilterForm status={status} handleFormFilterSubmit={handleFormFilterSubmit} />}
                hasInitialLoad={false}
                openFilterForm
            />
        </>
    )

}