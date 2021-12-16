import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { snackbar } from "../../types/SnackBarType";

import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
export function Snackbars({ open, handleClose, msg, severity = "success" } : snackbar) {

   
   
    return (
        <Snackbar anchorOrigin={{ vertical : "bottom", horizontal : "right" }} open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}