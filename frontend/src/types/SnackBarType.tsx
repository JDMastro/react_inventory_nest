export interface snackbar{
    msg : string,
    severity? : any,
    open : boolean,
    handleClose : () => void
}