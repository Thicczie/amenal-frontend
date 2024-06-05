import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutRcf: React.FC = (props: Props) => {
  const { rcfFields } = useFormFields();
  return <Ajout FormName="reception" formFields={rcfFields} />;
};

export default AjoutRcf;
