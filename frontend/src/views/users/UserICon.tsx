
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export function UserIcon({ classification }: any) {
    return classification === "CLIENTE" ? (
        <Tooltip title={classification}>
            <AccountCircleIcon color='primary' />
        </Tooltip>) : (<Tooltip title={classification}>
            <AdminPanelSettingsIcon color='primary' />
        </Tooltip>)
}