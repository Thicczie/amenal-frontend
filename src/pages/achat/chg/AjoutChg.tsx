import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutChg: React.FC = (props: Props) => {
  const { chgFields } = useFormFields();

  return <Ajout FormName="chargeStandard" formFields={chgFields} />;
};

export default AjoutChg;
