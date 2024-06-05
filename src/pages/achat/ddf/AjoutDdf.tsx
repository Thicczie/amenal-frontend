import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutDdf: React.FC = (props: Props) => {
  const { ddfFields } = useFormFields();

  return <Ajout FormName="demandeDevis" formFields={ddfFields} />;
};

export default AjoutDdf;
