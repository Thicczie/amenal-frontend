import React from "react";
import { Fields } from "../constants/FormFields";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import AddForm from "../pages/AddForm";
import { IonButton } from "@ionic/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getFormFields } from "./ModifyDialog";

type Props = {
  formFields?: Fields;
  currentForm: string;
};

const AddDialogButton: React.FC<Props> = (props: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const currentFormField = props.formFields ?? getFormFields(props.currentForm);

  return (
    <>
      <IconButton
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>Ajout</DialogTitle>
        <DialogContent>
          <AddForm
            formFields={currentFormField}
            setDialogOpen={setDialogOpen}
            currentForm={props.currentForm}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddDialogButton;
