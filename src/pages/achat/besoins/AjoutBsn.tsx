import React from "react";
import Ajout from "../../Ajout";
import useFormFields from "../../../constants/FormFields";

type Props = {};

const AjoutBsn: React.FC = (props: Props) => {
  const { bsnFields } = useFormFields();

  return <Ajout FormName="besoin" formFields={bsnFields} />;
};

export default AjoutBsn;
