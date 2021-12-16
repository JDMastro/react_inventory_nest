export interface dialogProps{
 
    content : React.ReactChild[] | any;
    open : boolean
    title : string
    handleClose : ()=> void
    maxWidth? : 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}