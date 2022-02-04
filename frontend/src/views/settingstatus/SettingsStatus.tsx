

import { Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PapperBlock from '../../components/papper-block';
import { SettingsStatusTable } from "./SettingsStatusTable";


export function SettingStatus()
{
    return (
        <Grid item xs={12}>
            <PapperBlock
                title="Configuración estado"
                desc="...."
                icon={<PeopleIcon />}
            >
                <SettingsStatusTable />
            </PapperBlock>
        </Grid>
    )
}