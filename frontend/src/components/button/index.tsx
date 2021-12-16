
import Button from '@mui/material/Button';
import { buttonProps } from "../../types/buttonType";
//import CircularProgress from '@mui/material/CircularProgress';

export function ButtonUi({ variant, disabled = false, onClick, text, type, Icon, fullWidth = false }: buttonProps) {
    return (
        <Button
            fullWidth={fullWidth}
            variant={variant}
            startIcon={Icon}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {/*disabled && <CircularProgress style={{ padding: "5px" }} />*/}
            {text}
        </Button>
    )
}