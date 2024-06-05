import React from "react";
import AchatElemInstance from "../AchatElemInstance";
import useAchatApi from "../../../api/achat/achat_api";

type Props = {};

const InstancesFcf: React.FC = (props: Props) => {
  const { getFactures } = useAchatApi();
  return (
    <AchatElemInstance
      FetchFct={getFactures}
      PathTo="/fcf/info"
      tableName="fcf"
    />
  );
};

export default InstancesFcf;
