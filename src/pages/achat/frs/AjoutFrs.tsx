import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutFrs: React.FC = (props: Props) => {
  const { frsFields } = useFormFields();

  return <Ajout FormName="fournisseur" formFields={frsFields} />;
};

export default AjoutFrs;
