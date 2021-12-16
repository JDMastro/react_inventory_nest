import TextField from '@mui/material/TextField';
import { textFieldProps } from "../../types/textFieldProps";

import InputAdornment from '@mui/material/InputAdornment';



export function TextFieldUi({ name, label, value, error = null, onChange, autofocus = true, type, inputInside, disabled = false }: textFieldProps) {
    return (
        <TextField
            disabled={disabled}
            variant="outlined"
            fullWidth
            autoComplete={type === "password" ? 'new-password' : 'off'}
            id={ type === "password" ? "filled-password-input" :"outlined-start-adornment"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            autoFocus={autofocus}
            InputProps={{
                startAdornment: <InputAdornment position="start">{inputInside}</InputAdornment>,
            }}
            type={type}
            {...(error && { error: true, helperText: error })}
        />
    )
}

/*

InputProps={{
                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
              }}
*/