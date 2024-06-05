import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutFct: React.FC = (props: Props) => {
  const { fcfFields } = useFormFields();

  return <Ajout FormName="facture" formFields={fcfFields} />;
};

export default AjoutFct;
