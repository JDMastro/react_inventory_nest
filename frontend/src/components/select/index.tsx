//import MenuItem from '@mui/material/MenuItem';
//import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { selectProps } from "../../types/selectType";

export function SelectWrapperUi({ name, value, error, onChange, menuItems, label, disabled=false, defaultValue=0 }: selectProps) {

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event);
  };
  return (
    <FormControl fullWidth {...(error && { error: true })}>
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="uncontrolled-native"
        value={value}
        name={name}
        onChange={handleChange}
        label={label}
        disabled={disabled}
        defaultValue={defaultValue}
        
      >
        {
          menuItems
        }
        {/*
                  options.map((data : any, i : any) =>
                  <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>
                  )
              */}
        {/*<MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>*/}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

//demo-simple-select-autowidth