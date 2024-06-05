import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutDvf: React.FC = (props: Props) => {
  const { dvfFields } = useFormFields();

  return <Ajout FormName="devis" formFields={dvfFields} />;
};

export default AjoutDvf;
