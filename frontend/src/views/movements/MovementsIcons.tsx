import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Tooltip from '@mui/material/Tooltip';

export function MovementsIcons({ type_icon }: any) {
    switch (type_icon) {
        case 'ACEPTADO':
            return (
                <Tooltip title={type_icon}>
                    <ThumbUpAltOutlinedIcon color="success" />
                </Tooltip>)

        case 'RECHAZADO':
            return (
                <Tooltip title={type_icon}>
                    <ThumbDownOffAltIcon color="error" />
                </Tooltip>)
        case 'PENDIENTE':
            return (
                <Tooltip title={type_icon}>
                    <PauseCircleOutlineOutlinedIcon color="warning" />
                </Tooltip>)
        default:
            return <span></span>
    }
}