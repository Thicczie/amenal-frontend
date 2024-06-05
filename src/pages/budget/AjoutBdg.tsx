import React from "react";
import Ajout from "../Ajout";
import useFormFields from "../../constants/FormFields";

type Props = {};

const AjoutBdg: React.FC = (props: Props) => {
  const { budgetFields } = useFormFields();

  return <Ajout FormName="budget" formFields={budgetFields} />;
};

export default AjoutBdg;
