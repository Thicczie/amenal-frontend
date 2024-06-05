import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutPmf: React.FC = (props: Props) => {
  const { pmfFields } = useFormFields();
  return <Ajout FormName="paiement" formFields={pmfFields} />;
};

export default AjoutPmf;
