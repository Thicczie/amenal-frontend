import React from "react";
import AchatElemInstance from "../AchatElemInstance";
import useAchatApi from "../../../api/achat/achat_api";

type Props = {};

const InstancesPmf: React.FC = (props: Props) => {
  const { getPaiements } = useAchatApi();
  return (
    <AchatElemInstance
      FetchFct={getPaiements}
      PathTo="/pmf/info"
      tableName="pmf"
    />
  );
};

export default InstancesPmf;
