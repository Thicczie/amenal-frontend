import React from 'react'
import { Fields } from '../constants/FormFields';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import AddForm from '../pages/AddForm';
import { IonButton } from '@ionic/react';
import { toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type Props = {
    formFields:Fields;
    currentForm: string;
}

const AddDialogButton:React.FC<Props> = (props: Props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    
  return (
   <>

    <IconButton onClick={()=>{ setDialogOpen(true)}}><AddCircleOutlineIcon/></IconButton>
    <Dialog
    open={dialogOpen}
    onClose={()=>setDialogOpen(false)}
    fullWidth
 
  >
    <DialogTitle>Ajout</DialogTitle>
    <DialogContent>
    <AddForm formFields={props.formFields} setDialogOpen={setDialogOpen} currentForm={props.currentForm} />
    </DialogContent>
   
  </Dialog>
   </>
  )
}

export default AddDialogButton