import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import PapperBlock from '../../components/papper-block';
import { OutPutsTable } from "./OutputsTable";

const useStyles = makeStyles((theme: any) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

export function OutPuts()
{
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <PapperBlock
                className={classes.paper}
                title="Consultas"
                desc="...."
                icon={<PeopleIcon />}
            >
                <OutPutsTable />
            </PapperBlock>
        </Grid>
    );

}