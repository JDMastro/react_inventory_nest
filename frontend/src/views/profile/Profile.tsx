import { Box } from "@mui/material";
import { AvatarUi } from "../../components";



export function Profile() {
    return (
        <Box sx={{ fontWeight: 'bold', m: 1, textTransform: 'uppercase' }} >
            <AvatarUi  title="test test" />
           
        </Box>
    )
}