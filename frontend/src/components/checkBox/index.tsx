import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { checkBoxProps } from "../../types/checkBoxType";

export function CheckboxUi({ checked, onChange, name, label }: checkBoxProps) {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    name={name}
                />
            }
            label={label}
        />
    );
}


/*
<Checkbox
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'controlled' }}
      name={name}
    />
 
 
*/