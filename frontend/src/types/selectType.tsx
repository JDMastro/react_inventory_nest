export interface selectProps {
    name: string
    value: string
    error: any
    menuItems: React.ReactChild[] | any
    onChange: any,
    label : string,
    disabled? : boolean,
    defaultValue? : any
}