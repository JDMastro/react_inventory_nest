import { Grid, Paper, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function Profile() {
    return (
        <Box sx={{ flexGrow: 1, padding: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>

            </Grid>
        </Box>
    )
}