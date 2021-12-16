export interface radioButtonProps{
    name: string,
    label: string,
    value: string,
    error: any,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    content : React.ReactChild[] | any;
}