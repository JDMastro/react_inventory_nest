import { radioButtonProps } from "../../types/radioButtonType";
/*import * as React from 'react';
import Radio from '@mui/material/Radio';*/
import RadioGroup from '@mui/material/RadioGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';


export function RadioButtonUi({ error, label, value, name, onChange, content, } : radioButtonProps)
{
    return (
        <FormControl component="fieldset" error={error ? true : false}>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label="gender"
          name={name}
          value={value}
          onChange={onChange}
          defaultValue={value}
          
        >

            { content }
         
        </RadioGroup>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
}