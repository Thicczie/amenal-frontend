import React from "react";
import useFormFields, { Fields } from "../constants/FormFields";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import AddForm from "../pages/AddForm";
import { IonButton } from "@ionic/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getFormFields } from "./ModifyDialog";
import { useQuery } from "@tanstack/react-query";
import useCrudApi from "../api/crudAPI";
import { useParams } from "react-router-dom";
import { Field } from "formik";

type Props = {
  formFields?: Fields;
  currentForm: string;
};

const AddDialogButton: React.FC<Props> = (props: Props) => {
  const { metreFields } = useFormFields();
  const { getMetresByAvenantId } = useCrudApi();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const currentFormField = props.formFields ?? getFormFields(props.currentForm);
  const { avenantId } = useParams();

  const metres = useQuery({
    queryKey: ["metresbyavenant", avenantId],
    queryFn: () => {
      return getMetresByAvenantId(avenantId);
    },
    enabled: !!avenantId,
  });

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
        {metres?.data?.data?.length == 0 && props.currentForm == "produit" ? (
          <>
            <DialogTitle>Ajout</DialogTitle>
            <Typography variant="body2" color="text.warning" align="center">
              Veuillez ajouter un metre avant d'ajouter un produit
            </Typography>
            <DialogContent>
              <AddForm
                formFields={metreFields}
                setDialogOpen={setDialogOpen}
                currentForm={"metre"}
              />
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>Ajout</DialogTitle>
            <DialogContent>
              <AddForm
                formFields={currentFormField}
                setDialogOpen={setDialogOpen}
                currentForm={props.currentForm}
              />
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default AddDialogButton;
