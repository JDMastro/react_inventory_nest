export interface textFieldProps{
    name: string,
    label: string,
    value: string,
    error: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    autofocus: boolean,
    type: string,
    inputInside? : any,
    disabled? : boolean
}