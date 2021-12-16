import { FabProps } from "../../types/fabType";
import Fab from '@mui/material/Fab';
import { green } from '@mui/material/colors';

export function FabUi({ ariaLabel, color, icon, onClick,
    sx = {
        position: 'absolute',
        bottom: 16,
        right: 16,
        bgcolor: green[600],
        '&:hover': {
            bgcolor: green[500],
        },
    }
}: FabProps) {
    return (
        <Fab sx={sx} size="small" color={color} onClick={onClick} aria-label={ariaLabel}>
            {
                icon
            }
        </Fab>
    )
}

/*
{
            position: 'absolute',
            bottom: 16,
            right: 16,
            bgcolor: green[600],
            '&:hover': {
                bgcolor: green[500],
            },
        }

*/