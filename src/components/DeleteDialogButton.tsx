import React from "react";
import { Fields } from "../constants/FormFields";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  MenuItem,
} from "@mui/material";
import AddForm from "../pages/AddForm";
import { IonButton } from "@ionic/react";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  currentTable: string;
  handleCrudMenuClose: () => void;
  onClose: () => void;
  children?: React.ReactNode;
};

const DeleteDialogButton: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {props.children}
      <MenuItem onClick={() => setOpen(true)}>
        <DeleteIcon /> Supprimer
      </MenuItem>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          props.onClose();
        }}
        fullWidth
      >
        <DialogTitle>Supprimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes vous sur de vouloir supprimer cet enregistrement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              props.handleCrudMenuClose();
              props.onClose();
            }}
          >
            Annuller
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              props.handleCrudMenuClose();
              props.onClose();
            }}
            autoFocus
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialogButton;
