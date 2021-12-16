export interface checkBoxProps{
 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checked : boolean,
    name: string,
    label: string,
}