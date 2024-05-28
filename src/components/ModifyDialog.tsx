import React, { useEffect } from "react";
import {
  Fields,
  attestationRgfFields,
  avenantFields,
  bsnFields,
  budgetFields,
  chgFields,
  cmfFields,
  compteBanquaireFields,
  contactFounisseurFields,
  contratDlpFields,
  contratPlafondFields,
  ddfFields,
  detailBesoinFields,
  detailChargeFormFields,
  detailDelaiFormFields,
  detailDemandeDevisFields,
  detailDevisFields,
  detailFactureFields,
  detailProduitFormFields,
  detailQualiteFormFields,
  detailReceptionFields,
  dvfFields,
  evaluationFournisseurFields,
  fcfFields,
  frsFields,
  lotFields,
  pmfFields,
  produitFields,
  rcfFields,
  remiseFields,
  tacheFields,
  transportFields,
} from "../constants/FormFields";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddForm from "../pages/AddForm";
import { IonButton } from "@ionic/react";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import ModifyForm from "./ModifyForm";

type Props = {
  currentForm: string;
  row: MRT_Row<any>;
  table: MRT_TableInstance<any>;
};

const ModifyDialogButton: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  console.log("row", props.row.original, "table");
  const currentFormField = getFormFields(props.currentForm);
  console.log("currentFormField", props.currentForm);

  return (
    <>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <ModifyForm
          formFields={currentFormField}
          currentForm={props.currentForm}
          table={props.table}
          row={props.row}
        />
      </DialogContent>
    </>
  );
};

export default ModifyDialogButton;
export function getFormFields(currentForm: string): any {
  switch (currentForm) {
    case "lot":
      return lotFields;

    case "produit":
      return produitFields;

    case "tache":
      return tacheFields;

    case "detailProduit":
      return detailProduitFormFields;

    case "detailCharge":
      return detailChargeFormFields;

    case "detailDelai":
      return detailDelaiFormFields;

    case "detailQualite":
      return detailQualiteFormFields;

    case "avenant":
      return avenantFields;
    case "budget":
      return budgetFields;
    case "besoin":
    case "bsn":
      return bsnFields;
    case "fournisseur":
    case "frs":
      return frsFields;
    case "chg":
    case "charge":
      return chgFields;
    case "commande":
    case "cmf":
      return cmfFields;

    case "ddf":
      return ddfFields;
    case "devis":
    case "dvf":
      return dvfFields;
    case "facture":
    case "fcf":
      return fcfFields;
    case "paiement":
    case "pmf":
      return pmfFields;

    case "receptions":
    case "rcf":
      return rcfFields;
    case "detailBesoins":
      return detailBesoinFields;
    case "detailDemandeDevis":
      return detailDemandeDevisFields;
    case "detailDevis":
      return detailDevisFields;
    case "transports":
      return transportFields;
    case "detailReceptions":
      return detailReceptionFields;
    case "detailFactures":
      return detailFactureFields;
    case "remises":
      return remiseFields;
    case "compteDebite":
      return compteBanquaireFields;
    case "evaluations":
      return evaluationFournisseurFields;
    case "contratPlafonds":
      return contratPlafondFields;
    case "contratDlps":
      return contratDlpFields;
    case "contacts":
      return contactFounisseurFields;
    case "attestationRgfs":
      return attestationRgfFields;

    default:
      return avenantFields;
  }
}
