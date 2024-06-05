import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutCmf: React.FC = (props: Props) => {
  const { cmfFields } = useFormFields();

  return <Ajout FormName="commande" formFields={cmfFields} />;
};

export default AjoutCmf;
