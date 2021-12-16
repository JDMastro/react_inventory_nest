import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { dialogProps } from "../../types/dialogType";

export function AlertDialogUi({ content, open, title, handleClose, maxWidth="sm" }: dialogProps) {


  return (
    <div>
      <Dialog
        fullWidth
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>

        <DialogContent style={{ padding : '2%' }}>
         
      
          {
            content
          }
        </DialogContent>
        
      </Dialog>
    </div>
  );
}