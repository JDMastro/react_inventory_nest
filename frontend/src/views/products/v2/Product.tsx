import React from 'react';

import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import PapperBlock from '../../../components/papper-block';
import ProductTable from './ProductTable';

const useStyles = makeStyles((theme: any) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

const Product: React.FC = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <PapperBlock
                className={classes.paper}
                title="Productos"
                desc="...."
                icon={<PeopleIcon />}
            >
                <ProductTable />
            </PapperBlock>
        </Grid>
    );
};

export default Product;