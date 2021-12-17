// @ts-nocheck
/* eslint-disable */
import React from "react";
import { Box, Card } from '@mui/material';
import MUIDataTable from '../../components/table';
import PapperBlock from '../../components/papper-block';
import ProductionFilterForm from './ProductionFilterForm';
// import MUIDataTable from 'mui-datatables';

const Production: React.FC = () => {
    const columns = ["Name", "Company", "City", "State"];

    const data = [
        ["Joe James", "Test Corp", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT"],
        ["Bob Herm", "Test Corp", "Tampa", "FL"],
        ["James Houston", "Test Corp", "Dallas", "TX"],
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <PapperBlock
                title="Notas de Ajuste"
                desc="..."
                >
                <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                    filterForm={
                        <ProductionFilterForm />
                    }
                />
            </PapperBlock>
        </Box>
    );
};

export default Production;
