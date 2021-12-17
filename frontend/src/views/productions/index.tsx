// @ts-nocheck
/* eslint-disable */
import React from "react";
import { Box, Card } from '@mui/material';
import MUIDataTable from '../../components/table';
import PapperBlock from '../../components/papper-block';
import ProductionFilterForm from './ProductionFilterForm';
import { PersonRequest } from "../../services/personService";
// import MUIDataTable from 'mui-datatables';


const Production: React.FC = () => {
    const refDatatable: any = React.useRef();
    const columns = ["id", "name"];

    const handleFormFilterSubmit = async (data: any) => {
        await refDatatable.current.filter({});
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <PapperBlock
                title="Produccion"
                desc="..."
                >
                <MUIDataTable
                    ref={refDatatable}
                    title={"Employee List"}
                    fetchData={PersonRequest.getAll}
                    columns={columns}
                    options={{
                        serverSide: true,
                        print: true,
                        download: true,
                        pagination: false,
                    }}
                    additionalDataByRow={{
                        isNewRecord: false,
                    }}
                    filterForm={
                        <ProductionFilterForm handleSubmit={handleFormFilterSubmit} />
                    }
                    hasInitialLoad={false}
                    openFilterForm
                />
            </PapperBlock>
        </Box>
    );
};

export default Production;
