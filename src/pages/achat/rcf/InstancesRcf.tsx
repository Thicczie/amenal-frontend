import React from "react";
import AchatElemInstance from "../AchatElemInstance";
import useAchatApi from "../../../api/achat/achat_api";

type Props = {};

const InstancesRcf: React.FC = (props: Props) => {
  const { getReceptions } = useAchatApi();
  return (
    <AchatElemInstance
      FetchFct={getReceptions}
      PathTo="/rcf/info"
      tableName="rcf"
    />
  );
};

export default InstancesRcf;
