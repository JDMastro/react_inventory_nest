import { Box } from "@mui/material";
import { AvatarUi } from "../../components";
import useUser from "../../hooks/useUser";



export function Profile() {
    const { user } = useUser();
    return (
        <Box sx={{ fontWeight: 'bold', m: 1, textTransform: 'uppercase' }} >
            <AvatarUi  title={user.data.fullname} />
           
        </Box>
    )
}