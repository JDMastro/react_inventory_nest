export interface accordionProps{
    panel: string
    tittle : string;
    content : React.ReactChild[] | any;
    
    tittleSecond : string;
    key? : any
    
    handleChange: any

    expanded : any
}