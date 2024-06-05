import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MRT_Row } from "material-react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCrudApi from "../api/crudAPI";
import toast from "react-hot-toast";
import useUserMgApi from "../api/auth/userMgApi";

type Props = {
  currentTable: string;
  handleCrudMenuClose: () => void;
  onClose: () => void;
  children?: React.ReactNode;
  row: MRT_Row<any> | undefined;
};

const DeleteDialogButton: React.FC<Props> = (props: Props) => {
  const { deleteAvenant, deleteLot, deleteProduit, deleteProjet, deleteTache } =
    useCrudApi();
  const { deleteUser } = useUserMgApi();
  const quertClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const mutation = useMutation({
    mutationFn: (variables: {
      row: MRT_Row<any> | undefined;
      currentTable: string;
    }) => handleDelete(variables.row, variables.currentTable),
    onSettled(data, error, variables, context) {
      // The mutation has successfully completed!
      console.log("delete data ", data);
      if (data?.status == 200 || data?.status == 201 || data?.status == 204) {
        console.log("mutation success");
        props.handleCrudMenuClose();
        props.onClose();
        toast.success("Supprimé!");
        quertClient.invalidateQueries();
      } else if (data?.status == 403) {
        props.handleCrudMenuClose();
        props.onClose();
        toast.error("Accès non autorisé");
      } else if (data?.status == 401) {
        console.log("entry already exists");
        toast.error("Cet element existe déjà");
      } else if (data?.status == 400) {
        toast.error(
          "Veuillez supprimer les éléments descendants de cet enregistrement!"
        );
      } else {
        console.log("mutation failed");
        toast.error("Erreur supression! " + data?.originalError?.message);
      }
    },
  });

  const handleDelete = async (
    row: MRT_Row<any> | undefined,
    currentTable: string
  ) => {
    console.log(
      "received row to delete ",
      row?.original?.id,
      "current table ",
      currentTable
    );
    var id = row?.original?.id;

    switch (currentTable) {
      case "produit": {
        return deleteProduit(id);
      }

      case "lot": {
        return deleteLot(id);
      }

      case "tache":
      case "activite": {
        return deleteTache(id);
      }

      case "avenant": {
        return deleteAvenant(id);
      }

      case "budget": {
        return deleteProjet(id);
      }

      case "user": {
        return deleteUser(id);
      }
      default:
        console.log("no table found");
        break;
    }
  };

  const Delete = () => {
    mutation.mutate({ row: props.row, currentTable: props.currentTable });
  };

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
              Delete();
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
