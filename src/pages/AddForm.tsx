import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/react";
import {
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@mui/material";
import { useQueryClient, useQueries, useMutation } from "@tanstack/react-query";
import { Formik, Form, useField } from "formik";
import React, { useMemo } from "react";
import { Fields } from "../constants/FormFields";
import { parseFields } from "../hooks/parseFields";
import { DatePicker } from "@mui/x-date-pickers";
import useCrudApi from "../api/crudAPI";
import { useAppContext } from "../contexts/AppContext";
import useAchatCrud from "../api/achat/achat_Crud";
import { Dialog } from "@capacitor/dialog";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

type Props = {
  formFields: Fields;
  currentForm: string;
  setDialogOpen?: (open: boolean) => void;
};

const AddForm: React.FC<Props> = (props: Props) => {
  const {
    saveAvenant,
    saveDetailCharge,
    saveDetailProduit,
    saveDetailQualite,
    saveLot,
    saveMetre,
    saveProduit,
    saveProjet,
    saveTache,
    saveDelaiAttente,
    saveProduitAttente,
    saveChargeAttente,
    saveQualiteAttente,
  } = useCrudApi();
  const {
    saveBesoin,
    saveChargeStandard,
    saveCommande,
    saveDemandeDevis,
    saveDevis,
    saveFacture,
    saveFournisseur,
    savePaiement,
    saveReception,
    saveDetailReception,
  } = useAchatCrud();
  const { projectId, avenantId } = useAppContext();
  const formFields = props.formFields;

  const [isdetailRecError, setIsdetailRecError] = React.useState({
    isdetailRecError: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const selectItems = formFields
    ? useQueries({
        queries: Object.entries(formFields)
          ?.filter(([key, val]) => val?.type == "select")
          ?.map(([key, val]) => ({
            queryKey: ["add", key],
            queryFn: () =>
              val?.queryFct ? val.queryFct(eval(val.queryArg)) : null,
            meta: { type: key },
          })),
      })
    : null;

  const selectData: any = formFields
    ? Object.entries(formFields)
        ?.filter(([key, val]) => val?.type == "select")
        ?.reduce((acc: any, [key, val]: any) => {
          acc[key] =
            (queryClient.getQueryData(["add", key]) as any)?.data ||
            queryClient.getQueryData(["add", key]) ||
            null;
          return acc;
        }, {})
    : null;

  const mutation = useMutation({
    mutationFn: (variables: { data: any[]; currentForm: string }) =>
      handleAdd(variables.data, variables.currentForm),
    onMutate: (variables) => {
      return {};
    },
    onSettled(data, error, variables, context) {
      // The mutation has successfully completed!
      console.log(
        "mutation settled \n",
        "data: ",
        data,
        "error: ",
        error,
        "variables: ",
        variables,
        "context: ",
        context
      );

      if (data?.status == 400 && variables.currentForm == "detailReceptions") {
        setIsdetailRecError({
          isdetailRecError: true,
          message: data?.data,
        });
        return;
      } else if (data?.status == 200 || data?.status == 201) {
        console.log("mutation success");
        props?.setDialogOpen && props?.setDialogOpen(false);
        toast.success("Ajouté!");
        queryClient.invalidateQueries();
      } else if (data?.status == 401 || data?.status == 409) {
        console.log("entry already exists");
        toast.error("L'enregistrement existe déjà");
      } else if (data?.status == 403) {
        props?.setDialogOpen && props?.setDialogOpen(false);
        toast.error("Accès non autorisé");
      } else {
        console.log("mutation failed");
        toast.error("Erreur! " + data?.originalError?.message, {
          style: {
            zIndex: 1000,
          },
        });
      }
    },
  });

  async function handleAdd(data: any, currentForm: string) {
    console.log("dataaaaaaa", data, currentForm);
    switch (currentForm) {
      case "lot":
        return saveLot(data);
      case "produit":
        return saveProduit(data);
      case "tache":
        return saveTache(data);
      case "detailProduit":
        return saveDetailProduit(data);
      case "detailCharge":
        return saveDetailCharge(data);
      case "detailDelai":
        return;
      case "detailQualite":
        return saveDetailQualite(data);
      case "avenant":
        return saveAvenant(data);
      case "budget":
        return saveProjet(data);
      case "besoin":
        return saveBesoin(data);
      case "chargeStandard":
        return saveChargeStandard(data);
      case "fournisseur":
        return saveFournisseur(data);
      case "commande":
        return saveCommande(data);
      case "demandeDevis":
        return saveDemandeDevis(data);
      case "devis":
        return saveDevis(data);
      case "facture":
        return saveFacture(data);
      case "paiement":
        return savePaiement(data);
      case "reception":
        data.transports = [data?.transports];
        return saveReception(data);
      case "metre":
        return saveMetre(data);
      case "detailProduitAttentes":
        return saveProduitAttente(data);
      case "detailChargeAttentes":
        return saveChargeAttente(data);
      case "detailDelaiAttentes":
        return saveDelaiAttente(data);
      case "detailQualiteAttentes":
        return saveQualiteAttente(data);
      case "detailReceptions":
        data.detailCommandeId = data?.detailCommandeId?.id;
        data.receptionId = data?.receptionId?.id;
        return saveDetailReception(data);

      //return saveDetailReception(data);
      default:
        console.log("no form mutation function found");
        break;
    }
  }

  function Submit(data: any, formFields: Fields) {
    const submitData: any = { ...data };

    Object.entries(formFields)?.map(([key, val]) => {
      if (val?.type == "select") {
        submitData[key] = selectData[key].filter(
          (item: any) => item.id == submitData[key]
        )[0];
      }
    });

    const parsedData = parseFields(submitData, formFields);
    mutation.mutateAsync({ data: parsedData, currentForm: props.currentForm });
  }

  const renderSelectMenuItems = (key: any, val: any) => {
    const data = eval("selectData." + key);
    const designation = val?.selectLabel;
    //if (data) return <MenuItem value={1}>-</MenuItem>;
    return Array.isArray(data) && data.length > 0 ? (
      data?.map((option: any) => (
        <MenuItem key={option?.id} value={option?.id}>
          {option?.designation || option?.[designation]}
        </MenuItem>
      ))
    ) : (
      <MenuItem value={""}></MenuItem>
    );
  };

  return (
    <div className="justify-center flex">
      <Formik
        initialValues={
          formFields
            ? Object.fromEntries(
                Object.entries(formFields)?.map(([key, val]) =>
                  val?.type == "date"
                    ? [key, new Date().toISOString().substring(0, 10)]
                    : [key, ""]
                )
              )
            : {}
        }
        onSubmit={(values) => {
          Submit(values, formFields);
        }}
      >
        <Form className=" flex justify-center m-2 md:w-3/5 w-10/12  flex-col ">
          {formFields
            ? Object.entries(formFields)?.map(([key, val]) => (
                <InputField
                  required={val.required}
                  key={key}
                  name={key}
                  label={val.label}
                  type={val.type}
                  radio={val?.type === "boolean"}
                  select={val.type === "select"}
                >
                  {val.type === "select" && renderSelectMenuItems(key, val)}
                </InputField>
              ))
            : null}
          <div className="text-center text-red-500">
            {isdetailRecError && <span>{isdetailRecError?.message}</span>}
          </div>
          <Button
            sx={{ mt: 2 }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Ajouter
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

type InputFieldProps = {
  label: string;
  children?: any;
  radio?: boolean;
  select?: boolean;
} & any;

const InputField: React.FC<InputFieldProps> = ({
  label,
  radio,
  children,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="flex flex-row m-2 ">
      {radio ? (
        <div>
          <FormLabel>{label}</FormLabel>
          <RadioGroup
            {...field}
            // {...props}
          >
            <FormControlLabel
              {...field}
              value="false"
              control={<Radio />}
              label="NON"
            />
            <FormControlLabel
              {...field}
              value="true"
              control={<Radio />}
              label="OUI"
            />
          </RadioGroup>
        </div>
      ) : (
        <TextField
          id={props.name}
          {...field}
          {...props}
          label={label}
          variant="outlined"
          fullWidth
        >
          {children}
        </TextField>
      )}

      {meta.touched && meta.error ? (
        <div className=" text-ion-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default AddForm;
