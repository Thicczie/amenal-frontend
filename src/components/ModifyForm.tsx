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
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Dialog } from "@capacitor/dialog";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
  formFields: Fields;
  currentForm: string;
  row: MRT_Row<any>;
  table: MRT_TableInstance<any>;
};

const ModifyForm: React.FC<Props> = (props: Props) => {
  const {
    updateAvenant,
    updateDetailCharge,
    updateDetailProduit,
    updateDetailQualite,
    updateLot,
    updateMetre,
    updateProduit,
    updateProjet,
    updateTache,
  } = useCrudApi();
  const { projectId, avenantId } = useParams();

  const formFields = props.formFields;

  const client = useQueryClient();

  const selectItems = formFields
    ? useQueries({
        queries: Object.entries(formFields)
          ?.filter(([key, val]) => val?.type == "select" && !val.notModifiable)
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
        ?.filter(([key, val]) => val?.type == "select" && !val.notModifiable)
        ?.reduce((acc: any, [key, val]: any) => {
          acc[key] =
            (client.getQueryData(["add", key]) as any)?.data ||
            client.getQueryData(["add", key]) ||
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
      if (data?.status == 200 || data?.status == 201) {
        console.log("mutation success");
        toast.success("Modifié!");
        props.table.setEditingRow(null);
        client.invalidateQueries();
      } else if (data?.status == 403) {
        props?.table.setEditingRow(null);
        toast.error("Accès non autorisé");
      } else if (data?.status == 401) {
        console.log("entry already exists");
        toast.error("L'enregistrement existe déjà");
        props?.table.setEditingRow(null);
      } else {
        console.log("mutation failed");
        toast.error("Erreur! " + data?.originalError?.message);
        props.table.setEditingRow(null);
      }
    },
  });

  async function handleAdd(addData: any, currentForm: string) {
    var data = { id: props.row.original.id, ...addData };

    console.log("dataaaaaaa", data, currentForm);
    switch (currentForm) {
      case "lot":
        return updateLot(data);
      case "produit":
        return updateProduit(data);
      case "tache":
        return updateTache(data);
      case "detailProduit":
        return updateDetailProduit(data);
      case "detailCharge":
        return updateDetailCharge(data);
      case "detailDelai":
        return;
      case "detailQualite":
        return updateDetailQualite(data);
      case "avenant":
        return updateAvenant(data);
      case "budget":
        return updateProduit(data);
      case "metre":
        return updateMetre(data);
      case "detailProduitAttentes":
        return;
      case "detailChargeAttentes":
        return;
      case "detailQualiteAttentes":
        return;
      case "detailDelaiAttentes":
        return;
      case "bsn":
        return;
      case "chg":
        return;
      case "cmf":
        return;
      case "ddf":
        return;
      case "dvf":
        return;
      case "fcf":
        return;
      case "frs":
        return;
      case "pmf":
        return;
      case "rcf":
        return;

      default:
        console.log("no form found");

        break;
    }
  }

  function Submit(data: any, formFields: Fields) {
    //this prevents form input value manipulation
    const submitData: any = { ...data };

    //transforming select values
    Object.entries(formFields)?.map(([key, val]) => {
      if (val?.type == "select" && !val.notModifiable) {
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
    return data ? (
      data?.map((option: any) => (
        <MenuItem key={option?.id} value={option?.id}>
          {option?.designation || option?.[designation]}
        </MenuItem>
      ))
    ) : (
      <MenuItem value={""}></MenuItem>
    );
  };

  function defaultValues(row: MRT_Row<any>, formFields: Fields) {
    var values = Object.fromEntries(
      Object.entries(formFields)
        ?.filter(([key, val]) => !(val?.type === "select" && val.notModifiable))
        ?.map(([key, val]) =>
          val?.type === "select" && !val.notModifiable
            ? [key, row?.original[val?.foreignKey ?? ""] ?? row?.original?.id]
            : [key, row.original[key]]
        )
    );

    return values;
  }

  return (
    <Formik
      initialValues={defaultValues(props.row, formFields)}
      onSubmit={(values) => {
        console.log("values", values);
        Submit(values, formFields);
      }}
    >
      <Form className=" flex justify-center m-2 flex-col ">
        {formFields
          ? Object.entries(formFields)?.map(([key, val]) =>
              !val?.notModifiable ? (
                <InputField
                  key={key}
                  name={key}
                  label={val.label}
                  type={val.type}
                  radio={val?.type === "boolean"}
                  select={val.type === "select"}
                >
                  {val.type === "select" && renderSelectMenuItems(key, val)}
                </InputField>
              ) : (
                <></>
              )
            )
          : null}

        <Button className="m-2" variant="contained" type="submit">
          Modifier
        </Button>
      </Form>
    </Formik>
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
              {...helpers}
              {...field}
              value="false"
              control={<Radio />}
              label="NON"
            />
            <FormControlLabel
              {...helpers}
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
          {...helpers}
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

export default ModifyForm;
