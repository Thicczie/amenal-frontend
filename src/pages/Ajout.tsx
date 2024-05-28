import React, { Children, useMemo } from "react";
import {
  IonButton,
  IonButtons,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  Formik,
  Form,
  Field,
  FormikProps,
  useField,
  FieldHookConfig,
} from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Fields,
  lotFields,
  produitFields,
  tacheFields,
} from "../constants/FormFields";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import AddForm from "./AddForm";
import PageHeader from "../components/PageHeader";

type AjoutProps = {
  FormName: string;
  formFields: Fields;
};

const Ajout: React.FC<AjoutProps> = (props: AjoutProps) => {
  return (
    <IonPage>
      <PageHeader title={"Ajout " + props.FormName} enableMenuButton />
      <IonContent>
        <AddForm currentForm={props.FormName} formFields={props.formFields} />
      </IonContent>
    </IonPage>
  );
};

export default Ajout;
